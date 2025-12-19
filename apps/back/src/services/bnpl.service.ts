import { HttpClient, InjectHttpClient } from "@pepa/http-client";
import { CHECKOUT_CACHE, CHECKOUT_SERVICE_API } from "../config";
import { BadRequestException, Logger } from "@nestjs/common";
import { SimulationRequestDto, SimulationResponseDto } from "../types";
import { CacheStore, InjectCacheStore } from "@pepa/cache";
import { FindOneOptions } from "typeorm";
import { RepositoryMethodsService, SellerChannel, SellerPaymentMethods } from "@telecom-argentina/b2b-checkout-entity-lib";
import { isArray, isEmpty } from "class-validator";
// import { Client, RequestClient } from "@pepa/platform-rest";


export class BnplService {

    constructor(@InjectHttpClient(CHECKOUT_SERVICE_API) private readonly http: HttpClient,
        @InjectCacheStore(CHECKOUT_CACHE) private readonly cacheStore: CacheStore,
        private readonly logger: Logger,
        private readonly repositoryMethods: RepositoryMethodsService) {}

    async simulation(simulationDto: SimulationRequestDto): Promise<SimulationResponseDto> {

        try {  
            const cacheKey = `bnpl_simulation_${simulationDto.clientId}_${simulationDto.productId}`;   
            this.logger.verbose(`cache name: ${cacheKey}`);
            const cachedResponse = await this.cacheStore.get<SimulationResponseDto>(cacheKey);
            if (cachedResponse) {
                this.logger.verbose('Returning cached BNPL simulation response');
                return cachedResponse;
            }

            const url = 'https://internal-testing.qa.personalpay.dev/lending-originations-service/v1/simulations';
            const response = await this.http.post<SimulationResponseDto>(url, simulationDto, {
                headers: {
                    'Content-TType': 'application/json',
                },
            });
            this.logger.verbose('BNPL simulation successful');
            await this.cacheStore.set(cacheKey, response.data);
            return response.data;
        } catch (error) {
            this.logger.error('Error during BNPL simulation', {
                errorMessage: error?.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }    
    
    
    async getSellerChannels() {
        const queryData: FindOneOptions<SellerChannel> = { where: { sellerChannelCode: '006002' } };
        const findSellerChannel = await this.repositoryMethods.findOne(queryData, 'SellerChannel');
        this.logger.verbose({ message: 'Found Seller Channel', sellerChannel: findSellerChannel || [] });

        return findSellerChannel;
    }

    async findPaymentMethods(sellerChannelCode: string, clientId: string, amount: number): Promise<SimulationResponseDto> {
        //identify the id product BNPL (APICO BNPL = 4)
        const bnplPaymentMethodId = 4;

        const paymemntsMethods = await this.getBnplPaymentMethod(sellerChannelCode, bnplPaymentMethodId);

        if (!paymemntsMethods || !isArray(paymemntsMethods)) {
            this.logger.error({ errorMessage: 'No payment methods found for the given seller channel code' });
            throw new BadRequestException('No payment methods found for the given seller channel code');
        }

        //Simulation BNPL 
        const payments = await this.getBnplSimulation(clientId, amount);

        return payments;
    }

    private async getBnplPaymentMethod(sellerChannelCode: string, paymentMethodId: number): Promise<SellerPaymentMethods> {
        
        const cacheKey = `payment-methods-${sellerChannelCode}`;
        const cachePayment = await this.cacheStore.get(cacheKey) as string;
        this.logger.verbose(`Fetched order from cache with key ${cacheKey}`, cachePayment);
            
        if(!isEmpty(cachePayment)) { 
            this.logger.verbose(`Payment methods found in cache: ${sellerChannelCode}`);
            return JSON.parse(cachePayment) as SellerPaymentMethods;
        }
        
        //If your SellerChannel uses a "code" column name instead of "id", change the where clause below to { code: sellerChannelCodeOrId }
        const queryData: FindOneOptions<SellerChannel> = {
            where: { sellerChannelCode: sellerChannelCode },
            relations: {
                sellerPaymentMethods: {
                    paymentMethod: true,
                },
            },
        };  

        const sellerChannel = await this.repositoryMethods.findOne(queryData, 'SellerChannel');

        if (!sellerChannel?.sellerPaymentMethods) return null;

        //replace x channel.sellerPaymentMethods[] now is an object
        const sellerPaymentMethodsBySellerChannel =  sellerChannel.sellerPaymentMethods.paymentMethod.sellerPaymentMethods
            .find((spm) => spm.paymentMethodId === paymentMethodId)

        if (!sellerPaymentMethodsBySellerChannel) return null;
        
        await this.cacheStore.set(`payment-methods-${sellerChannelCode}`, JSON.stringify({sellerPaymentMethodsBySellerChannel}))

        return sellerPaymentMethodsBySellerChannel;
    }

    private async getBnplSimulation(clientId: string, amount: number): Promise<SimulationResponseDto> {
        try {
            //identify the id product BNPL (APICO BNPL = 4)
            const bnplproductId = 2;
            const cacheKey = `bnpl_simulation_${clientId}_${bnplproductId}`;   
            this.logger.verbose(`cache name: ${cacheKey}`);
            const cachedResponse = await this.cacheStore.get(cacheKey) as string;
            if (cachedResponse) {
                this.logger.verbose('Returning cached BNPL simulation response');
                return JSON.parse(cachedResponse);
            }

            const simulationDto: SimulationRequestDto = {
                clientId,
                productId: bnplproductId,
                amountRequested: amount,
                flowId: 'apico_checkout',
                tags: [],
                segment: {
                    mid: '',
                    mcc: ''
                }
            };
            
            const url = 'https://internal-testing.qa.personalpay.dev/lending-originations-service/v1/simulations';
            //const url = apiLoansServiceUrl.concat('/lending-originations-service/v1/simulations');
            const response = await this.http.post<SimulationResponseDto>(url, simulationDto, {
                headers: {
                    'Content-TType': 'application/json',
                },
            });
            this.logger.verbose('BNPL simulation successful', response.data);
            await this.cacheStore.set(cacheKey, JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            this.logger.error('Error during BNPL simulation', {
                errorMessage: error?.message,
                response: error.response?.data,
                status: error.response?.status,
            });
            throw error;
        }
    }
}
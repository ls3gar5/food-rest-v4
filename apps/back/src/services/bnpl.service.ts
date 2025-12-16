import { HttpClient, InjectHttpClient } from "@pepa/http-client";
import { CHECKOUT_CACHE, CHECKOUT_SERVICE_API } from "../config";
import { Logger } from "@nestjs/common";
import { SimulationRequestDto, SimulationResponseDto } from "../types";
import { CacheStore, InjectCacheStore } from "@pepa/cache";
import { SellerChannel } from "../entities/SellerChannel";
import { FindOneOptions } from "typeorm";
import { RepositoryMethodsService, SaleChannel } from "@telecom-argentina/b2b-checkout-entity-lib";


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
}
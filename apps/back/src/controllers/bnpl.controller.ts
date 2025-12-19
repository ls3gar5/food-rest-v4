import { BadRequestException, Body, Controller, Get, Logger, Param, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BnplService } from "../services/bnpl.service";
import { SimulationRequestDto, SimulationResponseDto } from "../types";
import { Client, RequestClient } from "@pepa/platform-rest";
import { isEmpty } from "class-validator";

@Controller()
@ApiTags('bnpl')
export class BnplController {
    constructor(private readonly bnplService: BnplService) {}
    private readonly logger = new Logger(BnplController.name);
    
    @Post('bnpl/simulation')
    async simulation(@Body(ValidationPipe) simulationDto: SimulationRequestDto) {

        return await this.bnplService.simulation(simulationDto);
    }

    @Get('bnpl/seller-channels')
    async getSellerChannels(@Client() client: RequestClient) {
        const clientId = client.sub;
        this.logger.verbose(`Client ID: ${clientId}`);
        this.logger.verbose('Fetching seller channels');
        return await this.bnplService.getSellerChannels();
    }

    @Get('methods/:seller_channel_code/:amount')
    async getPaymentMethods(@Param('seller_channel_code') sellerChannelCode: string, 
            @Param('amount') amount: number,
            @Client() client: RequestClient): Promise<SimulationResponseDto>  {
        try {
            const clientId = client.sub;
            if (isEmpty(clientId) || isEmpty(sellerChannelCode)) {
                throw new BadRequestException('Missing param are required');
            }

            this.logger.verbose({ message: `Fetching payment methods for seller channel code: ${sellerChannelCode}, clientId: ${clientId}, amount: ${amount}` });

            const sellerPaymentMethod = await this.bnplService.findPaymentMethods(sellerChannelCode, clientId, amount);

            return sellerPaymentMethod;
        } catch (error) {
            console.error('Error fetching payment methods:', error.message || error);
            throw new BadRequestException('Failed to fetch payment methods');
        }
    }
}
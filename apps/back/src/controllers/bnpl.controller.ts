import { Body, Controller, Get, Logger, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BnplService } from "../services/bnpl.service";
import { SimulationRequestDto } from "../types";

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
    async getSellerChannels() {
        this.logger.verbose('Fetching seller channels');
        return await this.bnplService.getSellerChannels();
    }
}
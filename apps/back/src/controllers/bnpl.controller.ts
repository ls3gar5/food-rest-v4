import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BnplService } from "../services/bnpl.service";
import { SimulationRequestDto } from "../types";

@Controller()
@ApiTags('bnpl')
export class BnplController {
    constructor(private readonly bnplService: BnplService) {}

    @Post('bnpl/simulation')
    async simulation(@Body(ValidationPipe) simulationDto: SimulationRequestDto) {

        return await this.bnplService.simulation(simulationDto);
    }
}
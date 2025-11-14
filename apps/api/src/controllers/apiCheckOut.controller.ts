import { Controller, Get, HttpException, HttpStatus, Inject, Logger, LoggerService, Query } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiCheckoutService } from "../services";
import { OrderHashedDto } from "../dto";


@Controller('api-checkout')
export class ApiCheckOutController {
    constructor(
        private apiCheckOutService: ApiCheckoutService,
        @Inject(Logger) private readonly logger: LoggerService,
        @Inject(REQUEST) private readonly request: Request
    ) {}

    @Get('order')
    @ApiTags('Get an order by hash')
    @ApiOperation({ summary: 'Obtener los datos de la orden guardada en la creación' })
    @ApiHeader({ name: 'Content-Type', description: 'application/json' })
    async orderHashed(@Query() orderHashId: string, @Query() orderSessionId: string): Promise<OrderHashedDto> {
        try {
            const result: OrderHashedDto = await this.apiCheckOutService.getOrderHashed(orderHashId, orderSessionId);
            return result
        } catch (error) {
            this.logger.error({ errorMessage: error?.message, status: HttpStatus.BAD_REQUEST });
            throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
        }
    }
}
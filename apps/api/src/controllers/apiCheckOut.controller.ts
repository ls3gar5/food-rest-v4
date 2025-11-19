import { Body, Controller, Get, HttpException, HttpStatus, Inject, Logger, LoggerService, ParseUUIDPipe, Post, Query } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ApiHeader, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiCheckoutService } from "../services";
import { formatOrderHashed, GetOrderQueryDto, OrderHashedDto, OrderResponseDto } from "../dto";


@Controller('order')
export class ApiCheckOutController {
    constructor(
        private apiCheckOutService: ApiCheckoutService,
        @Inject(Logger) private readonly logger: LoggerService,
        @Inject(REQUEST) private readonly request: Request
    ) {}

    @Get()
    @ApiTags('Get an order by hash')
    @ApiOperation({ summary: 'Obtener los datos de la orden guardada en la creación' })
    @ApiHeader({ name: 'Content-Type', description: 'application/json' })
    async orderHashed(@Query() query: GetOrderQueryDto): Promise<OrderResponseDto> {
        try {
            this.logger.verbose('Get orderHashId object', JSON.stringify(query.orderHashId));
            this.logger.verbose('Received Query Params:', query.orderHashId);
            const result: OrderHashedDto = await this.apiCheckOutService.getOrderHashed(query.orderHashId, query.orderSessionId);
            return formatOrderHashed(result) ;
        } catch (error) {
            this.logger.error({ errorMessage: error?.message, status: HttpStatus.BAD_REQUEST });
            throw new HttpException({
                message: error.message ?? error,
                error: "Not Found",
                statusCode: HttpStatus.NOT_FOUND
            }, HttpStatus.NOT_FOUND);
        }
    }
}
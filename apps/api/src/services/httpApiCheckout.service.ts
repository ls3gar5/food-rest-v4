import { HttpClient, InjectHttpClient } from "@pepa/http-client";
import { OrderHashedDto } from "../dto/orderResponse.dto";
import { CHECKOUT_SERVICE_API } from "../config";
import { HttpException, Logger } from "@nestjs/common";

export class ApiCheckoutService { 
        constructor(@InjectHttpClient(CHECKOUT_SERVICE_API) private readonly http: HttpClient) {}
     
        private readonly logger = new Logger(ApiCheckoutService.name);

    async getOrderHashed(orderHashId: string, orderSessionId: string): Promise<OrderHashedDto> {
      try {
        
        // const url = apiCheckoutUrl.concat(`order/details?orderHashId=${orderHashId}&orderSessionId=${orderSessionId}`);
        // const response = await this.http.get(url);

        const response: {data: OrderHashedDto} = {data: {
            createdAt: '2025-11-13T20:26:29.746Z',
            orderStatus: 'created',
            sellerClientId: "cc867c96-2ce9-49eb-8309-7302db8ada12",
            amount: 1999,
            channel: "BUSINESS",
            orderTransactionId: "b2a82a4f-aae7-4dbe-ae8e-4d51d2ff0e51",
            pointId: "837a8cec-cd29-48a3-b2b3-bbdf5875ab11",
            qrData: "mobile",
            storeId: "8ea99295-5c79-48f8-8d3e-80c024993f19",
            storeName: "Better Catering",
            sessionId: orderSessionId,
            sessionTime: 1763065589501,
            sellerSessionId: "sellerSessionIdPDS",
            cartId: "BC-mobile",
            storeCity: "Buenos Aires",
            storeCvu: "0000314600000006055141",
            storeEmail: "prueba3@gmail.com",
            storeTributaryId: "30708218681",
            locationCode: 1,
            sellerAdditionalData: {
                "campoDinamico_1": "ROI flexibility matrix Unbranded",
                "external_account_id": 12345
            },
            sellerChannel: "006002",
            qrOrderId: null,
            updatedAt: null,
            orderId: 24125,
            internalProcess: "not-processed",
            minutesExpiracy: 4,
            msecondsExpiracy: 240000
        }};
        
        return response.data;
        
      } catch (error) {
          this.logger.error('Error getting order details', {
              errorMessage: error?.message,
              response: error.response?.data,
              status: error.response?.status,
          });
          
          throw new HttpException(error.response, error.response?.status);
      }
    }
}
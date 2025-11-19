import { HttpClient, InjectHttpClient } from "@pepa/http-client";
import { OrderHashedDto } from "../dto/orderResponse.dto";
import { CHECKOUT_SERVICE_API } from "../config";
import { HttpException, Logger } from "@nestjs/common";
import { generateIdFromSeed, mapToOrderHashed } from "../utils/order";

export class ApiCheckoutService { 
        constructor(@InjectHttpClient(CHECKOUT_SERVICE_API) private readonly http: HttpClient) {}
     
        private readonly logger = new Logger(ApiCheckoutService.name);

    async getOrderHashed(orderHashId: string, orderSessionId: string): Promise<any> {
      try {
        
        // const url = apiCheckoutUrl.concat(`order/details?orderHashId=${orderHashId}&orderSessionId=${orderSessionId}`);
        // const response = await this.http.get(url);

        // const myOrderIdHushed = generateIdFromSeed('24125'); // Example usage of the utility function
        // console.log('Generated Order Hash ID:', myOrderIdHushed);
        const response = ''; //"{\"cacheData\":{\"apiKey\":\"apiKey\",\"sellerSessionId\":\"sellerSessionIdPDS\",\"flowType\":\"mobile\",\"cartId\":\"BC-mobile\",\"orderData\":{\"point\":\"837a8cec-cd29-48a3-b2b3-bbdf5875ab11\",\"totalAmount\":1999,\"productName\":\"Test\",\"productQuantity\":1,\"additionalData\":{\"campoDinamico_1\":\"ROI flexibility matrix Unbranded\",\"external_account_id\":12345}},\"sellerChannel\":\"006002\",\"idHash\":\"e3c07f0f01\",\"orderSessionId\":\"610a90ce2746b425bfa18d5b3b18ed518eb1adb389ba0c8fd0a3df229e6d7a90\",\"orderId\":24235}}";
        
        // const classstringedResponse = JSON.stringify(response);
        // this.logger.verbose('Order details retrieved successfully', classstringedResponse);
        //const parseClassstringedResponse = JSON.parse(response);
        //const responseData = mapToOrderHashed(parseClassstringedResponse.cacheData);
        if (orderSessionId.includes('/')){
            orderSessionId = orderSessionId.split('/')[0];
        }
        this.logger.verbose('Order details retrieved successfully:', orderSessionId);
        return response;
        
      } catch (error) {
          this.logger.error('Error getting order details', {
              errorMessage: error?.message,
              response: error.response?.data,
              status: error.response?.status,
          });
          
          throw new HttpException(error.message, error.response?.status);
      }
    }
}
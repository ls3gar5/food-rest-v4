import { Logger } from "@nestjs/common";
import { HttpClient, InjectHttpClient } from "@pepa/http-client";
import { CHECKOUT_SERVICE_API } from "../config";

export class HealthService { 
    constructor(@InjectHttpClient(CHECKOUT_SERVICE_API) private readonly http: HttpClient) {}
    
    private readonly logger = new Logger(HealthService.name);

    async pokeNames(): Promise<any> {
      try {
        const url = 'https://pokeapi.co/api/v2/pokemon-color/1';
        const response = await this.http.get(url);
        this.logger.verbose('Health check successful', response);
        return response?.data?.names;
      } catch (error) {
          this.logger.error('Error during health check', {
              errorMessage: error?.message,
              response: error.response?.data,
              status: error.response?.status,
          });
          throw error;
      }
    }
}
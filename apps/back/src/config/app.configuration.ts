import { CountryCodeEnum, EnvironmentType, StageType } from '@pepa/common';

export interface AppConfiguration {
  env: EnvironmentType;
  stage: StageType;
  countryCode: CountryCodeEnum;
  port: number;
}

export const CHECKOUT_SERVICE_API = 'b2b-api-checkout';
export const CHECKOUT_CACHE = 'checkout-back';

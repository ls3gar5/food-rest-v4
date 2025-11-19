import { CountryCodeEnum, EnvironmentType, StageType } from '@pepa/common';

export interface AppConfiguration {
  env: EnvironmentType;
  stage: StageType;
  countryCode: CountryCodeEnum;
  port: number;
}

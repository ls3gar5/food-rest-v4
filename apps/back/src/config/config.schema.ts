import { CountryCodeEnum, EnvironmentTypeEnum, StageTypeEnum } from '@pepa/common';

/**
 *
 * Keep configurations centralized
 *
 */
export const schema = {
  env: {
    doc: 'Runtime environment.',
    format: Object.values(EnvironmentTypeEnum),
    default: EnvironmentTypeEnum.Development,
    env: 'NODE_ENV',
  },
  stage: {
    doc: 'Runtime stage.',
    format: Object.values(StageTypeEnum),
    default: StageTypeEnum.Local,
    env: 'NODE_STAGE',
  },
  countryCode: {
     doc: 'Country code',
     format: Object.values(CountryCodeEnum),
     default: CountryCodeEnum.ARG,
     env: 'COUNTRY_CODE'
  },
  port: {
    doc: 'Api port',
    format: 'port',
    default: 8080,
    env: 'PORT',
    coerse: (val: string | number): number => {
      if (!val) {
        return 8080;
      }

      return typeof val === 'string' ? Number(val) : val;
    }
  },
};

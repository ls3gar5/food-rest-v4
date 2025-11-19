import { RestApplicationLoggerOptions, RestApplicationOptions } from '@pepa/platform-rest';
import { environment } from './config';

const loggerOptions: RestApplicationLoggerOptions = {
  level: 'debug',
  json: environment.env === 'production',
  stackTrace: environment.stage !== 'production',
  silent: false,
  request: true,
  requestBody: environment.stage !== 'production',
  response: true,
  responseBody: environment.stage !== 'production',
  excludeEndpoints: [
    '^/health'
  ],
  sensitiveKeys: [
    /^password$/
  ],
  expandExtras: true
};

export const options: RestApplicationOptions = {
  apiPrefix: '',
  apiPrefixOptions: {
    exclude: ['health']
  },
  enableCors: true,
  trustProxy: environment.env === 'production',
  versioning: true,
  validation: true,
  docs: {
    title: 'Api rest',
    description: 'Example rest api',
    servers: [
      {
        url: environment.env === 'production' ? "" : ""
      }
    ]
  },
  logger: loggerOptions
};

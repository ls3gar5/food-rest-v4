import { ConfigEnvironment } from '@pepa/common';
import { AppConfiguration } from './app.configuration';
import { createConfiguration } from './config';

let config: ConfigEnvironment<AppConfiguration>;

// Configuration validate
try {
  config = createConfiguration();
  config.validate();
} catch (error) {
  if (process.env.NODE_ENV !== 'production') {
    throw error;
  }

  const msg = {
    message: 'Invalid configuration',
    error: error,
  };
  if (error && error.name === 'MissingEnvVarsError') {
    msg.message = 'Missing env vars';
  }
  console.log(JSON.stringify(msg));
  process.exit(1);
}

export const environment: AppConfiguration = config.get();

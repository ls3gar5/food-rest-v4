import * as path from 'path';
import { ConfigEnvironmentFactory } from '@pepa/common';
import { AppConfiguration } from './app.configuration';
import { schema } from './config.schema';

const env = process.env.NODE_ENV;
const relative = env === 'test' ? '../../../../' : '../../../';
const root = path.join(__dirname, relative);
const envexample = path.join(root, '.env.example');
const envfile = env === 'test' ? envexample : path.join(root, '.env');
const allowEmptyValues = process.env.NODE_ENV === 'test';

export function createConfiguration() {
  return ConfigEnvironmentFactory.create<AppConfiguration>(
    envfile,
    envexample,
    schema,
    allowEmptyValues
  );
}

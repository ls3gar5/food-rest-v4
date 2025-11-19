import { IRuntimeContext } from '@pepa/common';
import { environment } from './config';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Factory para las variables del runtime context
 *
 * @param appName Artefacto que se esta ejecutando ejemplo (notifications-worker)
 * @param serviceName Servicio lógico o ecosistema (notifications-service)
 * (*por defecto name del pacckage.json*)
 */
export async function loadRuntimeContext(appName: string, serviceName?: string): Promise<IRuntimeContext> {
  const raw = await fs.readFile(
    path.resolve(__dirname, '../../../package.json'),
    'utf-8'
  );
  const pkg = JSON.parse(raw);

  const sname = serviceName ? serviceName : pkg.name;

  return {
    env: environment.env,
    stage: environment.stage,
    serviceName: sname,
    appName: appName,
    version: pkg.version,
    countryCode: environment.countryCode || 'ARG',
  };
}

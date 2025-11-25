import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthService } from '../services/health.service';

@Controller()
@ApiTags('health-checks')
export class HealthController {
  constructor(private readonly healthservice: HealthService) {}
  /**
   * Endpoint utilizado por Kubernetes como Liveness Probe.
   * Este endpoint **no verifica servicios externos**.
   * Si responde 200, Kubernetes considera que el contenedor está "vivo".
   *
   * Más información en: https://pepa-framework-docs-64635f.gitlab.io/docs/fundamentals/health-checks
   */
  @Get('healthz')
  healthz() {
    return { status: 'OK' };
  }

  /**
   * Readiness Probe que puede incluir validaciones más completas:
   * - Base de datos
   * - Caches
   * - Otros servicios críticos
   *
   * Más información en: https://pepa-framework-docs-64635f.gitlab.io/docs/fundamentals/health-checks
   */
  @Get('health')
  health() {
    // Aquí podrías agregar lógicas reales de chequeo.
    return { status: 'READY' };
  }

  @Get('health-check-poke')
  async healthCheckPoke() {
    // Este endpoint puede ser utilizado para "despertar" la aplicación en entornos serverless.
    return await this.healthservice.pokeNames()
  }
}

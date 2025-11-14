import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('health-checks')
export class HealthController {
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

  @Get()
  healthOk() {
    // Aquí podrías agregar lógicas reales de chequeo.
    return { status: 'READY' };
  }
}

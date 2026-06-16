import { Body, Controller, HttpCode, HttpException, Post } from '@nestjs/common'
import { LighthouseService } from './lighthouse.service'

class LighthouseDto {
  url: string
}

@Controller('lighthouse')
export class LighthouseController {
  constructor(private readonly svc: LighthouseService) {}

  @Post()
  @HttpCode(200)
  async audit(@Body() dto: LighthouseDto) {
    if (!dto.url) throw new HttpException('url requerida', 400)
    try {
      return await this.svc.run(dto.url)
    } catch (e) {
      throw new HttpException(`Lighthouse falló: ${e.message}`, 500)
    }
  }
}

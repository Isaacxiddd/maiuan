import { Injectable, Logger } from '@nestjs/common'
import { ContactDto } from './contact.dto'

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name)

  async send(dto: ContactDto): Promise<{ ok: boolean }> {
    this.logger.log(`Nuevo contacto: ${dto.name} <${dto.email}> [${dto.rubro}]`)
    // TODO: configurar mailer con credenciales en .env
    return { ok: true }
  }
}

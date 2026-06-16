import { Body, Controller, Post, HttpCode } from '@nestjs/common'
import { ContactService } from './contact.service'
import { ContactDto } from './contact.dto'

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(200)
  send(@Body() dto: ContactDto) {
    return this.contactService.send(dto)
  }
}

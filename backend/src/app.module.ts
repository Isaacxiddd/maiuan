import { Module } from '@nestjs/common'
import { ContactModule } from './contact/contact.module'
import { LighthouseModule } from './lighthouse/lighthouse.module'

@Module({ imports: [ContactModule, LighthouseModule] })
export class AppModule {}

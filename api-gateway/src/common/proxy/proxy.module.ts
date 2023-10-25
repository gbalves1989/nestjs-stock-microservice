import { Module } from '@nestjs/common';
import { ClientProxyStock } from './client.proxy';

@Module({
  providers: [ClientProxyStock],
  exports: [ClientProxyStock],
})
export class ProxyModule {}

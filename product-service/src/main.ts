import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitMQ } from './constants/rabbitmq.constant';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: RabbitMQ.ProductQueue,
      },
    },
  );

  await app.listen();
}
bootstrap();

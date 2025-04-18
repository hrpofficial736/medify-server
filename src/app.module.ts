import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [AuthModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

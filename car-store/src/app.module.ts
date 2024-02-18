import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'fathoni',
      database: 'car_stores',
      entities: [User, Report],
      synchronize: true,
    }), 
    UsersModule, ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

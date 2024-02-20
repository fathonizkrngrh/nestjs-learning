import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/reports.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST') || 'localhost',
          port: config.get<number>('DB_PORT') ||5432,
          username: config.get<string>('DB_USERNAME') ||'postgres',
          password: config.get<string>('DB_PASSWORD') ||'fathoni',
          database: config.get<string>('DB_NAME') ||'car_stores',
          entities: [User, Report],
          synchronize: true,
        }
      } 
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'fathoni',
    //   database: 'car_stores',
    //   entities: [User, Report],
    //   synchronize: true,
    // }), 
    UsersModule, ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

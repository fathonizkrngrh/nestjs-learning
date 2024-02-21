import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

    create(reportDto: CreateReportDto, user: User) {
        const report = this.repo.create(reportDto)
        report.user = user

        return this.repo.save(report)
    }

    async changeApproval(id: number, approved: boolean) {
        const report = await this.repo.findOne({ where: { id: id}})
        if (!report) {
            throw new BadRequestException('Report not found')
        }

        report.approved = approved
        return this.repo.save(report)
    }

    createEstimate({make, model, lat, long, year, mileage}: GetEstimateDto) {
        return this.repo
            .createQueryBuilder()
            .select('*')
            .where('make = :make', { make })
            .andWhere('model = :model', { model })
            .andWhere('long - :long BETWEEN -5 AND 5', { long })
            .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
            .andWhere('year - :year BETWEEN -3 AND 3', { year })
            .andWhere('approved IS true')
            .orderBy('ABS(mileage - :mileage)','DESC')
            .setParameters({ mileage })
            .getRawMany()
    }
}

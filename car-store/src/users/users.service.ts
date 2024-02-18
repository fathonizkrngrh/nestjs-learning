import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        const user = this.repo.create({ email, password })

        return this.repo.save(user)
    }

    async findOne(id: number){
        const user = await this.repo.findOne({ where: {id} })
        if (!user) {
            throw new BadRequestException(`User ${id} not found`)
        }
        return user
    }

    find(email: string) {
        return this.repo.find({ where: {email}})
    }

    async update(id: number, attrs: Partial<User>){
        const user = await this.findOne(id)

        Object.assign(user, attrs)
        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.findOne(id)

        return this.repo.remove(user)
    }
}

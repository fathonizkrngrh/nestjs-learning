import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Session, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService    
    ) {}

    @Post('/signup')
    async signup(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('/signout')
    async signout(@Session() session: any) {
        session.userId = null
    }

    @Get('/whoami')
    whoAmI(@CurrentUser() user: User) {
        return user
    }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id))
    }

    @Get('/')
    findAllUsers(@Query('email') email: string) {
        console.log(email)
        return this.userService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.userService.update(parseInt(id), body)
    }
}

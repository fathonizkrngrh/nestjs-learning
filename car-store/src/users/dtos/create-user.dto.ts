import { IsEmail, IsStrongPassword } from "class-validator"

const passwordOptions = {
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0
}

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsStrongPassword(passwordOptions)
    password: string
}
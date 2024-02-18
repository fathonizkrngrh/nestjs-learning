import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator"

const passwordOptions = {
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0
}

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    @IsString()
    email: string

    @IsStrongPassword(passwordOptions)
    @IsString()
    @IsOptional()
    password: string
}
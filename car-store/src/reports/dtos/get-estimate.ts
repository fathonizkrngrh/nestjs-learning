import { Transform } from "class-transformer"
import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsString, Max, Min } from "class-validator"

export class GetEstimateDto {
    @IsString()
    make: string

    @IsString()
    model: string

    @Transform(({value})=> parseInt(value) )
    @IsNumber()
    @Min(1930)
    @Max(new Date().getFullYear())
    year: number

    @Transform(({value})=> parseInt(value) )
    @IsNumber()
    mileage: number
    
    @Transform(({value})=> parseFloat(value) )
    @IsLongitude()
    long: number

    @Transform(({value})=> parseFloat(value) )
    @IsLatitude()
    lat: number
}
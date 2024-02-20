import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator"


export class CreateReportDto {
    @IsString()
    make: string

    @IsString()
    model: string

    @IsNumber()
    @Min(1930)
    @Max(new Date().getFullYear())
    year: number

    @IsNumber()
    mileage: number
    
    @IsLongitude()
    long: number

    @IsLatitude()
    lat: number

    @IsNumber()
    @Min(0)
    @Max(1000000000)
    price: number
}
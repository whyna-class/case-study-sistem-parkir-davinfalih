import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { jenis_kendaraan } from '@prisma/client';

export class  FindParkirDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(jenis_kendaraan)
    jenis_kendaraan?: jenis_kendaraan;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    page?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    limit?: number;
}
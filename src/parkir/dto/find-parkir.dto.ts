import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { JenisKendaraan } from '@prisma/client';

export class FindParkirDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(JenisKendaraan)
    jenis_kendaraan?: JenisKendaraan;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    page?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    limit?: number;
}
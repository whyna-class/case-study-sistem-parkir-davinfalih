import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { JenisKendaraan } from '@prisma/client';

export class CreateParkirDto {
    @IsNotEmpty()
    @IsString()
    plat_nomor: string;

    @IsNotEmpty()
    @IsEnum(JenisKendaraan)
    jenis_kendaraan: JenisKendaraan;

    @IsInt()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    durasi: number;
}
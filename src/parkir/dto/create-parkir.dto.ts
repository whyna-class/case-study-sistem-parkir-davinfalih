import {jenis_kendaraan} from '@prisma/client';
import { IsEnum, IsInt, IsOptional, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateParkirDto {
    @IsString()
    @IsNotEmpty()
    plat_nomor: string;

    @IsNumber()
    @IsNotEmpty()
    durasi: number;


    @IsEnum(['roda2', 'roda4'])
    @IsNotEmpty()
    jenis_kendaraan: jenis_kendaraan;

    @IsOptional()
    total_biaya: number;
}
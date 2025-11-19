import { IsString, IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { JenisKendaraan } from '@prisma/client';

export class CreateParkirDto {
  @IsNotEmpty({ message: 'Plat nomor tidak boleh kosong' })
  @IsString()
  @Matches(/^[A-Z0-9\s-]+$/i, { message: 'Format plat nomor tidak valid' })
  plat_nomor: string;

  @IsNotEmpty({ message: 'Jenis kendaraan tidak boleh kosong' })
  @IsEnum(JenisKendaraan, { 
    message: 'Jenis kendaraan hanya boleh "roda2" atau "roda4"' 
  })
  jenis_kendaraan: JenisKendaraan;
}


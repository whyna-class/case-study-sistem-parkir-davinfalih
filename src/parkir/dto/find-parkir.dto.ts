import {
  IsOptional,
  IsInt,
  Min,
  IsEnum,
  IsString,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JenisKendaraan } from '@prisma/client';

export class FindParkirDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page harus berupa angka' })
  @Min(1, { message: 'Page minimal 1' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit harus berupa angka' })
  @Min(1, { message: 'Limit minimal 1' })
  limit?: number = 10;

  @IsOptional()
  @IsString({ message: 'Search harus berupa string' })
  search?: string;

  @IsOptional()
  @IsEnum(JenisKendaraan, {
    message: 'Jenis kendaraan hanya boleh "roda2" atau "roda4"',
  })
  jenis_kendaraan?: JenisKendaraan;

  @IsOptional()
  @IsIn(['createdAt', 'updatedAt', 'plat_nomor', 'durasi', 'total'], {
    message:
      'sortBy hanya boleh: createdAt, updatedAt, plat_nomor, durasi, total',
  })
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'], {
    message: 'sortOrder hanya boleh "asc" atau "desc"',
  })
  sortOrder?: 'asc' | 'desc' = 'desc';
}

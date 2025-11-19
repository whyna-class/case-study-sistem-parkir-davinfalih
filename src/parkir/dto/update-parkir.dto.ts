import { PartialType } from '@nestjs/mapped-types';
import { CreateParkirDto } from './create-parkir.dto';
import { IsNumber, IsString } from 'class-validator';
import { IsInt, Min } from 'class-validator';

export class UpdateParkirDto extends PartialType(CreateParkirDto) {
  @IsInt({ message: 'Durasi harus berupa angka' })
  @Min(1, { message: 'Durasi harus lebih dari 0' })
  durasi: number;
}

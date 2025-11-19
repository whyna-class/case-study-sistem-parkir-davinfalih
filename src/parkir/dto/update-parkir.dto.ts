import { IsOptional, IsInt } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateParkirDto } from './create-parkir.dto';
import { Transform } from 'class-transformer';

export class UpdateParkirDto extends PartialType(CreateParkirDto) {
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    durasi?: number;
}
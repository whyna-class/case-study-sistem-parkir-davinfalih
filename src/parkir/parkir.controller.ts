// src/parkir/parkir.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ParkirService } from './parkir.service';
import { CreateParkirDto } from './dto/create-parkir.dto';
import { UpdateParkirDto } from './dto/update-parkir.dto';
import { FindParkirDto } from './dto/find-parkir.dto';

@Controller('parkir')
export class ParkirController {
  constructor(private readonly parkirService: ParkirService) {}

  // POST /parkir - Tambah data parkir
  @Post()
  create(@Body(ValidationPipe) createParkirDto: CreateParkirDto) {
    return this.parkirService.create(createParkirDto);
  }

  // GET /parkir - Ambil semua data parkir dengan search, filter, pagination
  @Get()
  findAll(@Query(ValidationPipe) query: FindParkirDto) {
    return this.parkirService.findAll(
      query.page,
      query.limit,
      query.search,
      query.jenis_kendaraan,
      query.sortBy,
      query.sortOrder,
    );
  }

  // GET /parkir/total - Hitung total pendapatan
  @Get('total')
  getTotal() {
    return this.parkirService.getTotal();
  }

  // GET /parkir/:id - Ambil detail parkir berdasarkan ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.parkirService.findOne(id);
  }

  // PATCH /parkir/:id - Update lama parkir
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateParkirDto: UpdateParkirDto,
  ) {
    return this.parkirService.update(id, updateParkirDto);
  }

  // DELETE /parkir/:id - Hapus data parkir
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.parkirService.remove(id);
  }
}
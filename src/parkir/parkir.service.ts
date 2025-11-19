// src/parkir/parkir.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParkirDto } from './dto/create-parkir.dto';
import { UpdateParkirDto } from './dto/update-parkir.dto';
import { JenisKendaraan } from '@prisma/client';

@Injectable()
export class ParkirService {
  constructor(private prisma: PrismaService) {}

  // Hitung total biaya parkir
  private hitungTotal(jenis_kendaraan: JenisKendaraan, durasi: number): number {
    let tarif_pertama = 0;
    let tarif_berikutnya = 0;

    if (jenis_kendaraan === JenisKendaraan.roda2) {
      tarif_pertama = 3000;
      tarif_berikutnya = 2000;
    } else if (jenis_kendaraan === JenisKendaraan.roda4) {
      tarif_pertama = 6000;
      tarif_berikutnya = 4000;
    }

    if (durasi === 1) {
      return tarif_pertama;
    } else {
      return tarif_pertama + (durasi - 1) * tarif_berikutnya;
    }
  }

  // POST /parkir - Tambah data parkir
  async create(createParkirDto: CreateParkirDto) {
    const durasi = 1; // Default 1 jam pertama
    const total = this.hitungTotal(createParkirDto.jenis_kendaraan, durasi);

    const parkir = await this.prisma.parkir.create({
      data: {
        plat_nomor: createParkirDto.plat_nomor,
        jenis_kendaraan: createParkirDto.jenis_kendaraan,
        durasi: durasi,
        total: total,
      },
    });

    return {
      message: 'Data parkir berhasil ditambahkan',
      data: parkir,
    };
  }

  // GET /parkir - Ambil semua data parkir (dengan search, filter, pagination)
  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    jenis_kendaraan?: string, // Ubah dari JenisKendaraan ke string dulu
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
  ) {
    // Pastikan page dan limit adalah number
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Build WHERE clause untuk search dan filter
    const where: any = {};

    // Search: cari di plat_nomor (tanpa mode insensitive untuk MySQL)
    if (search && search.trim() !== '') {
      where.plat_nomor = {
        contains: search.trim(),
      };
    }

    // Filter: berdasarkan jenis kendaraan dengan validasi ketat
    if (jenis_kendaraan && jenis_kendaraan.trim() !== '') {
      const jenisKendaraanTrimmed = jenis_kendaraan.trim();
      
      // Validasi apakah nilai enum valid
      if (Object.values(JenisKendaraan).includes(jenisKendaraanTrimmed as JenisKendaraan)) {
        where.jenis_kendaraan = jenisKendaraanTrimmed as JenisKendaraan;
      } else {
        throw new BadRequestException(
          `Jenis kendaraan tidak valid. Harus salah satu dari: ${Object.values(JenisKendaraan).join(', ')}`
        );
      }
    }

    // Build ORDER BY clause untuk sorting
    const orderBy: any = {};
    const allowedSortFields = ['createdAt', 'updatedAt', 'plat_nomor', 'durasi', 'total'];
    
    if (allowedSortFields.includes(sortBy)) {
      orderBy[sortBy] = sortOrder;
    } else {
      orderBy.createdAt = 'desc'; // default sorting
    }

    try {
      // Execute query dengan pagination
      const [data, total] = await Promise.all([
        this.prisma.parkir.findMany({
          where,
          skip,
          take: limitNum,
          orderBy,
        }),
        this.prisma.parkir.count({ where }),
      ]);

      return {
        data,
        meta: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
          hasNextPage: pageNum < Math.ceil(total / limitNum),
          hasPreviousPage: pageNum > 1,
        },
        filters: {
          search: search || null,
          jenis_kendaraan: jenis_kendaraan || null,
          sortBy,
          sortOrder,
        },
      };
    } catch (error) {
      // Tangani error dari Prisma
      if (error.message && error.message.includes('not found in enum')) {
        throw new BadRequestException(
          'Terdapat data dengan jenis kendaraan tidak valid di database. Silakan hubungi administrator.'
        );
      }
      throw error;
    }
  }

  // GET /parkir/:id - Ambil detail parkir berdasarkan ID
  async findOne(id: number) {
    try {
      const parkir = await this.prisma.parkir.findUnique({
        where: { id },
      });

      if (!parkir) {
        throw new NotFoundException(`Data parkir dengan ID ${id} tidak ditemukan`);
      }

      return {
        data: parkir,
      };
    } catch (error) {
      if (error.message && error.message.includes('not found in enum')) {
        throw new BadRequestException(
          `Data parkir dengan ID ${id} memiliki jenis kendaraan yang tidak valid. Silakan hubungi administrator.`
        );
      }
      throw error;
    }
  }

  // GET /parkir/total - Hitung total pendapatan dari semua data parkir
  async getTotal() {
    try {
      const result = await this.prisma.parkir.aggregate({
        _sum: {
          total: true,
        },
        _count: true,
      });

      return {
        total_kendaraan: result._count,
        total_pendapatan: result._sum.total || 0,
      };
    } catch (error) {
      if (error.message && error.message.includes('not found in enum')) {
        throw new BadRequestException(
          'Terdapat data dengan jenis kendaraan tidak valid di database. Silakan hubungi administrator.'
        );
      }
      throw error;
    }
  }

  // PATCH /parkir/:id - Update lama parkir (otomatis update total)
  async update(id: number, updateParkirDto: UpdateParkirDto) {
    const parkir = await this.prisma.parkir.findUnique({
      where: { id },
    });

    if (!parkir) {
      throw new NotFoundException(`Data parkir dengan ID ${id} tidak ditemukan`);
    }

    const total = this.hitungTotal(parkir.jenis_kendaraan, updateParkirDto.durasi);

    const updatedParkir = await this.prisma.parkir.update({
      where: { id },
      data: {
        durasi: updateParkirDto.durasi,
        total: total,
      },
    });

    return {
      message: 'Durasi parkir berhasil diupdate',
      data: updatedParkir,
    };
  }

 // DELETE /parkir/:id - Hapus data parkir
async remove(id: number) {
  try {
    const parkir = await this.prisma.parkir.findUnique({
      where: { id },
    });

    if (!parkir) {
      throw new NotFoundException(`Data parkir dengan ID ${id} tidak ditemukan`);
    }

    await this.prisma.parkir.delete({
      where: { id },
    });

    return {
      message: 'Data parkir berhasil dihapus',
    };
  } catch (error) {
    // Handle error enum tidak valid
    if (error.message && error.message.includes('not found in enum')) {
      throw new BadRequestException(
        `Data parkir dengan ID ${id} memiliki jenis kendaraan yang tidak valid. Silakan hubungi administrator.`
      );
    }
    
    // Re-throw error lain (seperti NotFoundException)
    throw error;
  }
}
}
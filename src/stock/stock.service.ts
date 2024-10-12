import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StockGetQueryDto } from './dto/stock-get-query.dto';

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService){}
  
  findAll() {
    return this.prisma.stock.findMany();
  }

  findGroupedMarks() {
    return this.prisma.stock.groupBy({
      by: 'mark',
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    })  
  }

  findModelsByMark(markName: string) {
    return this.prisma.stock.groupBy({
      by: 'model',
      where: {
        mark: markName,
      },
      orderBy: {
        model: 'desc'
      }
    })
  }

  findCarByFilters(markName: string, dto: StockGetQueryDto) {
    return this.prisma.stock.findMany({
      where: {
        mark: markName,
        ...(dto.filters && dto.filters.length > 0 && {
          model: {
            in: dto.filters
          }
        })
      }
    });
  }
}

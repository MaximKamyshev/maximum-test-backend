import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { StockService } from './stock.service';
import { ApiParam, ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { StockGetQueryDto } from './dto/stock-get-query.dto';

@ApiTags('Cars')
@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}
  
  @ApiOperation({ summary: "Returns all cars" })
  @Get('stocks')
  getAllStocks() {
    return this.stockService.findAll();
  }

  @ApiOperation({ summary: "Returns grouped car's  marks" })
  @Get('marks')
  getGroupedMarks() {
    return this.stockService.findGroupedMarks();
  }

  @ApiOperation({ summary: "Returns models of mark" })
  @ApiParam({ name: "mark", required: true, description: "Mark name" })
  @Get('models/:mark')
  getModels(@Param('mark') markName: string) {
    return this.stockService.findModelsByMark(markName)
  }

  @ApiOperation({ summary: "Returns filtred car's  marks" })
  @ApiParam({ name: "mark", required: true, description: "Mark name" })
  @ApiQuery({ name: 'filters', isArray: true })
  @Get('marks/:mark')
  @UsePipes(new ValidationPipe({ transform: true }))
  getMark(@Param('mark') markName: string, @Query() dto: StockGetQueryDto) {
    return this.stockService.findCarByFilters(markName, dto);
  }
}

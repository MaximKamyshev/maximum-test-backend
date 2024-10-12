import { IsArray, IsOptional } from "class-validator";

export class StockGetQueryDto {
  @IsArray()
  @IsOptional()
  filters?: string[]
}
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RequestMaintenanceDto {
  @ApiProperty({ example: 'Grand Plaza Hotel', description: 'Company or Building Name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ example: 'userName', description: 'Contact Person Name' })
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Contact Email Address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '1234567890', description: 'Contact Phone Number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'building Address', description: 'Building Address' })
  @IsString()
  @IsNotEmpty()
  buildingAddress: string;

  @ApiProperty({ example: 'Hotel', description: 'Building Type (hotel, apartment, office, hospital, etc.)' })
  @IsString()
  @IsNotEmpty()
  buildingType: string;

  @ApiProperty({ example: 4, description: 'Number of Elevators' })
  @Type(() => Number)
  @IsNumber()
  numberOfElevators: number;

  @ApiPropertyOptional({ example: 'Otis', description: 'Elevator Manufacturer (if known)' })
  @IsString()
  @IsOptional()
  elevatorManufacturer?: string;

  @ApiProperty({ example: 'Passenger Elevator', description: 'Elevator Type (passenger, freight, etc.)' })
  @IsString()
  @IsNotEmpty()
  elevatorType: string;

  @ApiPropertyOptional({ example: '10 years old', description: 'Approximate Age of the elevators' })
  @IsString()
  @IsOptional()
  approximateAge?: string;

  @ApiPropertyOptional({ example: 'Current Maintenance Provider', description: 'Current Maintenance Provider (if applicable)' })
  @IsString()
  @IsOptional()
  currentProvider?: string;

  @ApiPropertyOptional({ example: '2026-12-31', description: 'Current Contract Expiration Date' })
  @IsString()
  @IsOptional()
  contractExpirationDate?: string;

  @ApiPropertyOptional({ example: '2026-09-01', description: 'Desired Start Date' })
  @IsString()
  @IsOptional()
  desiredStartDate?: string;

  @ApiPropertyOptional({ example: 'Additional Notes or Concerns', description: 'Additional Notes or Concerns' })
  @IsString()
  @IsOptional()
  additionalNotes?: string;

  @ApiPropertyOptional({ example: ['https://cloudinary.com/doc1.pdf'], description: 'Attached document/photo URLs' })
  @IsArray()
  @IsOptional()
  documents?: string[];
}

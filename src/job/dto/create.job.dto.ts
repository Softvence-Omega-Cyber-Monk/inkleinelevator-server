import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsInt,
    IsArray,
    Min,
    IsOptional,
    IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateJobDto {
    @ApiProperty()
    @IsString()
    jobTitle: string;

    @ApiProperty()
    @IsString()
    jobType: string;

    @ApiProperty()
    @IsString()
    projectDescription: string;

    @ApiPropertyOptional({ type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch {
                return [value];
            }
        }
        return value;
    })
    technicalRequirementsAndCertifications?: string[];

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    elevatorType?: string;

    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    numberOfElevator?: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    capacity?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    speed?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    streetAddress?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    zipCode?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    estimatedBudget?: string;
}


export class updateJobDto {
    @ApiPropertyOptional({ example: 'New Job Title' })
    @IsOptional()
    @IsString()
    jobTitle?: string;

    @ApiPropertyOptional({ example: 'Installation' })
    @IsOptional()
    @IsString()
    jobType?: string;

    @ApiPropertyOptional({ example: 'Project description...' })
    @IsOptional()
    @IsString()
    projectDescription?: string;

    @ApiPropertyOptional({ example: ['Cert A', 'Cert B'] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch {
                return [value];
            }
        }
        return value;
    })
    technicalRequirementsAndCertifications?: string[];

    @ApiPropertyOptional({ example: 'Hydraulic' })
    @IsOptional()
    @IsString()
    elevatorType?: string;

    @ApiPropertyOptional({ example: 2 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    numberOfElevator?: number;

    @ApiPropertyOptional({ example: '1000kg' })
    @IsOptional()
    @IsString()
    capacity?: string;

    @ApiPropertyOptional({ example: '1.5 m/s' })
    @IsOptional()
    @IsString()
    speed?: string;

    @ApiPropertyOptional({ example: '123 Main St' })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiPropertyOptional({ example: 'Block A' })
    @IsOptional()
    @IsString()
    streetAddress?: string;

    @ApiPropertyOptional({ example: 'Dhaka' })
    @IsOptional()
    @IsString()
    city?: string;

    @ApiPropertyOptional({ example: '1205' })
    @IsOptional()
    @IsString()
    zipCode?: string;

    @ApiPropertyOptional({ example: '50000' })
    @IsOptional()
    @IsString()
    estimatedBudget?: string;
}
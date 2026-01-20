import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
    @ApiProperty()
    @IsString()
    reviewerId: string;
    @ApiProperty()
    @IsString()
    revieweeId: string;
    @ApiProperty()
    @IsString()
    jobId: string;
    @ApiProperty()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;
    @ApiProperty()
    @IsOptional()
    @IsString()
    comment?: string;
}

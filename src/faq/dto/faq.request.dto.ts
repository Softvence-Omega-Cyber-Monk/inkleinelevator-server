import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FaqBodyDto {
    @ApiProperty({
        example: 'How does this work?',
        description: 'FAQ question',
    })
    @IsString()
    @IsNotEmpty()
    question: string;

    @ApiProperty({
        example: 'You can post a job and receive bids.',
        description: 'FAQ answer',
    })
    @IsString()
    @IsNotEmpty()
    ans: string;
}

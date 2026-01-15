import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class createBid {
    @ApiProperty({
        example: "1234567890"
    })
    @IsNotEmpty()
    @IsString()
    jobId: string;

    @ApiProperty({
        example: "$2000-$3000"
    })
    @IsNotEmpty()
    @IsString()
    bidAmount: string;

    @ApiProperty({
        example: "01-01-2027"
    })
    @IsNotEmpty()
    @IsString()
    completionTimeline: string;


    @ApiProperty({
        example: "At this stage, we are unable to fully configure and test the billing system because we do not yet have proper access to your Apple App Store Connect and Google Play Console accounts. Once these accesses are provided, we will be able to correctly set up the payment flow, fix the issue where the system directly shows “payment failed,” and add a temporary paywall bypass for proper testing. After everything is completed and verified, we will guide you step by step through the final setup and testing process. I would also like to confirm that the system is using the free DeepSeek model via OpenRouter, as previously discussed. We are ready to proceed immediately once the remaining access requirements are fulfilled and look forward to completing the project smoothly."
    })
    @IsNotEmpty()
    @IsString()
    brefProposal: string
}


export class acceptJobBid {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "05df6f1e-881d-4ef6-a710-77866c6f387d"
    })
    jobId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: "f43242aa-5009-44e9-9698-d7287e2cf61c"
    })
    bidId: string
}
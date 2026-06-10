import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class ElevatorGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || user.role !== 'ELEVATOR') {
            throw new ForbiddenException('You do not have permission to access this route');
        }

        if (user.verifidStatus !== 'VERIFID') {
            throw new ForbiddenException('You are not verified. Please contact admin for verification');
        }

        return true;
    }
}
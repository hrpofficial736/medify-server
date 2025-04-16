import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split('Bearer ')[1];

      if (!token) {
        throw new UnauthorizedException('Token not found!');
      }

      const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET!);
      if (!decoded) throw new UnauthorizedException('Invalid Token!');
      request.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const RATE_LIMIT_KEY = 'rateLimit';
export const RateLimit = (maxRequests: number, windowMs: number) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(RATE_LIMIT_KEY, { maxRequests, windowMs }, descriptor.value);
    return descriptor;
  };
};

@Injectable()
export class RateLimitGuard implements CanActivate {
  private requests = new Map<string, { count: number; resetAt: number }>();

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const rateLimit = this.reflector.get<{ maxRequests: number; windowMs: number }>(
      RATE_LIMIT_KEY,
      context.getHandler(),
    );

    if (!rateLimit) {
      return true; // Sem rate limit configurado
    }

    const ip = request.ip || request.connection.remoteAddress;
    const key = `${ip}_${context.getClass().name}_${context.getHandler().name}`;
    const now = Date.now();

    const record = this.requests.get(key);

    if (!record || now > record.resetAt) {
      this.requests.set(key, {
        count: 1,
        resetAt: now + rateLimit.windowMs,
      });
      return true;
    }

    if (record.count >= rateLimit.maxRequests) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          message: 'Muitas requisições. Tente novamente mais tarde.',
          retryAfter: Math.ceil((record.resetAt - now) / 1000),
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    record.count++;
    return true;
  }
}


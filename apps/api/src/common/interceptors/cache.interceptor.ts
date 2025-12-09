import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

export const CACHE_TTL_KEY = 'cacheTtl';
export const CacheTTL = (ttl: number) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(CACHE_TTL_KEY, ttl, descriptor.value);
    return descriptor;
  };
};

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, { data: any; expiresAt: number }>();

  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = `${request.method}_${request.url}_${JSON.stringify(request.query)}_${JSON.stringify(request.body)}`;
    
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return of(cached.data);
    }

    const ttl = this.reflector.get<number>(CACHE_TTL_KEY, context.getHandler()) || 300000; // 5 minutos padrão

    return next.handle().pipe(
      tap((data) => {
        this.cache.set(cacheKey, {
          data,
          expiresAt: Date.now() + ttl,
        });
      }),
    );
  }
}


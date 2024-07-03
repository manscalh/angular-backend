import { createParamDecorator, Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

export const UserDecorator = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return true;
  }
}

@Injectable()
export class RouteGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const routes = this.reflector.get(Route, context.getHandler());

    if (!routes) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user) {
        if (user.user.profile.name === 'Administrador') { // TO DO: Erro de SINTAXE havia somente == não realizando a validação de usuário ADMIN
            return true;
        }

        var retorno = false;
        for (let index = 0; index < routes.length; index++) {
            const url = routes[index];
            var check = user.profileAccess.filter(a => a.menu.url == url);
            if (check.length > 0) {
                retorno = true;
                break;
            }
        }

        return retorno;
    }

    return true;
  }
}

export const Route = Reflector.createDecorator<string[]>();



// D:\tudulu\apps\api\src\auth\guards\admin.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Role } from "@prisma/client";

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException("Authentication required");
    }

    // Check if the user role is ADMIN or SUPER_ADMIN
    const privilegedRoles: Role[] = [Role.ADMIN, Role.SUPER_ADMIN, Role.EDITOR];

    if (!privilegedRoles.includes(user.role)) {
      throw new ForbiddenException(
        "Access denied: Administrative privileges required",
      );
    }

    return true;
  }
}

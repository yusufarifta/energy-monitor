import {inject, Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private _router: Router) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // @ts-ignore
    const activatedUser: string | null = localStorage.getItem("user");
    if (activatedUser) {
      return true;
    }
    await this._router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}

export const AuthGuard: CanActivateFn = async (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  return await inject(PermissionService).canActivate(next, state)
}

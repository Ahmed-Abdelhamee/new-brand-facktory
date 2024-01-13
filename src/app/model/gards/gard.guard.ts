import { CanActivateFn } from '@angular/router';

export const gardGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem("Admin")=="you is admin")
    return true;
  else  
    return false
};

import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Auth } from "../services/auth";
import { Router } from "@angular/router";

export const authgaurd:CanActivateFn = (route, state) => {
  const authservice=inject(Auth);
  const router=inject(Router);
  if(authservice.isloggedin()){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
}

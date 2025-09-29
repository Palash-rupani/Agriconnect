import { HttpInterceptorFn } from "@angular/common/http";

export const tokenHttp:HttpInterceptorFn = (req,next)=>{
  const token=localStorage.getItem('token');
  if(token){
    req=req.clone({
      setHeaders:{
        Authorization: token
      }
    });
  }
  return next(req);
}

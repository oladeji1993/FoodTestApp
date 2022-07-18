import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class IsLoggedIn {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    resolve(): void {
        if(this.authService.IsLoggedIn()){
            this.router.navigate(['product'])
        }
    }
}

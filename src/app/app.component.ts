import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private menu: MenuController,
    private router: Router,

  ) {}

  onMenuClick(){
    this.menu.close();
  }

  logOut(){
    this.menu.close();
    this.router.navigate(['login'])
    localStorage.removeItem('key')  
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
      this.menu.open('end');
  }

  openCustom() {
      this.menu.enable(true, 'custom');
      this.menu.open('custom');
  }
}

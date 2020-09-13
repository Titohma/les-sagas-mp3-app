import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Actualités',
      url: '/news',
      icon: 'newspaper'
    },
    {
      title: 'Liste des Sagas',
      url: '/sagas',
      icon: 'list'
    }
  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.authService.whoami();
    const split = window.location.pathname.split('/');
    const path = `${split[0]}/${split[1]}` ;
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.url === path);
    }
  }

  logout() {
    localStorage.setItem('jwt', null);
    this.authService.currentTokenValue = null;
    localStorage.setItem('user', null);
    this.authService.currentUserValue = null;
  }
}

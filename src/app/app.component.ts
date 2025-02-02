import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { FcmService } from './services/fcm/fcm.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
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
    private navCtrl: NavController,
    private fcmService: FcmService,
    public authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.fcmService.initPush();
    });
  }

  ngOnInit() {
    this.authService.whoami();
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/news');
  }
}

import { Component } from '@angular/core';
import { accountService } from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  accountUsername: string;
  constructor(
    private accountService: accountService
  ){}
  ngOnInit(){
    this.accountUsername = sessionStorage.getItem('username');
  }

  logout(){
    alert('Press"OK" to log out');
    sessionStorage.removeItem('username');
  }
}


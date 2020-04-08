import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/models/User';
import { Subscription } from 'rxjs';

@Component({
  selector: 'trisha-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  user: User;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) {
    this.authService.findme().subscribe(user => {
      this.user = user;
    });
    this.userSubscription = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}


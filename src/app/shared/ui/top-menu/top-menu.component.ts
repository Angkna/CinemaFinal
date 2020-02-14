import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  
  public isAuthenticated: boolean;
  private authentificatedSubsciption: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {    
    this.authentificatedSubsciption = this.userService.isAuthenticated$
    .subscribe((auth) => {
      this.isAuthenticated = auth;
    });
  }

  public doLougout():void {
    console.log('déconnection');
    this.userService.logout();
  }

  
}

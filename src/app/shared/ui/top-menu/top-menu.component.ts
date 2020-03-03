import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/core/models/user-interface';
import { TranslationService } from 'src/app/core/services/translation.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  
  public user: UserInterface;
  public languageSelected: string = 'fr';
  public languages: string[] = ['en', 'fr'];
  //private authentificatedSubsciption: Subscription;

  constructor(private userService: UserService, private translationService :TranslationService) { }

  ngOnInit(): void {    
    //this.authentificatedSubsciption = 
    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
    });
  }

  public doLogout():void {
    console.log('déconnection');
    this.userService.logout();
  }

  public switchLanguage(): void {
    console.log("need to change to " + this.languageSelected)
    this.translationService.switchTo(this.languageSelected);
  }


}

import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/core/models/user-interface';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: UserInterface;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
    });
  }

  public doEditUser(): void {
    this.router.navigate(['editUser', this.user.userName]);
  }

  public returnToHome(): void {
    this.router.navigate(['home']);
  }
}

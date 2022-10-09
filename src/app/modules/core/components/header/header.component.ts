import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/modules/login/services/login.service';

@Component({
  selector: 'mk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() count: number | undefined;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
  }

}

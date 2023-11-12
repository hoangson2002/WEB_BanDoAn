import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  gioiThieu(){
    this.router.navigate(['/gioithieu']);
  }

  lienHe(){
    this.router.navigate(['/lienhe']);
  }
}
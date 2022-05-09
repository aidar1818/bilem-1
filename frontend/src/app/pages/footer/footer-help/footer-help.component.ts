import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-help',
  templateUrl: './footer-help.component.html',
  styleUrls: ['./footer-help.component.css']
})
export class FooterHelpComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}

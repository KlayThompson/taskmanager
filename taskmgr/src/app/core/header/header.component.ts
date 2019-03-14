import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggle = new EventEmitter();
  @Output() dark = new EventEmitter<boolean>();
  constructor() {

  }

  ngOnInit() {
  }

  openSidebar() {
    this.toggle.emit();
  }

  onChange(dark: any) {
    console.log(dark.checked);
    this.dark.emit(dark.checked);
  }
}

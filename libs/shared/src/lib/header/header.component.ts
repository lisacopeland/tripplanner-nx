import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DEFAULT_AVATAR } from '@tripplanner-nx/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() menuOpen: boolean;
  @Output() menuToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  DEFAULT_AVATAR = DEFAULT_AVATAR;
  constructor() { }

  ngOnInit(): void {
  }

}

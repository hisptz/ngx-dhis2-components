import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-dictionary-menu',
  templateUrl: './dictionary-menu.component.html',
  styleUrls: ['./dictionary-menu.component.scss']
})
export class DictionaryMenuComponent implements OnInit {
  @Input() selectedItem: string;
  @Input() dictionaryList: any;
  searchingText: string;

  @Output() setActiveItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() removeItem: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  onSetActiveItem(e, dictionaryItemId) {
    e.stopPropagation();
    this.setActiveItem.emit(dictionaryItemId);
  }

  onRemoveItem(e, dictionaryItemId) {
    e.stopPropagation();
    this.removeItem.emit(dictionaryItemId);
  }

  onSearchItem(e) {
    e.stopPropagation();
    this.searchingText = e.target ? e.target.value : undefined;
  }
}

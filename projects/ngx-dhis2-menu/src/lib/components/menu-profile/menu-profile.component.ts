import { Component, Input, OnInit } from "@angular/core";
import { NgxDhis2HttpClientService } from "@iapps/ngx-dhis2-http-client";
import { User } from "@iapps/ngx-dhis2-http-client";
import { Observable } from "rxjs";
import * as _ from "lodash";

import { PROFILE_MENUS } from "../../constants/profile-menus";

@Component({
  selector: "app-menu-profile",
  templateUrl: "./menu-profile.component.html",
  styleUrls: ["./menu-profile.component.css"]
})
export class MenuProfileComponent implements OnInit {
  @Input()
  rootUrl: string;

  @Input()
  contextPath: string;

  @Input()
  backgroundColor: string;

  showProfile: boolean;
  currentUser$: Observable<User>;
  loadingUser: boolean;
  profileMenus: any[];
  constructor(private httpClient: NgxDhis2HttpClientService) {
    this.showProfile = false;
    this.rootUrl = this.contextPath = "../../../";
    this.profileMenus = PROFILE_MENUS;
    _.map(this.profileMenus, (menuItem: any, index: number) => {
      if (
        menuItem.defaultAction &&
        menuItem.defaultAction.indexOf("../") == -1 &&
        menuItem.defaultAction.indexOf("/") == 0
      ) {
        this.profileMenus[index].defaultAction =
          "../../.." + menuItem.defaultAction;
      }
    });
  }

  ngOnInit() {
    this.currentUser$ = this.httpClient.me();
  }

  showMenuProfile(e) {
    e.stopPropagation();
    this.showProfile = true;
  }

  hideMenuProfile(e?) {
    if (e) {
      e.stopPropagation();
    }

    this.showProfile = false;
  }
}

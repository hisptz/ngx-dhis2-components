import { Component, OnInit } from '@angular/core';
import {
  NgxDhis2HttpClientService,
  Manifest
} from '@iapps/ngx-dhis2-http-client';

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.scss']
})
export class HttpClientComponent implements OnInit {
  constructor(private httpClient: NgxDhis2HttpClientService) {}

  ngOnInit(): void {
    this.httpClient.manifest().subscribe((manifest: Manifest) => {
      console.log(manifest);
    });
    this.httpClient
      .get(
        'organisationUnits.json?fields=id,name,level,parent,path&order=level:asc&order=name:asc&filter=path:ilike:O6uvpzGd5pu&pageSize=100&page=1',
        {
          useIndexDb: true
        }
      )
      .subscribe(orgUnits => {
        console.log(orgUnits);
      });
  }
}

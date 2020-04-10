import { Component, OnInit } from '@angular/core';
import { SiteNavTags } from 'src/app/Components/constants/common-constants';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-sites',
  templateUrl: './admin-sites.component.html',
  styleUrls: ['./admin-sites.component.css']
})
export class AdminSitesComponent implements OnInit {
  highlight: Array<boolean> = [];
  public NavBarOptions = SiteNavTags;
  public Selected;

  constructor(private router:Router) {

    this.highlight.fill(false);
    this.Selected=this.NavBarOptions[0];
    this.router.navigate(['admin/sites/AssetManagement']);
  }

  ngOnInit() {
  }
  public highlightOption(i, options){
    this.highlight.fill(false);
    this.highlight[i]=!this.highlight[i]
    this.Selected = options;
  }
}

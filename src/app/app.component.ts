import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectTrackTrace';
  public header;
   highlight: Array<boolean> = [];
  public Selected;
   constructor() {
    this.highlight.fill(false);
  
  }
  public highlightOption(i, options){
    this.highlight.fill(false);
    this.highlight[i]=!this.highlight[i]
    this.Selected = options;
  }
   onClick=(event)=>{
    console.log( "event is "+event.currentTarget.id);
    this.header=event.currentTarget.id;
   }
}

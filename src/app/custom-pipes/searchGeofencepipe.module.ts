import {Pipe, PipeTransform, Injectable} from "@angular/core";

@Pipe({
  name: 'searchGeofence',
  pure: false
})
@Injectable()
export class SearchGeofencePipeModule implements PipeTransform {

  transform(items: any[], term: any): any[] {
      console.log(term);
    if (term === undefined) {
      return items;
    }
    return items.filter(function(item){
          return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
   }

}
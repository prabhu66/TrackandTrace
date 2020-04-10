import {Pipe, PipeTransform, Injectable} from "@angular/core";

@Pipe({
  name: 'searchAccount',
  pure: false
})
@Injectable()
export class SearchAccountPipeModule implements PipeTransform {

  transform(items: any[], term: any): any[] {
      console.log(term);
    if (term === undefined) {
      return items;
    }
    return items.filter(function(item){
          return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1||item.customer_name.toLowerCase().indexOf(term.toLowerCase()) > -1||item.status.toLowerCase().indexOf(term.toLowerCase()) > -1||item.start_date.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
   }

}
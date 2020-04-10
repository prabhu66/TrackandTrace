import {Pipe, PipeTransform, Injectable} from "@angular/core";

@Pipe({
  name: 'search',
  pure: false
})
@Injectable()
export class SearchPipeModule implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === undefined) {
      return items;
    }
    return  items.filter(item => 
      Object.keys(item).some(k => item[k] != null && 
      item[k].toString().toLowerCase()
      .includes(term.toLowerCase()))
      );
      
};

}
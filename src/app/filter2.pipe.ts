import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2'
})
export class Filter2Pipe implements PipeTransform {

  transform(groups: any, term12: string, term22: string, term32: any){
    // var intersection = []
          // if (access_filter) {
          //   intersection = access_filter.filter((n) => groups.access_list.includes(n));
          // }

      if (groups && groups.length){
          return groups.filter(group =>{
              if (term12 && group.group_name.toLowerCase().indexOf(term12.toLowerCase()) === -1){
                  return false;
              }
              if (term22 && group.group_description.toLowerCase().indexOf(term22.toLowerCase()) === -1){
                  return false;
              }

              // if (access_filter && group.access_list.indexOf(access_filter) === -1){
                //     return false;
                // }
                // debugger;
                // if (intersection.length == 0) {
                //     return false;
                // }

              // if (term5 && group.group_name.indexOf(term5) === -1){
              //     return false;
              // }
              return true;
         })
      }
      else{
          return groups;
      }
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any, term1: string, term2: string, term3: string, term4: string, term5: string){

      if (users && users.length){
          return users.filter(user =>{
              if (term1 && user.firstname.toLowerCase().indexOf(term1.toLowerCase()) === -1){
                  return false;
              }
              if (term2 && user.lastname.toLowerCase().indexOf(term2.toLowerCase()) === -1){
                  return false;
              }
              if (term3 && user.email.toLowerCase().indexOf(term3.toLowerCase()) === -1){
                  return false;
              }
              if (term4 && user.username.toLowerCase().indexOf(term4.toLowerCase()) === -1){
                  return false;
              }
              if (term5 && user.group_name.indexOf(term5) === -1){
                  return false;
              }
              return true;
         })
      }
      else{
          return users;
      }
  }

}

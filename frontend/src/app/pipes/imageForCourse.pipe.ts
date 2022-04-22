import { Pipe, PipeTransform } from '@angular/core';
import { environment as env } from '../../environments/environment';

@Pipe({
  name: 'imageForCourse'
})
export class ImageForCoursePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return env.apiUrl + '/uploads/' + value;
    }

    return './assets/icons/bilem.svg';
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'youTubeVideo'
})
export class YouTubeVideoPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: string | null): string {
    if (value) {
      return <string>this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${ value }`);
    }

    return '';
  }

}

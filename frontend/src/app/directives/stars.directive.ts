import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[starsRepeat]'
})
export class StarsDirective implements OnInit {
  @Input('starsRepeat') number!: number;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {
  }

  ngOnInit() {
    this.viewContainer.clear();
    for (let i = 0; i < this.number; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}

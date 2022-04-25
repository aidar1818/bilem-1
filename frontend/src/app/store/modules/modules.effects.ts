import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { createModuleFailure, createModuleRequest, createModuleSuccess } from './modules.actions';

@Injectable()
export class ModulesEffects {
  constructor(
    private actions: Actions,
    private courseService: CourseService,
    private router: Router,
    private helpers: HelpersService,
  ) {}

  createModule = createEffect(() => this.actions.pipe(
    ofType(createModuleRequest),
    mergeMap(({module, id}) => this.courseService.addModules(module, id).pipe(
      map(() => createModuleSuccess()),
      tap(() => {
        void this.router.navigate(['/teaching/courses']);
        this.helpers.openSnackbar('Содержимое успешно отредактировано');
      }),
      this.helpers.catchServerError(createModuleFailure),
    ))
  ))
}

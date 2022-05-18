import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StatisticsService } from '../../services/statistics.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { fetchStatisticsFailure, fetchStatisticsRequest, fetchStatisticsSuccess } from './statistics.actions';

@Injectable()
export class StatisticsEffects {

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private statisticsService: StatisticsService
  ) {}

  fetchStatistics = createEffect(() => this.actions.pipe(
    ofType(fetchStatisticsRequest),
    mergeMap(({userId}) => this.statisticsService.getStatistics(userId).pipe(
      map(statistics => fetchStatisticsSuccess({statistics})),
      catchError(() => of(fetchStatisticsFailure({error: 'Невозможно загрузить данные статистики!'})))
    ))
  ));
}

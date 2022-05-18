import { createAction, props } from '@ngrx/store';
import { Statistics } from '../../models/statistics.model';

export const fetchStatisticsRequest = createAction(
  '[Statistics] Fetch Request',
  props<{userId: string}>());
export const fetchStatisticsSuccess = createAction(
  '[Statistics] Fetch Success',
  props<{statistics: Statistics}>());
export const fetchStatisticsFailure = createAction(
  '[Statistics] Fetch Failure',
  props<{error: string}>());

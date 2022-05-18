import { StatisticsState } from '../types';
import { createReducer, on } from '@ngrx/store';
import { fetchStatisticsFailure, fetchStatisticsRequest, fetchStatisticsSuccess } from './statistics.actions';

const initialState: StatisticsState = {
  statistics: null,
  fetchLoading: false,
  fetchLoadingError: null,
};

export const statisticsReducer = createReducer(
  initialState,
  on(fetchStatisticsRequest, state => ({...state, fetchLoading: true})),
  on(fetchStatisticsSuccess, (state, {statistics}) => ({...state, fetchLoading: false, statistics})),
  on(fetchStatisticsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchLoadingError: error})),
);

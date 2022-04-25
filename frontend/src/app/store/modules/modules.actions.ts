import { createAction, props } from '@ngrx/store';
import { Module } from '../../models/module.model';

export const createModuleRequest = createAction(
  '[Module] Create Request',
  props<{module: Module, id: string}>()
);
export const createModuleSuccess = createAction(
  '[Module] Create Success'
);
export const createModuleFailure = createAction(
  '[Module] Create Failure',
  props<{error: string}>()
);


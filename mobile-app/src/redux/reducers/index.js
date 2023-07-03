import { combineReducers } from 'redux';
import { waterReducer as water } from './waterReducer';
import { nutritionReducer as nutrition } from './nutritionReducer';
import { registrationReducer as registration } from './registrationReducer';
import { notificationReducer as notification } from './notificationReducer';
import { settingReducer as setting } from './settingReducer';

export const rootReducer = combineReducers({
  water,
  nutrition,
  registration,
  notification,
  setting
});

import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import chatApp from './chat/reducer';
import surveyListApp from './surveyList/reducer';
import surveyDetailApp from './surveyDetail/reducer';
import category from './category/reducer'
import image from './image/reducer'
import productRedux from './product/reducer'
import orderRedux from './order/reducer'
import user from './user/reducer'
import postRedux from './post/reducer'
import partner from './partner/reducer'
const reducers = combineReducers({
  menu,
  settings,
  authUser,
  todoApp,
  chatApp,
  surveyListApp,
  surveyDetailApp,
  category,
  image,
  productRedux,
  orderRedux,
  user,
  postRedux,
  partner
});

export default reducers;
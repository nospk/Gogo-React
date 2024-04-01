import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import todoSagas from './todo/saga';
import chatSagas from './chat/saga';
import surveyListSagas from './surveyList/saga';
import surveyDetailSagas from './surveyDetail/saga';
import category from './category/saga'
import image from './image/saga'
import product from './product/saga'
import order from './order/saga';
import user from './user/saga'
import post from './post/saga'
import partner from './partner/saga'
export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    todoSagas(),
    chatSagas(),
    surveyListSagas(),
    surveyDetailSagas(),
    category(),
    image(),
    product(),
    order(),
    user(),
    post(),
    partner(),
  ]);
}

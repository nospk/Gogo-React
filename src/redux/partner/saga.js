import {all, call, fork, put, takeEvery} from "redux-saga/effects";

import {findAllError, findAllSuccess,saveSuccess,saveError,deleteByIdError,deleteByIdSuccess} from './actions';

import {PARTNER_CREATE, PARTNER_DELETE, PARTNER_FINDALL} from "../actions";
import PartnerService from "../../services/PartnerService";

function *findAll({payload}){
    const responses = yield call(PartnerService.findAll);

    if (responses.success){
       yield put(findAllSuccess(responses.data))
    }else {

    }

}
function *save({payload}){
    const responses = yield call(PartnerService.save,payload.params);
    if (responses.success){
        yield put(saveSuccess(responses));
    }else {

    }
}
function *deleteById({payload}){

}

function *watchFindAll(){
    yield takeEvery(PARTNER_FINDALL,findAll)
}
function *watchSave(){
    yield takeEvery(PARTNER_CREATE,save)
}
function *watchDeleteById(){
    yield takeEvery(PARTNER_DELETE,deleteById)
}
export default function* rootSaga() {
    yield all([
        fork(watchFindAll),
        fork(watchSave),
        fork(watchDeleteById),
    ]);
}

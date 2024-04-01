import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    POST_DELETE, POST_FINDALL
} from "../actions";
import PageService from "../../services/PageService";
import {findAllSuccess,findAllError,deleteByIdSuccess,deleteByIdError} from './actions'
function *findAll({payload}){
    const responses = yield call(PageService.findAll,payload.params)
    if (responses.success){
        yield put(findAllSuccess(responses.data))
    }else {
        yield put(findAllError("error loadding"));
    }
}
function *deleteById({payload}){
    const responses = yield call(PageService.deleteById,payload.params);
    if (responses.success){
        yield put(deleteByIdSuccess(payload.params))
    }else {
        yield put(deleteByIdError())
    }
}


function *watchFindAll(){
    yield takeEvery(POST_FINDALL,findAll)
}
function *watchDeleteById(){
    yield takeEvery(POST_DELETE,deleteById)
}
export default function* rootSaga() {
    yield all([
        fork(watchFindAll),
        fork(watchDeleteById),
    ]);
}

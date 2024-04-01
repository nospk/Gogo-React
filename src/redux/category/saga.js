import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {CATEGORY_CREATE, CATEGORY_DELETE, CATEGORY_FINDALL} from "../actions";
import {
    findAllSuccess,findAllError,
    createError,createSuccess,
    deleteByIdSuccess,deleteByIdError
} from './actions'
import CategoryService from "../../services/CategoryService";

function* findAll({payload}){
    const responses = yield call(CategoryService.findAll,payload)
    if (responses.success){
        yield put(findAllSuccess(responses.data))
    }else {
        yield put(findAllError(responses.message))
    }
}
function* create({payload}){
    const responses = yield call(CategoryService.create,payload);
    if (responses.success){
        yield put(createSuccess(responses.data,responses.method))
    }else {
        yield put(createError(responses.message))
    }
}
function*  deleteById({payload}){
    const responses = yield call(CategoryService.deleteById,payload.params);
    if (responses.success){
        yield put(deleteByIdSuccess(payload.params.id))
    }else {
        yield put(deleteByIdError(responses.message))
    }
}
export function* watchFindAll() {
    yield takeEvery(CATEGORY_FINDALL,findAll);
}
export function* watchCreate() {
    yield takeEvery(CATEGORY_CREATE,create);
}
export function* watchDelete() {
    yield takeEvery(CATEGORY_DELETE,deleteById);
}
export default function* rootSaga() {
    yield all([
        fork(watchFindAll),
        fork(watchCreate),
        fork(watchDelete)
    ]);
}

import {all, call, fork, put, takeEvery,takeLatest} from "redux-saga/effects";
import {
    findPickerSuccess,
    PRODUCT_CREATE_UPDATE,
    PRODUCT_DELETE,
    PRODUCT_FINDALL,
    PRODUCT_FINDBYID,
    PRODUCT_FINDPICKER, PRODUCT_SEARCHPICKER,
    PRODUCT_UPDATETOPFLAG,PRODUCT_UPDATETOPFLAG_ERROR, PRODUCT_UPDATETOPFLAG_SUCCESS,
    PRODUCT_UPDATEKEYWORD
} from "../actions";
import ProductService from "../../services/ProductService";
import {findByIdSuccess,
        findByIdError,
        createSuccess,
        createError,
        findAllSuccess,
        deleteByIdSuccess,
        updateFlagSuccess,updateFlagError,
        updateKeyWordSucess
} from './actions'

function *createUpdate({payload}){
    const responses = yield call(ProductService.create,payload.params)
    if (responses.success){
        if (payload.params.id===null){
            window.location.href="/admin/product/create/"+responses.id
        }else {
            yield put(createSuccess("success"))
        }

    }else {
        yield put(createError("error"))
    }
}
function *findAll({payload}){
    const responses = yield call(ProductService.findAll,payload.params);
    if (responses.success){
        yield put(findAllSuccess(responses.data))
    }else {

    }

}
function *findById({payload}){
    const responses = yield call(ProductService.findById,payload.params);
    if (responses.success){
        yield put(findByIdSuccess(responses.data))
    }
}
function *deleteById({payload}){
    const responses = yield call(ProductService.deleteById,payload.params);
    if (responses.success){
        yield put(deleteByIdSuccess(payload.params))
    }
}
function *updateProductKeyWord({payload}){
    const responses = yield call(ProductService.updateKeyWord,payload.params);
    if (responses.success){
        yield put(updateKeyWordSucess(payload.params))
    }
}
function *findPicker({payload}){
    const responses = yield call(ProductService.findForProductPicker,payload.params);
    if (responses.success){
        yield put(findPickerSuccess(responses.data))
    }
}

function *updateTopFlag({payload}) {
    const responses = yield call(ProductService.updateFlag,payload.params);
    if (responses.success) {
        yield put(updateFlagSuccess(payload.params));
    } else {
        yield put(updateFlagError());
    }
}

function *watchCreateUpdate(){
    yield takeEvery(PRODUCT_CREATE_UPDATE,createUpdate)
}
function *watchUpdateKeyWord(){
    yield takeEvery(PRODUCT_UPDATEKEYWORD,updateProductKeyWord)
}
function *watchFindAll(){
    yield takeEvery(PRODUCT_FINDALL,findAll)
}
function *watchFindById(){
    yield takeEvery(PRODUCT_FINDBYID,findById)
}
function *watchDeleteById(){
    yield takeEvery(PRODUCT_DELETE,deleteById)
}
function *watchFindPicker(){
    yield takeEvery(PRODUCT_FINDPICKER,findPicker)
}
function *watchSearchPicker(){
    yield takeLatest(PRODUCT_SEARCHPICKER,findPicker)
}
function *watchUpdateTopFlag() {
    yield takeEvery(PRODUCT_UPDATETOPFLAG,updateTopFlag)
}
export default function* rootSaga() {
    yield all([
        fork(watchCreateUpdate),
        fork(watchUpdateKeyWord),
        fork(watchFindAll),
        fork(watchFindById),
        fork(watchDeleteById),
        fork(watchFindPicker),
        fork(watchSearchPicker),
        fork(watchUpdateTopFlag),
    ]);
}

import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {IMAGE_DELETE, IMAGE_FINDALL, IMAGE_UPLOAD, IMAGE_ZIP_UPLOAD} from "../actions";
import {findAllSuccess,findAllError,uploadSuccess,uploadError,deleteByIdSuccess,deleteByIdError} from "./actions";
import ImageService from "../../services/ImageService";

function* findAll({payload}){
    const responses = yield call(ImageService.findAll,payload.params);
    if (responses.success){
        yield put(findAllSuccess(responses.data))
    }else {
        yield put(findAllError(responses.message))
    }
}
function* upload({payload}){
    const responses = yield call(ImageService.upload,payload.params)
    if (responses.success){
        yield put(uploadSuccess(responses.data))
    }else {
        yield put(uploadError(responses.message))
    }
}
function * uploadZip({payload}){
    const responses = yield call(ImageService.uploadZip,payload.params)
    console.log(responses);
}
function* deleteById({payload}){
    const responses = yield call(ImageService.deleteById,payload.params);
    if (responses.success){
        yield put(deleteByIdSuccess(payload))
    }else {
        yield put(deleteByIdError(""))
    }
}

function* watchUpload(){yield takeEvery(IMAGE_UPLOAD,upload)}
function* watchUploadZip(){yield takeEvery(IMAGE_ZIP_UPLOAD,uploadZip)}
function* watchFindAll(){yield takeEvery(IMAGE_FINDALL,findAll)}
function* watchDeleteById(){yield takeEvery(IMAGE_DELETE,deleteById)}

export default function* rootSaga() {
    yield all([
        fork(watchUpload),
        fork(watchUploadZip),
        fork(watchFindAll),
        fork(watchDeleteById)
    ]);
}
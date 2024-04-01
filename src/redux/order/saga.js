import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    addToTrashSuccess, mergeSuccess,
    ORDER_ADD_TO_TRASH,
    ORDER_CHANGE_STATUS, ORDER_COUNT_BY_STATUS, ORDER_DELETE,
    ORDER_FINDALL,
    ORDER_FINDALL_SUCCESS, ORDER_MERGE, ORDER_RESTORE
} from "../actions";
import {findAllError, findAllSuccess,changeStatusSuccess,deleteByIdSuccess,countByStatusSuccess} from './actions';
import OrderService from "../../services/OrderService";

function *findAll({payload}){
    const responses = yield call(OrderService.findAll,payload.params)
    if (responses.success){
        yield put(findAllSuccess(responses));

    }else {
        yield put(findAllError("error loadding"));
    }

}
function *changeStatus({payload}){
    const responses = yield call(OrderService.changeStatusIds,payload.params)
    console.log(responses);
    if (responses.success) {
        yield put(changeStatusSuccess(responses))
    }
}

function *merge({payload}){
    const responses = yield call(OrderService.merge,payload.params)
    if (responses.success) {
        window.location.reload();
        yield put(mergeSuccess(responses))
    }
}

function *addToTrash({payload}){
    const responses = yield call(OrderService.changeStatusIds,payload.params)
    if (responses.success) {
        yield put(addToTrashSuccess(payload.params))
    }
}
function *deleteByIds({payload}){
   const responses = yield call(OrderService.deleteByIds,payload.params);
   if (responses.success){
       yield put(deleteByIdSuccess(payload.params))
   }
}
function *countByStatus({payload}){
    const responses = yield call(OrderService.countByStatus,payload.params);
    if (responses.success){
        yield put(countByStatusSuccess(responses.data))
    }
}
function *restore({payload}){
    const responses = yield call(OrderService.actions,payload.params)
    if (responses.success){
        window.location.reload();
    }
}
function *watchFindAll(){
    yield takeEvery(ORDER_FINDALL,findAll)
}
function *watchChangeStatus(){
    yield takeEvery(ORDER_CHANGE_STATUS,changeStatus)
}
function *watchMerge(){
    yield takeEvery(ORDER_MERGE,merge)
}
function *watchAddToTrash(){
    yield takeEvery(ORDER_ADD_TO_TRASH,addToTrash)
}
function *watchDeleteByIds(){
    yield takeEvery(ORDER_DELETE,deleteByIds)
}
function *watchCountByStatus(status){
    yield takeEvery(ORDER_COUNT_BY_STATUS,countByStatus)
}
function *watchRestore(){
    yield takeEvery(ORDER_RESTORE,restore)
}
export default function* rootSaga() {
    yield all([
        fork(watchFindAll),
        fork(watchChangeStatus),
        fork(watchAddToTrash),
        fork(watchDeleteByIds),
        fork(watchCountByStatus),
        fork(watchRestore),
        fork(watchMerge)
    ]);
}

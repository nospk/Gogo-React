import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    ROLE_CREATE,
    ROLE_DELETE,
    ROLE_FINDALL,
    USER_CHANGE_ROLE, USER_CREATE,
    USER_DELETE,
    USER_FINDALL,
    USER_FINDONE
} from "../actions";
import UserService from "../../services/UserService";
import {findAllSuccess,findAllError,roleFindAllSuccess} from './actions'

function *findAllUser({payload}){
    const responses = yield call(UserService.findAll,payload.params)
    yield put(findAllSuccess(responses));

}
function *findOneUser({payload}){

}
function *createUser({payload}){

}
function *deleteUser({payload}){

}
function *changeRole({payload}){

}
function *findAllRole({payload}){
   const responses = yield call(UserService.findAllRole);
   yield put(roleFindAllSuccess(responses));
}
function *createRole({payload}){

}

function *deleteRole({payload}){

}



function *watchFindAllUser(){yield takeEvery(USER_FINDALL,findAllUser);}
function *watchFindOneUser(){yield takeEvery(USER_FINDONE,findOneUser);}
function *watchCreateUser(){yield takeEvery(USER_CREATE,createUser);}
function *watchDeleteUser(){yield takeEvery(USER_DELETE,deleteUser);}
function *watchChangeRole(){yield takeEvery(USER_CHANGE_ROLE,changeRole);}
function *watchFindAllRole(){yield takeEvery(ROLE_FINDALL,findAllRole);}
function *watchCreateRole(){yield takeEvery(ROLE_CREATE,createRole);}
function *watchDeleteRole(){yield takeEvery(ROLE_DELETE,deleteRole);}
export default function* rootSaga() {
    yield all([
        fork(watchFindAllUser),
        fork(watchFindOneUser),
        fork(watchCreateUser),
        fork(watchDeleteUser),
        fork(watchChangeRole),
        fork(watchFindAllRole),
        fork(watchCreateRole),
        fork(watchDeleteRole),

    ]);
}

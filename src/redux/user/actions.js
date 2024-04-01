import {
    ROLE_CREATE, ROLE_CREATE_ERROR, ROLE_CREATE_SUCCESS,
    ROLE_DELETE, ROLE_DELETE_ERROR, ROLE_DELETE_SUCCESS,
    ROLE_FINDALL, ROLE_FINDALL_ERROR, ROLE_FINDALL_SUCCESS,
    USER_CHANGE_ROLE, USER_CHANGE_ROLE_ERROR, USER_CHANGE_ROLE_SUCCESS,
    USER_CREATE, USER_CREATE_ERROR, USER_CREATE_SUCCESS, USER_DELETE, USER_DELETE_ERROR, USER_DELETE_SUCCESS,
    USER_FINDALL,
    USER_FINDALL_ERROR,
    USER_FINDALL_SUCCESS,
    USER_FINDONE,
    USER_FINDONE_ERROR,
    USER_FINDONE_SUCCESS
} from "../actions";

export const findAll = (params,history) => ({
    type: USER_FINDALL,
    payload: { params, history }
});
export const findAllSuccess = (params,history) => ({
    type: USER_FINDALL_SUCCESS,
    payload: { params, history }
});

export const findAllError = (params,history) => ({
    type: USER_FINDALL_ERROR,
    payload: { params, history }
});
export const findOne = (params,history) => ({
    type: USER_FINDONE,
    payload: { params, history }
});
export const findOneSuccess = (params,history) => ({
    type: USER_FINDONE_SUCCESS,
    payload: { params, history }
});

export const findOneError = (params,history) => ({
    type: USER_FINDONE_ERROR,
    payload: { params, history }
});
export const findCreate = (params,history) => ({
    type: USER_CREATE,
    payload: { params, history }
});
export const findCreateSuccess = (params,history) => ({
    type: USER_CREATE_SUCCESS,
    payload: { params, history }
});

export const findCreateError = (params,history) => ({
    type: USER_CREATE_ERROR,
    payload: { params, history }
});

export const deleteById = (params,history) => ({
    type: USER_DELETE,
    payload: { params, history }
});
export const deleteByIdSuccess = (params,history) => ({
    type: USER_DELETE_SUCCESS,
    payload: { params, history }
});

export const deleteByIdError = (params,history) => ({
    type: USER_DELETE_ERROR,
    payload: { params, history }
});
export const changeRole = (params,history) => ({
    type: USER_CHANGE_ROLE,
    payload: { params, history }
});
export const changeRoleSuccess = (params,history) => ({
    type: USER_CHANGE_ROLE_SUCCESS,
    payload: { params, history }
});

export const changeRoleError = (params,history) => ({
    type: USER_CHANGE_ROLE_ERROR,
    payload: { params, history }
});
export const roleFindAll = (params,history)=>({
    type: ROLE_FINDALL,
    payload: { params, history }
})
export const roleFindAllSuccess = (params,history)=>({
    type: ROLE_FINDALL_SUCCESS,
    payload: { params, history }
})
export const roleFindAllError = (params,history)=>({
    type: ROLE_FINDALL_ERROR,
    payload: { params, history }
})
export const roleDelete = (params,history)=>({
    type: ROLE_DELETE,
    payload: { params, history }
})
export const roleDeleteSuccess = (params,history)=>({
    type: ROLE_DELETE_SUCCESS,
    payload: { params, history }
})
export const roleDeleteError = (params,history)=>({
    type: ROLE_DELETE_ERROR,
    payload: { params, history }
})
export const roleCreate= (params,history)=>({
    type: ROLE_CREATE,
    payload: { params, history }
})
export const roleCreateSuccess = (params,history)=>({
    type: ROLE_CREATE_SUCCESS,
    payload: { params, history }
})
export const roleCreateError = (params,history)=>({
    type: ROLE_CREATE_ERROR,
    payload: { params, history }
})





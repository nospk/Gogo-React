import {
    ORDER_FINDALL,
    ORDER_FINDALL_SUCCESS,
    ORDER_FINDALL_ERROR,
    ORDER_CREATE,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_ERROR,
    ORDER_DELETE,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_ERROR,
    ORDER_CHANGE_STATUS,
    ORDER_CHANGE_STATUS_SUCCESS,
    ORDER_CHANGE_STATUS_ERROR,
    ORDER_ADD_TO_TRASH,
    ORDER_ADD_TO_TRASH_SUCCESS,
    ORDER_ADD_TO_TRASH_ERROR,
    ORDER_COUNT_BY_STATUS_ERROR,
    ORDER_COUNT_BY_STATUS,
    ORDER_COUNT_BY_STATUS_SUCCESS, ORDER_UPDATE_QUICKVIEW,
    ORDER_RESTORE, ORDER_RESTORE_SUCCESS, ORDER_RESTORE_ERROR, ORDER_MERGE, ORDER_MERGE_SUCCESS, ORDER_MERGE_ERROR
} from "../actions";

export const findAll = (params,history) => ({
    type: ORDER_FINDALL,
    payload: { params, history }
});
export const findAllSuccess = (params) => ({
    type: ORDER_FINDALL_SUCCESS,
    payload: params
});
export const findAllError = (params) => ({
    type: ORDER_FINDALL_ERROR,
    payload: params
});
export const create = (params,history) => ({
    type: ORDER_FINDALL,
    payload: { params, history }
});
export const createSuccess = (params,history) => ({
    type: ORDER_FINDALL_SUCCESS,
    payload: { params, history }
});
export const createError = (params,history) => ({
    type: ORDER_FINDALL_ERROR,
    payload: { params, history }
});
export const deleteById = (params,history) => ({
    type: ORDER_DELETE,
    payload: { params, history }
});
export const deleteByIdSuccess = (params,history) => ({
    type: ORDER_DELETE_SUCCESS,
    payload: { params, history }
});
export const deleteByIdError = (params,history) => ({
    type: ORDER_DELETE_ERROR,
    payload: { params, history }
});
export const changeStatus = (params,history) => ({
    type: ORDER_CHANGE_STATUS,
    payload: { params, history }
});
export const changeStatusSuccess = (params,history) => ({
    type: ORDER_CHANGE_STATUS_SUCCESS,
    payload: { params, history }
});
export const changeStatusError = (params,history) => ({
    type: ORDER_CHANGE_STATUS_ERROR,
    payload: { params, history }
});
export const merge = (params,history) => ({
    type: ORDER_MERGE,
    payload: { params, history }
});
export const mergeSuccess = (params,history) => ({
    type: ORDER_MERGE_SUCCESS,
    payload: { params, history }
});
export const mergeError = (params,history) => ({
    type: ORDER_MERGE_ERROR,
    payload: { params, history }
});
export const addToTrash = (params,history) => ({
    type: ORDER_ADD_TO_TRASH,
    payload: { params, history }
});
export const addToTrashSuccess = (params,history) => ({
    type: ORDER_ADD_TO_TRASH_SUCCESS,
    payload: { params, history }
});
export const addToTrashError = (params,history) => ({
    type: ORDER_ADD_TO_TRASH_ERROR,
    payload: { params, history }
});
export const restore = (params,history) => ({
    type: ORDER_RESTORE,
    payload: { params, history }
});
export const restoreSuccess = (params,history) => ({
    type: ORDER_RESTORE_SUCCESS,
    payload: { params, history }
});
export const restoreError = (params,history) => ({
    type: ORDER_RESTORE_ERROR,
    payload: { params, history }
});
export const countByStatus = (params,history) => ({
    type: ORDER_COUNT_BY_STATUS,
    payload: { params, history }
});
export const countByStatusSuccess = (params,history) => ({
    type: ORDER_COUNT_BY_STATUS_SUCCESS,
    payload: params
});
export const countByStatusError = (params,history) => ({
    type: ORDER_COUNT_BY_STATUS_ERROR,
    payload: { params, history }
});
export const updateQuickview = (params) => ({
    type: ORDER_UPDATE_QUICKVIEW,
    payload: params
});

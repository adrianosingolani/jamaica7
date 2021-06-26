import {
    RECORD_LOADING,
    RECORD_SUCCESS,
    RECORD_FAIL,
    RECORD_LIST_LOADING,
    RECORD_LIST_SUCCESS,
    RECORD_LIST_FAIL,
} from '../types';

const initialState = {
    loadingList: false,
    pagination: null,
    list: null,
    selected: {
        loading: false,
        data: null,
    },
};

export default function recordReducer(state = initialState, { type, payload }) {
    switch (type) {
        case RECORD_LIST_LOADING:
            return {
                ...state,
                loadingList: true,
            };
        case RECORD_LIST_SUCCESS:
            return {
                ...state,
                loadingList: false,
                pagination: payload.pagination,
                list: payload.records,
            };
        case RECORD_LIST_FAIL:
            return {
                ...state,
                loadingList: false,
                // pagination: null,
                // list: null,
            };
            case RECORD_LOADING:
                return {
                    ...state,
                    selected: {
                        loading: true,
                        data: null,
                    }
                };
        case RECORD_SUCCESS:
            return {
                ...state,
                selected: {
                    loading: false,
                    data: payload,
                }
            };
        case RECORD_FAIL:
            return {
                ...state,
                selected: {
                    loading: false,
                    data: null,
                }
            };
        default:
            return state;
    }
}
import {
    ALERT_SET,
    ALERT_SHOW,
    ALERT_HIDE,
    ALERT_RESET,
} from '../types';

const initialState = {
    show: false,
    text: null,
    severity: null,
};

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ALERT_SET:
            return {
                ...state,
                ...payload,
            };
        case ALERT_SHOW:
            return {
                ...state,
                show: true,
            };
        case ALERT_HIDE:
            return {
                ...state,
                show: false,
            };
        case ALERT_RESET:
            return {
                show: false,
                text: null,
                severity: null,
            };
        default:
            return state;
    }
}
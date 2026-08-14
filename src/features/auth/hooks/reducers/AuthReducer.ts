import { AuthState } from '../../validations/auth.validation';

export type AuthAction =
    | {
          type: 'LOGIN_START';
      }
    | {
          type: 'LOGIN_SUCCESS';
          payload: {
              email: string;
              accessToken: string;
              refreshToken: string;
          };
      }
    | {
          type: 'LOGIN_FAILURE';
          payload: string;
      }
    | {
          type: 'LOGOUT';
      };

export const initialAuthState: AuthState = {
    email: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export function authReducer(state: AuthState, action: AuthAction) {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                email: action.payload.email,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                isLoading: false,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
}

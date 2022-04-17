import { createAction, props } from '@ngrx/store';
import { CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';

export const loginAction = createAction(
    'Auth: Log In',
    props<{ payload: { email: string; password: string}}>()
)
export const setUserAction = createAction(
    'Auth: Set User',
    props<{ payload: { email: string } }>()
)
export const signupUserAction = createAction(
    'Auth: Signup User',
    props<{ payload: { email: string; password: string } }>()
);
export const userSignedupAction = createAction(
    'Auth: User Signed Up',
    props<{ payload: { email: string } }>()
);
export const logOutUserAction = createAction(
    'Auth: Log Out',
    props<{ payload: {} }>()
);
export const userLoggedOutAction = createAction(
    'Auth: User Logged Out',
    props<{ payload: { } }>()
);

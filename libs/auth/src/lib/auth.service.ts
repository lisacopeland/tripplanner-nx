import { Inject, Injectable } from '@angular/core';
import { COGNITO_USER_POOL_ID, COGNITO_APP_CLIENT_ID } from '@tripplanner-nx/common';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(@Inject(COGNITO_USER_POOL_ID) public cognitoUserPoolId: string,
        @Inject(COGNITO_APP_CLIENT_ID) public cognitoAppClientId: string,) { }

    signIn(email: string, password: string) {
        const authenticationDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });
        const poolData = {
            UserPoolId: this.cognitoUserPoolId, // Your user pool id here
            ClientId: this.cognitoAppClientId // Your client id here
        };

        const userPool = new CognitoUserPool(poolData);
        const userData = { Username: email, Pool: userPool };
        const cognitoUser = new CognitoUser(userData);
        return new Observable<{ type: string, result: any }>(obs => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result: any) => {
                    // TODO: Get the JWT for this user to pass with http calls
                    obs.next({ type: 'success', result: result });
                    obs.complete();
                },
                onFailure: (error: any) => obs.error(error),
                newPasswordRequired: (userAttributes, requiredAttributes) => {
                    obs.next({ type: 'newPasswordRequired', result: [userAttributes, requiredAttributes] });
                    obs.complete();
                }
            });
        });
    }

    signUp(email: string, password: string) {
        const poolData = {
            UserPoolId: this.cognitoUserPoolId, // Your user pool id here
            ClientId: this.cognitoAppClientId // Your client id here
        };
        const userPool = new CognitoUserPool(poolData);
        return new Observable<{ type: string, result: any }>(obs => {
            userPool.signUp(email, password, [], [], (
                err,
                result
            ) => {
                if (err) {
                    obs.error(err);
                }
                obs.next({ type: 'success', result: result });
            });
        });
    }

    confirmSignUp(email: string, confirmationCode: string) {
        const poolData = {
            UserPoolId: this.cognitoUserPoolId, // Your user pool id here
            ClientId: this.cognitoAppClientId // Your client id here
        };

        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: email,
            Pool: userPool
        }
        const cognitoUser = new CognitoUser(userData);
        return new Observable<{ type: string, result: any }>(obs => {
            cognitoUser.confirmRegistration(confirmationCode, true, (
                err,
                result
            ) => {
                if (err) {
                    obs.error(err);
                }
                obs.next({ type: 'success', result: result });
            });
        });
    }    

    resendConfirmationCode(email: string) {
        const poolData = {
            UserPoolId: this.cognitoUserPoolId, // Your user pool id here
            ClientId: this.cognitoAppClientId // Your client id here
        };

        const userPool = new CognitoUserPool(poolData);
        const userData = {
            Username: email,
            Pool: userPool
        }
        const cognitoUser = new CognitoUser(userData);
        return new Observable<{ type: string, result: any }>(obs => {
            cognitoUser.resendConfirmationCode((
                err,
                result
            ) => {
                if (err) {
                    obs.error(err);
                }
                obs.next({ type: 'success', result: result });
            });
        });
    }   

    signOut() {
        const poolData = {
            UserPoolId: this.cognitoUserPoolId,
            ClientId: this.cognitoAppClientId
        };
        const userPool = new CognitoUserPool(poolData);
        const cognitoUser = userPool.getCurrentUser();
        return new Observable<{ type: string, result: any }>(obs => {
            cognitoUser.signOut(() => {
                obs.next({ type: 'success', result: '' });
            });
        });
    }

    isLoggedIn(): boolean {
        let isAuth = false;

        const poolData = {
            UserPoolId: this.cognitoUserPoolId,
            ClientId: this.cognitoAppClientId
        };

        const userPool = new CognitoUserPool(poolData);
        const cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession((err: any, session: any) => {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                }
                isAuth = session.isValid();
            })
        }
        return isAuth;
    }
}
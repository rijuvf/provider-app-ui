import axios from 'axios';
import * as msal from '@azure/msal-browser';
import { msalConfig, loginRequest } from './authConfig';

const myMSALObj = new msal.PublicClientApplication(msalConfig);
let userName = '';

const buildUserModel = response => {
  // eslint-disable-next-line no-console
  console.log(`jj=${JSON.stringify(response)}`);
  const {
    account: { username, name },
    idToken: { expiration },
    accessToken,
  } = response;
  userName = username;
  // eslint-disable-next-line no-console
  console.log(userName);
  return {
    email: userName,
    name,
    token: accessToken,
    expiration,
  };
};

const username = '';

const interactionErrorCodes = [
  'consent_required',
  'interaction_required',
  'login_required',
  'user_login_error',
];

// eslint-disable-next-line no-unused-vars
const requiresInteraction = errorCode => {
  if (!errorCode || !errorCode.length) {
    return false;
  }

  return interactionErrorCodes.some(code => code === errorCode);
};

const init = () => {
  const login = () =>
    myMSALObj
      .loginPopup(loginRequest)
      .then(response => buildUserModel(response))
      .catch(error => {
        console.error(error);
      });

  const getUserSilent = () => {
    loginRequest.account = myMSALObj.getAccountByUsername(userName);
    return (
      myMSALObj
        .acquireTokenSilent(loginRequest)
        .then(response => buildUserModel(response))
        // eslint-disable-next-line consistent-return
        .catch(async error => {
          console.warn(
            'silent token acquisition fails. acquiring token using redirect'
          );
          if (error instanceof msal.InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails
            try {
              const tokenResponse = await myMSALObj.acquireTokenPopup(
                loginRequest
              );
              // console.log(tokenResponse);
              return tokenResponse;
              // eslint-disable-next-line camelcase
            } catch (error_1) {
              console.error(error_1);
            }
          } else {
            console.warn(error);
          }
        })
    );
  };

  const logout = () => {
    const logoutRequest = {
      account: myMSALObj.getAccountByUsername(userName),
      postLogoutRedirectUri: msalConfig.auth.postLogoutRedirectUri,
    };
    myMSALObj.logout(logoutRequest);
  };

  const authorize = async email => {
    const response = await axios.get('apim/onboarding/members', {
      params: {
        email,
      },
    });
    console.log('isOnboarded in login service');
    return response;
  };

  const getTokenPopup = request => {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */
    request.account = myMSALObj.getAccountByUsername(username);
    // eslint-disable-next-line consistent-return
    return myMSALObj.acquireTokenSilent(request).catch(error => {
      console.warn(
        'silent token acquisition fails. acquiring token using redirect'
      );
      if (error instanceof msal.InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        return (
          myMSALObj
            .acquireTokenPopup(request)
            .then(tokenResponse => {
              // console.log(tokenResponse);
              return tokenResponse;
            })
            // eslint-disable-next-line no-shadow
            .catch(error => {
              console.error(error);
            })
        );
      }
      // eslint-disable-next-line no-console
      console.warn(error);
    });
  };

  return {
    login,
    logout,
    getUserSilent,
    authorize,
    getTokenPopup,
  };
};

export default init();

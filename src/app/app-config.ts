import { Configuration } from 'msal';
import { MsalAngularConfiguration } from '@azure/msal-angular';

// this checks if the app is running on IE
export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
const isInternetExplorerOrEdge = window.navigator.userAgent.indexOf('MSIE') > -1
                              || window.navigator.userAgent.indexOf('Trident/') > -1
                              || window.navigator.userAgent.indexOf('Edge') > -1;

/** =================== REGIONS ====================
 * 1) B2C policies and user flows
 * 2) Web API configuration parameters
 * 3) Authentication configuration parameters
 * 4) MSAL-Angular specific configuration parameters
 * =================================================
 */

// #region 1) B2C policies and user flows
/**
 * Enter here the user flows and custom policies for your B2C application,
 * To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: "b2c_1_susi",
        resetPassword: "b2c_1_reset",
        editProfile: "b2c_1_edit_profile"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://writerofcodesso.b2clogin.com/writerofcodesso.onmicrosoft.com/b2c_1_susi"
        },
        resetPassword: {
            authority: "https://writerofcodesso.b2clogin.com/writerofcodesso.onmicrosoft.com/b2c_1_reset"
        },
        editProfile: {
            authority: "https://writerofcodesso.b2clogin.com/writerofcodesso.onmicrosoft.com/b2c_1_edit_profile"
        }
    }
};
// #endregion


// #region 2) Web API Configuration
/**
 * Enter here the coordinates of your Web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
export const apiConfig: {b2cScopes: string[], webApi: string} = {
    b2cScopes: ['https://writerofcodesso.onmicrosoft.com/'],
    webApi: 'https://mylearningstrategywebapi.azurewebsites.net'
};
// #endregion

// #region 3) Authentication Configuration
/**
 * Config object to be passed to Msal on creation. For a full list of msal.js configuration parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_configuration_.html
 * "https://mylearningstrategy.com"
 *  clientId: '7bfdbe19-c087-4726-a703-dd6322aa4093',
 *         clientId: '7d635d00-5816-43fd-98fe-5ce673e2f322',
 *      authority: b2cPolicies.authorities.signUpSignIn.authority,
 *       redirectUri: "https://mylearningstrategy.com",
 *       postLogoutRedirectUri: "https://mylearningstrategy.com",
 */
export const msalConfig: Configuration = {
    auth: {
        clientId: '7d635d00-5816-43fd-98fe-5ce673e2f322',
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        redirectUri: "https://localhost:4200",
        postLogoutRedirectUri: "https://localhost:4200",
        navigateToLoginRequestUrl: true,
        validateAuthority: false,
      },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false, // Set this to "true" to save cache in cookies to address trusted zones limitations in IE
    },
    framework: {
      isAngular: true
    }
};

/**
 * Scopes you enter here will be consented once you authenticate. For a full list of available authentication parameters,
 * visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
 */
export const loginRequest: {scopes: string[]} = {
    scopes: ['openid', 'profile'],
};

// Scopes you enter will be used for the access token request for your web API
export const tokenRequest: {scopes: string[]} = {
    scopes: apiConfig.b2cScopes // i.e. [https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read]
};
// #endregion

// #region 4) MSAL-Angular Configuration
// here you can define the coordinates and required permissions for your protected resources
export const protectedResourceMap2: [string, string[]][] = [
    [apiConfig.webApi, apiConfig.b2cScopes] // i.e. [https://fabrikamb2chello.azurewebsites.net/hello, ['https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read']]
];
export const protectedResourceMap: [string, string[]][] =
 [
   ['https://graph.microsoft.com/v1.0/me', ['profile', 'openid', 'email']]
];

/**
 * MSAL-Angular specific authentication parameters. For a full list of available options,
 * visit https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-angular#config-options-for-msal-initialization
 * ...tokenRequest.scopes,
 */
export const msalAngularConfig2: MsalAngularConfiguration = {
    popUp: true,
    consentScopes: [
        ...loginRequest.scopes,
        ...tokenRequest.scopes,
    ],
    unprotectedResources: [], // API calls to these coordinates will NOT activate MSALGuard
    protectedResourceMap,     // API calls to these coordinates will activate MSALGuard
    extraQueryParameters: {}
};
// #endregion
export const msalAngularConfig: MsalAngularConfiguration = {

    popUp: !isIE,
    consentScopes:  ['profile', 'openid', 'email'],
    unprotectedResources: ['https://www.microsoft.com/en-us/'],
    protectedResourceMap,
    extraQueryParameters: {}
};

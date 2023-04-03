import _ from "lodash";
import { generateJWTToken } from "../../../configs/jwt";
import { logger } from "../../../configs/logs";

import { userService, accessTokenService } from "../../../services";

/**
 * @description Login user by provider (e.g. Google, Facebook)
 * @function loginUserByProviderController
 */
async function loginUserByProviderController(httpRequest: Request & { context: { user: Express.User } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const user = _.get(httpRequest, "context.user");
    const email = _.get(user, "email") as unknown as string;
    const user_exists = await userService.findByEmail({ email });
    if (!user_exists) {
      throw new Error(`User by ${email} does not exists.`);
    }

    const user_id = _.get(user_exists, "_id");
    let login_token = await accessTokenService.findValidToken({ user_id });
    if (!login_token) {
      logger.verbose(`User has no valid token, creating one now...`);
      login_token = generateJWTToken({ user_id, user_type: user_exists.type }, { expiresIn: "1y" });
      await accessTokenService.insert({
        user_id: user_id,
        token: login_token,
      });
    }

    const data = { access_token: login_token, user: user_exists };
    const data_string = JSON.stringify(data);
    return {
      headers,
      statusCode: 200,
      body: `
        <html>
          <head>
            <script type="text/javascript" nonce="VGhpJGlTS2luMGJJ">
              //close popup window and refresh the parent window
              function CloseAndRefresh() {
                if (window.opener) {
                    // Communicate with parent window when popup window is opened
                    window.opener.postMessage(${data_string}, '${process.env.FRONTEND_URL}');
                    window.opener.postMessage(${data_string}, 'https://reshuffle-frontend.vercel.app');
                    window.close();
                  }else if(window.ReactNativeWebView){
                    // To close webview in native app
                    window.ReactNativeWebView.postMessage('${login_token}', '*');
                  }else{
                    // For linkedin app that uses same window to do authentication
                    window.open(
                      '${process.env.FRONTEND_URL}/login?t=${login_token}',
                      '_self'
                    );
                  }
              }
            </script>
            <style>
            body{
              text-align:center;
            }
            </style> 
          </head>
          <body onload="CloseAndRefresh();">
            If you are encountering issues in Linkedin or other in-app browsers, please use a browser such as Safari or Chrome instead. Thank you!
            <br/>
            <a href="${process.env.FRONTEND_URL}">Return back home</a>
          </body>
        </html>`,
    };
  } catch (err: any) {
    return {
      headers,
      statusCode: 404,
      body: {
        errors: err.message,
      },
    };
  }
}

export default loginUserByProviderController;

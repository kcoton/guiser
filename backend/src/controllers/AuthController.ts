import { Request, Response } from "express";
import * as AuthService from "../services/AuthService";
import axios from "axios";
import User, { IUser } from "../models/User";
import { IAuthToken } from "../models/AuthToken";
import { addSeconds } from "date-fns";
import QueryString from "qs";

const THREADS_TYPE = "Threads";

export async function loginGoogleUser(req: Request, res: Response) {
  // Verify CSRF safe
  const cookieToken = req.cookies.g_csrf_token;
  const bodyToken = req.body.g_csrf_token;
  // TODO: Restore commented out code later
  // if (!(cookieToken && bodyToken && cookieToken === bodyToken)) {
  //   res.status(403).json({ error: "CSRF token validation failed" });
  //   return;
  // }
  // Parse/validate then interpret by redirect into joint session with client
  try {
    const user = await AuthService.parseGoogleID(req.body.credential);
    const baseURL = process.env.BASEURL_FRONT;
    const uid = user?.externalId as string;
    if (!uid) throw new Error("");
    const qstr = "?uid=" + encodeURIComponent(uid);
    const pageURL = baseURL + "/login";
    res.redirect(pageURL + qstr);
  } catch (error) {
    res.status(500).json({ error: `Internal server error` });
  }
}

export async function authorizeThreadsUser(req: Request, res: Response) {
  const baseURL = process.env.BASEURL_FRONT;
  const pageURL = baseURL + "/resolver?dest=" + encodeURIComponent("/personas");

  if (req.query.error) {
    console.error("Threads auth failed.");
    res.redirect(pageURL);
    return;
  } else {
    const code = req.query.code;
    const pid = (req.query.state as string);

    // exchange oauth code for short term token
    var url = process.env.THREADS_GRAPH_API_BASE_URL as string;
    url += "/oauth/access_token";
    var qstr = new URLSearchParams({
      client_id: process.env.THREADS_APP_ID,
      client_secret: process.env.THREADS_SECRET,
      grant_type: "authorization_code",
      redirect_uri: process.env.THREADS_REDIRECT_URI,
      code,
    } as any).toString();
    try {
      var response = await axios.post(url, qstr, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      var token = response.data.access_token as string;

      // exchange short term token for long term
      url = process.env.THREADS_GRAPH_API_BASE_URL as string;
      url += "/access_token";
      qstr = new URLSearchParams({
        client_secret: process.env.THREADS_SECRET,
        grant_type: "th_exchange_token",
        access_token: token,
      } as any).toString();
      response = await axios.get(url + "?" + qstr);
      token = response.data.access_token as string;
      const expires = 0 + response.data.expires_in;

      // DB interaction
      const wrappedToken = await wrapPlatformToken(
        THREADS_TYPE,
        token,
        expires
      );
      const linked = linkPlatform(pid, wrappedToken);
      if (!linked) {
        console.error("could not link to Threads");
      }
      // Done w/ DB

      const pageURL =
        baseURL + "/resolver?dest=" + encodeURIComponent("/personas");
      res.redirect(pageURL);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
}

export async function authorizeLinkedInUser(req: Request, res: Response) {
  try {
    const baseURL = process.env.BASEURL_FRONT;
    const pageURL = baseURL + "/resolver?dest=" + encodeURIComponent("/personas");

    if (req.query.error) {
      console.error("LinkedIn auth failed.");
      res.redirect(pageURL);
      return;
    }

    const code = (req.query.code as string);
    const pid = (req.query.state as string);

    const response = await getLinkedInToken(res, code);
    if (!response) {
      return;
    }

    const token = response.data.access_token as string;
    const expires_in = response.data.expires_in as number;

    const wrappedToken = await wrapPlatformToken(
      "LinkedIn",
      token,
      expires_in
    );
    
    const linked = linkPlatform(pid, wrappedToken);
    if (!linked) {
      console.error("could not link to LinkedIn");
    }

    res.redirect(pageURL);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function getTwitterAuthCode(req: Request, res: Response) {
  const state = req.query.state as string;

  const url =
    "https://twitter.com/i/oauth2/authorize?response_type=code&client_id=" +
    process.env.TWITTER_CLIENT_ID +
    "&redirect_uri=" +
    process.env.TWITTER_REDIRECT_URI +
    "&scope=tweet.read%20tweet.write%20users.read&state=" +
    encodeURIComponent(state) +
    "&code_challenge=challenge&code_challenge_method=plain";

  res.redirect(url);
}

export async function processTwitterAuthCode(req: Request, res: Response) {
  const authCode = req.query.code as string;
  const state = req.query.state as string;
  const [externalId, pid] = state.split(":");

  console.log("AuthCode: " + authCode);
  console.log("ExternalId: " + externalId);
  console.log("PersonaId: " + pid);

  const url = `https://api.twitter.com/2/oauth2/token?grant_type=authorization_code&client_id=${process.env.TWITTER_CLIENT_ID}&redirect_uri=${process.env.TWITTER_REDIRECT_URI}&code=${authCode}&code_verifier=challenge`;

  const basicSecret = Buffer.from(
    `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_SECRET}`
  ).toString("base64");
  console.log("BasicAuth: " + basicSecret);
  console.log(url);
  const headers = {
    Authorization: `Basic ${basicSecret}`,
  };

  try {
    const response = await axios.post(url, null, { headers: headers });

    console.log("Response: ", JSON.stringify(response.data, null, 2));

    const token = response.data.access_token as string;
    console.log("Token: " + token);
    const expires = 0 + response.data.expires_in;
    console.log("Expires: " + expires);

    // Fetch t// DB interaction
    const newAuthToken = await wrapPlatformToken("Twitter", token, expires);
    const linked = await linkPlatform(pid, newAuthToken);
    if (!linked) {
      console.error("Could not link to Twitter");
      res.status(500).json({ errors: ["Failed to link Twitter token"] });
      return;
    }

    //Done
    const baseURL = process.env.BASEURL_FRONT;
    const pageURL =
        baseURL + "/resolver?dest=" + encodeURIComponent("/personas");
    res.redirect(pageURL);

  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["Failed to process Twitter auth code"] });
  }
}

const wrapPlatformToken = async (
  platform: string,
  access_token: string,
  expires_in: number
) => {
  const currentDatetime: Date = new Date();
  const date = addSeconds(currentDatetime, expires_in);
  const token: IAuthToken = {
    platform: platform,
    token: access_token,
    expiry: date,
  } as IAuthToken;
  return token;
};

const linkPlatform = async (pid: string, token: IAuthToken) => {
  const user: IUser | null = await User.findOne({ "personas._id": pid });
  if (!user) return null;

  const persona: any = user.personas.find((p) => p._id == pid && !p.deleted);

  const matchingPlatformTokenIndex = persona.authTokens.findIndex(
    (tok: IAuthToken) => tok.platform === token.platform
  );

  if (matchingPlatformTokenIndex > -1) {
    persona.authTokens[matchingPlatformTokenIndex] = token;
  } else {
    persona.authTokens.push(token);
  }

  await user.save();
  return persona.authTokens[
    matchingPlatformTokenIndex > -1
      ? matchingPlatformTokenIndex
      : persona.authTokens.length - 1
  ];
};

const getLinkedInToken = async (res: Response, code: string) => {
  try {
    return await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      QueryString.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.LINKED_IN_REDIRECT_URI,
        client_id: process.env.LINKED_IN_CLIENT_ID,
        client_secret: process.env.LINKED_IN_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (err) {
    res
      .status(500)
      .json({ errors: ["failed to resolve OAuth code to token"] });
    return;
  }
}

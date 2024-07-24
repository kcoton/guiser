import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import { IPersona } from "../models/Persona";
import mongoose from "mongoose";
import { IContent } from "../models/Content";
import { validationResult, matchedData } from "express-validator";
import { IAuthToken } from "../models/AuthToken";
import axios from "axios";
import QueryString from "qs";
import { addSeconds } from "date-fns";

export default class UserController {
  public getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const reqData: Record<string, any> = matchedData(req);

      const user: IUser | null = await User.findOne({
        externalId: reqData.externalId,
      })
        .lean()
        .exec();

      if (!user) {
        res
          .status(404)
          .json({ errors: ["user with matching externalId not found"] });
        return;
      }

      res.status(200).json({ result: user });
    } catch (error) {
      this.handleGeneralError(res, error);
    }
  };

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const reqData: Record<string, any> = matchedData(req);

      const user: IUser = (
        await User.create({ externalId: reqData.externalId })
      ).toJSON();
      res.status(200).json({ result: user });
    } catch (error) {
      if ((error as any)?.code === 11000) {
        res
          .status(409)
          .json({ errors: ["user with externalId already exists"] });
      } else {
        this.handleGeneralError(res, error);
      }
    }
  };

  public getPersonas = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      const reqData: Record<string, any> = matchedData(req);
      const user: IUser | null = await User.findOne({
        externalId: reqData.externalId,
      })
        .lean()
        .exec();

      if (!user) {
        res
          .status(404)
          .json({ errors: ["user with matching externalId not found"] });
        return;
      }
      const personas: IPersona[] = user.personas.filter((p) => !p.deleted);
      res.status(200).json({ result: personas });
    } catch (error) {
      this.handleGeneralError(res, error);
    }
  };

  public createPersona = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const reqData: Record<string, any> = matchedData(req);

      const user: IUser | null = await this.findUserById(reqData.userId, res);
      if (!user) {
        return;
      }

      let newPersona: IPersona = {
        name: reqData.name,
        text: reqData.text,
      } as IPersona;
      user.personas.push(newPersona);
      await user.save();
      newPersona = user.personas[user.personas.length - 1].toJSON();
      res.status(201).json({ result: newPersona });
    } catch (error) {
      this.handleGeneralError(res, error);
    }
  };

  public updatePersona = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const reqData: Record<string, any> = matchedData(req);

      const user = await this.findUserById(reqData.userId, res);
      if (!user) {
        return;
      }

      const persona: IPersona | null = this.findPersonaById(
        reqData.personaId,
        user.personas,
        res
      );
      if (!persona) {
        return;
      }

      if (reqData.name) {
        persona.name = reqData.name;
      }
      if (reqData.text) {
        persona.text = reqData.text;
      }

      await user.save();
      res.status(200).json({ result: persona });
    } catch (error) {
      this.handleGeneralError(res, error);
    }
  };

  public deletePersona = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const reqData: Record<string, any> = matchedData(req);

      const user: IUser | null = await this.findUserById(reqData.userId, res);
      if (!user) {
        return;
      }

      const persona: IPersona | null = this.findPersonaById(
        reqData.personaId,
        user.personas,
        res
      );
      if (!persona) {
        return;
      }

      persona.delete();
      await user.save();
      res.status(200).json({ result: reqData.personaId });
    } catch (error) {
      this.handleGeneralError(res, error);
    }
  };

  public createLinkedInAuthToken = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const reqData: Record<string, any> = matchedData(req);

      const user: IUser | null = await this.findUserById(reqData.userId, res);
      if (!user) {
        return;
      }

      const persona: IPersona | null = this.findPersonaById(
        reqData.personaId,
        user.personas,
        res
      );
      if (!persona) {
        return;
      }

      const response: axios.AxiosResponse | undefined =
        await this.getLinkedInToken(res, reqData.code);
      if (!response) {
        return;
      }

      if (!response.data?.access_token) {
        res
          .status(400)
          .json({ errors: ["failed to get token in endpoint response"] });
        return;
      }

      if (!response.data?.expires_in) {
        res
          .status(400)
          .json({ errors: ["failed to get expiry in endpoint response"] });
        return;
      }

      let newAuthToken: IAuthToken = {
        platform: "LinkedIn",
        token: response.data.access_token,
        expiry: this.getTokenExpiryDate(response.data.expires_in),
      } as IAuthToken;

      newAuthToken = this.upsertAuthToken(persona, newAuthToken);
      await user.save();
      res.status(200).json({ result: newAuthToken });
    } catch (error) {
      this.handleGeneralError(res, error);
    }
  };

  public createTwitterAuthToken = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const reqData: Record<string, any> = matchedData(req);

      const user: IUser | null = await this.findUserById(reqData.userId, res);
      if (!user) {
        return;
      }

      const persona: IPersona | null = this.findPersonaById(
        reqData.personaId,
        user.personas,
        res
      );
      if (!persona) {
        return;
      }

      const response = await axios.post(
        "https://guiser.server:3001/auth/twitter/code",
        { code: reqData.code }
      );
      if (!response || !response.data) {
        res.status(500).json({ errors: ["Failed to get Twitter token"] });
        return;
      }

      const { access_token, expires_in } = response.data;
      if (!access_token || !expires_in) {
        res.status(400).json({ errors: ["Invalid response from Twitter"] });
        return;
      }

      let newAuthToken: IAuthToken = {
        platform: "Twitter",
        token: response.data.access_token,
        expiry: this.getTokenExpiryDate(response.data.expires_in),
      } as IAuthToken;

      newAuthToken = this.upsertAuthToken(persona, newAuthToken);
      await user.save();
      res.status(200).json({ result: newAuthToken });
    } catch (error) {
      this.handleGeneralError(res, error);
    }
  };

  public createContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const reqData: Record<string, any> = matchedData(req);

      const user: IUser | null = await this.findUserById(reqData.userId, res);
      if (!user) {
        return;
      }

      const persona: IPersona | null = this.findPersonaById(
        reqData.personaId,
        user.personas,
        res
      );
      if (!persona) {
        return;
      }

      let newContent: IContent = {
        text: reqData.text,
        isRejected: reqData.isRejected,
      } as IContent;
      persona.content.push(newContent);
      newContent = persona.content[persona.content.length - 1];
      await user.save();
      res.status(200).json({ result: newContent });
    } catch (error) {
      this.handleGeneralError(res, error);
    }
  };

  public postToLinkedIn = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const reqData: Record<string, any> = matchedData(req);

      const user: IUser | null = await this.findUserById(reqData.userId, res);
      if (!user) {
        return;
      }

      const persona: IPersona | null = this.findPersonaById(
        reqData.personaId,
        user.personas,
        res
      );
      if (!persona) {
        return;
      }

      const authToken: IAuthToken | null = this.findAuthTokenByPlatform(
        "LinkedIn",
        persona,
        res
      );
      if (!authToken) {
        return;
      }

      const content: IContent | null = this.findContentById(
        reqData.contentId,
        persona,
        res
      );
      if (!content) {
        return;
      }

      const personUrn: string | null = await this.getLinkedInPersonUrn(
        res,
        authToken.token
      );
      if (!personUrn) {
        return;
      }

      const postId: string | null = await this.performPostToLinkedin(
        personUrn,
        authToken.token,
        content.text,
        res
      );
      if (!postId) {
        return;
      }

      content.posted = content.posted | 0b100;

      await user.save();
      res.status(200).json({ result: content.posted });
    } catch (error) {
      this.handleGeneralError(res, error);
    }
  };

  public postToThreads = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const reqData: Record<string, any> = matchedData(req);

      const user: IUser | null = await this.findUserById(reqData.userId, res);
      if (!user) {
        return;
      }

      const persona: IPersona | null = this.findPersonaById(
        reqData.personaId,
        user.personas,
        res
      );
      if (!persona) {
        return;
      }

      const authToken: IAuthToken | null = this.findAuthTokenByPlatform(
        "Threads",
        persona,
        res
      );
      if (!authToken) {
        return;
      }

      const content: IContent | null = this.findContentById(
        reqData.contentId,
        persona,
        res
      );
      if (!content) {
        return;
      }

      // spliced in logic to fit this monolith
      const baseurl = process.env.THREADS_GRAPH_API_BASE_URL as string;
      const token = authToken.token;

      var url = baseurl + "/me/threads";

      // specify and request media container for content
      var qstr = (
        new URLSearchParams({
          text: content.text,
          media_type: "TEXT",
          access_token: token,
        }) as any
      ).toString();

      var response = await axios.post(url + "?" + qstr, {});
      const containerID = response.data.id;

      // publish container as thread
      url = baseurl;
      url += "/me/threads_publish";
      qstr = (
        new URLSearchParams({
          creation_id: containerID,
          access_token: token,
        }) as any
      ).toString();
      response = await axios.post(url + "?" + qstr);

      content.posted = content.posted | 0b010;

      await user.save();
      res.status(200).json({ result: content.posted });
    } catch (error) {
      this.handleGeneralError(res, error);
    }
  };

  public postToTwitter = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const reqData: Record<string, any> = matchedData(req);

      const user: IUser | null = await this.findUserById(reqData.userId, res);
      if (!user) {
        return;
      }

      const persona: IPersona | null = this.findPersonaById(
        reqData.personaId,
        user.personas,
        res
      );
      if (!persona) {
        return;
      }

      const authToken: IAuthToken | null = this.findAuthTokenByPlatform(
        "Twitter",
        persona,
        res
      );
      if (!authToken) {
        return;
      }

      const content: IContent | null = this.findContentById(
        reqData.contentId,
        persona,
        res
      );
      if (!content) {
        return;
      }

      // spliced in logic to fit this monolith
      const url = "https://api.twitter.com/2/tweets";
      const token = authToken.token;
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const tweetData = {
        text: content.text,
      };

      try {
        const response = await axios.post(url, tweetData, { headers: headers });
        const twitterId = response.data.data.id;
        const twitterText = response.data.data.text;

        content.posted = content.posted | 0b001;

        await user.save();
        res.status(200).json({ result: content.posted });
      } catch (error) {
        console.error(error);
        res.json(error);
      }
    } catch (error) {
      this.handleGeneralError(res, error);
    }
  };

  private async findUserById(
    userId: string,
    res: Response
  ): Promise<IUser | null> {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ errors: ["userId is invalid"] });
      return null;
    }

    const user: IUser | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ errors: ["user with matching id not found"] });
      return null;
    }

    return user;
  }

  private findPersonaById(
    personaId: string,
    personas: IPersona[],
    res: Response
  ): IPersona | null {
    const persona: IPersona | undefined = personas?.find(
      (p) => p._id == personaId && !p.deleted
    );
    if (!persona) {
      res.status(404).json({ errors: ["persona with matching id not found"] });
      return null;
    }

    return persona;
  }

  private findAuthTokenByPlatform(
    platform: string,
    persona: IPersona,
    res: Response
  ): IAuthToken | null {
    const authToken = persona.authTokens.find((t) => t.platform === platform);
    if (!authToken) {
      res.status(400).json({
        errors: [`no valid ${platform} token has been registered to persona`],
      });
      return null;
    }

    return authToken;
  }

  private findContentById(
    contentId: string,
    persona: IPersona,
    res: Response
  ): IContent | null {
    const contentEntry: IContent | undefined = persona.content.find(
      (c) => c._id == contentId && !c.deleted
    );
    if (!contentEntry) {
      res.status(404).json({ errors: ["content with matching id not found"] });
      return null;
    }

    return contentEntry;
  }

  private async getLinkedInToken(
    res: Response,
    code: string
  ): Promise<axios.AxiosResponse | undefined> {
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
        .status(400)
        .json({ errors: ["failed to resolve OAuth code to token"] });
      return;
    }
  }

  private upsertAuthToken(
    persona: IPersona,
    newAuthToken: IAuthToken
  ): IAuthToken {
    const matchingPlatformTokenIndex = persona.authTokens.findIndex(
      (token) => token.platform === newAuthToken.platform
    );

    if (matchingPlatformTokenIndex > -1) {
      persona.authTokens[matchingPlatformTokenIndex] = newAuthToken;
    } else {
      persona.authTokens.push(newAuthToken);
    }

    return persona.authTokens[
      matchingPlatformTokenIndex > -1
        ? matchingPlatformTokenIndex
        : persona.authTokens.length - 1
    ];
  }

  private getTokenExpiryDate(expires_in: number): Date {
    const currentDatetime: Date = new Date();
    return addSeconds(currentDatetime, expires_in);
  }

  private async getLinkedInPersonUrn(
    res: Response,
    token: string
  ): Promise<string | null> {
    try {
      const userinfo = await axios.get("https://api.linkedin.com/v2/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!userinfo?.data?.sub) {
        throw new Error("response does contain sub");
      }
      return userinfo.data.sub;
    } catch (err) {
      res
        .status(400)
        .json({ errors: ["failed to resolve token to person urn"] });
      return null;
    }
  }

  private async performPostToLinkedin(
    personUrn: string,
    token: string,
    text: string,
    res: Response
  ): Promise<string | null> {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    };

    const body = {
      author: `urn:li:person:${personUrn}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: text,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    try {
      const response = await axios.post(
        "https://api.linkedin.com/v2/ugcPosts",
        body,
        { headers }
      );
      return response.data.id;
    } catch (err) {
      res.status(400).json({ errors: ["error when posting to LinkedIn"] });
      return null;
    }
  }

  private handleGeneralError(res: Response, error: unknown): void {
    const errorMessage =
      (error as Error)?.message ?? "An unexpected error occurred";
    res.status(500).json({ errors: [errorMessage] });
  }
}

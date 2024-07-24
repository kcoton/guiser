import { Router, Request, Response } from "express";
import axios from "axios";

class TwitterRouter {
  private readonly router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private async handleTwitterCallback(req: Request, res: Response) {
    const { code, state: personaId } = req.query;
    const userId = req.query.userId || "defaultUserId"; // Adjust this to retrieve userId appropriately

    if (!code || !personaId) {
      return res.status(400).json({ error: "Missing code or personaId" });
    }

    try {
      const redirectUrl = `/user/${userId}/persona/${personaId}/authtoken/twitter`;
      const response = await axios.post(
        `${req.protocol}://${req.get("host")}${redirectUrl}`,
        { code }
      );

      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  private registerRoutes() {
    this.router.get("/token", this.handleTwitterCallback.bind(this));
  }
}

export default new TwitterRouter().getRouter();

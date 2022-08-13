import { Request, Response } from "express";
import * as queryString from "query-string";

export async function register(req: Request, res: Response) {
  const params = queryString.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: "http://localhost:9000/github/callback",
    scope: ["read:user", "user:email"].join(" "), // space seperated string
    allow_signup: true,
  });

  const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;

  res.status(200).json({
    status: "success",
    data: githubLoginUrl,
  });
}

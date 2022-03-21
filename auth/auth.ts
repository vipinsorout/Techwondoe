import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const getJWT = (userId:string,username:string) => {  
  //The token is valid for 1 hour
  //We want to send a new token on every request
  const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    expiresIn: "1h"
  });
  return newToken;
};

export const validateToken = (req: Request, res: Response,next: NextFunction) =>
{
//Get the jwt token from the head
const token = <string>req.headers["token"];
let jwtPayload;

//Try to validate the token and get data
try {
  jwtPayload = <any>jwt.verify(token, config.jwtSecret);
  res.locals.jwtPayload = jwtPayload;
} catch (error) {
  //If token is not valid, respond with 401 (unauthorized)
  res.status(401).send();
  return;
}
next();
}
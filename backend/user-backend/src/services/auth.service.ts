import bcrypt from "bcrypt"
import jwt, { SignOptions } from "jsonwebtoken"
import { IauthPayload } from "../extends";

const APP_SECRET='my-app-secret'
const JWT_OPTIONS:SignOptions={
  algorithm:"HS256",
  issuer:"davidson.com/api",
  audience:"davidson.com",
  expiresIn:3600,
}

export function createPasswordHash(password:string){
    return bcrypt.hash(password, 10);
  }

export function validatePassword(password:string,hash:string){
  return bcrypt.compare(password,hash)
}



export async function signToken( password:string,hash:string,role:string,payload:IauthPayload){

  const checPassword= await validatePassword(password,hash)

  if(!checPassword){
    throw new Error('invalind password');
  }
  const token=jwt.sign(payload,APP_SECRET,JWT_OPTIONS)

  return{ 
    token,
    life:3600,
    role
  }
}

export async function verifyToken(token:string){
  const payload=jwt.verify(token,APP_SECRET,JWT_OPTIONS)
  return payload as IauthPayload;
}
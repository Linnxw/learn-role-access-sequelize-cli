import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
dotenv.config();

interface UserData {
  name:string
  email:string 
  roleId:number,
  verified:boolean
  active:boolean
}

const responseData = (status:number,message:string,error:any | null,data:any | null) =>{
  if(error != null && error instanceof Error){
    const response = {
      status,
      message:error.message,
      error,
      data:null
    }
    return response;
  }
  const response = {
    status,
    message,
    error,
    data
  }
  return response;
}

const generateToken = (data:any) =>{
  const token = jwt.sign(data,process.env.TOKEN as string,{
    expiresIn:'10h'
  });
  return token;
}

const generateRefreshToken = (data:any) =>{
  const token = jwt.sign(data,process.env.REFRESH_TOKEN as string,{
    expiresIn:'1d'
  });
  return token;
}

const extractToken = (token:string) =>{
   const secret = process.env.TOKEN as string
   let userData:any;
    const data = jwt.verify(token,secret,(error:any,decode:any)=>{
      if(error){
        userData = null
        return;
      }else{
        userData = decode
      }
    })
  if(userData){
    const result: UserData = <UserData>(userData)
    return result
  }
  return null;
}

const extractRefreshToken = (token:string) =>{
   const secret = process.env.REFRESH_TOKEN as string
   let userData:any;
    const data = jwt.verify(token,secret,(error:any,decode:any)=>{
      if(error){
        userData = null
        return;
      }else{
        userData = decode
      }
    })
  if(userData){
    const result: UserData = <UserData>(userData)
    return result
  }
  return null;
}
export default {responseData,generateToken,generateRefreshToken,extractToken,extractRefreshToken}
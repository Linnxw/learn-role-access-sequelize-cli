import {Request,Response,NextFunction} from 'express';
import Helper from '../helpers/Helper';
const authenticated = (req:Request,res:Response,next:NextFunction):Response | null =>{
  const authToken = req.headers["authorization"]
  const token = authToken && authToken.split(" ")[1]
  
  if(!token)
  return res.status(401).json(Helper.responseData(401,"Unauthorize",null,null))
  
  const result = Helper.extractToken(token as string)
  if(!result)
  return res.status(401).json(Helper.responseData(401,"Unaithorize",null,null))
  res.locals.userEmail = result.email
  res.locals.roleId = result.roleId
  next()
  return null;
}

const superAdmin = (req:Request,res:Response,next:NextFunction)=> {
  const roleId = res.locals?.roleId
  
  if(roleId !== 3) {
    return res.status(403).json(Helper.responseData(403,"Forbidden",null,null))
  }
  next()
}
const adminRole = (req:Request,res:Response,next:NextFunction)=> {
  const roleId = res.locals?.roleId
  
  if(roleId !== 2) {
    return res.status(403).json(Helper.responseData(403,"Forbidden",null,null))
  }
  next()
}
const basicUser = (req:Request,res:Response,next:NextFunction)=> {
  const roleId = res.locals?.roleId
  
  if(roleId !== 1) {
    return res.status(403).json(Helper.responseData(403,"Forbidden",null,null))
  }
  next()
}

export default {authenticated,superAdmin,adminRole,basicUser}

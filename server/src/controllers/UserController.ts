import User from '../db/models/User';
import Role from '../db/models/Role';
import MasterMenu from "../db/models/MasterMenu"
import SubMenu from "../db/models/SubMenu"
import RoleMenuAccess from "../db/models/RoleMenuAccess"
import Helper from '../helpers/Helper';
import {Request,Response} from 'express';
import passwordHash from 'password-hash';
import {Op} from "sequelize"
const register = async(req:Request,res:Response):Promise<Response> =>{
  try{
    const {
      name,
      email,
      password,
      confirmPassword,
      roleId
    } = req.body;
    const hashPassword = passwordHash.generate(password);
    const user = await User.create({
      name,
      email,
      password:hashPassword,
      roleId,
      verified:true,
      active:true
    });
    
    return res.status(201).json(Helper.responseData(201,'Created',null,user));
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const login = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const user = await User.findOne({
      where:{
        email:req.body.email
      }
    });
    if(!user)
    return res.status(400).json(Helper.responseData(400,'Not Authorization',null,null));
    
    const match = passwordHash.verify(req.body.password,user.password as string);
    if(!match)
    return res.status(400).json(Helper.responseData(400,'Not Authorization',null,null));
    
    const data = {
      name:user.name,
      email:user.email,
      roleId:user.roleId,
      verified:user.verified,
      active:user.active
    }
    const token = Helper.generateToken(data);
    const refreshToken = Helper.generateRefreshToken(data);
    
    user.accesToken = refreshToken;
    await user.save()
    res.cookie('refreshToken',refreshToken,{
      httpOnly:true,
      maxAge:24*60*60*1000
    });
    
    const roleAccess = await RoleMenuAccess.findAll({
      where:{
        roleId:user.roleId
      }
    })
    console.log({roleAccess})
    
    const listSubMenuId = roleAccess.map((item:any)=>item.subMenuId)
    console.log({listSubMenuId})
    
    const masterMenu = await MasterMenu.findAll({
      where:{
        active:true,
      },
      order:[
        ["ordering","ASC"],
        [SubMenu,"ordering","ASC"]
        ],
      include:[{
        model:SubMenu,
        where:{
          id:{
            [Op.in]:listSubMenuId
          }
        }
      }]
    })
    
    console.log({masterMenu})
    
    const responseUser = {
      name:user.name,
      email:user.email,
      roleId:user.roleId,
      verified:user.verified,
      active:user.active,
      token,
      masterMenu
    }
    return res.json(Helper.responseData(200,'Ok',null,responseUser));
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const refreshToken = (req:Request,res:Response) =>{
  const token = req.cookies?.refreshToken
  if(!token)
  return res.status(401).json(Helper.responseData(401,"Unauthorize",null,null))
  
  const decodeUser = Helper.extractRefreshToken(token as string)
  
  if(!decodeUser)
  return res.status(401).json(Helper.responseData(401,"Unauthorize",null,null))
  
  const newToken = Helper.generateToken({
    name:decodeUser.name,
    email:decodeUser.email,
    roleId:decodeUser.roleId,
    verified:decodeUser.verified,
    active:decodeUser.active
  })
  const responseUser = {   
    name:decodeUser.name,
    email:decodeUser.email,
    roleId:decodeUser.roleId,
    verified:decodeUser.verified,
    active:decodeUser.active,
    token:newToken
  }
  return res.json(Helper.responseData(200,'Ok',null,responseUser));
  
}

const userDetail = async(req:Request,res:Response):Promise<Response> =>{
  try{
    const userEmail = res.locals?.userEmail
    console.log({local:res.locals,userEmail})
    const user = await User.findOne({
      where:{
        email:userEmail
      },
      include:{
        model:Role,
        attributes:["id","roleName"]
      }
    })
    if(!user)
    return res.status(404).json(Helper.responseData(404,"Not Found",null,null))
    
    user.password = ""
    user.accesToken =""
    
    return res.status(200).json(Helper.responseData(200,"Ok",null,user))
  }catch(error){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const logout = async(req:Request,res:Response):Promise<Response> =>{
  try{
    const user = await User.findOne({
      where:{
        email:res.locals?.userEmail
      }
    })
    if(!user)
    return res.status(404).json(Helper.responseData(404,"Not Found",null,null))
    user.accesToken =null
    
    await user.save()
    res.clearCookie("refreshToken")
    return res.status(200).json(Helper.responseData(200,"Ok",null,null))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null))
  }
}
export default {register,login,refreshToken,userDetail,logout}
import RoleMenuAccess from "../db/models/RoleMenuAccess" 
import {Request,Response} from "express" 
import Helper from "../helpers/Helper"
import Role from "../db/models/Role"
import SubMenu from "../db/models/SubMenu"

const createAccess = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const {roleId,subMenuId} = req.body
    
    const create = await RoleMenuAccess.create({
      roleId,
      subMenuId,
      active:true
    })
    
    return res.status(201).json(Helper.responseData(201,"Created",null,create))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,"",error,null))
  }
}
const getListAccess = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const access = await RoleMenuAccess.findAll({
      where:{
        active:true
      },
      include:[{
        model:Role,
        attributes:["roleName"]
      },
      {
        model:SubMenu,
        attributes:["name"]
      }]
    })
  
    return res.status(200).json(Helper.responseData(200,"Ok",null,access))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,"",error,null))
  }
}
const getAllAccess = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const access = await RoleMenuAccess.findAll({
      include:[{
        model:Role,
        attributes:["roleName"]
      },
      {
        model:SubMenu,
        attributes:["name"]
      }]
    })
    
    return res.status(200).json(Helper.responseData(200,"Ok",null,access))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,"",error,null))
  }
}
const getDetailAccess = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const access = await RoleMenuAccess.findOne({
      where:{
        id:req.params?.id
      }
    })
    
    if(!access)
    return res.status(404).json(Helper.responseData(404,"Not Found",null,null))
    
    return res.status(200).json(Helper.responseData(200,"Ok",null,access))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,"",error,null))
  }
}
const updateAccess = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const {roleId,subMenuId} = req.body
    const access = await RoleMenuAccess.findOne({
      where:{
        id:req.params?.id
      }
    })
    
    if(!access)
    return res.status(404).json(Helper.responseData(404,"Not Found",null,null))
    
    access.roleId = roleId 
    access.subMenuId = subMenuId
    
    await access.save()
    
    return res.status(200).json(Helper.responseData(200,"Ok",null,access))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,"",error,null))
  }
}
const softDeleteAccess = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const access = await RoleMenuAccess.findOne({
      where:{
        id:req.params?.id
      }
    })
    
    if(!access)
    return res.status(404).json(Helper.responseData(404,"Not Found",null,null))
    
    access.active = false
    
    await access.save()
    
    return res.status(200).json(Helper.responseData(200,"Ok",null,access))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,"",error,null))
  }
}
const permanentDeleteAccess = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const access = await RoleMenuAccess.findOne({
      where:{
        id:req.params?.id
      }
    })
    
    if(!access)
    return res.status(404).json(Helper.responseData(404,"Not Found",null,null))
    
    await access.destroy()
    
    return res.status(200).json(Helper.responseData(200,"Ok",null,access))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,"",error,null))
  }
}

export default {createAccess,getListAccess,getAllAccess,getDetailAccess,updateAccess,softDeleteAccess,permanentDeleteAccess}
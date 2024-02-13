import Validator from 'validatorjs';
import {Request,Response,NextFunction} from 'express';
import Helper from '../../helpers/Helper';
import Role from "../../db/models/Role"
import SubMenu from "../../db/models/SubMenu"
interface MasterMenuValidation {
  name:string 
  ordering:number 
  icon:string
}

interface SubMenuValidation {
  roleId:number 
  subMenuId:number
}
const masterMenuValidation = (req:Request,res:Response,next:NextFunction) =>{
  const {name,ordering,icon} = req.body
  
  const rules:Validator.Rules = {
    name:'required|string|max:20',
    ordering:'required|integer',
    icon:'required|string'
  }
  
  const data:MasterMenuValidation = {
    name,
    ordering,
    icon
  }
  const validate = new Validator(data,rules)
  
  if(validate.fails()){
    return res.status(401).json(Helper.responseData(401,"",validate.errors,null))
  }
  next()
}

const subMenuValidation = async(req:Request,res:Response,next:NextFunction) =>{
  try{
    const {roleId,subMenuId} = req.body
    
    const rules:Validator.Rules = {
      roleId:"required|numeric",
      subMenuId:"required|numeric"
    }
    const data:SubMenuValidation = {
      roleId,subMenuId
    }
    const validate = new Validator(data,rules)
    
    if(validate.fails()){
      return res.status(400).json(Helper.responseData(400,"",validate.errors,null))
    }
    
    const role = await Role.findOne({
      where:{
        id:roleId,
        active:true
      }
    })
    
    if(!role){
      const errorData = {
       errors:{
         roleId:['role NotFound']
       }
     }
     return res.status(404).json(Helper.responseData(404,"NotFound",errorData,null))
    }
    const subMenu = await SubMenu.findOne({
      where:{
        id:subMenuId,
        active:true
      }
    })
    
    if(!subMenu){
      const errorData = {
       errors:{
         subMenuId:['Sub Menu NotFound']
       }
     }
     return res.status(404).json(Helper.responseData(404,"NotFound",errorData,null))
    }
    next()
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,"",error,null))
  }
}
export default {masterMenuValidation,subMenuValidation}
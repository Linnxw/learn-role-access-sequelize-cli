import SubMenu from "../db/models/SubMenu"
import {Request,Response} from 'express';
import Helper from '../helpers/Helper';
const getListSubMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const menu = await SubMenu.findAll({
      where:{
       active:true
      }
    })
    return res.status(200).json(Helper.responseData(200,"Ok",null,menu))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const getDetailSubMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const menu = await SubMenu.findOne({
      where:{
        id:req.params?.id,
        active:true
      }
    })
    return res.status(200).json(Helper.responseData(200,"Ok",null,menu))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const getAllSubMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const menu = await SubMenu.findAll()
    return res.status(200).json(Helper.responseData(200,"Ok",null,menu))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const createSubMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const {
      name,
      icon,
      ordering,
      title,
      url,
      isTargetSelf,
      masterMenuId,
      
    } = req.body;
    
    const menu = await SubMenu.create({
      name,
      icon,
      ordering,
      title,
      url,
      isTargetSelf,
      masterMenuId,
      active:true
    })
    return res.status(201).json(Helper.responseData(201,"Created",null,menu))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const updateSubMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const {
      name,
      icon,
      ordering,
      title,
      url,
      isTargetSelf,
      masterMenuId,
    } = req.body
    
    const menu = await SubMenu.findOne({
      where:{
        id:req.params?.id
      }
    })
    
    if(!menu)
    return res.status(404).json(Helper.responseData(404,"Not Found",null,null))
    
    menu.name = name
    menu.icon = icon 
    menu.ordering = ordering
    menu.title = title
    menu.isTargetSelf = isTargetSelf
    menu.url = url
    
    await menu.save()
    
    return res.status(200).json(Helper.responseData(200,"Ok",null,menu))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const softDeleteSubMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const menu = await SubMenu.findOne({
      where:{
        id:req.params?.id
      }
    })
    
    if(!menu)
    return res.status(404).json(Helper.responseData(404,"Not Found",null,null))
    
    menu.active = false
    
    await menu.save()
    return res.status(200).json(Helper.responseData(200,"Ok",null,menu))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const permanentDeleteSubMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const menu = await SubMenu.findOne({
      where:{
        id:req.params?.id
      }
    })
    
    if(!menu)
    return res.status(404).json(Helper.responseData(404,"Not Found",null,null))
    
    await menu.destroy()
    return res.status(200).json(Helper.responseData(200,"Ok",null,menu))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}
export default {getListSubMenu,getAllSubMenu,createSubMenu,updateSubMenu,softDeleteSubMenu,permanentDeleteSubMenu,getDetailSubMenu}
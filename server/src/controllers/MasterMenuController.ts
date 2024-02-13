import MasterMenu from "../db/models/MasterMenu"
import {Request,Response} from 'express';
import Helper from '../helpers/Helper';
const getListMasterMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const menu = await MasterMenu.findAll({
      where:{
        active:true
      }
    })
    return res.status(200).json(Helper.responseData(200,"Ok",null,menu))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const getDetailMasterMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const menu = await MasterMenu.findOne({
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

const getAllMasterMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const menu = await MasterMenu.findAll()
    return res.status(200).json(Helper.responseData(200,"Ok",null,menu))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const createMasterMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const {name,icon,ordering} = req.body;
    
    const menu = await MasterMenu.create({
      name,
      icon,
      ordering,
      active:true
    })
    return res.status(201).json(Helper.responseData(201,"Created",null,menu))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const updateMasterMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const {name,icon,ordering} = req.body;
    
    const menu = await MasterMenu.findOne({
      where:{
        id:req.params?.id
      }
    })
    
    if(!menu)
    return res.status(404).json(Helper.responseData(404,"Not Found",null,null))
    
    menu.name = name
    menu.icon = icon 
    menu.ordering = ordering
    
    await menu.save()
    
    return res.status(200).json(Helper.responseData(200,"Ok",null,menu))
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

const softDeleteMasterMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const menu = await MasterMenu.findOne({
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

const permanentDeleteMasterMenu = async (req:Request,res:Response):Promise<Response> =>{
  try{
    const menu = await MasterMenu.findOne({
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
export default {getListMasterMenu,getAllMasterMenu,createMasterMenu,updateMasterMenu,softDeleteMasterMenu,permanentDeleteMasterMenu,getDetailMasterMenu}
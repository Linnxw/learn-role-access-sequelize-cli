import {Request,Response} from 'express';
import Role from '../db/models/Role';

const getRoles = async(req:Request,res:Response):Promise<Response> =>{
  try{
    const roles = await Role.findAll({
      where:{
        active:true
      }
    });
    return res.status(200).json({
      status:200,
      message:'Ok',
      data:roles
    });
  }catch(error:any){
    if(error != null && error instanceof Error){
      return res.status(500).json({
        status:500,
        message:error.message,
        error:error
      });
    }
    return res.status(500).json({
        status:500,
        message:'Internal Server Error',
        error:error
      });
  }
}


const createRole = async(req:Request,res:Response):Promise<Response> =>{
  try{
    const {roleName,active} = req.body;
    
    const create = await Role.create({
      roleName,
      active
    });
    
    return res.status(201).json({
      status:201,
      message:'Created',
      data:create
    });
  }catch(err:any){
    if(err != null && err instanceof Error){
      return res.status(500).json({
        status:500,
        message:err.message,
        error:err
      });
    }
    return res.status(500).json({
      status:500,
      message:'Internal Server Error',
      error:err
    });
  }
}

const updateRole = async(req:Request,res:Response):Promise<Response> =>{
  try{
    const {id} = req.params;
    const {roleName,active} = req.body;
    
    const role = await Role.findByPk(id);
    if(!role)
    return res.status(404).json({
      status:404,
      message:'Data not found',
      data:null
    });
    
    role.roleName = roleName;
    role.active = active;
    
    role.save();
    return res.status(200).json({
      status:200,
      message:'Updated',
      data:role
    });
  }catch(error:any){
    if(error != null && error instanceof Error){
      return res.status(500).json({
        status:500,
        message:error.message,
        error:error
      });
    }
    return res.status(500).json({
    status:500,
    message:'Internal Server Error',
    error:error
  });
  }
}

const deleteRole = async(req:Request,res:Response):Promise<Response> =>{
  try{
    const {id} = req.params;
    
    const role = await Role.findByPk(id);
    if(!role)
    return res.status(404).json({
      status:404,
      message:'Data not found',
      data:null
    });
    
    role.destroy();
    return res.status(200).json({
      status:200,
      message:'Deleted',
      data:null
    });
  }catch(error:any){
    if(error != null && error instanceof Error){
      return res.status(500).json({
        status:500,
        message:error.message,
        error:error
      });
    }
    return res.status(500).json({
    status:500,
    message:'Internal Server Error',
    error:error
  });
  }
}

const getRoleById = async(req:Request,res:Response):Promise<Response> =>{
  try{
    const {id} = req.params;
    
    const role = await Role.findByPk(id);
    
    if(!role)
    return res.status(404).json({
      status:404,
      message:'Data not found',
      data:null
    });

    return res.status(200).json({
      status:200,
      message:'Ok',
      data:role
    });
  }catch(error:any){
    if(error != null && error instanceof Error){
      return res.status(500).json({
        status:500,
        message:error.message,
        error:error
      });
    }
    return res.status(500).json({
    status:500,
    message:'Internal Server Error',
    error:error
  });
  }
}

export default {getRoles,createRole,updateRole,deleteRole,getRoleById};
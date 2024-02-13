import Validator from 'validatorjs';
import {Request,Response,NextFunction} from 'express';
import Helper from '../../helpers/Helper';
import User from '../../db/models/User';
interface RegisterBody{
  name:string
  email:string 
  password:string 
  confirmPassword:string
}
const registerValidation = async(req:Request,res:Response,next:NextFunction) =>{
  try{
    const {name,email,password,confirmPassword}:RegisterBody = req.body;
  
    const data:RegisterBody = {
    name,
    email,
    password,
    confirmPassword
  }
  
    const rules:Validator.Rules = {
    name:'required|string|max:50',
    email:'required|email',
    password:'required|min:3',
    confirmPassword:'required|same:password'
  }
  
   const validate = new Validator(data,rules);
  
   if(validate.fails()){;
     return res.status(400).json(Helper.responseData(400,'',validate.errors,null));
   }
   const emailUsed = await User.findOne({
     where:{
       email:email
     }
   });
   if(emailUsed){
     const errorData = {
       errors:{
         email:['Email already used']
       }
     }
     return res.status(400).json({
       status:400,
      message:errorData,
      error:null,
      data:null
     });
   }
    next();
  }catch(error:any){
    return res.status(500).json(Helper.responseData(500,'',error,null));
  }
}

export default {registerValidation}
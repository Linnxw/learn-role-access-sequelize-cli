import connection from '../../config/dbConnect';
import {Optional,DataTypes,Model} from "sequelize"

interface SubMenuAttributes {
  id?:number 
  name?:string 
  title?:string 
  icon?:string 
  url?:string 
  isTargetSelf?:boolean 
  masterMenuId?:number
  active?:boolean
  ordering?:number
  createdAt?: Date
  updatedAt?: Date
}

export interface SubMenuInput extends Optional<SubMenuAttributes,'id'>{}
export interface SubMenuOutput extends Required<SubMenuAttributes>{}

class SubMenu extends Model<SubMenuInput,SubMenuAttributes> implements SubMenuAttributes{
  public id!:number 
  public name!:string 
  public title!:string 
  public icon!:string 
  public url!:string 
  public isTargetSelf!:boolean 
  public masterMenuId!:number
  public active!:boolean
  public ordering!:number
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubMenu.init({
 id:{
    type:DataTypes.BIGINT,
    primaryKey:true,
    autoIncrement:true,
    allowNull:false
  },
  name:{
     type:DataTypes.STRING,
     allowNull:true
   },
  ordering:{
     type:DataTypes.INTEGER,
     allowNull:true
   },
   icon:{
     type:DataTypes.TEXT,
     allowNull:true
   },
   active:{
     type:DataTypes.BOOLEAN,
     allowNull:true
   },
   title:{
     type:DataTypes.STRING,
     allowNull:true
   },
   url:{
     type:DataTypes.TEXT,
     allowNull:true
   },
  isTargetSelf:{
     type:DataTypes.BOOLEAN,
     allowNull:true
   },
   masterMenuId:{
     type:DataTypes.BIGINT,
     allowNull:true
   },
},{
  timestamps:true,
  sequelize:connection,
  underscored:false
  })
  
  export default SubMenu
import connection from '../../config/dbConnect';
import {Optional,DataTypes,Model} from "sequelize"
import SubMenu from "./SubMenu"
interface MasterMenuAttributes {
  id?:number
  name?:string 
  ordering?:number 
  icon?:string 
  active?:boolean
  createdAt?: Date
   updatedAt?: Date
}

export interface MasterMenuInput extends Optional<MasterMenuAttributes,'id'>{}
export interface MasterMenuOutput extends Required<MasterMenuAttributes>{}

class MasterMenu extends Model<MasterMenuAttributes,MasterMenuInput> implements MasterMenuAttributes {
  public id!:number
  public name!:string 
  public ordering!:number 
  public icon!:string 
  public active!:boolean
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MasterMenu.init({
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
   }
},
{
  timestamps:true,
  sequelize:connection,
  underscored:false
}
)

MasterMenu.hasMany(SubMenu)

export default MasterMenu
import {DataTypes,Optional,Model} from 'sequelize';
import connection from '../../config/dbConnect';
import Role from "./Role"
interface UserAttributes{
  id?:string 
  name?:string | null
  email?:string | null
  roleId?:number | null 
  password?:string | null
  accesToken?:string | null
  verified?:boolean | null
  active:boolean | null
  createdAt?:Date
  updatedAt?:Date
}

interface UserInput extends Optional<UserAttributes,"id">{}
interface UserOutput extends Required<UserAttributes>{}

class User extends Model<UserAttributes,UserInput> implements UserAttributes{
  public id!:string; 
  public name!:string | null;
  public email!:string | null;
  public roleId!:number | null; 
  public password!:string | null;
  public accesToken!:string | null;
  public verified!:boolean | null;
  public active!:boolean | null;
  public readonly createdAt!:Date;
  public readonly updatedAt!:Date;
}

User.init({
  id:{
    type:DataTypes.BIGINT,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:true
  },
  email:{
    type:DataTypes.STRING,
    allowNull:true
  },
  roleId:{
    type:DataTypes.BIGINT,
    allowNull:true
  },
  password:{
    type:DataTypes.TEXT,
    allowNull:true
  },
  accesToken:{
    type:DataTypes.TEXT,
    allowNull:true
  },
  verified:{
    type:DataTypes.BOOLEAN,
    allowNull:true
  },
  active:{
    type:DataTypes.BOOLEAN,
    allowNull:true
  }
},{
  timestamps:true,
  sequelize:connection,
  underscored:false
  });
  
User.belongsTo(Role,{foreignKey:"roleId"})
export default User;
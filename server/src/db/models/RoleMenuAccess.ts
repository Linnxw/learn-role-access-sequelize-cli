import {DataTypes,Model,Optional} from 'sequelize';
import connection from '../../config/dbConnect';
 import Role from "./Role" 
 import SubMenu from "./SubMenu"
 
 interface RoleMenuAccessAttributes{
   id?: number 
   roleId?: number | null
   subMenuId:number | null
   active?: boolean | null
   createdAt?: Date
   updatedAt?: Date
 }
 
 export interface RoleMenuAccessInput extends Optional<RoleMenuAccessAttributes,'id'> {}
 export interface RoleMenuAccessOutput extends Required<RoleMenuAccessAttributes> {}
 
 class RoleMenuAccess extends Model<RoleMenuAccessAttributes,RoleMenuAccessInput> implements RoleMenuAccessAttributes {
   public id!: number; 
   public roleId!: number;
   public subMenuId!:number
   public active!: boolean;
   public readonly createdAt!: Date;
   public readonly updatedAt!: Date;
 }
 
 RoleMenuAccess.init({
   id:{
     type:DataTypes.BIGINT,
     primaryKey:true,
     autoIncrement:true,
     allowNull:false
   },
   roleId:{
     type:DataTypes.BIGINT,
     allowNull:true
   },
   subMenuId:{
     type:DataTypes.BIGINT,
     allowNull:true
   },
   active:{
     type:DataTypes.BOOLEAN,
     allowNull:true
   }
 },{
   sequelize:connection,
   underscored:false,
   timestamps:true
 });
 
 
 RoleMenuAccess.belongsTo(Role,{
   foreignKey:'roleId'
 })
 RoleMenuAccess.belongsTo(SubMenu,{
   foreignKey:'subMenuId'
 })
 export default RoleMenuAccess;
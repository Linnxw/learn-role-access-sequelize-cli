import express,{Router} from 'express';
import roleController from '../controllers/RoleController';
import userController from '../controllers/UserController';
import masterMenuController from '../controllers/MasterMenuController';
import subMenuController from '../controllers/SubMenuController';
import roleMenuAccessController from "../controllers/RoleMenuAccessController"
import userValidation from '../middleware/validation/RegisterValidation';
import authorization from "../middleware/Authorization"
import masterMenuValidation from "../middleware/validation/MasterMenuValidation"

const router: Router = express.Router();

//Role route
router.get('/role',authorization.authenticated,roleController.getRoles);
router.post('/role',authorization.authenticated,authorization.adminRole,roleController.createRole);
router.post('/role/:id',authorization.authenticated,authorization.adminRole,roleController.updateRole);
router.delete('/role/:id',authorization.authenticated,authorization.superAdmin,roleController.deleteRole);
router.get('/role/:id',roleController.getRoleById);

//User route
router.post('/user/signup',userValidation.registerValidation,userController.register);
router.post('/user/signin',userController.login);
router.get('/user/refresh-token',userController.refreshToken)
router.delete("/user/signout",authorization.authenticated,userController.logout)
router.get("/user/current",authorization.authenticated,userController.userDetail)


//Master Menu Route
router.get("/menu",authorization.authenticated,authorization.adminRole,masterMenuController.getListMasterMenu)
router.post("/menu",authorization.authenticated,authorization.adminRole,masterMenuValidation.masterMenuValidation,masterMenuController.createMasterMenu)
router.get("/menu/all",authorization.authenticated,authorization.superAdmin,masterMenuController.getAllMasterMenu)
router.get("/menu/:id",authorization.authenticated,authorization.adminRole,masterMenuController.getDetailMasterMenu)
router.patch("/menu/:id",authorization.authenticated,authorization.adminRole,masterMenuController.updateMasterMenu)
router.delete("/menu/soft/:id",authorization.authenticated,authorization.adminRole,masterMenuController.softDeleteMasterMenu)
router.delete("/menu/permanent/:id",authorization.authenticated,authorization.superAdmin,masterMenuController.permanentDeleteMasterMenu)
//Sub Menu Route
router.get("/sub-menu",authorization.authenticated,authorization.adminRole,subMenuController.getListSubMenu)
router.post("/sub-menu",authorization.authenticated,authorization.adminRole,subMenuController.createSubMenu)
router.get("/sub-menu/all",authorization.authenticated,authorization.superAdmin,subMenuController.getAllSubMenu)
router.get("/sub-menu/:id",authorization.authenticated,authorization.adminRole,subMenuController.getDetailSubMenu)
router.patch("/sub-menu/:id",authorization.authenticated,authorization.adminRole,subMenuController.updateSubMenu)
router.delete("/sub-menu/soft/:id",authorization.authenticated,authorization.adminRole,subMenuController.softDeleteSubMenu)
router.delete("/sub-menu/permanent/:id",authorization.authenticated,authorization.superAdmin,subMenuController.permanentDeleteSubMenu)

//Role Menu Access Route
router.get("/role-menu-access",authorization.authenticated,authorization.superAdmin,roleMenuAccessController.getListAccess)
router.post("/role-menu-access",authorization.authenticated,authorization.superAdmin,masterMenuValidation.subMenuValidation,roleMenuAccessController.createAccess)
router.get("/role-menu-access/all",authorization.authenticated,authorization.superAdmin,roleMenuAccessController.getAllAccess)
router.get("/role-menu-access/:id",authorization.authenticated,authorization.superAdmin,roleMenuAccessController.getDetailAccess)
router.patch("/role-menu-access/:id",authorization.authenticated,authorization.superAdmin,masterMenuValidation.subMenuValidation,roleMenuAccessController.updateAccess)
router.delete("/role-menu-access/soft/:id",authorization.authenticated,authorization.superAdmin,roleMenuAccessController.softDeleteAccess)
router.delete("/role-menu-access/permanent/:id",authorization.authenticated,authorization.superAdmin,roleMenuAccessController.permanentDeleteAccess)
export default router;
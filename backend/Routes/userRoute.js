import express from 'express';
import isLogin from '../middleware/isLogin.js';
const userRoute=express.Router();
import { getUserBySearch , getcurrentchatters} from '../Controllers/UserSearchController.js';


userRoute.get('/search', isLogin, getUserBySearch);
userRoute.get('/currentchatters', isLogin,getcurrentchatters);


export default userRoute;
import {Router} from 'express';
import {registerValidators, loginValidators} from '../validators/auth.validator.js';
import {register, login} from '../controllers/auth.controller.js';

const authRouter = Router();

/**  
 * @description Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body {username, email, password, confirmPassword}
 */
authRouter.post('/register', registerValidators, register);


/**  
 * @description Login an existing user
 * @route POST /api/auth/login
 * @access Public
 * @body {email, password}
 */
authRouter.post('/login', loginValidators, login);



export default authRouter;
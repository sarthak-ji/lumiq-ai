import {Router} from 'express';
import {registerValidators, loginValidators} from '../validators/auth.validator.js';
import {register, login, verifyEmail, getMe} from '../controllers/auth.controller.js';
import authUser from '../middlewares/auth.middleware.js';

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


/**  
 * @description Get current logged-in user's details
 * @route GET /api/auth/get-me
 * @access Private
 */
authRouter.get('/get-me',authUser, getMe);


/**  
 * @description Verify user's email
 * @route GET /api/auth/verify-email
 * @access Public
 * @query {token}
 */
authRouter.get('/verify-email', verifyEmail);

export default authRouter;
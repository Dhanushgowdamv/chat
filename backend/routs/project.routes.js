import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controllers/project.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js"
const router = Router();

router.post('/create',
    authMiddleware.authUser,
    body('name').isString().withMessage('name is required'),
    projectController.createProject
)

router.get('/all',
    authMiddleware.authUser,
    projectController.getAllProject
)

router.put('/add-user',
    authMiddleware.authUser,
    body('projectId').isString().withMessage('project Id is required'),
    body('users').isArray({min: 1}).withMessage('usermust be of strings').bail()
    .custom((users)=> users.every(user => typeof user === 'string')).withMessage('each user must be string'),
    projectController.addUserToProject
    )



export default router;
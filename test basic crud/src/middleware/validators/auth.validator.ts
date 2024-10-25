import { body, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { validateRequest } from './validate-request';

export const validateLogin = [
    body('username')
        .notEmpty()
        .withMessage('Username is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
        (req: Request, res: Response, next: NextFunction) => validateRequest(req, res, next)
] as ValidationChain[];
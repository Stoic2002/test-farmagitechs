import { Request, Response, NextFunction } from 'express';
import { body, ValidationChain } from 'express-validator';
import { validateRequest } from './validate-request';

export const validateProduct = [
    body('name')
        .notEmpty()
        .withMessage('Product name is required')
        .trim(),
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    (req: Request, res: Response, next: NextFunction) => validateRequest(req, res, next)
] as ValidationChain[];
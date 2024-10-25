import { Request, Response, NextFunction } from 'express';
import { body, ValidationChain } from 'express-validator';
import { validateRequest } from './validate-request';

export const validateSale = [
    body('buyer_name')
        .notEmpty()
        .withMessage('Buyer name is required'),
    body('buyer_phone')
        .notEmpty()
        .withMessage('Buyer phone number is required'),
    body('items')
        .isArray()
        .withMessage('Items must be an array')
        .notEmpty()
        .withMessage('At least one item is required'),
    body('items.*.product_id')
        .isInt()
        .withMessage('Product ID must be an integer'),
    body('items.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
    (req: Request, res: Response, next: NextFunction) => validateRequest(req, res, next)
] as ValidationChain[];
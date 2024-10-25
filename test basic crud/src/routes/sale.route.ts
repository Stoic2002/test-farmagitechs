import { Router } from 'express';
import { SaleController } from '../controllers/sale.controller';
import { validateSale } from '../middleware/validators/sale.validator';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const controller = new SaleController();

router.use(authMiddleware as any);

router.post('/', validateSale, controller.create);
router.get('/:id', controller.getById);
router.get('/', controller.getAll as any);
router.delete('/:id', controller.delete);

export default router;
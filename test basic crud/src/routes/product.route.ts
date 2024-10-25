import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateProduct } from '../middleware/validators/product.validator';
import  {authMiddleware}  from '../middleware/auth.middleware';

const router = Router();
const controller = new ProductController();

router.use(authMiddleware as any);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', validateProduct, controller.create);
router.put('/:id', validateProduct, controller.update);
router.delete('/:id', controller.delete);

export default router;
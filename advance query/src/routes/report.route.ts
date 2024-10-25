import { Router } from 'express';
import { ReportController } from '../controllers/report.controller';

const router = Router();
const reportController = new ReportController();

router.get('/kabupaten/:id', reportController.reportAllByKabupatenId);

export default router;
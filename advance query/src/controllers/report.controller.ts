import { Request, Response } from 'express';
import { ReportService } from '../services/report.service';
import { ReportResponse } from '../types/report.type';

export class ReportController {
    private reportService: ReportService;

    constructor() {
        this.reportService = new ReportService();
    }

    reportAllByKabupatenId = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const { startDate, endDate, tipe, kategori } = req.query as {
                startDate: string;
                endDate: string;
                tipe: string;
                kategori: string;
            };

            const percentageArea = await this.reportService.getPercentageArea(id, startDate, endDate);

            const result: ReportResponse = {
                status: "OK",
                parameter: await this.reportService.getParameter(startDate, endDate, id, tipe, kategori),
                presentase_wilayah: await this.reportService.getPercentageAreaResponse(percentageArea),
                sub_rawat_jalan: await this.reportService.getSubRawatJalan(id, startDate, endDate),
                data: await this.reportService.getSubAreaData(id, startDate, endDate, percentageArea)
            };

            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
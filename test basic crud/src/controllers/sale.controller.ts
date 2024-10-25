import { Request, Response } from 'express';
import { SaleService } from '../services/sale.service';
import { isValidDateFormat, formatDateRange } from '../utils/date.utils';

export class SaleController {
    private saleService: SaleService;

    constructor() {
        this.saleService = new SaleService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const sale = await this.saleService.createSale(req.body);
            res.status(201).json({statusCode : 201, message : 'created', sale});
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const sale = await this.saleService.getSaleById(parseInt(req.params.id));
            res.json({statusCode : 200, message : 'sale retrieved successfully', sale});
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const startDate = req.query.startDate as string;
            const endDate = req.query.endDate as string;

            if (startDate && !isValidDateFormat(startDate)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid startDate format. Use YYYY-MM-DD'
                });
            }

            if (endDate && !isValidDateFormat(endDate)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Invalid endDate format. Use YYYY-MM-DD'
                });
            }

            if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'startDate cannot be later than endDate'
                });
            }

            const page = Math.max(1, parseInt(req.query.page as string) || 1);
            const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 10));

            const sales = await this.saleService.getAllSales({
                page,
                limit,
                dateRange: startDate || endDate ? {
                    startDate,
                    endDate
                } : undefined
            });

            const rangeTime = startDate && endDate 
                ? formatDateRange(startDate, endDate)
                : null;

            res.status(200).json({
                statusCode: 200,
                message: 'Sales retrieved successfully',
                "range_time": rangeTime,
                sales: {
                    data: sales.data,
                    pagination: {
                        current_page: sales.pagination.current_page,
                        total_pages: sales.pagination.total_pages,
                        total_items: sales.pagination.total_items,
                        items_per_page: sales.pagination.items_per_page
                    }
                }
            });
        } catch (error: any) {
            res.status(500).json({
                statusCode: 500,
                message: error.message
            });
        }
    };


    delete = async (req: Request, res: Response) => {
        try {
            await this.saleService.deleteSale(parseInt(req.params.id));
            res.status(204).json({ message: 'Sale deleted' });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

}

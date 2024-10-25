import { pool } from '../config/database';
import { saleQueries } from '../db/queries/sale.queries';
import { CreateSaleDTO, DateRangeParams, GetSalesParams, Sale } from '../types/sale.types';
import { PaginationParams, PaginatedResponse } from '../types/common.types';

export class SaleService {
    async createSale(data: CreateSaleDTO): Promise<Sale> {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');

            let totalAmount = 0;
            for (const item of data.items) {
                const productResult = await client.query('SELECT price FROM products WHERE id = $1', [item.product_id]);
                if (!productResult.rows[0]) {
                    throw new Error(`Product ${item.product_id} not found`);
                }
                totalAmount += productResult.rows[0].price * item.quantity;
            }

            const saleResult = await client.query(saleQueries.createSale, [
                data.buyer_name,
                data.buyer_phone,
                totalAmount
            ]);
            const sale = saleResult.rows[0];

            for (const item of data.items) {
                const productResult = await client.query('SELECT price FROM products WHERE id = $1', [item.product_id]);
                const pricePerUnit = productResult.rows[0].price;
                const subtotal = pricePerUnit * item.quantity;

                await client.query(saleQueries.createSaleDetail, [
                    sale.id,
                    item.product_id,
                    item.quantity,
                    pricePerUnit,
                    subtotal
                ]);
            }

            await client.query('COMMIT');
            return sale;

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getSaleById(id: number): Promise<Sale> {
        const result = await pool.query(saleQueries.getSaleWithDetails, [id]);
        if (!result.rows[0]) {
            throw new Error('Sale not found');
        }
        return result.rows[0];
    }

    async getAllSales(filters: GetSalesParams): Promise<PaginatedResponse<Sale>> {
        const { page, limit, dateRange } = filters;
        const offset = (page - 1) * limit;
        
        try {

            const startDate = dateRange?.startDate || null;
            const endDate = dateRange?.endDate || null;
            
            const salesPromise = pool.query(saleQueries.getAllSales, [
                limit,
                offset,
                startDate,
                endDate
            ]);

            const countPromise = pool.query(saleQueries.countSales, [
                startDate,
                endDate
            ]);

            const [sales, countResult] = await Promise.all([salesPromise, countPromise]);

            const totalItems = parseInt(countResult.rows[0].count);
            const totalPages = Math.ceil(totalItems / limit);

            return {
                data: sales.rows,
                pagination: {
                    current_page: page,
                    total_pages: totalPages,
                    total_items: totalItems,
                    items_per_page: limit
                }
            };
        } catch (error) {
            throw new Error(`Failed to fetch sales: ${error}`);
        }
    }
  
    

    async deleteSale(id: number): Promise<void> {
        const result = await pool.query(saleQueries.deleteSale, [id]);
        if (result.rowCount === 0) {
            throw new Error('Sale not found');
        }
    }
}

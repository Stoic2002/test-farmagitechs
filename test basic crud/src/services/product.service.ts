import { pool } from '../config/database';
import { productQueries } from '../db/queries/product.queries';
import { Product } from '../types/product.types';
import { PaginationParams, PaginatedResponse } from '../types/common.types';

export class ProductService {
    async getAllProducts(params: PaginationParams): Promise<PaginatedResponse<Product>> {
        const { page, limit } = params;
        const offset = (page - 1) * limit;
        
        const [products, countResult] = await Promise.all([
            pool.query(productQueries.getAll, [limit, offset]),
            pool.query(productQueries.count)
        ]);

        const totalItems = parseInt(countResult.rows[0].count);
        const totalPages = Math.ceil(totalItems / limit);

        return {
            data: products.rows,
            pagination: {
                current_page: page,
                total_pages: totalPages,
                total_items: totalItems,
                items_per_page: limit
            }
        };
    }

    async getProductById(id: number): Promise<Product> {
        const result = await pool.query(productQueries.getById, [id]);
        if (!result.rows[0]) {
            throw new Error('Product not found');
        }
        return result.rows[0];
    }

    async createProduct(data: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
        const result = await pool.query(productQueries.create, [data.name, data.price]);
        return result.rows[0];
    }

    async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
        const product = await this.getProductById(id);
        const result = await pool.query(productQueries.update, [
            data.name || product.name,
            data.price || product.price,
            id
        ]);
        return result.rows[0];
    }

    async deleteProduct(id: number): Promise<void> {
        await this.getProductById(id);
        await pool.query(productQueries.delete, [id]);
    }
}
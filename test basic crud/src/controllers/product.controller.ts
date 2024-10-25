import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    getAll = async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            
            const products = await this.productService.getAllProducts({ page, limit });
            res.status(200).json({statusCode : 200, message : 'get products success',products});
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.getProductById(parseInt(req.params.id));
            res.status(200).json({statusCode : 200, message : 'get product success',product});
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json({statusCode : 201, message : 'product created',product});
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const product = await this.productService.updateProduct(parseInt(req.params.id), req.body);
            res.status(200).json({statusCode : 200, message : 'product updated',product});
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            await this.productService.deleteProduct(parseInt(req.params.id));
            res.status(204).send();
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };
}

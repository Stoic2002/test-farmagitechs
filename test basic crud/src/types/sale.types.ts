import { PaginationParams } from "./common.types";

export interface Sale {
    id: number;
    buyer_name: string;
    buyer_phone: string;
    total_amount: number;
    sale_date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface SaleDetail {
    id: number;
    sale_id: number;
    product_id: number;
    quantity: number;
    price_per_unit: number;
    subtotal: number;
    created_at: Date;
    updated_at: Date;
}

export interface CreateSaleDTO {
    buyer_name: string;
    buyer_phone: string;
    items: {
        product_id: number;
        quantity: number;
    }[];
}

export interface DateRangeParams {
    startDate?: string;
    endDate?: string;
}

export interface GetSalesParams extends PaginationParams {
    dateRange?: DateRangeParams;
}

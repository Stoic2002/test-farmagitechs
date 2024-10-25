export const saleQueries = {
    createSale: `
        INSERT INTO sales (buyer_name, buyer_phone, total_amount)
        VALUES ($1, $2, $3)
        RETURNING *
    `,
    createSaleDetail: `
        INSERT INTO sale_details (sale_id, product_id, quantity, price_per_unit, subtotal)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `,
    getSaleWithDetails: `
        SELECT 
            s.*,
            json_agg(
                json_build_object(
                    'id', sd.id,
                    'product_id', sd.product_id,
                    'product_name', p.name,
                    'quantity', sd.quantity,
                    'price_per_unit', sd.price_per_unit,
                    'subtotal', sd.subtotal
                )
            ) as details
        FROM sales s
        LEFT JOIN sale_details sd ON s.id = sd.sale_id
        LEFT JOIN products p ON sd.product_id = p.id
        WHERE s.id = $1
        GROUP BY s.id
    `,
    getAllSales: `
    SELECT 
        s.*,
        COALESCE(
            json_agg(
                DISTINCT jsonb_build_object(
                    'id', sd.id,
                    'product_id', sd.product_id,
                    'product_name', p.name,
                    'quantity', sd.quantity,
                    'price_per_unit', sd.price_per_unit,
                    'subtotal', sd.subtotal
                )
            ) FILTER (WHERE sd.id IS NOT NULL), '[]'
        ) as details
    FROM sales s
    LEFT JOIN sale_details sd ON s.id = sd.sale_id
    LEFT JOIN products p ON sd.product_id = p.id
    WHERE 
        ($3::timestamp IS NULL OR s.sale_date >= ($3::date)::timestamp AT TIME ZONE 'UTC') AND
        ($4::timestamp IS NULL OR s.sale_date < ($4::date + INTERVAL '1 day')::timestamp AT TIME ZONE 'UTC')
    GROUP BY s.id
    ORDER BY s.sale_date DESC
    LIMIT $1 OFFSET $2
    `,
    
    countSales: `
        SELECT COUNT(*)
        FROM sales s
        WHERE 
            ($1::timestamp IS NULL OR s.sale_date >= ($1::date)::timestamp AT TIME ZONE 'UTC') AND
            ($2::timestamp IS NULL OR s.sale_date < ($2::date + INTERVAL '1 day')::timestamp AT TIME ZONE 'UTC')
    `,
    
    deleteSale: `
        DELETE FROM sales WHERE id = $1
    `
};

export const productQueries = {
    getAll: `
        SELECT * FROM products
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
    `,
    getById: `
        SELECT * FROM products WHERE id = $1
    `,

    create: `
        INSERT INTO products (name, price)
        VALUES ($1, $2)
        RETURNING *
    `,
    update: `
        UPDATE products 
        SET name = $1, price = $2, updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *
    `,
    delete: `
        DELETE FROM products WHERE id = $1
    `,
    count: `
        SELECT COUNT(*) FROM products
    `
};
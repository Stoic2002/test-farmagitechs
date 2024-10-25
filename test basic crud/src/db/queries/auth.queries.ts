export const authQueries = {
    getUserByUsername: `
        SELECT * FROM users WHERE username = $1
    `,
    
    createUser: `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING id, username, created_at
    `
};
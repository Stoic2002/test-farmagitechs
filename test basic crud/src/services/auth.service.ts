import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../config/database';
import { authQueries } from '../db/queries/auth.queries';
import { LoginCredentials } from '../types/auth.types';

export class AuthService {
    async login(credentials: LoginCredentials) {
        const { username, password } = credentials;

        const result = await pool.query(authQueries.getUserByUsername, [username]);
        const user = result.rows[0];

        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return { token };
    }
}
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    login = async (req: Request, res: Response) => {
        try {
            const { token } = await this.authService.login(req.body);
            res.json({statusCode : 201, message : 'login success',token});
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    };
}
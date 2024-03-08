import { Request, Response, NextFunction } from 'express';
import session from 'session';

// Middleware de autenticação
const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    if (req.session && req.session.usario) {
        next();
    } else {
        res.redirect('/login');
    }
};

export { isAuthenticated };

import { Request, Response, NextFunction } from 'express';

//Middleware que verifica se o usuário da sessão pode editar/deletar os itens, verificando se os ids são iguais.
const userValidate = (req: Request, res: Response, next: NextFunction): void => {
    const requisicao = req.session.usuario.ID;
    console.log(requisicao);
    next()
};

export { userValidate };
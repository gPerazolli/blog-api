const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

function authMiddleware(req, res, next){
    const authHeader = req.header('Authorization');
    if(!authHeader) return res.status(401).json({ error: 'Acesso negado. Token não fornecido'});
    const token = authHeader.replace('Bearer ', '');

    try{
        const decoded = jwt.verify(token, secret);
        req.teacherId = decoded.id;
        next();

    }catch(err){
        res.status(400).json({ error: 'Token invalido'});
    }
};

module.exports = authMiddleware;
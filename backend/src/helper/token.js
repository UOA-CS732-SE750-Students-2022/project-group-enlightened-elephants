import jwt from'jsonwebtoken';

const token = async (req, res, next) => {
    const body = jwt.verify(req.token)
    req.user = body;
    next();
}

export {token}
import jwt from'jsonwebtoken';

const token = async (req, res, next) => {
    console.log(req.headers.token);
    const body = jwt.verify(req.headers.token)
    req.user_id = body.user.id;
    next();
}

export {token}
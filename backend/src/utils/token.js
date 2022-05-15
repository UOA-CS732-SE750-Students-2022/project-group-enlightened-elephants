import jwt from'jsonwebtoken';
import {findById} from '../data/user-data/userDao'
const SECRET = 'enlightened-elephants';

const verifyToken = async (req, res, next) => {
    try{
        const decoded = jwt.verify(req.headers.token, SECRET);
        const user = await findById(decoded.id)
        if(user == null){
            res.send({success : false, message : "no such user"})
        }
        else{
            req.body.user_id = user._id
            next();
        }
    }catch(err){
        res.send({success : false, message : "invalid token"})
    }

}

export {verifyToken}
import express from'express';
import {addUser} from'../../data/userDao';
import jwt from'jsonwebtoken';
import NodeRSA from 'node-rsa';
import fs from'fs';

const SECRET = '1234';

const router = express.Router();
router.use(express.json());

// middleware to decrypt 
const auth = async (req, res, next) => {
    const pem = fs.readFileSync('./src/routes/user/public.pem');
    const key = new NodeRSA(pem);
    const cipherText = key.decryptPublic(req.body.password, 'utf8')
    const password = cipherText.split(' ')[0]
    req.cipherText = password
    next();
}

// app.get('/api/users', async (req, res) => {
//     const users = await User.find();
//     res.send(users)
// });

// registration api
router.post('/register', auth, async (req, res) => {
    const user = await addUser({
        username: req.body.username,
        password: req.cipherText
    })
    res.send(user);
});

// login api
router.post('/login', auth, async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    const isPasswordValid = () =>{
        //return req.body.password == user.password;
        return req.cipherText == user.password;
    }
    if (!isPasswordValid) {
        return res.status(422).send({
            message: 'invalid password'
        })
    };
    // generate token
    const token = jwt.sign({
        id: String(user._id),
    }, SECRET);
    res.send({
        user,
        token
    });
});

export default router;
import express from'express';
import {addUser, find} from'../../data/user-data/userDao';
import jwt from'jsonwebtoken';
import NodeRSA from 'node-rsa';
import fs from'fs';

const SECRET = 'enlightened-elephants';

const router = express.Router();
router.use(express.json());

// middleware to decrypt 
const auth = async (req, res, next) => {
    const pem = fs.readFileSync('./src/public/public.pem');
    const key = new NodeRSA(pem);
    const cipherText = key.decryptPublic(req.body.password, 'utf8')
    const password = cipherText.split(' ')[0]
    req.cipherText = password
    
    next();
}

router.get('/key', async (req, res) =>{
    const pem = fs.readFileSync('./src/public/private.pem');
    res.send(pem);
})

router.post('/register', auth, async (req, res) => {
    const user = await addUser({
        username: req.body.username,
        password: req.cipherText
    })
    res.send(user);
});


// login api
router.post('/login', auth, async (req, res) => {
    const user = await find(req.body.username)
    const isPasswordValid = () =>{
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
        timestamp : String(Date.now())
    }, SECRET);
    res.send({
        user,
        token
    });
});

export default router;
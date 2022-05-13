import express from'express';
import {addUser, find} from'../../data/user-data/userDao';
import jwt from'jsonwebtoken';
import NodeRSA from 'node-rsa';
import Bcrypt from 'bcrypt';

const key = new NodeRSA({b: 1024});
key.setOptions({encryptionScheme: 'pkcs1'});

const SECRET = 'enlightened-elephants';

const router = express.Router();
router.use(express.json());

const auth = async (req, res, next) => {
    const cipherText = req.body.password;
    const plainText = key.decrypt(cipherText, 'utf8');
    const password = plainText.split(' ')[0]
    req.body.password = password
    next()
}

router.get('/key', async (req, res) =>{
    const publicPem = key.exportKey('public');
    res.send(publicPem);
})

router.post('/register', auth, async (req, res) => {
    const result = await find(req.body.username)
    if(result == null){
        const password = Bcrypt.hashSync(req.body.password, 10);
        const user = await addUser({
            username: req.body.username,
            password: password
        })
        res.send({username : req.body.username});
    }
    else{
        res.status(400).send({message : "usernams exists"})
    }
});

// login api
router.post('/login', auth, async (req, res) => {
    const user = await find(req.body.username)
    if(user == null){
        return res.status(422).send({
            message: 'there is no the user'
        })
    }
    Bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(result){
            const token = jwt.sign({
                id: String(user._id),
                name: username,
                timestamp : String(Date.now())
            }, SECRET);
            return res.send({token});
        }
        else{
            return res.status(422).send({
                message: 'invalid password'
            })
        }
    });
});

export default router;
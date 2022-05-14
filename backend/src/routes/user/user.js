import express from'express';
import {addUser, find, findById} from'../../data/user-data/userDao';
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


router.get('/tokenLogin', async (req, res) => {
    try{
        const decoded = jwt.verify(req.headers.token, SECRET);
        const user = await findById(decoded.id)
        if(user == null){
            res.send({success : false, message : "no such user"})
        }
        else{
            res.send({success : true, user : {username : user.username}})
        }
    }catch(err){
        console.log(err)
        res.send({success : false, message : "invalid token"})
    }
})

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
        const token = jwt.sign({
            id: String(user._id),
            timestamp : String(Date.now())
        }, SECRET,{ expiresIn: '1h' });
        res.send({success : true, user :{username : user.username}, token});
    }
    else{
        res.send({success :false, message : "usernams exists"})
    }
});

// login api
router.post('/login', auth, async (req, res) => {
    const user = await find(req.body.username)
    if(user == null){
        return res.send({
            success : false,
            message: 'there is no the user'
        })
    }
    Bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(result){
            const token = jwt.sign({
                id: String(user._id),
                timestamp : String(Date.now())
            }, SECRET,{ expiresIn: '1h' });
            return res.send({success : true, user :{username : req.body.username}, token});
        }
        else{
            return res.send({
                success : false, 
                message: 'invalid password'
            })
        }
    });
});

export default router;
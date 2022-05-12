import NodeRSA from 'node-rsa';
import fs from "fs";
import bcrypt from 'bcrypt';
import axios from 'axios';

function loginRequest(username, password){

    // encrypt with 'bcrypt'
    let cipherText = bcrypt.hashSync(password, 10);
    // combine cipher text and timestamp
    cipherText = cipherText + " " + Date.now();
    // encrypt again with rsa
    const pem = fs.readFileSync('./public/private.pem');
    const key = new NodeRSA(pem);
    cipherText = key.encryptPrivate(cipherText, 'base64');
    console.log(cipherText);

    const body = {
        "username" : username,
        "password" : cipherText,
    };

    axios.post("/user/register", body)
        .then(response => console.log(response.data.message));
}

export {loginRequest}
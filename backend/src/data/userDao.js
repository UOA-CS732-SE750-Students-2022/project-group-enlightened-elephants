import {User} from './schema'

async function addUser(user) {
    return await User.create({
        username: user.username,
        password: user.cipherText
    })
}

export  {addUser}
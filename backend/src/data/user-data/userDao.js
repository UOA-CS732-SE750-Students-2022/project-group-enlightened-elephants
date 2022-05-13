import {User} from '../schema'

async function addUser(user) {
    return await User.create({
        username: user.username,
        password: user.password
    })
}

async function find(username){
    return await User.findOne({username: username})
}

export  {addUser, find}
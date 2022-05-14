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

async function findById(id){
    return await User.findOne({_id: id})
}

export  {addUser, find, findById}
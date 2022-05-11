import {User} from '../schema'

async function addUser(user) {
    const user = await User.create({
        username: user.username,
        password: user.cipherText
    })
    return user
}

export default addUser
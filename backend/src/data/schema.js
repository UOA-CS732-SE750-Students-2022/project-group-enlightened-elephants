import mongoose,{Schema} from 'mongoose'

const userSchema = new Schema({
    username: { type: String, unique: true},
    password: { type: String },
})

const User = mongoose.model('User', userSchema)

export {User}
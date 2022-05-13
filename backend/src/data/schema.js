import mongoose,{Schema} from 'mongoose'

const eepostSchema = new Schema({
	entry_id : {type : String, required: true},
	entry_title : {type : String, required: true},
	content : {
        type : String, 
        required: true,
        maxlength : 200
    },
    like : {type :Number, default : 0},
    user_id : {type : String, required: true},
    user_name : {type : String, required: true},
	comments : [
		{
			type : Schema.Types.ObjectId,
            ref : 'Comment'
		}
	]
}, {
    timestamps : true
})


const commentSchema = new Schema({
	eepost_id : {
        type : Schema.Types.ObjectId, 
        required: true
    },
	content : {
        type : String, 
        required: true,
        maxlength : 200,
    },
}, {
    timestamps : true
})

const userSchema = new Schema({
    username: { type: String, unique: true},
    password: { type: String },
})

const Eepost = mongoose.model('Eepost', eepostSchema)
const Comment = mongoose.model('Comment', commentSchema)
const User = mongoose.model('User', userSchema)

export {Eepost,Comment,User}
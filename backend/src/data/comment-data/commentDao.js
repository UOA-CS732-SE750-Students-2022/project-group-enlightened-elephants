import {Comment_} from '../schema'

async function retrieveAllComment_() {
    return await Comment_.find()
}

async function addComment_(comment_) {
    const dbComment_ = new Comment_(comment_)
    return await dbComment_.save()
}

//  paging query
async function retrieveComment_ListById(id,pageNum) {
    if (pageNum === 1) {
        const count = await Comment_.find({id : id}).count()
        const comments_ = await Comment_.find({id : id}).sort({createdAt:-1}).limit(10)
        return {count,comments_}
    }
    return await Comment_.find({id : id}).sort({createdAt:-1}).skip(10*(pageNum-1)).limit(10)
}


//  paging query
async function retrievecomment_List(pageNum) {
    if (pageNum === 1) {
        const count = await comment_.find().count()
        const comments_ = await comment_.find().limit(10)
        return {count,comments_}
    }
    return await Comment_.find().skip(10*(pageNum-1)).limit(10)
}

export {
    retrieveAllComment_,
    addComment_,
    retrievecomment_List,
    retrieveComment_ListById
    
}
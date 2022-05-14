import { Comment_, Eepost } from '../schema'

async function retrieveAllComment_() {
    return await Comment_.find()
}

async function addComment_(comment_) {
    try {
        const dbComment_ = new Comment_(comment_)
        const result = await dbComment_.save()
        await Eepost.findByIdAndUpdate(result.post_id, { $push: { comments: result._id } })
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

//  paging query
async function retrieveComment_ListByPostId(postId, pageNum) {
    const count = await Comment_.find({ post_id: postId }).count()
    const comments_ = await Comment_.find({ post_id: postId }).sort({ createdAt: -1 }).skip(5 * (pageNum - 1)).limit(5)
    return { count, comments_ }
}


//  paging query
async function retrievecomment_List(pageNum) {
    if (pageNum === 1) {
        const count = await Comment_.find().count()
        const comments_ = await Comment_.find().limit(10)
        return { count, comments_ }
    }
    return await Comment_.find().skip(10 * (pageNum - 1)).limit(10)
}

export {
    retrieveAllComment_,
    addComment_,
    retrievecomment_List,
    retrieveComment_ListByPostId

}
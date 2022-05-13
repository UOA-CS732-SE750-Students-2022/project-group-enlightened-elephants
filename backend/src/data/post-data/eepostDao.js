import {Eepost} from '../schema'

async function retrieveAllEepostList() {
    return await Eepost.find()
}

//  paging query
async function retrieveEepostListByEntryId(entry_id,pageNum) {
        const count = await Eepost.find({entry_id : entry_id}).count()
        const eeposts = await Eepost.find({entry_id : entry_id}).sort({createdAt:-1}).skip(10*(pageNum-1)).limit(10).populate('comments')
        return {count,eeposts}
}

// Add a new post
async function addEepost(eepost) {
    const dbEepost = new Eepost(eepost)
    return await dbEepost.save()
}

// Delete a post by id
async function deleteEepost(id) {
    return await Eepost.deleteOne({_id : id})
}

// Fix the content of a post
async function updateEepost(id, content) {
    return await Eepost.findByIdAndUpdate(id, {$set : {content : content}})
}

// Add a like to a post
async function like(id) {
    return await Eepost.findByIdAndUpdate(id, {$inc : {like : 1}})
}

export {
    retrieveAllEepostList,
    addEepost,
    retrieveEepostListByEntryId,
    deleteEepost,
    updateEepost,
    like
}
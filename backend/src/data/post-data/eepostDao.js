import {Eepost} from '../schema'

async function retrieveAllEepostList() {
    return await Eepost.find()
}

//  paging query
async function retrieveEepostListByEntryId(entry_id,pageNum) {
    if (pageNum === 1) {
        const count = await Eepost.find({entry_id : entry_id}).count()
        const eeposts = await Eepost.find({entry_id : entry_id}).sort({createdAt:-1}).limit(10).populate('comments')
        return {count,eeposts}
    }
    return await Eepost.find({entry_id : entry_id}).sort({createdAt:-1}).skip(10*(pageNum-1)).limit(10).populate('comments')
}

export {
    retrieveAllEepostList,
    retrieveEepostListByEntryId,
}
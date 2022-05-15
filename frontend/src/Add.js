import axios from 'axios';

export default function Add() {

    const addPost = async () => {

        let url = "/eepost/add"
        let body = {
            "entry_id":"32452432",
            "entry_title":"hello",
            "content": "body.content",
            "user_id": "body.user_id",
            "user_name": "body.user_name"
        }
    
        const res = await axios.post(url,body)
        console.log(res.data)
        console.log(res.status)

    }
    
      
    return (  
        <div >
        <h1>Article</h1>
        <button onClick={addPost}>Addpost</button>
     

    </div>
    );
}
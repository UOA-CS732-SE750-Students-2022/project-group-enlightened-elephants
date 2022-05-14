import axios from 'axios';

export default function Update() {

    const update = async () => {

        let url = "/eepost/update"
        let body = {

            "id": "627bd5bebf963e155d600d09",
            "content":"This is the entry 1"
        }
    
        const res = await axios.post(url,body)
        console.log(res.data)
        console.log(res.status)
        alert(res.data)
        alert(res.status)

    }
    
      
    return (  
        <div >
        <h1>Article</h1>
        <button onClick={update}>update</button>
     

    </div>
    );
}
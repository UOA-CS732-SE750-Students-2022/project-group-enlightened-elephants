import useGet from './useGet';
import axios from 'axios';


export default function Like() {

    const like = () => {
        
        let url ="/eepost/like/627bd5bebf963e155d600d09"
        axios.get(url)
            .then(function (response) {
                let data = response.data
                alert(data)
                alert(response.status)
            })
    

    }
   

    return (  
        <div >
        <h1>Article</h1>
        <button onClick={like}>like</button>


    </div>
    );
}
import useGet from './useGet';
import axios from 'axios';


export default function Delete() {

    const deletePost = () => {
        
        let url ="/eepost/delete/627bd5bebf963e155d600d09"
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
        <button onClick={deletePost}>delete</button>


    </div>
    );
}
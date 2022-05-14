import axios from 'axios';

export default function GetById() {

 

    const entry = () => {

        let url ="/comment/getById?post_id=627bd5bfbf963e155d600d70&pageNum=1";
        axios.get(url)
            .then(res => {
                const data = res.data;

                console.log(data.count);
                console.log(data.comments);
                    
                
            })

    }
  

    return (  
        <div >
        <h1>getById</h1>
        <button onClick={entry}>getById</button>
      

    </div>
    );
}
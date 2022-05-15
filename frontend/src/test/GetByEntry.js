import useGet from './useGet';
import axios from 'axios';


export default function GetByEntry() {

    // const res = [];
    // const entry = async () => {

    // let url ="/eepost/getAll"
    // axios.get(url)
    //     .then(function (response) {
    //         let data = response.data
    //         alert(data)
    //     })
 

    const entry = () => {

        let url ="/eepost/getByEntry?entry_id=Entry-id-b&pageNum=1";
        axios.get(url)
            .then(res => {
                const data = res.data;

                console.log(data.count);
                console.log(data.eeposts);
            
                
               
                
            })

    }
  
    
    
    // const eepost = res.data;
    // console.log(eepost);s
    

    // const {status,data,isLoding} = useGet('/eepost/getByEntry/?entry_id=Entry-id-b&pageNum=1');
    // console.log(data.count);


    return (  
        <div >
        <h1>Article</h1>
        <button onClick={entry}>entry</button>
      

    </div>
    );
}
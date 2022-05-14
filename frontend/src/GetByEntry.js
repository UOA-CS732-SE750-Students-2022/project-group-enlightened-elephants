import useGet from './useGet';

export default function GetByEntry() {

    // let url ="/eepost/getAll"
    // axios.get(url)
    //     .then(function (response) {
    //         let data = response.data
    //         alert(data)
    //     })
    

    const {status,data,isLoding} = useGet('/eepost/getByEntry/?entry_id=Entry-id-b&pageNum=1', []);


    return (  
        <div >
        <h1>Article</h1>
        {data.eeposts.map(eachData =>
            <p key={eachData._id} >
                {data.count}<br/>
                {eachData._id}<br/>
                {eachData.entry_title}<br/>
                {eachData.content}<br/>
             
            </p>)}

    </div>
    );
}
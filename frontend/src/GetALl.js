import useGet from './useGet';

export default function GetAll() {

    // let url ="/eepost/getAll"
    // axios.get(url)
    //     .then(function (response) {
    //         let data = response.data
    //         alert(data)
    //     })
    const {status,data,isLoding} = useGet('/eepost/getAll', []);


    return (  
        <div >
        <h1>Article</h1>
        {data.map(eachData =>
            <p key={eachData._id} >
                {eachData._id}<br/>
                {eachData.entry_title}<br/>
                {eachData.content}<br/>
                {eachData.like}<br/>
                {eachData.user_id}<br/>
                {eachData.user_name}<br/>
                {eachData.comments}<br/>
                {eachData.createdAt}<br/>
                {eachData.updatedAt}<br/>
            </p>)}

    </div>
    );
}
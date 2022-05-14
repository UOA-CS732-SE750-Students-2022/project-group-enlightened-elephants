import useGet from './useGet';

export default function GetAllComment() {

    // let url ="/eepost/getAll"
    // axios.get(url)
    //     .then(function (response) {
    //         let data = response.data
    //         alert(data)
    //     })
    const {status,data,isLoding} = useGet('/comment/getAll', []);
    

    return (  
        <div >
        <h1>Article</h1>
        {data.map(eachData =>
            <p key={eachData._id} >
                {eachData._id}<br/>
                {eachData.eepost_id}<br/>
                {eachData.content}<br/>
                {eachData.createdAt}<br/>
                {eachData.updateAt}<br/>
            </p>)}

    </div>
    );
}
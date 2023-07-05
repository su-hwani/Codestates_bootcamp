const detailClick = async () =>{
    const ID = document.getElementById('ID').value  // ID 의 Name 은 수정 해야함. 
    
    axios.post('http://localhost:8080/ad/find',{
        ID: ID,
    }).then(function(res) {
        console.log(res.data.data.result) // res.data.data.result.ID 처럼 사용가능
    }).catch(function(err) {
        console.log(err)
    })
}
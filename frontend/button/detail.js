const detailClick = async () =>{
    console.log("hello")
    const ID = document.getElementById('ID').value  // ID 의 Name 은 수정 해야함. 
    await axios.get("http://localhost:8080/ad/find").then(result=>{
        console.log(result)
    })
}
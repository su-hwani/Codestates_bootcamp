const addClick = async () => {
    const ID = document.getElementById('addIdx').value  // ID 의 Name 은 수정 해야함.
    const Title = document.getElementById('addTitle').value
    const Text = document.getElementById('addText').value
    const Count = document.getElementById('addCount').value
    const Exposure = document.getElementById('addExposure').value
    const Regdate = document.getElementById('addRegdate').value
    // 여기서 예시 데이터 각각 생성
    console.log(ID)
    axios.post('http://localhost:8080/ad/add', {
        ID: ID,
        //size: addsize,
        title: Title,
        text: Text,
        //URL: req.body.URL,
        count: Count,
        //format: req.body.format,
        //byte: req.body.byte,
        //start_exp: req.body.start_exp,
        end_exp: Exposure,
        reg: Regdate,
        //Contract_ID: req.body.Contract_ID,
        //Expense: req.body.Expense

    }).then(function (res) {
        console.log(res.data.data.result) // res.data.data.result.ID 처럼 사용가능
    }).catch(function (err) {
        console.log(err)
    })


}
const addAD = document.querySelector("#addAD");
const testAD = document.querySelector("#testAD");
const updateAD = document.querySelector("#updateAD");
const deleteAD = document.querySelector("#deleteAD");
const searchAD = document.querySelector('#searchAD');

const table = document.querySelector('#table');


const updateBttn = document.querySelectorAll('.update-bttn');
const deleteBttn = document.querySelectorAll('.delete-bttn');
const cancelBttn= document.querySelector('.cancel-bttn');
/*add AD, AD Test클릭 이벤트*/
function add() {
  addAD.style.display = "block";
  testAD.style.display = "none";
  updateAD.style.display = "none";
  deleteAD.style.display = "none";
  searchAD.style.display = "none"; 
} 
function test(){
    testAD.style.display = "block";
    addAD.style.display = "none";
    updateAD.style.display = "none";
    deleteAD.style.display = "none";
    searchAD.style.display = "none";
}
function search(){
    searchAD.style.display = "block";
    addAD.style.display = "none";
    testAD.style.display = "none";
    updateAD.style.display = "none";
    deleteAD.style.display = "none";
}

function update(){
    updateAD.style.display = "block";
    addAD.style.display = "none";
    deleteAD.style.display ="none";
    searchAD.style.display = "none";
    testAD.style.display = "none";

}

function cancel(){
    event.preventDefault();
    updateAD.style.display="none";
}

/*########*/



 deleteBttn.forEach(function (btn) {
    btn.addEventListener("click", function () {
        updateAD.style.display = "none";
        addAD.style.display = "none";
        deleteAD.style.display = "block";
    });
  });

  cancelBttn.addEventListener("click",function(){
    event.preventDefault();
    addAD.style.display = "none";
    
  })



  
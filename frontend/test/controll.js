var board = document.getElementById("board");
var idx = document.getElementById('addIdx').value;
var title = document.getElementById('addTitle').value;
var text = document.getElementById('addText').value;
var exposure = document.getElementById('addExposure').value;
var count = document.getElementById('addCount').value;
var regdate = document.getElementById('addRegdate').value;

function addADs(){
    var row = board.insertRow();
    row.insertCell().innerHTML= idx;
    row.insertCell().innerHTML=title;
    row.insertCell().innerHTML=text;
    row.insertCell().innerHTML=exposure;
    row.insertCell().innerHTML=count;
    row.insertCell().innerHTML=regdate;
    row.insertCell().innerHTML=`
    <span
      ><button
        class="detail-bttn btn btn-outline danger"
        type="button"
      >
        상세
      </button>
      <button
        class="update-bttn btn btn-outline danger"
        type="button"
      >
        수정
      </button>
      <button
        class="delete-bttn btn btn-outline danger"
        type="button"
      >
        삭제
      </button>
    </span>
  `;
    
}
    
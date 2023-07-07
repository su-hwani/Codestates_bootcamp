const board = document.getElementById('board');

function addADs() {
    var idx = document.getElementById('addIdx').value;
    var title = document.getElementById('addTitle').value;
    var text = document.getElementById('addText').value;
    var exposure = document.getElementById('addExposure').value;
    var count = document.getElementById('addCount').value;
    var regdate = document.getElementById('addRegdate').value;
    console.log(idx);
    event.preventDefault();
    board.innerHTML
        += `<tr>
    <td></td>
    <td>${title}</td>
    <td>${text}</td>
    <td><span class="tag tag-success">${exposure}</span></td>
    <td>
      ${count}
    </td>
    <td>${regdate}</td>
    <td>
      <span
        ><button
          class="detail-bttn btn btn-outline danger"
          type="button"
        >
          상세
        </button>
        <button
          class="update-bttn btn btn-outline danger"
          type="button" onclick="update()"
        >
          수정
        </button>
        <button
          class="delete-bttn btn btn-outline danger"
          type="button" onclick="del()"
        >
          삭제
        </button>
      </span>
    </td>
  </tr>`;

    addClick();
}
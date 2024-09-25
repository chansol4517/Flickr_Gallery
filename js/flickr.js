fetchFlickr("interest");

//body요소에 클릭했을때 클릭한요소의 클래스명을 구분자로 설정
//특정 요소에 특정 함수 연결
document.body.addEventListener("click", (e) => {
  if (e.target.className === "thumb") createModal(e);
  if (e.target.className === "btnClose") removeModal();
});

//flickr fetching함수
function fetchFlickr(type) {
  const list = document.querySelector(".list");
  const api_key = "4d169468c797367f117aa87d17803eac";
  const baseURL = `https://www.flickr.com/services/rest/?api_key=${api_key}&method=`;
  const myID = "201491619@N03";
  const method_mine = "flickr.people.getPhotos";
  //method_interest는 flickr자체적으로 인기가 많은 이미지를 출력하는 메서드
  const method_interest = "flickr.interestingness.getList";

  //아래 2가지 타입의 요청 url생성  url_mine(내갤러리 호출url), url_interest(플리커 인기이미지 호출url)
  let url_mine = `${baseURL}${method_mine}&user_id=${myID}&nojsoncallback=1&format=json`;
  let url_interest = `${baseURL}${method_interest}&nojsoncallback=1&format=json`;

  //fetchFlickr함수 호출시 파라미터로 전달된 인수값이 mine이면 마이갤러리 요청 url을 fetch함수에 전달
  //그렇지 않으면 인기이미지 요청 url을 fetch함수에 전달
  let result_url = type === "mine" ? url_mine : url_interest;

  fetch(result_url)
    .then((data) => data.json())
    .then((json) => {
      const picArr = json.photos.photo;
      let tags = "";

      picArr.forEach((pic) => {
        tags += `
        <li>
          <figure class='pic'>
            <img class='thumb' src="https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_z.jpg" alt="https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg" />
          </figure>
          <h2>${pic.title}</h2>

          <div class='profile'>
            <img src='http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg' alt=${pic.owner} /> <span>${pic.owner}</span>
          </div>
        </li>
      `;
      });

      list.innerHTML = tags;
    });
}

//모달생성 함수
function createModal(e) {
  const imgSrc = e.target.getAttribute("alt");

  const modal = document.createElement("aside");
  modal.classList.add("modal");
  modal.innerHTML = `
      <div class='con'>
        <img src=${imgSrc} />
      </div>
      <button class='btnClose'>CLOSE</button>
    `;
  document.body.append(modal);
}

//모달 제거함수
function removeModal() {
  document.querySelector(".modal").remove();
}

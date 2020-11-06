// TODO: 목록 보여주게하는 버튼? 원래는 검색창 검색버튼
class SearchView {
  _parentEl = document.querySelector(".header__logo");

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("click", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();

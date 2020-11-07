import View from "./View.js";
import icons from "url:../../img/icons.svg"; // Parcel 2

class AddPostView extends View {
  _parentElement = document.querySelector(".upload");
  _message = "Post was successfully uploaded :)";

  _window = document.querySelector(".add-post-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-post");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);

      //test
      console.log("dataArr:", dataArr);
      console.log("data: ", data);
    });
  }

  _generateMarkup() {}
}

export default new AddPostView();

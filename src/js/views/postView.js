import View from "./View.js";

// import icons from '../img/icons.svg'; // Parcel 1
import icons from "url:../../img/icons.svg"; // Parcel 2

class PostView extends View {
  _parentElement = document.querySelector(".post");
  _errorMessage = "We could not find that post. Please try another one!";
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
    <figure class="post__fig">
      <img src="${this._data.image}500" alt="${
      this._data.title
    }" class="post__img" />
      <h1 class="post__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="post__details">
      <div class="post__info">
        <svg class="post__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="post__info-text">user id ${this._data.userId}</span>
      </div>

      <div class="post__user-generated ${this._data.key ? "" : "hidden"}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      
      
    </div>

    <div class="post__text">
      <h2 class="heading--2">Lorem Ipsum dolor</h2>
      <p>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  C/O https://placeholder.com/text/lorem-ipsum/</p>
      <br>
      <p><strong>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</strong> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</P>
    </div>
    
    <div class="post__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="post__directions-text">
        This post was carefully designed and tested by
        <span class="post__publisher">${
          this._data.userId
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small post__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
      `;
  }
}

export default new PostView();

import * as model from "./model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import postView from "./views/postView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import addPostView from "./views/addPostView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

const controlPosts = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    postView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 2) Loading post
    await model.loadPost(id);

    // 3) Rendering Post
    postView.render(model.state.post);
  } catch (err) {
    postView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Load search results
    await model.loadSearchResults();

    // 2) Render results
    resultsView.render(model.getSearchResultsPage());

    // 3) Render initial pagination buttons
    paginationView.render(model.state.posts);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(model.state.posts);
};

const controlAddPost = async function (newPost) {
  try {
    // Show loading spinner
    addPostView.renderSpinner();

    // Upload the new Post data
    await model.uploadPost(newPost);
    console.log(model.state.post);

    // Render Post
    postView.render(model.state.post);

    // Success message
    addPostView.renderMessage();

    // Change ID in URL
    window.history.pushState(null, "", `#${model.state.post.id}`);

    // Close form window
    setTimeout(function () {
      addPostView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("💥", err);
    addPostView.renderError(err.message);
  }
};

const init = function () {
  postView.addHandlerRender(controlPosts);
  // searchView.addHandlerSearch(controlSearchResults);
  controlSearchResults();
  paginationView.addHandlerClick(controlPagination);
  addPostView.addHandlerUpload(controlAddPost);
};
init();

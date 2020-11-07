import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, IMG_URL } from "./config.js";
// import { getJSON } from "./helpers.js";
import { AJAX } from "./helpers.js";

export const state = {
  post: {},
  posts: {
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createPostObject = function (data) {
  const post = data;
  return {
    id: post.id,
    title: post.title,
    userId: post.userId,
    image: IMG_URL,
    ...(post.key && { key: post.key }),
  };
};

export const loadPost = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}`);
    state.post = createPostObject(data);

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.post.bookmarked = true;
    else state.post.bookmarked = false;

    console.log(state.post);
  } catch (err) {
    // Temp error handling
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function () {
  try {
    const data = await AJAX(`${API_URL}`);
    console.log(data);

    state.posts.results = data.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        userId: rec.userId,
        image: IMG_URL,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.posts.page = 1;
  } catch (err) {
    console.error(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.posts.page) {
  state.posts.page = page;

  const start = (page - 1) * state.posts.resultsPerPage; // 0
  const end = page * state.posts.resultsPerPage; // 9

  return state.posts.results.slice(start, end);
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export const uploadPost = async function (newPost) {
  try {
    const post = {
      title: newPost.title,
      userId: newPost.userId,
    };
    //test
    // console.log("newData: ", post);

    const data = await AJAX(`${API_URL}`, post);
    state.post = createPostObject(data);
    // console.log("created new object", state.post);
  } catch (err) {
    throw err;
  }
};

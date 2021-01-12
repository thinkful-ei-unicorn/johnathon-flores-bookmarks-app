
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/johnathon/bookmarks';

function bookmarkApiFetch(...args) {
  let error;
  return fetch(...args)
    .then((response) => {
      if (!response.ok) {
        error = { code: response.status };
        if (!response.headers
          .get('Content-Type')
          .includes('json')) {
          error.message = response.statusText;
          return Promise.reject(error);
        }
      }

      return response.json();
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}
function getBookmarks() {
  return bookmarkApiFetch(`${BASE_URL}`);
}

function postBookmark(newBM) {
  return bookmarkApiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: newBM
  });
}

function deleteBookmark(id) {
  return bookmarkApiFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
}

export default {
  getBookmarks,
  postBookmark,
  deleteBookmark
};
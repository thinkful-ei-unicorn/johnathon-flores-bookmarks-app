let url = 'https://thinkful-list-api.herokuapp.com/johnathon/bookmarks';

function apiFetch(...args) {
  let error;
  return fetch(...args)
    .then((response) => {
      if (!response.ok) {
        error = {
          code: response.status,
        };
        if (!response.headers.get('Content-Type')
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

function getBookmark() {
  return apiFetch(url, {});
}

function createBookmark(bookmark) {
  let newBookmark = JSON.stringify(bookmark);
  return apiFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newBookmark,
  });
}

function updateBookmark(id, updateData) {
  let updateBookmark = JSON.stringify(updateData);

  return apiFetch(`${url}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: updateBookmark,
  });
}

function deleteBookmark(id) {
  return apiFetch(`${url}/${id}`, {
    method: 'Delete',
  });
}

export default {
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark,
};
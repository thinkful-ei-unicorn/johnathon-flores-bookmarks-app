const bookmarks = [];
const adding = false;
const error = null;
const filter = 0;

function findById(id) {
  //this function will be responsible for Returning 
  // bookmark with matching id
  let foundBookmark = this.bookmarks
    .find((currentBookmark) => 
      currentBookmark.id === id);
  return foundBookmark;
}


function addBookmark(bookmark) {
  //this function will be responsible for adding bookmark to bookmark list
  this.bookmarks.push(bookmark);
}


function findAndDelete(id) {
  //this function will be responsible for deleting bookmark with the matching id
  this.bookmarks = this.bookmarks
    .filter((currentBookmark) => 
      currentBookmark.id !== id);
}

function filterByRatings() {
  //this function will be responsible for filtering bookmarks by rating
  let filteredList = this.bookmarks
    .filter((currentBookmark) => 
      currentBookmark.rating >= this.store.filter);
  return filteredList;
}

//Defines store filter
function setFilter(rating) {
  this.filter = rating;
}

function setError() {
  this.error = error;
}
export default {
  bookmarks,
  adding,
  error,
  filter,
  addBookmark,
  findById,
  findAndDelete,
  filterByRatings,
  setFilter,
  setError
};
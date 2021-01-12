import cuid from 'cuid';

const bookmarks = [];
const adding = false;
const filter = null;
const error = null;


function addBookmark(bookmark) {
  bookmark.id = cuid();
  bookmark.expanded=false;
  this.bookmarks.push(bookmark);
}

function findById(id) {
  let target = bookmarks.find((bookmark) => 
    bookmark.id === id);
  return target;
}

function findAndUpdate(id, object){
  let foundBookmark = findById(id);
  Object.assign(foundBookmark, object);
}

function findAndDelete(id) {
  this.bookmarks = this.bookmarks.filter(current => 
    current.id !== id);
}

function setError(error) {
  this.error = error;
}

export default {
  bookmarks,
  adding,
  filter,
  error,
  addBookmark,
  findById,
  findAndUpdate,
  findAndDelete,
  setError
};
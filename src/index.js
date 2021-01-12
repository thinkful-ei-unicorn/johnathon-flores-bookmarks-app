import $ from 'jquery';
import api from './api';
import bookmark from './bookmark-list.js';
import store from './store.js';
import './index.css';

function main(){
  api.getBookmark()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => 
        store.addBookmark(bookmark));
        bookmarks.forEach((bookmark) => bookmark.expanded = false);
        bookmark.render();
    });
  bookmark.bindEventListeners();
  bookmark.render();
}

$(main);
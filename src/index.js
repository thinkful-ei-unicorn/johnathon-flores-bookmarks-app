import $ from 'jquery';
import api from './api';
import bookmarkList from './bookmark-list';
import './index.css';

function main() {
  bookmarkList.generateMain();
  bookmarkList.bindEventListeners();
  api.getBookmarks()
    .then((bookmarks) => {
      bookmarkList.render();
    });
}

$(main);


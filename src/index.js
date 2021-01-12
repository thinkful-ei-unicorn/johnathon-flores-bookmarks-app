import $ from 'jquery';
import api from './api';
import bookmark from './bookmark-list';
import './index.css';

function main() {
  bookmark.generateMainUI();
  bookmark.bindEventListeners();
  api.getBookmarks()
    .then((bookmarks) => {
      bookmark.render();
    });
}

$(main);


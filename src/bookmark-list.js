import $ from 'jquery';
import store from './store';

import api from './api.js';

//generates add new bookmark button, dropdown option to filter by rating, and container for the list of saved bookmarks

function generateMainUI() {
  // changed newBookmark to #create
  // changed avlle from newBookmark to create
  // changes 
  return `
		<header class="bookmarks">
			<h1>My Bookmarks</h1>
    </header>   
    <main>
    <div class="error-message"></div>
      <section class="align">
        <div class="actions">
          <div id="addNewBookmark">
            <button type="button" id="create">Create a Bookmark</button>
          </div>
          <div class="filter">
            <form name="rating" id="filterBookMark">
              <select name="bookmarks" id="rating">
                <option value="" disabled selected>Filter</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>	
              <input id="filterSubmit" type="submit" value="Submit">  
            </form>
          </div>
          </div>
            <div class="bookmarks hidden">
              <fieldset>
                <form id="createBookmark">
                  <label for="title">Title:</label><br>
                  <input type="text" id="title" placeholder="Title of page" required><br><br>
                  <label for="link">URL Link:</label><br>
                  <input type="text" id="link" minlength="5" pattern="https?://.+" placeholder="https://www.iafp.org" required><br><br>
                  <label for="description">Description:</label><br>
                  <textarea id ="description" name="Description" rows="10" cols="30" placeholder="Add a brief description."></textarea><br><br>
                  <label for="rating">Rating:  
                    <select name="rating" id="rating">
                      <option value="" disabled selected>Rating</option>
                      <option value="1">1 Star</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </select>
                  </label><br><br>
                  <button id="cancel"> Cancel </button>
                  <input type="submit" id="create" value="Add Bookmark"><br><br>	
                </form>
            </fieldset>
          </div>
            <br>
            <div class="myBookmarks"><h2>My Bookmarks</h2>
            <div class="js-bookmark-list"></div>
            </div>
      </section>  
    </main>
		
	`;
}

//generates the list of added bookmarks, with ability to expand with extra details
function generateBookmarkElement(bookmark) {
  let rating = '';
  if (bookmark.rating === null) {
    rating = 'Was not Rated';
  }
  else {
    rating = bookmark.rating;
  }

  let description;
  if (bookmark.desc === null) {
    description = 'No Description';
  }
  else {
    description = bookmark.desc;
  }
  let bookmarkList = `<div class="list-group js-bookmark-item" data-item-id="${bookmark.id}">    
							<p>Title: ${bookmark.title}</p>
							<p>Rating: ${rating}</p>
							<div ${bookmark.expanded === true ? '' : 'style=\'display: none\''}>  
								<ul class="scroll">
									<li> Visit Site: <a href="${bookmark.url}" target="_blank">${bookmark.url}</a></li>
									<li> Description: ${description}</li>
								</ul>
							</div>
							<div>
                <button type="button" id="deleteBookmark">Delete</button>
                <button type="button" id="expanded">+</button></div><br>
							</div>
	</div>`;
  return bookmarkList;
}

function generateBookmarkListString(bookmark) {
  let bookmarkList = bookmark.map((bookmarklist) =>
    generateBookmarkElement(bookmarklist));
  return bookmarkList.join('');
}

function getBookmarkIdFromElement(bookmarkElement) {
  return $(bookmarkElement)
    .closest('.js-bookmark-item')
    .data('item-id');
}

function generateError(message) {
  return `
    <section class="error-content">
				<button id="cancel-error-message">x</button>
				<p>${message}</p>
    </section>
  `;
}

function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-message').html(el);
  } else {
    $('.error-message').empty();
  }
}

//all handle functions are event listeners
function handleCreateBookmark() {
  $('#js-app').on('click', '#addNewBookmark', '#create', (event) => {
    event.preventDefault();
    store.adding = true;
    render();
  });
}

function handleSaveBookmark() {
  $('#js-app').on('submit', '#createBookmark', (event) => {
    event.preventDefault();
    store.adding = false;
    let userBookmarkInfo = {
      title: $('#title').val(),
      url: $('#link').val(),
      description: $('#description').val(),
      rating: $('#rating').val(),
    };
    api.createBookmark(userBookmarkInfo)
      .then((bookmarkData) => {
        store.addBookmark(bookmarkData);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
}

function handleCancelButton() {
  $('#js-app').on('click', '#cancel', (event) => {
    event.preventDefault();
    store.adding = false;
    render();
  });
}

function handleFilterBookmark() {
  $('#js-app').on('submit', '#filterBookMark', (event) => {
    event.preventDefault();
    store.setFilter($('#rating').val());
    render();
  });
}

function handleDeleteBookmark() {
  $('#js-app').on('click', '#deleteBookmark', (event) => {
    event.preventDefault();
    let bookmarkId = getBookmarkIdFromElement(event.currentTarget);
    api.deleteBookmark(bookmarkId)
      .then(() => {
        store.findAndDelete(bookmarkId);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
}

function handleDetailsButton() {
  $('#js-app').on('click', '#expanded', (event) => {
    event.preventDefault();
    let bookmarkId = getBookmarkIdFromElement($(event.currentTarget));
    let bookmark = store.findById(bookmarkId);
    bookmark.expanded = !bookmark.expanded;
    render();
  });
}

//renders the main page
function render() {
  $('#js-app').html(generateMainUI());
  if (store.adding === true) {
    $('.hidden').removeClass();
  }
  generateError();
  const filteredList = store.filterByRatings();
  const bookmarkString = generateBookmarkListString(filteredList);
  $('.js-bookmark-list').html(bookmarkString);
}

function bindEventListeners() {
  handleCreateBookmark();
  handleCancelButton();
  handleSaveBookmark();
  handleFilterBookmark();
  handleDeleteBookmark();
  handleDetailsButton();
}

export default {
  render,
  bindEventListeners
};
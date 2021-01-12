import $ from 'jquery';
import store from './store';
import api from './api';

//HTML Generators

function generateMainUI(){
  
  $('#js-app').html(
    `
    <h1>My Bookmarks</h1>
    <section class='controls'>
        <button aria-label='add new bookmark'class='new' name='new bookmark'>New +</button>
        
        <select aria-label='filter results' class='filter' id='filter' name='filter'>
          <option name='filter options'>Filter</option>
          <option name='1 star' value='1'>1+</option>
          <option name='2 stars' value='2'>2+</option>
          <option name='3 stars' value='3'>3+</option>
          <option name='4 stars' value='4'>4+</option>
          <option name='5 stars' value='5'>5</option>
        </label>
        </select>
    </section>
    <section class='error-message'>
    </section>
    <section class='bookmark-list-view'>
      
    </section>`);
}

function generateAddNewUI() {
  return `<section class='create'>
        <form aria-label='new bookmark form' name='new bookmark form' class='newBookmark' id='newBookmark'>
          <fieldset>
            <legend>New Bookmark</legend>
            <label for='title'>Title:
              <input type='text' name='title' id='title' placeholder='Thinkful' required>
            </label>
              <br>
      
            <label for='url'>URL:
              <input type='url' name='url' id='url' placeholder='http://' required>
            </label>
      
              <br>
      
            <label for='description'>Description:
              <textarea aria-label='enter description' name='desc' class='newItemDesc' id='newItemDesc'></textarea>
            </label>
              <br>
          <div class='addRating'>
            <label for='new item rating'>Rating:
              <select aria-label='new bookmark rating' name='rating' id='rating' class='rating-select' default='1' required>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </label>
            
          <label for='submit'>  
            <button aria-label='submit new bookmark' type='submit' class='add'>Add</button>
            <span></span><button aria-label='cancel bookmark' type='submit' class='cancel'>Cancel</button>
          </label>
        </div>
          </fieldset>
        </form>
      </section>
  `;
}

function generateCondensedViewUI(bookmark) {
  return `
  <li class='bookmarkElement condensed' id='${bookmark.id}'>
      <button class='titleRating'>
      <h2 class='bookmarkHeader'>${bookmark.title}</h2>
    <div class='rating'>
    <p class="rating-total">${bookmark.rating === null ? 'No rating' : bookmark.rating}</p>
    </div>
    </button>
  </li>
  `;
}

function generateExpandedViewUI(bookmark) {
  return ` <li class='bookmarkElement expanded' id='${bookmark.id}'>
        <button class='collapse'>
          <h2 class='bookmarkHeader'>${bookmark.title}</h2>
    
          <div class='rating'>
            <p class="rating-total">${bookmark.rating === null ? 'No rating yet' : bookmark.rating}</p>
          </div>
        </button>
          <p class='bookmarkDescription'>${bookmark.desc === '' ? 'No description' : bookmark.desc}</p>
        <div class='visit'>
          <button class='visitPage'><a href=${bookmark.url} target="blank" id="bookmarkLink">Visit Page</a></button>
          <button class='delete'>Remove</button>
        </div>
      </section>`;
}

function generateError(error){
  return `
      <div class='error-message'>
        <h3>--ERROR--</h3>
        <span>${error}</span>
        <button class='closeError'>Close</button>
      </div>`;
}

//String Generators

function generateBookmarkString(bookmarkList) {
  const bookmarkHTML = bookmarkList.map((bookmark) => {
    if (bookmark.expanded === false) {
      return generateCondensedViewUI(bookmark);
    } else {
      return generateExpandedViewUI(bookmark);
    }
  });
  return bookmarkHTML.join('');
}

function generateFilteredViewtring(bookmarks) {
  let html = bookmarks.map((bookmark) => {
    if (bookmark.rating >= store.filter) {
      if (bookmark.expanded === true) {
        return generateExpandedViewUI(bookmark);
      } else {
        return generateCondensedViewUI(bookmark);
      }
    }
  });
  return html.join('');
}

//render functions
function renderError(){
  if (store.error) {
    const err = generateError(store.error);
    $('.error-message').html(err);
  } else {
    $('.error-message').empty();
  }
}

function render() {
  renderError();
  if (store.adding) {
    let html = generateAddNewUI();
    $('.bookmark-list-view').html(html);
  } else if (store.filter === 0) {
    let listHtml = generateBookmarkString(store.bookmarks);
    let html = `<ul class='bookmark-list'>${listHtml}</ul>`;
    $('.bookmark-list-view').html(html);
  } else {
    let listHtml = generateFilteredViewtring(store.bookmarks);
    let html = `<ul class='bookmark-list'>${listHtml}</ul>`;
    $('.bookmark-list-view').html(html);
  }
}

$.fn.extend({
  // this function serializes JSON
  serializeJson: function () {
    const formData = new FormData(this[0]);
    const obj = {};
    formData.forEach((val, name) => (obj[name] = val));
    return JSON.stringify(obj);
  }
});



//Event Listeners

function handleAddNew() {
  $('.new').on('click', function () {
    store.adding = true;
    render();
  });
}

function handleSubmitNew() {
  $('.bookmark-list-view').on('submit', 'form', function (event) {
    event.preventDefault();
    store.adding = false;
    let newBookmark = $(event.target).serializeJson();
    api.postBookmark(newBookmark).then((newEntry) => 
    {
      store.addBookmark(newEntry);
      render();
    })
    .catch((error) => {
        store.setError(error.message);
        render();
      });
  });
}

function handleFilter() {
  $('.filter').on('change', function () {
    let filterRating = $('.filter option:selected').val();
    store.filter = filterRating;
    render();
  });
}

function handleExpand() {
  $('.bookmark-list-view').on('click', '.titleRating', function (event) {
    let targetBookmark = $(event.target).closest('li').attr('id');
    store.findAndUpdate(targetBookmark, { expanded: true });
    render();
  });
}

function handleCollapse() {
  $('.bookmark-list-view').on('click', '.collapse', function (event) {
    let targetBookmark = $(event.target).closest('li').attr('id');
    store.findAndUpdate(targetBookmark, { expanded: false });
    render();
  });
}

function handleDelete() {
  $('.bookmark-list-view').on('click', '.delete', function (event) {
    let targetBookmark = $(event.target).closest('li').attr('id');
    api.deleteBookmark(targetBookmark);
    store.findAndDelete(targetBookmark);
    render();
  });
}

function handleCloseError(){
  $('.error-container').on('click', '.closeError', () => {
    store.setError(null);
    render();
  });
}

function handleCancelButton(){
  $('.bookmark-list-view').on('click', '.cancel', (event) =>
  {
    event.preventDefault();
    store.adding = false;
    render();
  });
}

function bindEventListeners() {
  handleAddNew();
  handleSubmitNew();
  handleFilter();
  handleExpand();
  handleCollapse();
  handleDelete();
  handleCloseError();
  handleCancelButton();
}

export default {
  generateMainUI,
  bindEventListeners,
  render
};
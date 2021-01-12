import $ from 'jquery';
import store from './store';
import api from './api';

//HTML Generators

function generateMain(){
  console.log('the page is rendering');
  $('#js-app').html(`<h1>My Bookmarks</h1>
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
    <section class='errPopUp'>
    </section>
    <section class='bookmarkListHTML'>
      
    </section>`);
}

function genAddNew() {
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
          <div class='addRate'>
            <label for='new item rating'>Rating:
              <select aria-label='new bookmark rating' name='rating' id='newRating' class='newRating-select' default='1' required>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </label>
            
          <label for='submit'>  
            <button aria-label='submit new bookmark' type='submit' class='add'>Add</button>
          </label>
        </div>
          </fieldset>
        </form>
      </section>`;
}

function genBMCondensed(bookmark) {
  return `<li class='bookmarkElement condensed' id='${bookmark.id}'>
      <button class='titleRating'>
      <h2 class='bookmarkHeader'>${bookmark.title}</h2>
    <div class='rating'>
    <p class="rating-total">${bookmark.rating === null ? 'No rating' : bookmark.rating}</p>
    </div>
    </button>
  </li>`;
}

function genBMExpand(bookmark) {
  console.log('expanding bookmark...');
  return ` <li class='bookmarkElement expanded' id='${bookmark.id}'>
        <button class='collapse'>
          <h2 class='bookmarkHeader'>${bookmark.title}</h2>
    
          <div class='rating'>
            <p class="rating-total">${bookmark.rating === null ? 'No rating yet' : bookmark.rating}</p>
          </div>
        </button>
          <p class='bookmarkDescription'>${bookmark.desc === '' ? 'No description' : bookmark.desc}</p>
        <div class='visRem'>
          <button class='visitPage'><a href=${bookmark.url} target="blank" id="bookmarkLink">Visit Page</a></button>
          <button class='delete'>Remove</button>
        </div>
      </section>`;
}

function genErr(error){
  return `
      <div class='error-message'>
        <h3>--ERROR--</h3>
        <span>${error}</span>
        <button class='closeError'>Close</button>
      </div>`;
}



//String Generators

function genBMString(bookmarkList) {
  const bookmarkHTML = bookmarkList.map((bookmark) => {
    if (bookmark.expanded === false) {
      return genBMCondensed(bookmark);
    } else {
      return genBMExpand(bookmark);
    }
  });
  return bookmarkHTML.join('');
}

function genFilteredBMString(bookmarks) {
  let html = bookmarks.map((bookmark) => {
    if (bookmark.rating >= store.filter) {
      if (bookmark.expanded === true) {
        return genBMExpand(bookmark);
      } else {
        return genBMCondensed(bookmark);
      }
    }
  });
  return html.join('');
}



//Render Functions

function renderErr(){
  if (store.error) {
    const err = genErr(store.error);
    $('.errPopUp').html(err);
  } else {
    $('.errPopUp').empty();
  }
}

function render() {
  renderErr();
  if (store.adding) {
    let html = genAddNew();
    $('.bookmarkListHTML').html(html);
  } else if (store.filter === 0) {
    let listHtml = genBMString(store.bookmarks);
    let html = `<ul class='bookmark-list'>${listHtml}</ul>`;
    $('.bookmarkListHTML').html(html);
  } else {
    let listHtml = genFilteredBMString(store.bookmarks);
    let html = `<ul class='bookmark-list'>${listHtml}</ul>`;
    $('.bookmarkListHTML').html(html);
  }
}



//serialize/stringify JSON

$.fn.extend({
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
  $('.bookmarkListHTML').on('submit', 'form', function (event) {
    event.preventDefault();
    store.adding = false;
    let newBM = $(event.target).serializeJson();
    console.log(newBM);
    api.postBookmark(newBM).then((newEntry) => {
      store.addBookmark(newEntry);
      render();
    })
      .catch((error) => {
        console.log(error);
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
  $('.bookmarkListHTML').on('click', '.titleRating', function (event) {
    console.log('clicked expand...');
    let targetId = $(event.target).closest('li').attr('id');
    console.log(`${targetId}`);
    store.findAndUpdate(targetId, { expanded: true });
    render();
  });
}

function handleCollapse() {
  $('.bookmarkListHTML').on('click', '.collapse', function (event) {
    let targetId = $(event.target).closest('li').attr('id');
    store.findAndUpdate(targetId, { expanded: false });
    render();
  });
}

function handleDelete() {
  $('.bookmarkListHTML').on('click', '.delete', function (event) {
    let targetId = $(event.target).closest('li').attr('id');
    api.deleteBookmark(targetId);
    store.findAndDelete(targetId);
    render();
  });
}

function handleCloseError(){
  $('.error-container').on('click', '.closeError', () => {
    store.setError(null);
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
}

export default {
  generateMain,
  bindEventListeners,
  render
};
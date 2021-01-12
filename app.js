'use-strict';
// store
const store = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0,
    new: false
};


/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
// Welcome Page

// function generateStartingState
function generateStartingStateHeaderUI() {
    console.log('generating starting state header');
    return `
        <header>
            <section class="add-bookmark">
                <h1>Add my first bookmark</h1>
            </section>
        </header>
    `;
}

function generateStartingStateButton() {
    console.log('generating starting state button');
    return `
        <div class="actions">
            <button id="createNew"> New</span value=""></button>
        </div>
        `;
}

function generateStartingStateCreateBookMarkUI() {
    console.log('generating create bookmark piece');
    const startingButton = generateStartingStateButton();
    return `
        <main>
            <section class="align"></section>
                <div class="filter">
                    ${startingButton}
                </div> 
            </section>
        </main>
        `;
}

function generateStartingStateUI() {
    console.log('generating starting state UI');
    const startingHeader = generateStartingStateHeaderUI();
    const createFirstBookMark = generateStartingStateCreateBookMarkUI();

    //this function will be responsible for generating a string of the bookmarks starting state
    return `
        ${startingHeader}
        ${createFirstBookMark}
    `;
}

function generateWithBookMarksHeaderUI() {
    console.log('the generateWithBookMarksHeaderUI function ran');
    return `
        <header>
            <section class="bookmarks">
                <h1>My Bookmarks</h1>
                <h2>This will display when there is more than 1 book mark in the data storage</h2>
            </section>
        </header>
    `;
}

function genererateBookmarksFilterFeatureUI() {
    console.log('the genererateBookmarksFilterFeatureUI function ran');
    return `
        <div class="filter">
            <div class="actions">
                <button id="createNew"> New</span value=""></button>
                <label for="bookmarks">Filter By:</label>
                <select name="bookmarks" id="bookmarks" size="1">
                    <option value="rating-1">1<span> rating-value</span></option>
                    <option value="rating-2">2<span> rating-value</span></option>
                    <option value="rating-3">3<span> rating-value</span></option>
                    <option value="rating-4">4<span> rating-value</span></option>
                    <option value="rating-5">5<span> rating-value</span></option>
                </select>
            </div>
        </div>
    `;
}

function generateBookmarksListUI() {
    console.log('the generateBookmarksListUI function ran');
    return `
        <div class="bookmarks list-group js-condensed">
            <div class="center">
                <ul class="item">
                    <li><span>Title 1</span> "rating-value"</li>
                </ul>
                <ul class="item">
                    <li><span>Title 2</span> "rating-value"</li>
                </ul>
                <ul class="item">
                    <li><span>Title 3</span> "rating-value"</li>
                </ul>
                <ul class="item">
                    <li><span>Title 4</span> "rating-value"</li>
                </ul>
                <ul class="item">
                    <li><span>Title 5</span> "rating-value"</li>
                </ul>
            </div>
        </div>
    `;
}

function generateStartingStateWithListIU() {
    console.log('the generateStartingStateWithListIU function ran');
    const headerUI = generateWithBookMarksHeaderUI();
    const filterFeatureUI = genererateBookmarksFilterFeatureUI();
    const bookmarksListUI = generateBookmarksListUI();
    return `
        ${headerUI}
        <main>
            <section class="align">
                ${filterFeatureUI}
                ${bookmarksListUI}
            </section>
        </main>
        <footer></footer>
    `;
}

// expanded view
function expandedStateUI() {
    // this function will be responsible for generating a string of the bookmarks expanded state
}

function generateBookmarkSubmissionFormUI() {
    console.log('the generateBookmarkSubmissionFormUI function ran');
    
    return `
        <div class="bookmark-form">
            <div class="center">
                <div class="actions">
                    <fieldset>
                        <form id="js-bookmark-form">
                            <label for="bookmark-name-entry">Add New Bookmark</label>
                            <br>
                            <input type="text" name="bookmark-name-entry" class="js-form-list-entry"
                                placeholder="https://www.iafp.org">
                            <br>
                            <div class="js-edit-bookmark">
                                <input class="bookmark-title-text" type="text"
                                    value="bookmarktitle" /><span>EDIT
                                    ICON</span>
                            </div>
                            <div>
                                <div>**** ratingIcon ****</div>
                            </div>
                            <div class="text-area">
                                <textarea id="bookmark-input" name="bookmark-input" maxlength="99"
                                    placeholder="Add a brief description of your bookmark" required></textarea>
                            
                                <div class="button-actions">
                                    <div class="add-bookmark-buttons">
                                        <button type="submit" id="cancel">Cancel</button>
                                        <span>
                                            <button type="submit" id="create">Create</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </fieldset>
                </div>
            </div>
        </div>
`;
}
function generateNewBookmarkFormUI() {
    console.log('the generateNewBookmarkFormUI function ran');
    const headerUI = generateWithBookMarksHeaderUI();
    const bookmarkFormUI = generateBookmarkSubmissionFormUI();
    // this function will be responsible for generating a form to submit a bookmark
    return `
    ${headerUI}

    <main>
        <section class="align"></section>
            ${bookmarkFormUI}
        </section>
    </main>
    <footer></footer>  
    `;
}

function generateBookmarkRatingIcon() {
    // this function will be responsible for generating the bookmark rating icon
}

function generateBookmarkScrollBar() {
    // this function will be responsible for generating the bookmark scroll bar
}


/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
//function renderPage()
function renderUI() {
    console.log('renderUI function ran');
    const app = $('#js-app');
    const startingStateUI = generateStartingStateUI();
    const addBoomarkStateUI = generateNewBookmarkFormUI();
    const startingStateWithListUI = generateStartingStateWithListIU();
    if(store.new === false) {
        app.html(startingStateUI);
    }
    if(store.new === true) {
        app.html(addBoomarkStateUI);
    }
    else if(store.adding === true) {
        app.html(startingStateWithListUI);
    }
    else if(store.adding === false) {
        throw new Error('must include details');
    }

    
}



/********** EVENT HANDLER FUNCTIONS **********/

function handleNewBookmarkClick() {
    // this function will be responsible for when user clicks on the create new bookmark button
    // if there are no bookmarks in list
    // iterate through store and call the generate book mark function
    console.log('the handleNewBookmarkClick function ran');
    $('#js-app').on('click', '#createNew', event => {
        console.log('the create new button was clicked!');
        store.new = true;
        renderUI();
    });

}

function handleNewBookmarkButtons() {
    // this function will be responsible for generating the bookmark rating icon
    // listen to the cancel button #cancel
    // if cancel button
    console.log('the handleNewBookmarkButtons function ran');
    $('#js-app').on('submit', '#cancel', event => {
        event.preventDefault();
        console.log('the cancel new button was clicked!');
        store.adding= false;
        renderUI();
    });
    // delete the bookmark view
    // re render page
    // if create button #create
    $('#js-app').on('submit', '#create', event => {
        console.log('the cancel new button was clicked!');
        store.new = true;
        renderUI();
    });
    // add the bookmark information to the data storage
    // submit the information and change state

}

function handleBookmarkFilter() {
    //this function will be responsible for when user clicks on the filter by button
    // listens to user input
    // iterate through the data stored
    // match the input with the filter state in store
    // update state
}

function handleExpandBookmark() {
    // this  function will be responsible for when user clicks on the title of the bookmark
    // call the showdetails function
    // showdetails function will iterate the date stored
    // show details checks the current event current, finds the id
    // displays details of the respctive bookmark with matching id
}

function handleBookmarkRating() {
    // this function will be responsible for when user clicks on the rating icon
    // update state
}

function handleBookmarkDeletion() {
    // this function will be responsible for when the user clicks on the trash icon
}

function handleBookmarkScroll() {
    // this function will be responsible for when the user taps/clicks on the scroll bar
    // listen to scroll bar js
}


/********** CALLBACKS **********/
function handleBookmarks() {
    // insert all the callbacks here
    console.log('handleBookmarks was called as a callback!');
    generateStartingStateUI();
    renderUI();
    handleNewBookmarkClick();
    generateNewBookmarkFormUI();

}
$(handleBookmarks);
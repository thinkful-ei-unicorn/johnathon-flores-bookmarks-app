'use-strict';
// store




/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
// Welcome Page
// function generateStartingState
function generateStartingState() {
    //this function will be responsible for generating a string of the bookmarks starting state
}

// expanded view
function expandedState() {
    // this function will be responsible for generating a string of the bookmarks expanded state
}

function generateNewBookmark() {
    // this function will be responsible for generating a form to submit a bookmark
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




/********** EVENT HANDLER FUNCTIONS **********/

function handleNewBookmarkClick() {
    // this function will be responsible for when user clicks on the create new bookmark button
    // if there are no bookmarks in list
    // iterate through store and call the generate book mark function

}

function handleNewBookBookmarkButtons() {
    // this function will be responsible for generating the bookmark rating icon
    // listen to the cancel button
        // if cancel button
            // delete the bookmark view
                // re render page
        // if create button
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
  
}
$(handleBookmarks);
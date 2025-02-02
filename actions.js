
// on body load attach listener
function onPageLoad() {
    // add event listener for search button when Enter is pressed
    var input = document.getElementById("search");
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            receive();
        }
    });
}

// spinner control
function toggleSpiner() {
    var spinner = document.getElementsByClassName("spinner-border")[0];

    if (spinner.style.display === "none") {
        spinner.style.display = "block";
    } else {
        spinner.style.display = "none";
    }
}

// action for 'clear' button
function clearList() {
    document.getElementById("search").value = "";
    document.getElementById("content").innerHTML = "";
}

// use Google API to translate the whole page
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: "en" }, "google_translate_element");
}

function handleResponse(response) {
    // if items were not found
    if (response.totalItems === 0) {
        // hide spinner
        toggleSpiner();

        return;
    }

    document.getElementById("content").innerHTML = "";

    // create books table
    var booksTable = '<table class="table"> <thead> <tr> <th scope="col"> # </th> <th scope="col"> Titlu </th><th scope="col"> Autor </th><th scope="col"> Categorie </th> </tr> </thead> <tbody>';

    for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i].volumeInfo;
        booksTable += "<tr>";
        booksTable += "<th>" + (i + 1) + "</th>";
        booksTable += "<th>" + item.title + "</th>";
        booksTable += "<th>" + handleArrayToString(item.authors) + "</th>";
        booksTable += "<th>" + handleArrayToString(item.categories) + "</th>";
        booksTable += "</tr>";
    }

    booksTable += "</tbody> </table>";
    document.getElementById("content").innerHTML = booksTable;

    // hide spinner
    toggleSpiner();
}

function handleArrayToString(list) {
    if (list) {
        return list.toString();
    }
    return '';
}
// action for 'search' button
function receive() {
    toggleSpiner();
    var book = document.getElementById("search").value;

    var request = "https://www.googleapis.com/books/v1/volumes?q=" + book;
    console.log(request);
    fetch(request)
        .then((response) => response.json())
        .then((result) => {
            handleResponse(result);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

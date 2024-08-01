const axios = require("axios");

// Get all books using async
async function getBookList() {
    try {
        const response = await axios.get("http://localhost:5000/");
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching the book list:", error);
    }
}

// Call the function
getBookList();

// Search by ISBN Using Promises:
const isbn = "1";
function getBookDetailsByISBN(myIsbn) {
    return axios.get(`http://localhost:5000/isbn/${myIsbn}`);
}

getBookDetailsByISBN(isbn)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error("Error setting up the request:", error.message);
    });


// Search by Author()

async function searchAuthor() {
    try {
        const response = await axios.get("http://localhost:5000/author/Dante Alighieri");
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching the Books from the Author:", error);
    }
}

searchAuthor();

// Search by Title()

async function searchTitle() {
    try {
        const response = await axios.get("http://localhost:5000/title/Things Fall Apart");
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching the Books from the Author:", error);
    }
}

searchTitle();
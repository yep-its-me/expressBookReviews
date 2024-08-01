const express = require("express");
let books = require("./booksdb.js");
let doesExist = require("./auth_users.js").doesExist;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({ username: username, password: password });
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
    //Write your code here
    return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
    //Write your code here
    const book = books[req.params.isbn];
    return res.status(200).json(book);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
    //Write your code here
    let booksbyauthor = [];
    for (let isbn in books) {
        if (books[isbn].author === req.params.author) {
            const book = {
                isbn,
                title: books[isbn].title,
                reviews: books[isbn].reviews,
            };
            booksbyauthor.push(book);
        }
    }
    return res.status(200).json({
        booksbyauthor,
    });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
    //Write your code here
    let booksbytitle = [];
    for (let isbn in books) {
        if (books[isbn].title === req.params.title) {
            const book = {
                isbn,
                author: books[isbn].author,
                reviews: books[isbn].reviews,
            };
            booksbytitle.push(book);
        }
    }
    return res.status(200).json({
        booksbytitle,
    });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
    //Write your code here
    const book = books[req.params.isbn];
    return res.status(200).json(book.reviews);
});

module.exports.general = public_users;

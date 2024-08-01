const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
};

const authenticatedUser = (username, password) => {
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return user.username === username && user.password === password;
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
};

//only registered users can login
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign(
            {
                data: password,
            },
            "access",
            { expiresIn: 60 * 60 }
        );
        // Store access token and username in session
        req.session.authorization = {
            accessToken,
            username,
        };
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const book = books[req.params.isbn];
    const user = req.session.authorization.username;
    const reviewsOfUser = book.reviews[user] || [];
    reviewsOfUser.push(req.query.review);
    book.reviews[user] = reviewsOfUser;
    //Write your code here
    return res.status(200).send(`The review for the book with ISBN ${req.params.isbn} has been added/updated`);
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const book = books[req.params.isbn];
    const user = req.session.authorization.username;
    const reviewsOfUser = [];
    book.reviews[user] = reviewsOfUser;
    //Write your code here
    return res.status(200).send(`Reviews for the ISBN ${req.params.isbn} posted by the user ${user} deleted`);
});

module.exports.authenticated = regd_users;
module.exports.doesExist = doesExist;
module.exports.users = users;

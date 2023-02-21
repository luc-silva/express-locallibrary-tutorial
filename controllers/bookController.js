const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

const async = require("async");

exports.index = (req, res) => {
    async.parallel(
        {
            book_count(callback) {
                Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
            },
            book_instance_count(callback) {
                BookInstance.countDocuments({}, callback); //copias de todos os livros
            },
            book_instance_available_count(callback) {
                BookInstance.countDocuments({ status: "Available" }, callback);
            },
            author_count(callback) {
                Author.countDocuments({}, callback);
            },
            genre_count(callback) {
                Genre.countDocuments({}, callback);
            },
        },
        (err, results) => {
            res.render("index", {
                title: "Local Library Home",
                error: err,
                data: results,
            });
        }
    );
};

// Display list of all Books.
exports.book_list = function (req, res, next) {
    Book.find({}, "title author")
        .sort({ title: 1 })
        .populate("author")
        .exec(function (err, list_books) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render("book_list", {
                title: "Book List",
                book_list: list_books,
            });
        });
};

exports.book_detail = (request, response, next) => {
    async.parallel(
        {
            book(callback) {
                Book.findById(request.params.id)
                    .populate("author")
                    .populate("genre")
                    .exec(callback);
            },
            book_instance(callback) {
                BookInstance.find({ book: request.params.id }).exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.book === null) {
                const err = new Error("Not found");
                err.status = 404;
                return next(err);
            }
            response.render("book_detail", {
                title: results.book.title,
                book: results.book,
                book_instances: results.book_instance,
            });
        }
    );
};

exports.book_create_get = (request, response) => {
    response.send("Hold on, not yet");
};

exports.book_create_post = (request, response) => {
    response.send("Hold on, not yet");
};

exports.book_delete_get = (request, response) => {
    response.send("Hold on, not yet");
};

exports.book_delete_post = (request, response) => {
    response.send("Hold on, not yet");
};

exports.book_update_get = (request, response) => {
    response.send("Hold on, not yet");
};

exports.book_update_post = (request, response) => {
    response.send("Hold on, not yet");
};

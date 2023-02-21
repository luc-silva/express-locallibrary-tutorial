const Genre = require("../models/genre");
const Book = require("../models/book");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.genre_list = (request, response, next) => {
    Genre.find({})
        .sort({ name: 1 })
        .exec(function (err, list_genre) {
            if (err) {
                next(err);
            }
            response.render("genre_list", {
                title: "Genre List",
                genre_list: list_genre,
            });
        });
};

exports.genre_detail = (request, response, next) => {
    async.parallel(
        {
            genre(callback) {
                Genre.findById(request.params.id).exec(callback);
            },
            genre_books(callback) {
                Book.find({ genre: request.params.id }).exec(callback);
            },
        },
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.genre === null) {
                const err = new Error("not found");
                err.status = 404;
                return next(err);
            }
            response.render("genre_detail", {
                title: "Genre Detail",
                genre: results.genre,
                genre_books: results.genre_books,
            });
        }
    );
};

exports.genre_create_get = (request, response, next) => {
    response.render("genre_form", { title: "Create Genre" });
};

exports.genre_create_post = [
    body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),
    (request, response, next) => {
        const errors = validationResult(request);
        const genre = new Genre({ name: request.body.name });

        if (!errors.isEmpty()) {
            response.render("genre_form", {
                title: "Create Genre",
                genre,
                errors: errors.array(),
            });
            return;
        } else {
            Genre.findOne({ name: request.body.name }).exec(
                (err, found_genre) => {
                    if (err) {
                        return next(err);
                    }
                    if(found_genre){
                        response.redirect(found_genre.url)
                    } else {
                        genre.save((err) => {
                            if (err) {
                                return next(err)
                            }
                            response.redirect(genre.url)
                        })
                    }
                }
            );
        }
    },
];

exports.genre_delete_get = (request, response, next) => {
    response.send("Hold on, not yet");
};

exports.genre_delete_post = (request, response, next) => {
    response.send("Hold on, not yet");
};

exports.genre_update_get = (request, response, next) => {
    response.send("Hold on, not yet");
};

exports.genre_update_post = (request, response, next) => {
    response.send("Hold on, not yet");
};

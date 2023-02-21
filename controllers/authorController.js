const Author = require("../models/author");
const Book = require("../models/book");
const async = require("async");

exports.author_list = (request, response, next) => {
    Author.find()
        .sort([["family_name", "ascending"]])
        .exec(function (err, list_authors) {
            if (err) {
                return next(err);
            }

            response.render("author_list", {
                title: "Author List",
                author_list: list_authors,
            });
        });
};

exports.author_detail = (request, response, next) => {
    async.parallel({
        author(callback) {
            Author.findById(request.params.id).exec(callback);
        },
        author_books(callback) {
            Book.find({ author: request.params.id }, "title summary").exec(
                callback
            );
        },
    }, (err, results)=>{
        if(err){
            return next(err)
        }
        if ( results.author.name === null){
            const arr = new Error("Not found")
            err.status = 404
            return next(err)
        }

        response.render("author_details", {
            title: "Author Detail",
            author: results.author,
            author_books: results.author_books,
        })
    }
    );
};

exports.author_create_get = (request, response) => {
    response.send("Hold on, not yet");
};

exports.author_create_post = (request, response) => {
    response.send("Hold on, not yet");
};

exports.author_delete_get = (request, response) => {
    response.send("Hold on, not yet");
};

exports.author_delete_post = (request, response) => {
    response.send("Hold on, not yet");
};

exports.author_update_get = (request, response) => {
    response.send("Hold on, not yet");
};

exports.author_update_post = (request, response) => {
    response.send("Hold on, not yet");
};

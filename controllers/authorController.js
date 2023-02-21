const Author = require("../models/author");

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

exports.author_detail = (request, response) => {
    response.send("Hold on, not yet", request.params.id);
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

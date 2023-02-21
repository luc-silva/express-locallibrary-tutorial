const Author = require("../models/author");
const Book = require("../models/book");
const async = require("async");
const { body, validationResult } = require("express-validator");

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

exports.author_create_get = (request, response) => { //pega pagina de criacao
    response.render("author_form", {title: "Create Author"})
};

exports.author_create_post = [
    body("first_name")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("First name must be specified.")
      .isAlphanumeric()
      .withMessage("First name has non-alphanumeric characters."),
    body("family_name")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Family name must be specified.")
      .isAlphanumeric()
      .withMessage("Family name has non-alphanumeric characters."),
    body("date_of_birth", "Invalid date of birth")
      .optional({ checkFalsy: true })
      .isISO8601()
      .toDate(),
    body("date_of_death", "Invalid date of death")
      .optional({ checkFalsy: true })
      .isISO8601()
      .toDate(),

    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        res.render("author_form", {
          title: "Create Author",
          author: req.body,
          errors: errors.array(),
        });
        return;
      }

      const author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      });

      author.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(author.url);
      });
    },
  ];
  

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

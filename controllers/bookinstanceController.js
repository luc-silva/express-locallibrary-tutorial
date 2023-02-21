const BookInstance = require("../models/bookinstance")

// Display list of all BookInstances.
exports.bookinstance_list = function (req, res, next) {
  BookInstance.find()
    .populate("book")
    .exec(function (err, list_bookinstances) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("bookinstance_list", {
        title: "Book Instance List",
        bookinstance_list: list_bookinstances,
      });
    });
};


exports.bookinstance_detail = (request, response) => {
  response.send("Hold on, not yet", request.params.id)
}

exports.bookinstance_create_get = (request, response) => {
  response.send("Hold on, not yet")
}

exports.bookinstance_create_post = (request, response) => {
  response.send("Hold on, not yet")
}

exports.bookinstance_delete_get = (request, response) => {
  response.send("Hold on, not yet")
}

exports.bookinstance_delete_post = (request, response) => {
  response.send("Hold on, not yet")
}

exports.bookinstance_update_get = (request, response) => {
  response.send("Hold on, not yet")
}

exports.bookinstance_update_post = (request, response) => {
  response.send("Hold on, not yet")
}

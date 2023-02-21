const Book = require("../models/book")

exports.index = (request, response) => {
  response.send("nono")
}


exports.book_list = (request, response) => {
  response.send("Hold on, not yet")
}

exports.book_detail = (request, response) => {
  response.send("Hold on, not yet", request.params.id)
}

exports.book_create_get = (request, response) => {
  response.send("Hold on, not yet")
}

exports.book_create_post = (request, response) => {
  response.send("Hold on, not yet")
}

exports.book_delete_get = (request, response) => {
  response.send("Hold on, not yet")
}

exports.book_delete_post = (request, response) => {
  response.send("Hold on, not yet")
}

exports.book_update_get = (request, response) => {
  response.send("Hold on, not yet")
}

exports.book_update_post = (request, response) => {
  response.send("Hold on, not yet")
}

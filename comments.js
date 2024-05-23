// create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// read comments.json file
var comments = require('./comments.json');

// get comments
app.get('/comments', function (req, res) {
    res.json(comments);
});

// post comments
app.post('/comments', urlencodedParser, function (req, res) {
    // get new comment
    var newComment = req.body;
    // add new comment to comments
    comments.push(newComment);
    // write comments to comments.json file
    fs.writeFile('./comments.json', JSON.stringify(comments), function (err) {
        if (err) {
            console.log(err);
        }
    });
    // send new comment
    res.json(newComment);
});

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});

// Path: comments.html
<!DOCTYPE html>
<html>
<head>
    <title>Comments</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>
    <h1>Comments</h1>
    <div id="comments"></div>
    <form id="commentForm">
        <input type="text" id="name" name="name" placeholder="Name">
        <input type="text" id="comment" name="comment" placeholder="Comment">
        <button type="submit">Submit</button>
    </form>
    <script>
        // get comments
        $.get('http://localhost:3000/comments', function (comments) {
            comments.forEach(function (comment) {
                $('#comments').append('<div>' + comment.name + ': ' + comment.comment + '</div>');
            });
        });

        // post comment
        $('#commentForm').submit(function (event) {
            event.preventDefault();
            var name = $('#name').val();
            var comment = $('#comment').val();
            $.post('http://localhost:3000/comments', { name: name, comment: comment }, function (newComment) {
                $('#comments').append('<div>' + newComment.name + ': ' + newComment.comment + '</div>');
            });
        });
    </script>
</body>
</html>
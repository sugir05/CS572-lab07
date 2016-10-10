var express = require('express');
var crypto = require("crypto")
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/mondayTest", function(err, db) {
        if (err) { return console.dir(err); }

        var collection = db.collection('lab1');

        collection.findOne({ message: new RegExp(".*") }, function(err, doc) {
            if (err) { return console.dir(err); }
            console.dir(doc.message.toString());
            var key = "asaadsaad";
            var text = doc.message;
            console.log("Original Text: " + text);

            var decryptedText = decrypt(key, text);
            console.log("Decrypted Text: " + decryptedText);

            var encryptedText = encrypt(key, decryptedText);
            console.log("Encrypted Text: " + encryptedText);

            res.render('message', { title: decryptedText });

        });

    });
});


function decrypt(key, data) {
    var decipher = crypto.createDecipher('aes256', key);
    var decrypted = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');

    return decrypted;
}

function encrypt(key, data) {
    var cipher = crypto.createCipher('aes256', key);
    var crypted = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');

    return crypted;
}
module.exports = router;
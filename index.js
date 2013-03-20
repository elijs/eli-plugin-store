"use strict";

var path    = require('path');
var resolve = path.resolve;


module.exports = function eli_plugin_store(eli) {
    var config = require(resolve('config'));
    
    eli.on('publish', eliOnPublish);

    function eliOnPublish(post, cb) {
        console.log('Plugin ‘store’ received message ‘%s’.', post);

        var ts = Date.now();
        
        eli.redis.set('eli.posts.publish.' + ts, post, function (err, result) {
            if (err) {
                throw err;
            }

            eli.redis.sadd('eli.posts.publish', Date.now(), function (err, result) {
                if (err) {
                    throw err;
                }
                cb();
            });
        });
    }
};

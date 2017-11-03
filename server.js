const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');
const async = require("async");
const port = process.env.PORT || 8000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = express.Router();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(morgan('dev'));
app.use('/',router);
// app.get('/',(req,res) =>{
//     res.json('hello')
// })

app.use(express.static(__dirname + '/public'));

app.post('/api/webCrawl',webCrawler);

function webCrawler(req,res){

    request(req.body.url, function(error, response, html){  
        if(error) return res.json(error)  
        var $ = cheerio.load(html);
                    var imageLinkArray = [];
                    async.parallel([ function(callback) {
                        $('img').filter(function(){
                            var data = $(this);
                          var link = data.attr("src");
                          imageLinkArray.push(link) 
                        })
                        callback();
                    } ], function done(err) {
                        if (err) 
                            throw err;
                        res.json(imageLinkArray);
                    });   
                    // $('img').filter(function(){
                    //     var data = $(this);
                    //   var link = data.attr("src");
                    //    rating.push(link) 
                    // })
                    // res.json(rating);
            }) 
}


app.listen(port,() =>{
    console.log('server started  : ' + port);
})
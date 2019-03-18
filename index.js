const fs = require('fs');
const fetch = require('node-fetch');
const apiKey = require('./credentials/tumblr.json').apiKey

function start(tumblr, tag, apiKey){

fetch('https://api.tumblr.com/v2/blog/' + tumblr + '.tumblr.com/posts?tag=' + tag + '&limit=20&offset=0&api_key=' + apiKey)
    .then(res => res.json())
    .then(json => {
    	json.response.posts.forEach(val => {
    		if(val.type == 'photo'){
    			fs.appendFile('posts.txt', 'Data: ' + val.date + ' <br /><br /><img src="' + val.photos[0].original_size.url + '"/>' + '<br /><br />\r\n', function (err) {
				  if (err) throw err;
				  console.log('Saved!');
				});
    		}else if(val.type == 'text'){
    			console.log(val)
    			fs.appendFile('posts.txt', '\r\n' + 'Data: ' + val.date + '  <br /><br /><p style="text-align: justify">' + val.body + '</p><br /><br />\r\n', function (err) {
				  if (err) throw err;
				  console.log('Saved!');
				});
    		}else if(val.type == 'quote'){
    			fs.appendFile('posts.txt', '\r\n' + 'Data: ' + val.date + '  <br /><br /><p style="text-align: justify">' +  val.text + '</p><br /><br />\r\n', function (err) {
				  if (err) throw err;
				  console.log('Saved!');
				});
    		}else{
    			//console.log(val)
    		}
    	})
    });
}



start(tumblr, tag, apiKey)
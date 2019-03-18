const fs = require('fs');
const fetch = require('node-fetch');
const apiKey = require('./credentials/tumblr.json').apiKey

async function start(tumblr, tag, apiKey){
	let fetchedResponse = await fetchContent(tumblr, tag, apiKey);
	const json = await fetchedResponse.json();
	const response = json.response;

	const totalPosts = response.total_posts;
	const posts = response.posts;

	//Tumblr accepts max 20 posts each request
	const numberOfRequests = Math.ceil(totalPosts/20);

	let requestsResults = [];

	for(let i = 0; i < numberOfRequests; i++){
		requestsResults.push(await requestPosts(numberOfRequests, tumblr, tag, apiKey, i));
	}

	console.log(requestsResults);


}

async function fetchContent(tumblr, tag, apiKey, offset = 0){
	return fetch('https://api.tumblr.com/v2/blog/' + tumblr + '.tumblr.com/posts?tag=' + tag + '&limit=20&offset=' + offset + '&api_key=' + apiKey)
}

async function requestPosts(numberOfRequests, tumblr, tag, apiKey, currentRequest = 0){
	let fetchedResponse = await fetchContent(tumblr, tag, apiKey, currentRequest*20);
	const json = await fetchedResponse.json();
	const response = json.response;
	const posts = response.posts;

	let tempResults = []

	posts.forEach(val => {
		if(val.type == 'photo'){
			tempResults.push({date: val.date, content: val.photos[0].original_size.url});
		}else if(val.type == 'text'){
			tempResults.push({date: val.date, content: val.body});
		}else if(val.type == 'quote'){
			tempResults.push({date: val.date, content: val.text});
		}else{
    	}
    })

	return tempResults;

}

let args = process.argv;
let tumblr = args[2];
let tag = args[3];

let results = start(tumblr, tag, apiKey);
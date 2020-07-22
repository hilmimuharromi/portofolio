// import posts from './_posts.js';

// const lookup = new Map();
// posts.forEach(post => {
// 	lookup.set(post.slug, JSON.stringify(post));
// });

import {
	init
} from "@lib/mongo"
export async function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const {
		slug
	} = req.params;
	const {
		db
	} = await init()
	const post = await db.collection("posts").find({
		slug
	}).toArray()
	console.log(post, "===ppost");


	if (post) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(post[0]));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
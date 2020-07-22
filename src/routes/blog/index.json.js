import {
	init
} from "@lib/mongo";
import {
	json
} from "body-parser";

export async function get(req, res) {
	const {
		db
	} = await init();
	// console.log(req.query, 'query blog');
	let posts;
	if (req.query.limit) {
		console.log(req.query.limit, 'masuk get post');
		posts = await db.collection("posts").find({}).sort().limit(Number(req.query.limit)).toArray();
	} else {
		posts = await db.collection("posts").find({}).sort().toArray();
	}

	const slug = 'what-is-sapper'
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(JSON.stringify(posts))
}

export async function post(req, res) {
	console.log(req.body, '====req body====');
	console.log(req.headers, '====req=headers===');

	const {
		db
	} = await init();
	const post = req.body.payload;
	// console.log(post,'=====================post');

	// const user = req.headers.token
	// console.log(user);
	// if(user === 'sayahilmi'){
	const result = await db.collection("posts").insertOne(post);
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	// 	post._id = result.insertedId;
	res.end(json.stringify(result));
	// } else {
	// 	res.writeHead(400, {
	// 		'Content-Type': 'application/json'
	// 	});
	// 	res.end(JSON.stringify('sorry'))
	// }

}
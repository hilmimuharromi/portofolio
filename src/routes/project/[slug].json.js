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
    const project = await db.collection("projects").find({
        slug
    }).toArray()
    console.log(project, "project======================");


    if (project) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(project[0]));
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: `Not found`
        }));
    }
}
import {
    init
} from "@lib/mongo";

export async function get(req, res) {

    const {
        db
    } = await init();
    let projects;
    if (req.query.limit) {
        console.log(req.query.limit, 'masuk projects');
        projects = await db.collection("projects").find({}).limit(Number(req.query.limit)).toArray();
    }
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    // console.log(projects, '=================post');
    res.end(JSON.stringify(projects))
}
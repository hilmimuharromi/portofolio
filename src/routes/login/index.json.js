import {
    init
} from "@lib/mongo";
import {
    json
} from "body-parser";
export async function post(req, res) {

    console.log(req.body, '====req body====');
    console.log(req.headers, '====req=headers===');


}
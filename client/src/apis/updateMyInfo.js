import request from "./request"
import { USER_INTERFACE } from "./config"
export default async ({ name, avatar } = {}) => {
    let res = await request().put(
        USER_INTERFACE,
        {
            name,
            avatar
        })
    // debugger;
    return res;
}
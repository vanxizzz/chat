import request from "./request"
import { USER_INTERFACE } from "./config"
export default async ({ account, password, name, avatar } = {}) => {
    console.log(account, password, name, avatar)
    let res = await request().post(
        USER_INTERFACE,
        {
            account,
            password,
            name,
            avatar
        })
    // debugger;
    return res;
}
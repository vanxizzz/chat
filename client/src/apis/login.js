import request from "./request"
import { USER_INTERFACE_LOGIN } from "./config"
export default async ({ account, password } = {}) => {

    return await request().post(USER_INTERFACE_LOGIN, { account, password })
}
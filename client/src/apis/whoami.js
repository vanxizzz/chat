import request from "./request"
import { USER_INTERFACE_WHOAMI } from "./config"
export default async () => {
    return request().post(USER_INTERFACE_WHOAMI)
}

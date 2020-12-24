import axios from "axios";

export default () => {
    let instance = axios;
    if (localStorage.token) {
        instance = axios.create({
            headers: { 'authorization': localStorage.token }
        });
    }
    let i = 0;
    instance.interceptors.response.use(
        resp => {
            /* 这里注意，如果是非简单请求，会多请求一次options，很坑 */
            // debugger;
            if (!resp.config) {
                return resp;
            } else {
                if (resp.headers && resp.headers.authorization) {
                    localStorage.token = resp.headers.authorization;
                }
                return resp.data;
            }
            // debugger;
            // if (!resp.tag) {
            //     /* 是options请求 */
            //     resp.tag = true;
            //     return resp;
            // }
            // resp.tag = false;

            // if (resp.config) {
            //     return resp.data;
            // }


        },
        error => {
            localStorage.removeItem("token");
            return Promise.reject(error)
        }
    )
    return instance;
}


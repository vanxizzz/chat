

module.exports = (fn) => {
    return async (...args) => {
        try {
            let res = await fn(...args);
            if (!res) {
                /* destory或find失败 */
                return false;
            }
            if (Array.isArray(res) && res.length > 0) {
                if ([0, 1].includes(res[0])) {
                    /* 说明是update */
                    return res[0]
                } else if (res[0].toJSON) {
                    res = res.map(item => item.toJSON())
                }
            }
            if (res.toJSON) {
                res = res.toJSON();
            }
            return res;
        } catch (error) {
            /* create */
            return false;
        }
    }
}
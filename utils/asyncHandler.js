module.exports = (fn)=>{
    try {
        await fn();
    } catch (error) {
        return error;
    }
}
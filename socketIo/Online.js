
class Online {
    constructor() {
        this.users = [
            // {
            //     id: 0,
            //     account: 1,
            //     name: "xx",
            //     avatar,
            // }
        ];
        this.newId = 0;
    }
    getNewId(){
        return this.newId++;
    }
    add(data) {
        this.users.push(data);
        // this.newId++;
    }
    remove(id) {
        if (id == null) {
            return;
        }
        this.users = this.users.filter(item => item.id !== id);
    }
    get() {
        return this.users;
    }
    update() {

    }

};
let online = new Online();
module.exports = online;
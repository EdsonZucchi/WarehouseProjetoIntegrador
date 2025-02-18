export class Warehouse {
    constructor(id, name, disable, list) {
        this.id = id;
        this.name = name;
        this.disable = disable;
        this.products = list; 
        this.image = "";
        this.itemCount = 0;
    }
}
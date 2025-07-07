export class Warehouse {
    constructor(id, name, disable, list, itemCount) {
        this.id = id;
        this.name = name;
        this.disable = disable;
        this.products = list; 
        this.image = "";
        this.itemCount = itemCount;
    }
}
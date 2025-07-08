export class Movement {
    constructor(id, warehouse, product, variant, quantity, type, user, time) { 
        this.id = id;
        this.warehouse = warehouse;
        this.product = product;
        this.variant = variant;
        this.quantity = quantity; 
        this.type = type;
        this.user = user;
        this.time = time; 
    }
}
export class Request {
    constructor(id, requestName, warehouseName, status) {
        this.id = id;
        this.requestName = requestName;
        this.warehouseName = warehouseName; 
        this.status = status;
    }
}
import { warehouseRepository } from "../repository/WarehouseRepository";

class WarehouseUseCase {
    async getWarehouses(){
        return warehouseRepository.getWarehouses();
    }

    async saveWarehouse(name){
        return warehouseRepository.saveWarehouse(name);
    }

    async disableWarehouse(id) {
        return warehouseRepository.disableWarehouse(id);
    }

    async getDetailsWarehouse(id) {
        return warehouseRepository.getDetailsWarehouse(id);
    }

}

export const warehouseUsecase = new WarehouseUseCase();
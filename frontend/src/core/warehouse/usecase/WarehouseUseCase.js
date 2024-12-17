import { warehouseRepository } from "../repository/WarehouseRepository";

class WarehouseUseCase {
    async getWarehouses(){
        return warehouseRepository.getWarehouses();
    }

    async saveWarehouse(warehouse){
        console.log(warehouse);
        return warehouseRepository.saveWarehouse(warehouse);
    }

    async disableWarehouse(id) {
        return warehouseRepository.disableWarehouse(id);
    }

}

export const warehouseUsecase = new WarehouseUseCase();
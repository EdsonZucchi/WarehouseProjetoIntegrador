import { httpHelper } from "../../../shared/api/httpHelper";
import { Warehouse } from "../model/Warehouse";

class WarehouseRepository {
  async getWarehouses() {
    try {
      const response = await httpHelper.get("/warehouse");
      if (response.status == 200) {
        const data = response.data;
        return data.map(
          (warehouse) =>
            new Warehouse(warehouse.id, warehouse.name, warehouse.disabled)
        );
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async saveWarehouse(warehouse) {
    try {
      const response = await httpHelper.post("/warehouse/save", {
        id: warehouse.id,
        name: warehouse.name,
      });
      if (response.status == 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async disableWarehouse(id) {
    try {
      const response = await httpHelper.put("/warehouse/status/"+id);
      if (response.status == 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const warehouseRepository = new WarehouseRepository();

import { productRepository } from "../repository/ProductRepository";

class ProductUseCase {
  async listProducts(filter) {
    return productRepository.getAllProducts(filter);
  }

  async saveNewProduct(id, name, description, um, lowStockWarning, lowStockQuantity, variants) {
    let newProduct = {
      "id": (id != undefined && id != null ? id : null),
      "name": name,
      "description": description,
      "um": um,
      "lowStockWarning": lowStockWarning,
      "lowStockQuantity": lowStockQuantity,
      "variants": variants
    }

    return productRepository.saveNewProduct(newProduct)
  }

  async getUms() {
    return productRepository.getUms();
  }

  async getProductById(idProduct) {
    return productRepository.getProductById(idProduct);
  }

  async getCritical() {
    return productRepository.getCritical();
  }

  async listItems(idWarehouse, filter) {
    return productRepository.listItems(idWarehouse, filter);
  }

  async inventory(idWarehouse, idVariant, quantity) {
    let request = {
      "idWarehouse": idWarehouse,
      "idVariant": idVariant,
      "quantity": quantity
    }

    return productRepository.inventory(request);
  }

  async getMovements(filter, warehouse, user) {
    return productRepository.getMovements(filter, warehouse, user);
  }
}

export const productUsecase = new ProductUseCase();
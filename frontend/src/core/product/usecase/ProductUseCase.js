import { productRepository } from "../repository/ProductRepository";

class ProductUseCase {
  async listProducts() {
    return productRepository.getAllProducts();
  }

  async saveNewProduct(id, name, description, um, lowStockWarning, lowStockQuantity, variants) {
    let newProduct = {
      "id" : (id != undefined && id != null ? id : null), 
      "name" : name, 
      "description" : description,
      "um" : um,
      "lowStockWarning": lowStockWarning, 
      "lowStockQuantity" : lowStockQuantity,
      "variants" : variants
    }
    
    return productRepository.saveNewProduct(newProduct)
  }

  async getUms() {
    return productRepository.getUms();
  }

  async getProductById(idProduct) {
    return productRepository.getProductById(idProduct);
  }
}

export const productUsecase = new ProductUseCase();
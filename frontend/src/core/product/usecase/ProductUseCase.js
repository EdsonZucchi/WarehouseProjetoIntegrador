import { productRepository } from "../repository/ProductRepository";

class ProductUseCase {
  async listProducts() {
    return productRepository.getAllProducts();
  }

  async saveNewProduct(name, description, um) {
    let newProduct = {
      "name" : name, 
      "description" : description,
      "um" : um
    }
    
    return productRepository.saveNewProduct(newProduct)
  }

  async getUms() {
    return productRepository.getUms();
  }
}

export const productUsecase = new ProductUseCase();
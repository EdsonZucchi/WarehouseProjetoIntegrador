import { productRepository } from "../repository/ProductRepository";

class ProductUseCase {
  async listProducts() {
    return productRepository.getAllProducts();
  }
}

export const productUsecase = new ProductUseCase();
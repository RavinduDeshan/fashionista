// @flow
import type { ApiServiceInterface } from "shared/services/ApiServiceInterface";

export class ProductService {
  api: ApiServiceInterface;

  endpoint: string = "/product";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getAllProducts(filters: Object = {}) {
    return this.api.get(this.endpoint, filters);
  }

  getProduct(productCode: string) {
    return this.api.get(`${this.endpoint}/${productCode}`);
  }

  updateProduct(payload: Object) {
    return this.api.put(`${this.endpoint}/update/bycode`, payload);
  }

  placeOrder(payload: Object) {
    return this.api.post("/order/add", payload);
  }
}

// @flow
import type { ApiServiceInterface } from "shared/services/ApiServiceInterface";

export class CategoryService {
  api: ApiServiceInterface;

  endpoint: string = "/category";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getAllCategories() {
    return this.api.get(this.endpoint);
  }
}

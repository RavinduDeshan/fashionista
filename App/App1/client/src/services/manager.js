import {
  registerGlobalServices,
  serviceManager,
} from "shared/services/manager";
import { ProductService } from "./productService";
import { CategoryService } from "./categoryService";

export const registerServices = (options) => {
  registerGlobalServices(options);

  serviceManager.register("ProductService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new ProductService(api);
  });

  serviceManager.register("CategoryService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new CategoryService(api);
  });
};

export { serviceManager };

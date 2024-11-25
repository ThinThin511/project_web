import createApiClient from "./api.service";
class ProductService {
  constructor(baseUrl = "/api/product") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async getOne(id) {
    return (await this.api.get("/" + id)).data;
  }
  async search(id) {
    return (await this.api.get("/" + id)).data;
  }
  async updateOrderStatus(productId, quantity) {
    try {
      console.log(productId, quantity);
      const response = await this.api.put(`/updateQuantity/${productId}`, {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.error("Có lỗi khi cập nhật số lượng sách", error);
      throw error;
    }
  }
}
export default new ProductService();

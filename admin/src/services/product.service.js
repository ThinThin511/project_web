import createApiClient from "./api.service";

class ProductService {
  constructor(baseUrl = "/api/book") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async addProduct(data) {
    return (await this.api.post(`/`, data)).data;
  }
  async updateProduct(data) {
    return (await this.api.put(`/${data.get("_id")}`, data)).data;
  }
  async deleteProduct(data) {
    return (await this.api.delete(`/${data._id}`)).data;
  }
  async updateOrderStatus(bookId, quantity) {
    try {
      console.log(bookId, quantity);
      const response = await this.api.put(`/updateQuantity/${bookId}`, {
        bookId,
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

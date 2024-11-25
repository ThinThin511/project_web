import createApiClient from "./api.service";

class StaffService {
  constructor(baseUrl = "/api/staff") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async register(data) {
    return (await this.api.post("/register", data)).data;
  }
  async login(data) {
    const user = (await this.api.post("/login", data)).data;
    return user;
  }
  async logout() {
    const user = (await this.api.post("/logout")).data;
    return user;
  }
  // ORDER
  async getAllOrder() {
    return (await this.api.get("/order")).data;
  }
  async updateOrder(data) {
    return (await this.api.put("/order", data)).data;
  }

  // Manufacturer
  async getAllManufacturer() {
    return (await this.api.get("/manufacturer")).data;
  }
  async addManufacturer(data) {
    return (await this.api.post("/manufacturer", data)).data;
  }
  async updateManufacturer(data) {
    console.log(data);
    return (await this.api.put("/manufacturer", data)).data;
  }
  async deleteManufacturer(data) {
    return (await this.api.delete("/manufacturer/" + data._id)).data;
  }
}
export default new StaffService();

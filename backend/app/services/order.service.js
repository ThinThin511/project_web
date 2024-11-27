const { ObjectId } = require("mongodb");
class OrderService {
  constructor(client) {
    this.Order = client.db().collection("donhang");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  infoOrder(payload) {
    const order = {
      user: payload.user,
      product: payload.product,
      tongtien: payload.tongtien,
      trangthai: payload.trangthai,
      note: payload.note,
      method_payment: payload.method_payment,
      ngaydathang: payload.ngaydathang,
    };
    // Remove undefined fields
    Object.keys(order).forEach((key) => {
      order[key] === undefined && delete order[key];
    });
    return order;
  }
  async create(payload) {
    const order = this.infoOrder(payload);
    const result = await this.Order.findOneAndUpdate(
      order,
      {
        $set: {
          trangthai: "Đang chờ xác nhận",
          ngaydathang:
            String(new Date().getDate()).padStart(2, "0") +
            "/" +
            String(new Date().getMonth() + 1).padStart(2, "0") +
            "/" +
            new Date().getFullYear() +
            " " +
            String(new Date().getHours()).padStart(2, "0") +
            ":" +
            String(new Date().getMinutes()).padStart(2, "0") +
            ":" +
            String(new Date().getSeconds()).padStart(2, "0"),
        },
      },
      { returnDocument: "after", upsert: true }
    );

    return result;
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.infoOrder(payload);
    // update.ngaytra = new Date().getDate()+'/'+ (new Date().getMonth()+1)+'/'+new Date().getFullYear() + ' ' + new Date().getHours() +':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    const result = await this.Order.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async find(id) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const result = await this.Order.find(filter);
    return result.toArray();
  }

  async findAll() {
    const result = await this.Order.find();
    return result.toArray();
  }

  async findAllOrderUser(id) {
    const filter = {
      "user._id": id,
    };
    const result = await this.Order.find(filter);
    return result.toArray();
  }

  async delete(id) {
    const result = await this.Order.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Order.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = OrderService;

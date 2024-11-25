const { ObjectId } = require("mongodb");
class ManufacturerService {
  constructor(client) {
    this.Manufacturer = client.db().collection("nhaSanXuat");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  infoManufacturer(payload) {
    const manufacturer = {
      ten: payload.ten,
      diachi: payload.diachi,
    };
    // Loại bỏ các trường undefined
    Object.keys(manufacturer).forEach((key) => {
      manufacturer[key] === undefined && delete manufacturer[key];
    });
    return manufacturer;
  }

  async create(payload) {
    const manufacturer = this.infoManufacturer(payload);
    const result = await this.Manufacturer.findOneAndUpdate(
      manufacturer,
      { $set: {} },
      { returnDocument: "after", upsert: true }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.Manufacturer.find(filter);
    return await cursor.toArray();
  }

  async findByQuery(query) {
    const filter = {};
    for (const key in query) {
      if (Object.hasOwnProperty.call(query, key)) {
        filter[key] = { $regex: new RegExp(query[key], "i") };
      }
    }
    return await this.find(filter);
  }

  async findById(id) {
    return await this.Manufacturer.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.infoManufacturer(payload);
    const result = await this.Manufacturer.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "before" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.Manufacturer.findOneAndUpdate(
      {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
      },
      { $set: { deleted: 1 } },
      { returnDocument: "after" }
    );

    return result;
  }

  async deleteAll() {
    const result = await this.Manufacturer.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = ManufacturerService;

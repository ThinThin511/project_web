const StaffService = require("../services/staff.service");
const CartService = require("../services/cart.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const jwt = require("jsonwebtoken");

const generateAccessToken = require("../middleware/generateAccessToken");
const generateRefreshToken = require("../middleware/generateRefreshToken");
const OrderService = require("../services/order.service");
const ProductService = require("../services/product.service");
const ManufacturerService = require("../services/manufacturer.service");
const CategoryService = require("../services/category.service");
require("dotenv").config();

exports.create = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "Đã có lỗi xảy ra trong quá trình tạo tài khoản")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const staffService = new StaffService(MongoDB.client);
    const queryParams = req.query;
    if (Object.keys(queryParams).length > 0) {
      documents = await staffService.findByQuery(queryParams);
    } else {
      documents = await staffService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "Đã có lỗi xảy ra"));
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "user not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving user with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "user not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving user with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "user not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Không thể xóa id=${req.params.id}`));
  }
};

exports.deleteAll = async (_req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const deletedCount = await staffService.deleteAll();
    return res.send({
      message: `${deletedCount} users were delete successfully`,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
};

exports.login = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const data = req.body;
    const user = await staffService.findUserLogin({
      sodienthoai: data.sodienthoai,
      password: data.password,
    });
    if (!user) {
      return next(new ApiError(404, "user not found"));
    }

    if (data.password !== user.password) {
      return res.send({
        message: `Sai mật khẩu`,
      });
    }
    if (user) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.cookie("token", accessToken, {
        // httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      const { password, ...orther } = user;
      return res.json({ ...orther });
    }
  } catch (err) {
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("refreshToken");
  res.clearCookie("token");
  return res.json({ message: "Logged out!" });
};

exports.refreshToken = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return next(new ApiError(403, "You're not authenticated"));
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    console.log(user);
    if (err) {
      console.log(err);
    }
    // tạo access token mới
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    return res.json(newAccessToken);
  });
};

// CART
exports.addCart = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const cartService = new CartService(MongoDB.client);
    const bookService = new BookService(MongoDB.client);

    const data = req.body;
    const id = req.user.user._id;

    const cartItems = [];
    const cartItem = {
      sach: data,
      soluong: !data.soluong ? 1 : data.soluong,
      dongia: data.dongia,
    };
    // Kiểm tra số lượng trong kho
    const countProduct = await bookService.findById(data._id);

    const findCart = await cartService.find(id, data._id);
    console.log(cartItem);

    if (countProduct.soluong >= cartItem.soluong && !findCart) {
      countProduct.soluong = countProduct.soluong - cartItem.soluong;

      cartItems.push(cartItem);
      const addCart = await staffService.addCart(id, cartItems);

      const updateBook = await bookService.update(
        cartItem.sach._id,
        countProduct
      );

      const addtoCart = await cartService.create(id, cartItem);
      return res.send({ addtocart: addtoCart });
    } else if (findCart && countProduct.soluong >= cartItem.soluong) {
      countProduct.soluong = countProduct.soluong - cartItem.soluong;
      findCart.soluong += cartItem.soluong;
      const total = cartItem.dongia * cartItem.soluong + findCart.dongia;
      findCart.dongia = total;
      // cartItems.push(cartItem)

      const updateBook = await bookService.update(
        cartItem.sach._id,
        countProduct
      );
      const addtoCart = await cartService.updatesoluong(findCart);

      const carts = await cartService.findAllCartUser(id);

      const newCarts = carts.map(({ user, ...rest }) => rest);
      const clearCart = await staffService.deleteAllCart(id);
      const updateCartUser = await staffService.updateCart(id, newCarts);

      return res.send(addtoCart);
    }
    return res.json({ message: "Quá số lượng" });
  } catch (err) {
    console.log(err);
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
};

exports.findAllCartUser = async (req, res, next) => {
  try {
    const cartService = new CartService(MongoDB.client);
    const carts = await cartService.findAllCartUser(req.user.user._id);
    return res.json(carts);
  } catch (error) {
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const cart = req.body;
    const user = req.user.user._id;

    const cartService = new CartService(MongoDB.client);
    const staffService = new StaffService(MongoDB.client);
    const bookService = new BookService(MongoDB.client);

    //Check số lượng sản phẩm trong kho
    const countProduct = await bookService.findById(cart.sach._id);

    const item = await cartService.findById(cart._id);

    if (countProduct.soluong >= cart.soluong - item.soluong) {
      if (cart.soluong > item.soluong)
        countProduct.soluong =
          countProduct.soluong - (cart.soluong - item.soluong);
      else
        countProduct.soluong =
          countProduct.soluong + (item.soluong - cart.soluong);
      console.log(countProduct.soluong);

      const updateCart = await cartService.update(cart._id, cart);
      const carts = await cartService.findAllCartUser(user);

      const updateBook = await bookService.update(cart.sach._id, countProduct);
      // console.log(updateBook)

      const newCarts = carts.map(({ user, ...rest }) => rest);
      const clearCart = await staffService.deleteAllCart(user);
      const updateCartUser = await staffService.updateCart(user, newCarts);

      return res.json(updateCartUser);
    } else return res.json({ message: "Quá số lượng" });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const cart_id = req.params.id;
    const user = req.user.user._id;

    const cartService = new CartService(MongoDB.client);
    const staffService = new StaffService(MongoDB.client);
    const bookService = new BookService(MongoDB.client);

    const cart = await cartService.findById(cart_id);
    const product = await bookService.findById(cart.sach._id);

    cart.soluong = cart.soluong + product.soluong;

    const countProduct = await bookService.update(cart.sach._id, {
      soluong: cart.soluong,
    });

    const deleteCart = await cartService.delete(cart._id);
    const deleteCartUser = await staffService.deleteCart(user, cart._id);

    return res.json(deleteCartUser);
  } catch (error) {
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
};

exports.addOrder = async (req, res, next) => {
  try {
    const order = req.body;
    const user = req.user.user._id;

    order.userId = user;

    const cartService = new CartService(MongoDB.client);
    const orderService = new OrderService(MongoDB.client);

    // Create order
    const addOrder = await orderService.create(order);
    await cartService.deleteAllCartUser(user);
    return res.json(addOrder);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = req.body;
    const orderService = new OrderService(MongoDB.client);

    const updateOrder = await orderService.update(order._id, order);
    return res.json(updateOrder);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
};

exports.findAllOrderUser = async (req, res, next) => {
  try {
    const userId = req.user.user._id;
    const orderService = new OrderService(MongoDB.client);

    const AllOrder = await orderService.findAllOrderUser(userId);
    return res.json(AllOrder);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
};

exports.findAllOrder = async (req, res, next) => {
  let AllOrder = [];
  try {
    const orderService = new OrderService(MongoDB.client);

    AllOrder = await orderService.findAll();
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
  return res.send(AllOrder);
};

exports.findAllManufacturer = async (req, res, next) => {
  try {
    const manufacturerService = new ManufacturerService(MongoDB.client);

    const allManufacturers = await manufacturerService.find();
    return res.json(allManufacturers);
  } catch (error) {
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
};

exports.addManufacturer = async (req, res, next) => {
  try {
    const manufacturerService = new ManufacturerService(MongoDB.client);
    const newManufacturer = await manufacturerService.create(req.body);

    return res.send(newManufacturer);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Đã có lỗi xảy ra!"));
  }
};

exports.updateManufacturer = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update cannot be empty"));
  }

  try {
    const manufacturerService = new ManufacturerService(MongoDB.client);
    const document = await manufacturerService.update(req.body._id, req.body);
    if (!document) {
      return next(new ApiError(404, "Not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Error with id=${req.body._id}`));
  }
};

exports.deleteManufacturer = async (req, res, next) => {
  try {
    const manufacturerService = new ManufacturerService(MongoDB.client);
    const document = await manufacturerService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, `Không thể xóa id=${req.params.id}`));
  }
};
// danh muc
exports.findAllCategories = async (req, res, next) => {
  try {
    const categoryService = new CategoryService(MongoDB.client);
    const allCategories = await categoryService.find();
    return res.json(allCategories);
  } catch (error) {
    return next(new ApiError(500, "Không thể lấy danh sách danh mục!"));
  }
};

exports.addCategory = async (req, res, next) => {
  try {
    const categoryService = new CategoryService(MongoDB.client);
    const newCategory = await categoryService.create(req.body);
    return res.send(newCategory);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Không thể thêm danh mục!"));
  }
};

exports.updateCategory = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống!"));
  }

  try {
    const categoryService = new CategoryService(MongoDB.client);
    const updatedCategory = await categoryService.update(
      req.body._id,
      req.body
    );
    if (!updatedCategory) {
      return next(new ApiError(404, "Không tìm thấy danh mục!"));
    }
    return res.send(updatedCategory);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Không thể cập nhật danh mục với id=${req.body._id}`)
    );
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryService = new CategoryService(MongoDB.client);
    const deletedCategory = await categoryService.delete(req.params.id);
    if (!deletedCategory) {
      return next(new ApiError(404, "Không tìm thấy danh mục!"));
    }
    return res.send(deletedCategory);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Không thể xóa danh mục với id=${req.params.id}`)
    );
  }
};

exports.deleteAllCategories = async (req, res, next) => {
  try {
    const categoryService = new CategoryService(MongoDB.client);
    const count = await categoryService.deleteAll();
    return res.send({ message: `Đã xóa ${count} danh mục!` });
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "Không thể xóa tất cả danh mục!"));
  }
};

exports.findCategoryById = async (req, res, next) => {
  try {
    const categoryService = new CategoryService(MongoDB.client);
    const category = await categoryService.findById(req.params.id);
    if (!category) {
      return next(new ApiError(404, "Không tìm thấy danh mục!"));
    }
    return res.json(category);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Không thể tìm danh mục với id=${req.params.id}`)
    );
  }
};

exports.findCategoryByQuery = async (req, res, next) => {
  try {
    const categoryService = new CategoryService(MongoDB.client);
    const categories = await categoryService.findByQuery(req.query);
    return res.json(categories);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "Không thể tìm danh mục với truy vấn đã cho!")
    );
  }
};
exports.getStatistics = async (req, res) => {
  const { timePeriod } = req.query; // Lấy tham số thời gian từ query string
  const orderService = new OrderService(MongoDB.client);
  try {
    // Định nghĩa định dạng ngày tháng năm tùy theo 'timePeriod'
    let dateFormat;
    switch (timePeriod) {
      case "month":
        dateFormat = "%Y-%m"; // Thống kê theo tháng
        break;
      case "year":
        dateFormat = "%Y"; // Thống kê theo năm
        break;
      case "day":
      default:
        dateFormat = "%Y-%m-%d"; // Thống kê theo ngày
        break;
    }

    // Doanh thu theo thời gian (ngày/tháng/năm)
    const revenueByTime = await orderService.aggregate([
      {
        $addFields: {
          ngaydathang_date: {
            $dateFromString: {
              dateString: "$ngaydathang",
              format: "%d/%m/%Y %H:%M:%S", // Định dạng chuỗi ngày hiện tại
            },
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: dateFormat, date: "$ngaydathang_date" }, // Sử dụng dateFormat để nhóm theo ngày, tháng, hoặc năm
          },
          revenue: { $sum: "$tongtien" }, // Tổng doanh thu
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Mặt hàng bán chạy
    const bestSellingProducts = await orderService.aggregate([
      { $unwind: "$product" },
      {
        $group: {
          _id: "$product.product._id",
          productName: { $first: "$product.product.ten" },
          quantitySold: { $sum: "$product.soluong" },
          revenue: {
            $sum: { $multiply: ["$product.gia", "$product.soluong"] },
          },
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 },
    ]);

    // Trả về kết quả
    res.json({
      revenueByTime: revenueByTime.map((r) => ({
        time: r._id,
        revenue: r.revenue,
      })),
      bestSellingProducts: bestSellingProducts.map((p) => ({
        product: p._id,
        name: p.productName,
        quantitySold: p.quantitySold,
        revenue: p.revenue,
      })),
    });
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu thống kê: ", error); // Log lỗi chi tiết
    res.status(500).json({
      message: "Lỗi khi lấy dữ liệu thống kê",
      error: error.message || error,
    });
  }
};

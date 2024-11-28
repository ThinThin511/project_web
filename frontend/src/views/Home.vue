<template>
    <div class="home">
        <div class="home__one">
            <div class="home__one__element">
                <h1>Chào mừng đến với Gia Dụng Xanh</h1>
                <p>Gia Dụng Xanh chuyên cung cấp các sản phẩm đồ gia dụng chất lượng cao với giá cả hợp lý. Từ các thiết bị nhà bếp, đồ dùng phòng tắm, đồ trang trí nội thất cho đến các sản phẩm bảo vệ sức khỏe, chúng tôi cam kết mang đến cho khách hàng những sản phẩm tiện ích, thân thiện với môi trường.</p>
                <router-link to="/product">
                    <button class="">Xem sản phẩm</button>
                </router-link>
            </div>
        </div>

        <!-- Sản phẩm mới -->
        <!-- <div class="home__two">
            <h2>Sản phẩm mới</h2>
            <div class="product-list">
                <div v-for="product in newProducts" :key="product._id" class="product-item">
                    <img :src="'http://localhost:3000/static/' + product.hinhanh" alt="product.ten" />
                    <p>{{ product.ten }}</p>
                    <p>{{ product.dongia.toLocaleString() }} VNĐ</p>
                </div>
            </div>
        </div> -->

        <!-- Sản phẩm theo danh mục -->
        <div class="home__two">
            <h2>Sản phẩm theo danh mục</h2>
            <div v-for="category in categories" :key="category._id" class="category-section">
                <h3>{{ category }}</h3>
                <div class="product-list">
                    <div v-for="product in getProductsByCategory(category)" :key="product._id" class="product-item">
                        <img :src="'http://localhost:3000/static/' + product.hinhanh" alt="product.ten" />
                        <p>{{ product.ten }}</p>
                        <p>{{ product.dongia.toLocaleString() }} VNĐ</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductsService from "@/services/book.service";  // Import dịch vụ lấy sản phẩm

export default {
    data() {
        return {
            newProducts: [],  // Sản phẩm mới
            allProducts: [],  // Tất cả sản phẩm
            categories: [],    // Danh sách các danh mục
        };
    },
    created() {
        this.loadProducts();
    },
    methods: {
        // Lấy tất cả sản phẩm khi component được khởi tạo
        async loadProducts() {
            try {
                // Gọi API để lấy danh sách tất cả sản phẩm
                const currentDate = new Date();
                const response = await ProductsService.getAll();
                if (response && Array.isArray(response)) {
                    this.allProducts = response;  // Giả sử response trả về là danh sách sản phẩm

                    // Kiểm tra nếu mỗi sản phẩm có thuộc tính 'danhmuc' hợp lệ
                    this.allProducts = this.allProducts.filter(product => product.danhmuc);

                    // Phân loại sản phẩm mới (giả sử có thuộc tính isNew)
                    this.newProducts = this.allProducts.filter(product => {
                        if (product.ngaytao) {
                            const productDate = new Date(product.ngaytao); // Chuyển `ngaytao` thành kiểu Date
                            const diffTime = currentDate - productDate; // Tính khoảng cách thời gian
                            const diffDays = diffTime / (1000 * 60 * 60 * 24); // Chuyển đổi sang ngày
                            return diffDays <= 7; // Kiểm tra nếu sản phẩm trong vòng 7 ngày
                        }
                        return false; // Loại bỏ nếu không có `ngaytao`
                    });

                    // Lấy danh sách các danh mục duy nhất từ các sản phẩm
                    this.categories = [...new Set(this.allProducts.map(product => product.danhmuc))];
                } else {
                    console.error('Dữ liệu không hợp lệ:', response);
                }
            } catch (error) {
                console.error("Lỗi khi lấy sản phẩm:", error);
            }
        },

        // Lọc sản phẩm theo danh mục
        getProductsByCategory(categoryId) {
            return this.allProducts.filter(product => product.danhmuc && product.danhmuc === categoryId);
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap');
/* Phần giới thiệu */
.home__one {
    color: #000;
    height: calc(100vh - 100px);
    max-width: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url('../assets/edit.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    text-align: center;
    margin: 10px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    background-color: aliceblue;
}

.home__one__element {
    width: 100%;
    text-align: center;
    padding: 20px;
}

.home__one h1 {
    font-family: "Tilt Neon", sans-serif;
    color: #2E8B57; /* Xanh lá nhạt */
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.home__one p {
    width: 60%;
    margin: auto;
    color: #333; /* Đổi màu chữ thành xám đậm */
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 30px;
}

.home__one button {
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 10px 40px;
    background-color: #2E8B57; /* Xanh lá nhạt */
    color: #fff;
    font-weight: 600;
    border: none;
    box-shadow: 0 4px 10px rgba(46, 139, 87, 0.3);
    transition: background-color 0.3s, transform 0.2s;
    cursor: pointer;
}

.home__one button:hover {
    background-color: #3CB371; /* Xanh lá đậm hơn khi hover */
    transform: scale(1.05);
}

/* Phần giới thiệu cửa hàng */
.home__two {
    background-color: #f9f9f9;
    color: #333;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* Tiêu đề cho các phần sản phẩm */
.home__two h2 {
    font-family: "Tilt Neon", sans-serif;
    color: #2E8B57; /* Màu xanh lá nhạt */
    font-weight: 600;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
}

/* Sắp xếp các sản phẩm bằng Flexbox hoặc Grid */
.product-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Tạo lưới responsive */
    gap: 20px;
    justify-items: center;
    margin-top: 20px;
}

.product-item {
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s ease;
}

/* Hiệu ứng hover cho mỗi sản phẩm */
.product-item:hover {
    transform: translateY(-5px); /* Đẩy sản phẩm lên một chút */
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

/* Hình ảnh sản phẩm */
.product-item img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
    transition: transform 0.3s;
}

.product-item img:hover {
    transform: scale(1.05); /* Phóng to khi hover */
}

/* Các văn bản hiển thị trong mỗi sản phẩm */
.product-item p {
    font-weight: 500;
    font-size: 1.1rem;
    color: #333;
    margin-top: 10px;
    line-height: 1.6;
}

.product-item p:nth-child(2) {
    font-weight: 700;
    color: #2E8B57;
    font-size: 1.2rem;
    margin-top: 5px;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
    .product-list {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Điều chỉnh cột cho màn hình nhỏ */
    }
    .product-item {
        padding: 15px;
    }
}



</style>
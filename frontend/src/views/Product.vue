<template>
    <div class="products">
        <div class="notification" @click="hideNotify" v-if="message"> 
            <div class="notification__message"><i class="fa-solid fa-circle-check"></i>
                <p>{{ message }}</p>
            </div>
        </div>
        <div class="products__product col-lg-10 col-md-9 col-12">
            <Filter :min="priceRange.min" 
            :max="priceRange.max" 
            @sort="sort" 
            @range="range" />
            <div class="products__product__list" v-if="products.length > 0">
                <div class="products__product__item col-lg-2 col-3" v-for="item in products" :key="item._id">
                    <router-link :to="{ path: '/product/' + item._id}" class="products__product__item__image">
                        <img :src="'http://localhost:3000/static/' + item.hinhanh" alt="Product image">
                    </router-link>
                    
                    <div class="products__product__item__information">
                        <p class="products__product__item__name">{{ item.ten }}</p>
                        <p class="products__product__item__price">{{ parseInt(item.dongia).toLocaleString() }}</p>
                    </div>
                    <div class="products__product__item__button">
                        <button v-if="item.soluong > 0" @click="addToCart(item)">Thêm vào giỏ hàng</button>
                        <button v-else class="btn btn-secondary" disabled>Hết hàng</button>
                        <router-link :to="{ path: '/product/' + item._id}">Xem thêm</router-link>
                    </div>
                </div>
            </div>
            <div class="products__product__list row m-2" v-else>Không có sản phẩm nào</div>         
        </div>
    </div>
</template>

<script>
import ProductsService from "@/services/book.service";
import userService from "@/services/user.service";
import { useUserStore } from "@/stores/userStore";
import Filter from "@/components/Filter.vue";

export default {
    components: {
        Filter,
    },
    watch: {
        '$route.query'(newValue) {
            this.query = this.$route.query.search;
            this.getData();
        },
    },
    async mounted() {
        await this.getData();
    },
    computed: {
        productStrings() {
            return this.products.map((product) => {
                const { ten, mota, nhasanxuat } = product;
                return [ten, mota, nhasanxuat].join(" ").toUpperCase();
            });
        },
        filteredProducts() {
            if (this.query === '') return this.products;
            return this.products.filter((_, index) =>
                this.productStrings[index].includes(this.query.toUpperCase())
            );
        },
    },
    data() {
        return {
            products: [],
            message: '',
            query: '',
            priceRange: {
                min: 0, // Giá thấp nhất ban đầu
                max: 1000000, // Giá cao nhất ban đầu
            },
        }
    },
    methods: {
        async getData() {
            const allProducts = await ProductsService.getAll();
            this.products = allProducts.filter(item => item.deleted === 0);

            // Tìm giá thấp nhất và cao nhất
            const prices = this.products.map(item => item.dongia);
            this.priceRange.min = Math.min(...prices);
            this.priceRange.max = Math.max(...prices);
        },
        async addToCart(data) {
            if (!useUserStore().login) {
                // Hiển thị thông báo yêu cầu đăng nhập
                const confirmed = confirm('Bạn cần đăng nhập để mua hàng. Bạn có muốn đăng nhập ngay không?');
                if (confirmed) {
                    // Chuyển hướng đến trang đăng nhập
                    this.$router.push('/login'); // Đảm bảo trang đăng nhập chính xác
                }
            } else {
                const { _id, dongia, ten, hinhanh } = data;
                const filterData = { _id, dongia, ten, hinhanh };
                const success = await userService.addCart(filterData);
                this.message = success.message ? "Thất bại" : "Thành công";
            }
        },
        hideNotify() {
            this.message = '';
        },
        async sort(data) {
            if (data === 'asc') {
                this.products = this.products.sort((a, b) => a.dongia - b.dongia);
            } else if (data === 'desc') {
                this.products = this.products.sort((a, b) => b.dongia - a.dongia);
            } else {
                const allProducts = await ProductsService.getAll();
                this.products = allProducts.filter(item => item.deleted === 0);
            }
        },
        async range(data) {
        const { minPrice, maxPrice } = data;
        const allProducts = await ProductsService.getAll(); // Lấy tất cả sản phẩm
        this.products = allProducts.filter(item => 
            parseInt(item.dongia) >= parseInt(minPrice) && 
            parseInt(item.dongia) <= parseInt(maxPrice) &&
            item.deleted === 0
        );
    }
    }
}
</script>


<style>

.products {
    min-height: 100vh;
    position: relative;
    background: #f8fff5; /* Nền trắng xanh lá nhạt */
    margin-top: -10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}

.products__product__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.products__product__item {
    height: 45vh; /* Tăng chiều cao của khung sản phẩm */
    width: 20%; /* Tăng độ rộng của khung sản phẩm */
    background-color: #ffffff;
    padding: 0;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #dcdcdc;
    display: flex;
    flex-direction: column;
    margin: 10px 1.5%; /* Tăng khoảng cách giữa các sản phẩm */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Hiệu ứng đổ bóng nhẹ */
}

.products__product__item:hover {
    background-color: #eaf8e6; /* Màu nền xanh lá nhạt khi hover */
    transform: translateY(-5px); /* Hiệu ứng nhô lên */
    transition: 0.4s ease;
}

.products__product__item__image {
    height: 70%; /* Tăng diện tích hiển thị hình ảnh */
    width: 100%;
    overflow: hidden;
}

.products__product__item__image img {
    height: 100%;
    width: 100%;
    object-fit: cover; /* Hình ảnh sẽ bao phủ toàn bộ khung */
}

.products__product__item__information {
    text-align: center;
    padding: 10px;
    flex-grow: 1;
}

.products__product__item__information p {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2e8b57; /* Màu xanh lá đậm */
    margin: 5px 0;
}

.products__product__item__name {
    font-weight: 700;
    overflow: hidden;
    text-transform: uppercase;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #2e8b57; /* Xanh lá nhạt */
    padding: 5px 0;
}

.products__product__item__button {
    margin: 5px 10px; /* Căn chỉnh nút với khoảng cách hợp lý */
    display: flex;
    flex-direction: column; /* Sắp xếp các nút theo chiều dọc */
    gap: 8px; /* Tạo khoảng cách giữa các nút */
    padding: 6px 10px;
}

.products__product__item__button button,
.products__product__item__button a {
    text-align: center;
    padding: 10px 15px; /* Tăng vùng nhấn cho nút */
    border-radius: 30px;
    font-size: 0.85rem; /* Kích thước chữ nhỏ gọn */
}

.products__product__item__button a {
    color: #2e8b57; /* Màu xanh lá nhạt */
    background: none; /* Không có nền cho link */
    text-decoration: underline;
    font-weight: 600;
}

.products__product__item__button a:hover {
    color: #3cb371; /* Màu đậm hơn khi hover */
}

.notification {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border: 2px solid #2e8b57;
    border-radius: 10px;
    padding: 20px 40px;
    color: #2e8b57;
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(46, 139, 87, 0.3);
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: fadeIn 0.5s ease, fadeOut 0.5s ease 3s;
}

.notification i {
    font-size: 2rem;
}

.notification p {
    margin: 0;
    font-size: 1rem;
}

/* Hiệu ứng fade */
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

/* Responsive */
@media screen and (max-width: 768px) {
    .products__product__list {
        justify-content: center;
    }

    .products__product__item {
        width: 100%;
        max-width: 320px;
    }

    .products__product__item__button {
        flex-direction: column;
        gap: 5px;
    }

    .notification {
        width: 90%;
        padding: 20px;
    }
}



</style>
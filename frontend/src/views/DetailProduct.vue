<template>
    <div class="header__left"> 
            <router-link to="/" class="header__left__link">Gia dụng xanh</router-link> 
            <span> / {{ this.$route.name }}</span>
        </div>
    <div class="detail">
        <Notification :message="message" />
       <div v-if="item" class="col-sm-11 row">
        <div class="detail__image col-sm-6">
            <img :src="'http://localhost:3000/static/'+item.hinhanh" alt="">
        </div>
        <div class="detail__info col-sm-6 ">
            <h3 class="detail__name">{{ item.ten }}</h3>
            <p>{{ item.mota }}</p>
            <p>Sản xuất: {{ item.nhasanxuat }}</p>
            <p>Giá: <span style="color: var(--color-main);font-weight: 700;">{{ parseInt(item.dongia).toLocaleString() }}</span></p>
            <p>Số lượng còn lại: {{ item.soluong }}</p>
            <input type="number" min="1" v-model="quanlity" style="width: 40pt; border-radius: 20pt; padding-left: 5pt;">
            <div class="row justify-content-center"> <button class="btn btn-info" @click="addToCart(this.item)" style="border-radius: 30pt;  width: 200px;">Thêm vào giỏ hàng</button></div>
            
        </div>
       </div>
       <p v-else>Không có sản phẩm</p>
    </div>

    <div v-if="relatedProducts.length > 0" class="related-products">
        <h3>Có thể bạn quan tâm</h3>
        <div class="row">
            <div v-for="product in relatedProducts" :key="product._id" class="col-sm-3">
                <div class="product-card">
                    <img :src="'http://localhost:3000/static/' + product.hinhanh" alt="" class="product-card__image">
                    <h4 class="product-card__name">{{ product.ten }}</h4>
                    <p>Giá: {{ parseInt(product.dongia).toLocaleString() }}</p>
                    <router-link :to="'/product/' + product._id" class="btn btn-info">Xem chi tiết</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ProductService from '@/services/book.service';
import userService from '@/services/user.service';
import Notification from '@/components/Notification.vue';
import { useUserStore } from '@/stores/userStore';
export default {
    // mounted() {
    //     this.getItem();
    // },
    components: {
        Notification
    },
    watch: {
        '$route.params.id': {
            immediate: true, 
            handler(newId, oldId) {
                this.getItem(); 
            }
        }
    },
    methods: {
        async getItem() {
        try {
            // Lấy thông tin sản phẩm chi tiết
            this.item = await ProductService.getOne(this.$route.params.id);
            
            if (this.item) {
                // Lấy danh sách tất cả sản phẩm
                const allProducts = await ProductService.getAll();

                // Lọc sản phẩm cùng danh mục (ngoại trừ sản phẩm hiện tại)
                this.relatedProducts = allProducts.filter(product => 
                    product.danhmuc === this.item.danhmuc && product._id !== this.item._id
                );
            }
        } catch (error) {
            console.error("Lỗi khi lấy thông tin sản phẩm:", error);
        }
    },
         async addToCart(data) {
            if (!useUserStore().login) {
              // Hiển thị thông báo yêu cầu đăng nhập
              const confirmed = confirm('Bạn cần đăng nhập để mua hàng. Bạn có muốn đăng nhập ngay không?');
              if (confirmed) {
                // Chuyển hướng đến trang đăng nhập
                this.$router.push('/login'); // Thay đổi '/login' thành địa chỉ của trang đăng nhập của bạn
                }
            } else {
                const { _id, dongia, ten, hinhanh } = data;
                const quanlity = {soluong: this.quanlity};
                const filterData = { _id, dongia, ten, hinhanh, ...quanlity};


                const success = await userService.addCart(filterData)
                if(!success.message){
                    this.message = "Thành công"
                }
                else this.message = "Thất bại"
            }
        },
        hideNotify() {
            this.message = ''
        }
    },
    data() {
        return {
            item: '',
            
            relatedProducts: [],
            quanlity: 1,
            message: ''
        }
    }
}
</script>

<style>
.detail {
    min-height: 100vh;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    background-color: #f8fdf8; /* Xanh lá nhạt */
    color: #2e8b57; /* Xanh lá đậm */
}

.detail__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.detail__image img {
    width: 100%; /* Chiếm toàn bộ khung */
    max-width: 350px; /* Đặt chiều rộng tối đa */
    border-radius: 10px;
    object-fit: cover; /* Giúp ảnh vừa khung */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.detail__info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Đặt nội dung về phía trên */
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
    max-width: 600px; /* Đặt giới hạn chiều rộng */
}

.detail__name {
    font-size: 1.5rem; /* Tăng tiêu đề */
    font-weight: bold;
    margin-bottom: 10px;
    color: #2e8b57;
}

.detail__description {
    font-size: 1rem; /* Mô tả dễ đọc hơn */
    margin-bottom: 10px;
    color: #333333;
}

.detail__info p {
    font-size: 0.95rem; /* Kích thước hợp lý */
    margin: 5px 0;
    line-height: 1.5;
}

.detail__info span {
    font-weight: 700;
    color: #2e8b57;
}

.detail__actions {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
}

.detail__actions input {
    width: 60px;
    padding: 5px;
    border: 1px solid #90ee90;
    border-radius: 5px;
    text-align: center;
}

.detail__actions button {
    background-color: #90ee90;
    color: #ffffff;
    font-weight: 600;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.detail__actions button:hover {
    background-color: #76c476;
    transform: translateY(-2px);
    cursor: pointer;
}
.related-products {
    margin-top: 30px;
    padding: 20px 0;
    background-color: #f9f9f9;
    border-top: 2px solid #eaeaea;
}

.related-products h3 {
    font-size: 1.5rem;
    color: #2e8b57;
    margin-bottom: 20px;
}

.product-card {
    background: #ffffff;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    transition: box-shadow 0.3s ease;
}

.product-card:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-card__image {
    width: 100%;
    max-width: 150px;
    margin: 0 auto;
    border-radius: 5px;
    object-fit: cover;
}

.product-card__name {
    font-size: 1rem;
    margin: 10px 0;
    color: #2e8b57;
}

.product-card p {
    font-size: 0.9rem;
    margin: 5px 0;
    color: #333;
}

</style>
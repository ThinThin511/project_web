<template>
    <Notification :message="message" />
    
    <div class="cart row col-12">
        <h1 class="cart__title text-success" style="margin-top: 20pt !important; margin-left: 20pt;">GIỎ SÁCH</h1>
        <div class="cart__body col-lg-8 mx-auto" v-if="userStore.cart.length > 0">
            <div v-for="(item, index) in userStore.cart" :key="item._id" class="cart__body__item row align-items-center">
                <!-- Hình ảnh sản phẩm -->
                 <div class="cart__body__item__image col-md-2">
                    <p>{{ index+1 }}</p>
                </div>
                <div class="cart__body__item__image col-md-2">
                    <img :src="'http://localhost:3000/static/' + item.sach.hinhanh" alt="Sản phẩm">
                </div>
                <!-- Tên sản phẩm -->
                <div class="cart__body__item__name col-md-4">
                    <p>{{ item.sach.ten }}</p>
                </div>
                <!-- Số lượng sản phẩm -->
                <div class="cart__body__item__quanlity col-md-2">
                    <input type="number" min="1" @focusout="update(item)" v-model="item.soluong" />
                </div>
                <!-- Giá sản phẩm -->
                <!-- <div class="cart__body__item__price col-md-2">
                    <p>{{ item.sach.dongia.toLocaleString() }} VND</p>
                </div> -->
                <!-- Nút xóa -->
                <div class="cart__body__item__action col-md-2">
                    <i class="fa-solid fa-x btn btn-danger" @click="deleteCart(item)"></i>
                </div>
            </div>
        </div>
        <div v-else class="cart__body__item row col-md-8 justify-content-center" >Chưa có sản phẩm nào trong giỏ hàng</div>
        <Payment :total="total" @showNotify="showNotify" />
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
import userService from '@/services/user.service';
import Payment from '../components/Payment.vue';
import Notification from '../components/Notification.vue'
export default {
    components: {
        Payment, Notification
    },
    created() {
        this.getCart();
    },
    methods: {
        async getCart() {
            if(this.userStore.login) {
                this.userStore.cart = await userService.getCart()
                this.cart =  this.userStore.cart.map(item => item.dongia)
                this.total = this.cart.reduce((acc, price) => {
                    return acc+price;
                },0);
            }
        },
        async update(payload) {
            const updated = await userService.updateCart(payload)
            if(!updated.message)
                this.getCart()
            else 
                this.message = updated.message
        },
        async deleteCart(data) {
            const deleted = await userService.deleteCart(data._id)
            if(deleted)
                this.getCart()
            else 
                this.message = "Không thể xóa"
        },
        showNotify(message) {
            this.message = message
        }
    },
    data() {
        return {
            total: 0,
            message: '',
            cart: [],
            userStore: useUserStore(),
        }
    }
}
</script>

<style>
.cart {
    min-height: 100vh;
    height: fit-content;
    background-color: #f9f9f9; /* Màu nền nhẹ */
    color: #000000;
    padding: 20px 0;
    
}

#cart__title {
    text-align: center;
    color: #4CAF50; /* Màu xanh lá nhạt */
    font-size: 2.5rem;
    margin-bottom: 20px;
    
}

.cart__body__item {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border-bottom: 1px solid #ddd; /* Đường viền giữa các mục */
    padding: 15px 0;
}

.cart__body__item__image img {
    width: 100%;
    max-height: 80px; /* Giới hạn chiều cao hình ảnh */
    object-fit: cover; /* Căn chỉnh hình ảnh cho cân đối */
}

.cart__body__item__name p {
    margin: 0;
    font-size: 1rem;
    font-weight: bold;
}

.cart__body__item__quanlity input {
    max-width: 60px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.cart__body__item__price p {
    margin: 0;
    color: #4CAF50; /* Màu xanh nổi bật cho giá */
    font-weight: bold;
}

.cart__body__item__action i {
    cursor: pointer;
    font-size: 1.2rem;
    color: #e53935; /* Màu đỏ cho nút xóa */
}
.fa-x::before{
    color: #fff;
}

</style>
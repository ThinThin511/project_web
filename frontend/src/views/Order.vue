<template>
    <div class="order">
        <h3>Đơn hàng của bạn</h3>
        <div class="order__list order__list__title row col-sm-11">
            <div class="order__list__item col-sm-1">STT</div>
            <div class="order__list__item col-sm-3">Chi tiết đơn hàng</div>
            <div class="order__list__item col-sm-1">Ngày đặt hàng</div>
            <div class="order__list__item col-sm-2">Địa chỉ giao hàng</div>
            <div class="order__list__item col-sm-2">Ghi chú</div>
            <div class="order__list__item col-sm-2">Tổng tiền</div>
            <div class="order__list__item col-sm-1">Trạng thái</div>
        </div>
        <div v-for="(item, index) in order" class="order__list row col-sm-11" :key="item.id">
            <div class="order__list__item col-sm-1">{{ index+1 }}</div>
            <div class="order__list__item order__list__item--sach col-sm-3">
                <div class="order__list__item__sach d-flex" v-for="item_item in item.product">
                    <img :src="'http://localhost:3000/static/'+item_item.product.hinhanh" alt="">
                    <div>
                        <p>{{ item_item.product.ten }}</p>
                        <p>x{{ item_item.soluong }} {{ item_item.gia.toLocaleString() }} VNĐ</p>
                    </div>
                </div>
            </div>
            <div class="order__list__item col-sm-1">{{ item.ngaydathang }}</div>
            <div class="order__list__item col-sm-2">{{ item.user.diachi }}</div>
            <div class="order__list__item col-sm-2">{{ item.note }}</div>
            <div class="order__list__item col-sm-2">{{ item.tongtien.toLocaleString() }} VNĐ</div>
            
            <div v-if="item.trangthai == 'Đã giao hàng'" class="order__list__item col-sm-1 text-success fw-bold">
                {{ item.trangthai }}
            </div>
            <div v-else-if="item.trangthai == 'Đã hủy'" class="order__list__item col-sm-1 text-danger fw-bold">
                {{ item.trangthai }}
            </div>
            <div v-else-if="item.trangthai == 'Đã duyệt'" class="order__list__item col-sm-1 text-warning fw-bold">
                {{ item.trangthai }}
                <button @click="confirmCancelOrder(item)" class="btn btn-danger btn-sm ms-2">Hủy đơn</button>
            </div>
            <div v-else-if="item.trangthai == 'Đang chờ xác nhận'" class="order__list__item col-sm-1 text-secondary fw-bold">
                {{ item.trangthai }}
                <button @click="confirmCancelOrder(item)" class="btn btn-danger btn-sm ms-2">Hủy đơn</button>
            </div>
            <div v-else class="order__list__item col-sm-1 text-primary fw-bold">
                {{ item.trangthai }}
            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/services/user.service';

export default {
    created() {
        this.getOrder();
    },
    methods: {
        async getOrder() {
            this.order = await userService.getAllOrder();
        },

        // Xác nhận hủy đơn hàng qua confirm
        confirmCancelOrder(order) {
            var isConfirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?");
            if (isConfirmed) {
                this.cancelOrder(order);
            }
        },

        // Hủy đơn hàng
        async cancelOrder(order) {
            try {
                console.log(order._id); // Kiểm tra _id
                order.trangthai = 'Đã hủy'; // Cập nhật trạng thái thành "Đã hủy"
                await userService.updateOrder(order); // Gửi yêu cầu cập nhật trạng thái
                this.getOrder(); // Lấy lại danh sách đơn hàng
                alert("Đơn hàng đã được hủy thành công.");
            } catch (error) {
                
                // alert("Có lỗi xảy ra khi hủy đơn hàng.");
            }
        }
    },
    data() {
        return {
            order: []
        };
    },
}
</script>

<style>
/* Bạn có thể giữ nguyên phần style từ trước */
.order {
    height: 80vh;
    min-height: fit-content;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.order h3 {
    margin-top: 20px;
    text-align: center;
    color: var(--color-main);
    height: min-content;
}
.order__list {
    align-items: center;
    border: 2px solid #73737392 ;
    border-top: none ;
    margin: 0 auto;
    padding: 10px 0;
}

.order__list__item__sach img{
    width: 70px;
}

.order__list__item--sach {
    text-align: start;
}

.order__list__item--sach p {
    margin: 0;
}

.order__list__title {
    background-color: var(--color-main);
    font-weight: 600;
}
</style>

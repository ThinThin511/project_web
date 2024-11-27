<template>
    <div class="order">
        <div class="order__header">
           
        </div>
        <div class="order__form" :class="{'order__form--active': order_form }">
            <form action="" @submit.prevent="handleSubmit">
                <p class="btn btn-outline-danger close" @click="handleOrder">&times</p>
                <h3>Chi tiết đơn hàng</h3>
                <div class="order__form__item">
                    <p>Mã phiếu:</p>
                    <span>{{ order._id }}</span>
                </div>
                <div class="order__form__item">
                    <p>Tên khách hàng:</p>
                    <span>{{ user.ho + ' ' + user.ten }}</span>
                </div>
                <div class="order__form__item">
                    <p>Số điện thoại:</p>
                    <span>{{ user.sodienthoai }}</span>
                </div>
                <div class="order__form__item">
                    <p>Chi tiết đơn:</p>
                </div>
                <div style="margin-left:30pt ;" class="order__form__item order__form__item__book" v-for="(item,index) in product">
                    <span>{{ index+1+'. ' + item.product.ten + ' x'+ item.soluong   }}</span>
                    
                    <span>{{ item.product.dongia + ' VNĐ '  }}</span>
                </div>
                <div class="order__form__item">
                    <p>Tổng tiền:</p>
                    <span>{{ order.tongtien }}VNĐ</span>
                </div>
                <div class="order__form__item">
                    <p>Ngày đặt hàng:</p>
                    <span>{{ order.ngaydathang }}</span>
                </div>
                <!-- <div class="order__form__item">
                    <p>Ngày trả:</p>
                    <span>{{ order.ngaytra }}</span>
                    <input v-if="order.trangthai != 'Đã trả'" type="date" v-model="ngaytra" @change="handlePhuthu">
                    <input v-else disabled type="date" v-model="ngaytra" @change="handlePhuthu">
                </div> -->
                <div class="order__form__item">
                    <p>Trạng thái:</p>
                    <input v-if="order.trangthai == 'Đã giao hàng'" disabled type="text" v-model="order.trangthai">
                    <input v-else-if="order.trangthai == 'Đã hủy'" disabled type="text" v-model="order.trangthai">
                    <select v-else name="" id="" v-model="trangthai">
                        <option :value="order.trangthai" selected>{{ order.trangthai }}</option>
                        <option value="Đã duyệt">Đã duyệt</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Đã hủy">Đã hủy</option>
                        <option value="Đã giao hàng">Đã giao hàng</option>
                    </select>
                </div>
                <!-- <div class="order__form__item">
                    <p>Phụ thu:</p>
                    <input v-if="order.trangthai != 'Đã trả'" type="checkbox" v-model="phuthu">
                    <input v-else disabled type="checkbox" v-model="phuthu">
                </div>
                <p v-if="phuthu">Phụ thu: {{ tongtien*20/100 }} Tổng tiền: {{ tongtien + tongtien*20/100 }}</p> -->
                <button>Cập nhật</button>
            </form>
        </div>
        <TableOrder :nameTable="this.$route.name" @edit="handleEditOrder"/>
    </div>
</template>
<script>
import TableOrder from "@/components/TableOrder.vue";
import staffService from "@/services/staff.service";
import ProductService from"@/services/product.service";
export default {
    components: {
        TableOrder
    },
    watch: {
        phuthu(newValue, oldValue) {
            if (newValue) {
                this.phuthu = 1; // Nếu checkbox được chọn, cập nhật giá trị của phuthu thành 1
                console.log('thay đổi' + this.phuthu)
            }
            else {
                console.log('không có thay đổi' + this.phuthu)
            }
        }
    },
    methods: {
        handleOrder() {
            this.order_form = !this.order_form;
        },
        handleEditOrder(order) {
            this.order = order;
            this.product = order.product;
            this.user = order.user;
            
            this.tongtien = order.tongtien;
            this.trangthai = order.trangthai;
            this.order_form = !this.order_form;
        },
        // handlePhuthu() {
        //     const parts = this.ngaymuon.split('-');
        //     const ngay_muon = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        //     console.log('ngay mượn: '+ngay_muon)

        //     const parts_two = this.ngaytra.split('-')
        //     const ngay_tra = new Date(parseInt(parts_two[0]), parseInt(parts_two[1]) - 1, parseInt(parts_two[2]));

        //     console.log('ngay trả: '+ ngay_tra)
        //     return ngay_tra - ngay_muon < 7*24*60*60*1000; //7 ngày
        // },
        async handleSubmit() {
            // Kiểm tra lại trạng thái và tính phụ thu nếu có
            // if (!this.handlePhuthu()) {
            //     this.phuthu = this.tongtien * 20 / 100;
            // }
            // Cập nhật tổng tiền
            this.tongtien = this.phuthu ? this.tongtien + this.tongtien * 20 / 100 : this.tongtien;

            // Dữ liệu gửi lên API
            const data = {
                _id: this.order._id,
                
                user: this.user,
                tongtien: this.tongtien,
                product: this.product,
                trangthai: this.trangthai,
            };

            // Gọi API cập nhật đơn mượn
            const response = await staffService.updateOrder(data);

            if (response) {
                // Nếu cập nhật đơn mượn thành công, kiểm tra nếu trạng thái là 'Đã trả'
                if (this.trangthai === "Đã hủy") {
                    // Cập nhật số lượng sách trong kho
                    for (let item of this.product) {
                        // Gọi API để cập nhật số lượng sách trong kho
                        await ProductService.updateOrderStatus( item.product._id, item.soluong );
                    }
                }
                // Đóng form chỉnh sửa
                this.order_form = !this.order_form;
            }
        }
    },
    data() {
        return {
            order_form: false,
            order: '',
            product: [],
            user: {},
            
            tongtien: 0,
            trangthai:'',
            
        }
    }
}
</script>
<style>
.order__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: #A7D8A5; 
    padding: 10px; */
}

.order__header input {
    font-size: 0.9rem;
    padding: 5px 7px;
    border-radius: 7px;
    border: none;
    width: 10rem;
    background-color: #FFFFFF; /* Màu nền trắng cho input */
}

.order__header__action {
    display: flex;
    align-items: center;
}

.order__header__action button {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: none;
    font-weight: 400;
    font-size: 20px;
    background-color: #A7D8A5; /* Màu xanh lá nhạt cho button */
    color: #fff;
    margin-right: 10px;
}

.order__header__action button:hover {
    background-color: #6AA96E; /* Màu xanh lá đậm hơn khi hover */
}

.order__form {
    background-color: rgba(255, 255, 255, 0.5); /* Nền sáng nhạt với tỷ lệ trong suốt */
    width: 100%;
    position: fixed;
    z-index: 1;
    height: 100%;
    top: -200%;
    left: 0;
    display: flex;
    transition: top 0.5s ease;
}

.order__form.order__form--active {
    top: 0;
}

.order__form form {
    position: relative;
    background-color: #fff; /* Nền sáng cho form */
    margin: auto;
    height: fit-content;
    text-align: center;
    border-radius: 12px; /* Bo góc mềm mại */
    color: #333; /* Chữ màu tối */
    padding: 30px 35px;
    width: 50%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
}

.order__form form h3 {
    padding: 15px;
    color: #A7D8A5; /* Màu xanh lá nhạt cho tiêu đề */
    font-weight: bold;
    font-size: 1.6rem;
    margin-bottom: 20px; /* Khoảng cách dưới tiêu đề */
}

.order__form__item {
    display: flex;
    justify-content: space-between;
    padding: 5px 100px; /* Khoảng cách giữa các mục */
    text-align: start;
    margin-bottom: 20px; /* Khoảng cách giữa các mục */
}

.order__form__item p {
    width: 120px;
    margin: 0px 0;
    color: #555; /* Màu chữ đậm hơn */
    font-size: 1rem;
}

.order__form__item input,
.order__form__item select,
.order__form__item textarea {
    flex-grow: 1;
    border-radius: 8px;
    border: 1px solid #ddd; /* Đường viền sáng */
    padding: 8px 10px;
    font-size: 1rem;
    background-color: #f7f7f7; /* Nền sáng cho các ô nhập liệu */
}

.order__form__item input:focus,
.order__form__item select:focus,
.order__form__item textarea:focus {
    outline: none;
    border: 2px solid #A7D8A5; /* Màu xanh lá nhạt khi focus */
}

.order__form form button {
    width: 160px;
    height: 45px;
    border-radius: 12px;
    background-color: #A7D8A5; /* Màu xanh lá nhạt cho nút chính */
    border: none;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin-top: 20px; /* Khoảng cách trên nút */
}

.order__form form button:hover {
    background-color: #6AA96E; /* Màu xanh lá đậm hơn khi hover */
    transform: scale(1.05);
}

.order__form form .close {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    font-size: 1.5rem;
    background: none;
    color: #e74c3c; /* Màu đỏ cho nút đóng */
    border: none;
    font-weight: bold;
    transition: color 0.3s ease;
}

.order__form form .close:hover {
    color: #c0392b; /* Màu đỏ đậm khi hover */
}

.order__form__item img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 10px;
}


</style>

  
<template>
    <div class="payment col-lg-3">
        <p class="payment__title">Thông tin phiếu mượn</p>
        <form class="payment__form" @submit.prevent="handlePayment">
            <!-- Họ và Tên -->
            <div class="payment__item payment__row">
                <div class="payment__field">
                    <label for="ho">Họ:</label>
                    <input id="ho" required type="text" v-model="docgia.ho" />
                </div>
                <div class="payment__field">
                    <label for="ten">Tên:</label>
                    <input id="ten" required type="text" v-model="docgia.ten" />
                </div>
            </div>

            <!-- Địa chỉ -->
            <div class="payment__item">
                <label for="diachi">Địa chỉ:</label>
                <input id="diachi" required type="text" v-model="docgia.diachi" />
            </div>

            <!-- Số điện thoại -->
            <div class="payment__item">
                <label for="sdt">Số điện thoại:</label>
                <input id="sdt" required type="text" v-model="docgia.sodienthoai" />
            </div>

            <!-- Ngày mượn và Ghi chú -->
            <div class="payment__item payment__row">
                <div class="payment__field">
                    <label for="ngaymuon">Ngày mượn:</label>
                    <input 
                        id="ngaymuon" 
                        :class="{ 'payment_item--validate': !validateDates() }" 
                        type="date" 
                        @change="validateDates" 
                        v-model="ngaymuon" 
                    />
                </div>
                <div class="payment__field">
                    <label for="ngaytra">Ngày trả:</label>
                    <input 
                        id="ngaytra" 
                        :class="{ 'payment_item--validate': !validateDates() }" 
                        type="date" 
                        @change="validateDates" 
                        v-model="ngaytra" 
                    />
                </div>
                <div class="payment__field">
                    <label for="ghichu">Ghi chú:</label>
                    <input id="ghichu" type="text" v-model="note" placeholder="(Tùy chọn)" />
                </div>
            </div>

            <!-- Hình thức thanh toán -->
            <!-- <div class="payment__item">
                <label>Hình thức thanh toán:</label>
                <div class="payment__method">
                    <label>
                        <input required type="radio" name="method" value="cod" v-model="method_payment" />
                        COD
                    </label>
                    <label>
                        <input required type="radio" name="method" value="card" v-model="method_payment" />
                        Card
                    </label>
                </div>
            </div> -->

            <!-- Nút thanh toán -->
            <div class="payment__item">
                <button type="submit">XÁC NHẬN MƯỢN</button>
            </div>
        </form>
    </div>
</template>
<script>
import { useUserStore } from '@/stores/userStore';
import userService from '@/services/user.service';
// import Notification from '../components/Notification.vue'
export default {
    emits: ['showNotify'],
    props: {
        total: Number,
    },
    methods: {
        async handlePayment() {
            if (!this.validateDates()) {
                this.message = 'Ngày trả phải lớn hơn ngày mượn';
                this.$emit('showNotify', this.message);
                return;
            }

            const data = {
                sach: this.userStore.cart,
                docgia: this.docgia,
                note: this.note,
                // method_payment: this.method_payment,
                // tongtien: this.tinhtongtien,
                ngaymuon: this.ngaymuon,
                ngaytra: this.ngaytra,
            };

            if (data.sach.length > 0) {
                try {
                    if (await userService.addOrder(data)) {
                        this.message = 'Thành công';
                        this.$emit('showNotify', this.message);
                    }
                } catch (error) {
                    console.error(error);
                }
            } else {
                this.message = 'Thất bại';
                this.$emit('showNotify', this.message);
            }
        },
        validateDates() {
            if (!this.ngaymuon || !this.ngaytra) return false;

            const ngaymuon = new Date(this.ngaymuon);
            const ngaytra = new Date(this.ngaytra);

            return ngaytra > ngaymuon;
        },
    },
    computed: {
        tinhtongtien() {
            return this.userStore.cart.reduce((total, currentItem) => total + currentItem.gia, 0);
        },
    },
    data() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        const currentDate = `${yyyy}-${mm}-${dd}`;
        return {
            userStore: useUserStore(),
            docgia: useUserStore().user,
            ngaymuon: currentDate,
            ngaytra: '',
            method_payment: '',
            note: '',
            message: '',
        };
    },
};
</script>
<style>
.payment {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    max-width: 500px; /* Thu gọn chiều ngang */
}

.payment__title {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.3rem;
    color: var(--color-main, #4caf50);
    text-align: center;
    margin-bottom: 15px;
}

.payment__form {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Giảm khoảng cách giữa các phần */
}

.payment__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.payment__row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}

.payment__field {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.payment__item label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #555;
}

.payment__item input {
    padding: 8px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
}

.payment__item input:focus {
    outline: none;
    border-color: var(--color-main, #4caf50);
}

.payment__method {
    display: flex;
    gap: 10px;
}

.payment__item button {
    background-color: var(--color-main, #4caf50);
    color: white;
    border: none;
    padding: 8px 12px;
    font-size: 1rem;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.payment__item button:hover {
    background-color: #45a049;
}

.payment_item--validate {
    background-color: #fce4e4;
    border-color: #e53935;
}

</style>
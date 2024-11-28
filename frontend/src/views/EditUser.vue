<template>
    <div class="header__left"> 
        <router-link to="/" class="header__left__link">Gia dụng xanh</router-link> 
        <span> / {{ this.$route.name }}</span>
    </div>
    <div class="register">
        <form @submit.prevent="handleSubmit">
            <div v-if="success" class="alert alert-success">
                Cập nhật thông tin thành công
            </div>
            <h1>Cập nhật thông tin</h1>
            <div class="register__info">
                <div class="register__info__item">
                    <label for="" class="">Họ:</label>
                    <input required type="text" v-model="ho">
                </div>
                <div class="register__info__item">
                    <label for="" class="">Tên:</label>
                    <input required type="text" v-model="ten">
                </div>
            </div>
            <div class="register__info">
                <div class="register__info__item">
                    <label for="" class="">Số điện thoại:</label>
                    <input required maxlength="10" minlength="10" type="text" v-model="sodienthoai">
                </div>
                <div class="register__info__item">
                    <label for="" class="">Giới tính:</label>
                    <select v-model="gioitinh">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                </div>
            </div>
            <div class="register__info register__info__item">
                <label for="">Ngày sinh:</label>
                <input required type="date" v-model="ngaysinh" max="2018-12-31">
            </div>
            <div class="register__info register__info__item">
                <label for="">Địa chỉ:</label>
                <textarea cols="30" rows="3" v-model="diachi"></textarea>
            </div>
            <button class="m-1 btn btn-outline-info">Lưu thay đổi</button>
        </form>
    </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import userService from "@/services/user.service";

export default {
    data() {
        return {
            ho: "",
            ten: "",
            sodienthoai: "",
            gioitinh: "",
            ngaysinh: "",
            diachi: "",
            success: false,
        };
    },
    created() {
        const userStore = useUserStore();
        if (userStore.user) {
            // Gán thông tin từ store vào các trường dữ liệu
            const { ho, ten, sodienthoai, gioitinh, ngaysinh, diachi,id } = userStore.user;
            this.id = id || "";
            this.ho = ho || "";
            this.ten = ten || "";
            this.sodienthoai = sodienthoai || "";
            this.gioitinh = gioitinh || "";
            this.ngaysinh = ngaysinh || "";
            this.diachi = diachi || "";
        }
    },
    methods: {
        async handleSubmit() {
            const userStore = useUserStore(); // Lấy thông tin người dùng từ store
            const userId = userStore.user._id; // Lấy ID người dùng

            const data = {
                ho: this.ho,
                ten: this.ten,
                sodienthoai: this.sodienthoai,
                gioitinh: this.gioitinh,
                ngaysinh: this.ngaysinh,
                diachi: this.diachi,
            };

            try {
                // Gọi API cập nhật thông tin
                const updatedUser = await userService.updateUser(userId, data);

                // Cập nhật thông tin user trong store
                userStore.setUser(updatedUser);

                this.success = true; // Hiển thị thông báo thành công
            } catch (error) {
                console.error("Lỗi khi cập nhật thông tin:", error);
            }
        },
    },
};
</script>


<style>
.register {
    position: relative;
        /* Để tạo không gian cho lớp phủ */
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        background: url('../assets/edit.webp') no-repeat center center fixed;
        background-size: cover;
}
.header__left {
    width: 100%; /* Để header trải dài */
    text-align: left; /* Căn text về bên trái */
    padding: 10px 20px; /* Khoảng cách trong */
    background-color: #f8fff5; /* Nền trắng xanh nhạt */
    border-bottom: 2px solid #e0e0e0; /* Đường gạch ngang ở dưới */
    font-size: 1rem; /* Kích thước chữ vừa đủ */
    font-weight: 500;
    display: flex;
    align-items: center; /* Căn giữa theo chiều dọc */
}

.header__left__link {
    color: #2e8b57; /* Màu xanh lá đậm */
    text-decoration: none; /* Loại bỏ gạch chân */
    font-weight: bold;
    transition: color 0.3s ease; /* Hiệu ứng chuyển màu */
}

.header__left__link:hover {
    color: #3cb371; /* Màu xanh đậm hơn khi hover */
    text-decoration: underline; /* Hiển thị gạch chân khi hover */
}

.header__left span {
    color: #555; /* Màu xám nhạt hơn để phân biệt */
    margin-left: 5px; /* Khoảng cách giữa "Gia dụng xanh" và "/" */
    font-weight: normal;
}
.register::before {
    content: '';
    /* Tạo lớp phủ */
    position: absolute;
    /* Đặt lớp phủ lên trên hình nền */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    /* Lớp phủ màu đen với độ trong suốt 50% */
    z-index: 0;
    /* Đảm bảo lớp phủ không che nội dung */
}

.register h1{
    font-weight: 700;
        color: var(--color-main);
        /* Màu chữ xanh lá nhạt */
        font-size: 2.5rem;
        padding: 0 100px;
    
}

.register form {
    background-color: rgba(255, 255, 255, 0.7);
        /* Nền trắng nhạt */
        backdrop-filter: blur(8px);
        border-radius: 40px;
        padding: 10px 20px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border: 1px solid #6a6a6a;
        color: var(--color-text);
}

.register__info {
    display: flex;
    margin-bottom: 10px;
    color: var(--color-text);
}

.register__info__item {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0 10px;
    color: #fff;
    flex: 1;
}

.register__info__item input:focus {
    border-color: var(--color-main) !important;
    /* Viền input chuyển thành màu xanh lá nhạt khi focus */
    
}
.register__info__item input, textarea {
    width: 100%;
    border-radius: 15px;
    border: none;
    background-color: rgb(255, 255, 255);
    font-size: 1.2rem;
    padding-left: 10px;
}

.register__info__item select {
    height: 100%;
    border-radius: 15px;
    border: none;
    background-color: rgb(255, 255, 255);
    font-size: 1.2rem;
    padding-left: 10px;
    min-width: 100%;
}

.register form a {
    color: var(--color-main);
}

</style>

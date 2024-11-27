<template>
    <div class="login">
        <!-- <Notification :message="message"></Notification> -->
        <div class="login__header">
            <img src="@/assets/logo.png" alt="Logo" class="login__logo__img">
            <span class="login__title">Trang quản lý</span>
        </div>
        <div class="image">
            <!-- <img src="" alt=""> -->
        </div>
        <div class="form">
            <form action="" method="" @submit.prevent="handleSubmit">
                <h1>ĐĂNG KÝ</h1>
                <div class="login__info__item">
                    <i class="ri-user-line"></i>
                    <input required type="text" v-model="hoten" placeholder="Họ tên">
                </div>
                <div class="login__info__item">
                    <i class="ri-briefcase-line"></i>
                    <input required type="text" v-model="chucvu" placeholder="Chức vụ">
                </div>
                <div class="login__info__item">
                    <i class="ri-home-4-line"></i>
                    <input required type="text" v-model="diachi" placeholder="Điạ chỉ">
                </div>
                <div class="login__info__item">
                    <i class="ri-phone-line"></i>
                    <input required type="text" v-model="sodienthoai" placeholder="Số điện thoại" minlength="10" maxlength="10">
                </div>
                <div class="login__info__item">
                    <i class="ri-lock-line"></i>
                    <input required type="password" v-model="password" placeholder="Mật khẩu">
                </div>
                <div class="login__info__item">
                    <i class="ri-lock-line"></i>
                    <input required type="password" v-model="password_comfirm" placeholder="Xác nhận mật khẩu">
                </div>
                <p>Đã có tài khoản? <router-link to="/login" class="">Đăng nhập</router-link></p>
                <button class="m-1 btn btn-info">Đăng ký</button>
            </form>
        </div>
    </div>
</template>

<script>
import staffService from '@/services/staff.service';
import Notification from '@/components/Notification.vue';
export default {
    components: {
        Notification
    },
    methods: {
        reset() {
            this.hoten = '';
            this.sodienthoai = '';
            this.password = '';
            this.password_comfirm = '';
            this.chucvu = '';
            this.diachi ='';
            this.register = null;
            this.message = '';
        },
        async handleSubmit() {
            const data = {
                hoten: this.hoten,
                chucvu: this.chucvu,
                diachi: this.diachi,
                sodienthoai: this.sodienthoai,
                password: this.password
            }
            try {
                if(await staffService.register(data)){
                    this.message = "Thành công";
                    window.alert('Thành công');
                    console.log(this.message);
                    this.reset();
                }
            } catch (error) {
                console.log(error);
            }

        }
    },
    data() {
        return {
            hoten: '',
            sodienthoai: '',
            password: '',
            password_comfirm: '',
            chucvu: '',
            diachi:'',
            register: null,
            message: '',
        }
    }
}
</script>

<style scoped>
.login {
    height: 100vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    text-align: center;
    width: 100vw;
    color: #000000;
    background-color: #ffffff; 
}
.login__header {
    display: flex;
    align-items: center;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1;
}

.login__logo__img {
    height: 100px; /* Kích thước của logo */
    width: auto;
    margin-right: 10px; /* Khoảng cách giữa logo và chữ */
    border-radius: 50%;
    border: 1px solid; /* Kích thước viền, kiểu viền, cần thiết để màu viền có hiệu lực */
  border-color: #27ae60;
}

.login__title {
    font-size: 3rem;
    font-weight: 500;
    color:#2ecc71; /* Màu chữ của "Trang quản lý" */
}

.login .image {
    min-width: 50vw;
    height: 80vh;
    display: flex;
    position: relative;
    background: url('../assets/login.jpg');
    background-color: #2ecc71; /* Màu nền xanh lá nhạt */
    background-size: cover;
    object-fit: cover;
}


.login .form h1 {
    font-weight: 500;
    font-size: 2.5rem;  
    color: #2ecc71; /* Màu xanh lá nhạt cho tiêu đề form */
}

.login .form {
    padding: 10px 20px;
    color: #000000;
    min-width: 50%;
    height: 100vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff; /* Màu nền sáng nhạt, gần với màu trắng */
}

.login .form form {
    background-color: #ffffff; /* Nền trắng cho form */
    border-radius: 12px;
    padding: 20px 20px;
    width: fit-content;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px; /* Thêm bóng nhẹ */
    border: 1px solid; /* Kích thước viền, kiểu viền, cần thiết để màu viền có hiệu lực */
  border-color: #27ae60;
}

.login__info__item {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
}

.login__info__item i {
    font-size: 1.8rem;
    margin-right: 15px;
    color: #2ecc71; /* Màu xanh lá nhạt cho icon */
}

.login__info__item input, textarea {
    width: 200px;
    border-radius: 10px;
    border: 1px solid #2ecc71; /* Viền màu xanh lá nhạt */
    background-color: #e0f5e0; /* Màu nền sáng nhẹ cho input */
    height: 40px;
    padding-left: 10px;
}

.login__info__item input:focus, textarea:focus {
    border-color: #27ae60; /* Màu viền khi focus (xanh lá đậm hơn) */
    outline: none;
}

.login form a {
    color: #2ecc71; /* Màu xanh lá nhạt cho liên kết */
}

.login button {
    max-width: 200px;
    align-self: center;
    background-color: #2ecc71; /* Màu nền xanh lá nhạt cho nút */
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.login button:hover {
    background-color: #27ae60; /* Màu nền khi hover (xanh lá đậm hơn) */
    transform: scale(1.05);
}

.login p {
   color: #333;
}

.login p a {
   color: #2ecc71; /* Màu xanh lá nhạt cho liên kết "Đăng ký" */
}
</style>

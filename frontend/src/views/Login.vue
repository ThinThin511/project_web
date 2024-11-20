<template>
    <div class="login">
        <form action="" method="" @submit.prevent="handleSubmit">
            <p class="alert alert-danger" v-if="error">Tài khoản hoặc mật khẩu không đúng</p>
            <h1>Đăng nhập</h1>

            <div class="login__info__item">
                <label for="" class="">Số điện thoại:</label>
                <input required type="text" v-model="phone">
            </div>
            <div class="login__info__item">
                <label for="" class="">Mật khẩu:</label>
                <input required type="password" v-model="password">
            </div>



            <button class="m-1 btn btn-info">Đăng nhập</button>
            <p class="m-1">
                Bạn đã có tài khoản?
                <router-link to="/register">Đăng ký</router-link>
            </p>
        </form>
    </div>
</template>

<script>
import userService from '@/services/user.service';
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const phone = ref('');
        const password = ref('');
        const user = ref(null)
        const error = ref('');
        const router = useRouter();
        const userStore = useUserStore();


        const handleSubmit = async() => {
            const data = {
                sodienthoai: phone.value,
                password: password.value,
            }
            try {
                user.value = await userService.login(data);
                const { accessToken, ...orther } = user.value;
                userStore.setUser(orther)
                userStore.cart = await userService.getCart();
                router.push('/')
            } catch (e) {
                error.value = 'Sai';
                console.log(e);
            }

        }
        return {
            phone,
            password,
            handleSubmit,
            userStore,
            error,
        }
    }
    
}
</script>

<style>
:root {
    --color-main: #8bc34a;
    /* Xanh lá nhạt */
    --color-background: #fff;
    /* Trắng */
    --color-text: #333;
    /* Màu chữ đen tối */
}

.login {
    position: relative;
    /* Để tạo không gian cho lớp phủ */
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    background: url('../assets/homepage.jpg') no-repeat center center fixed;
    background-size: cover;
}

.login::before {
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

.login h1 {
    font-weight: 700;
    color: var(--color-main);
    /* Màu chữ xanh lá nhạt */
    font-size: 2.5rem;
    padding: 0 100px;
}

.login form {
    background-color: rgba(255, 255, 255, 0.7);
    /* Nền trắng nhạt */
    backdrop-filter: blur(8px);
    border-radius: 40px;
    padding: 10px 20px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: 1px solid #6a6a6a;
    color: var(--color-text);
    /* Màu chữ đen tối */
}

.login__info__item {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 20px;
    color: var(--color-text);
    /* Màu chữ đen tối */
}

.login__info__item input {
    width: 100%;
    border-radius: 15px;
    border: 1px solid #ddd;
    /* Viền sáng */
    background-color: #fff;
    /* Nền trắng cho input */
    font-size: 1.2rem;
    padding-left: 10px;
}

.login__info__item input:focus {
    border-color: var(--color-main);
    /* Viền input chuyển thành màu xanh lá nhạt khi focus */
    outline: none;
}

button {
    background-color: var(--color-main);
    /* Màu nền nút xanh lá nhạt */
    color: white;
    /* Màu chữ trắng */
    padding: 10px 20px;
    border-radius: 15px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

button:hover {
    background-color: darken(var(--color-main), 10%);
    /* Tối màu khi hover */
}

button:focus {
    outline: none;
}

.login form a {
    color: var(--color-main);
    /* Màu liên kết xanh lá nhạt */
    text-decoration: none;
}

.login form a:hover {
    text-decoration: underline;
    /* Gạch dưới khi hover */
}

.alert {
    color: #ff4d4f;
    background-color: #ffe5e5;
    padding: 10px;
    border-radius: 5px;
    font-size: 1rem;
    margin-bottom: 15px;
}

</style>

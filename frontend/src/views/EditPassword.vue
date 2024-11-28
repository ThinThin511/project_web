<template>
  <div class="header__left"> 
    <router-link to="/" class="header__left__link">Gia dụng xanh</router-link> 
    <span> / {{ this.$route.name }}</span>
  </div>
  
  <div class="register">
    <form @submit.prevent="handlePasswordChange">
      <div v-if="success" class="alert alert-success">
        Cập nhật mật khẩu thành công
      </div>
      
      <h1>Thay đổi mật khẩu</h1>
      
      <!-- Mật khẩu cũ -->
      <div class="register__info">
        <div class="register__info__item">
          <label for="">Mật khẩu cũ:</label>
          <input 
            required 
            type="password" 
            v-model="oldPassword"
            placeholder="Nhập mật khẩu cũ"
          >
        </div>
      </div>

      <!-- Mật khẩu mới -->
      <div class="register__info">
        <div class="register__info__item">
          <label for="">Mật khẩu mới:</label>
          <input 
            required 
            type="password" 
            v-model="newPassword"
            placeholder="Nhập mật khẩu mới"
          >
        </div>
      </div>

      <!-- Xác nhận mật khẩu mới -->
      <div class="register__info">
        <div class="register__info__item">
          <label for="">Xác nhận mật khẩu mới:</label>
          <input 
            required 
            type="password" 
            v-model="confirmPassword"
            placeholder="Nhập lại mật khẩu mới"
          >
        </div>
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
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      success: false,
    };
  },
  methods: {
    async handlePasswordChange() {
      if (this.newPassword !== this.confirmPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
        return;
      }

      const userStore = useUserStore(); // Lấy thông tin người dùng từ store
      const userId = userStore.user._id; // Lấy ID người dùng

      const data = {
        
        password: this.newPassword,
      };

      try {
        // Gọi API cập nhật mật khẩu
        const updatedUser = await userService.updateUser(userId, data);

        // Cập nhật thông tin người dùng trong store (nếu cần)
        userStore.setUser(updatedUser);

        this.success = true; // Hiển thị thông báo thành công
        setTimeout(() => {
        this.$router.push('/');
      }, 2000); 
      } catch (error) {
        console.error("Lỗi khi cập nhật mật khẩu:", error);
      }
    },
  },
};
</script>

<style>
/* CSS tương tự như trang chỉnh sửa thông tin */
.register {
  position: relative;
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
  width: 100%;
  text-align: left;
  padding: 10px 20px;
  background-color: #f8fff5;
  border-bottom: 2px solid #e0e0e0;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.header__left__link {
  color: #2e8b57;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.register h1 {
  font-weight: 700;
  color: var(--color-main);
  font-size: 2.5rem;
  padding: 0 100px;
}

.register form {
  background-color: rgba(255, 255, 255, 0.7);
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
}

.register__info__item {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 0 10px;
  flex: 1;
}

.register__info__item input:focus {
  border-color: var(--color-main);
}

.register__info__item input {
  width: 100%;
  border-radius: 15px;
  border: none;
  background-color: rgb(255, 255, 255);
  font-size: 1.2rem;
  padding-left: 10px;
}

.register form a {
  color: var(--color-main);
}
</style>

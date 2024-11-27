<template>
    <div class="navigation">
        <img class="navigation__logo" src="../assets/logo.png" alt="Logo" />
        <ul class="navigation__link">
            <li class="navigation__link__items">
                <router-link class="navigation__link__items__route" to="/">
                    <i class="ri-dashboard-line"></i> 
                    <span>Nhà sản xuất</span>
                </router-link>
            </li>
            <li class="navigation__link__items">
                <router-link to="/category" class="navigation__link__items__route">
                    <i class="ri-book-line"></i> 
                    <span>Danh mục</span>
                </router-link>
            </li>
            <li class="navigation__link__items">
                <router-link to="/products" class="navigation__link__items__route">
                    <i class="ri-book-line"></i> 
                    <span>Sản phẩm</span>
                </router-link>
            </li>
            <li class="navigation__link__items">
                <router-link class="navigation__link__items__route" to="/orders">
                    <i class="ri-bill-line"></i> 
                    <span>Đơn hàng</span>
                </router-link>
            </li>
            <li class="navigation__link__items" @click="userStore.logout()">
                <a class="navigation__link__items__route">
                    <i class="ri-logout-box-r-line"></i> 
                    <span>Đăng xuất</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';
export default {
    methods: {
        handleNav() {
            this.active = !this.active;
        }
    },
    data() {
        return {
            active: false,
            userStore: useUserStore(),
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');

.navigation {
    height: 97vh;
    background-color: #d8f3dc; /* Màu xanh lá nhạt */
    width: 200px;
    position: sticky;
    top: 0;
    left: 0;
    margin-right: 10px;
    transition: 0.5s ease-out;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.navigation__title {
    font-size: 2rem;
    font-weight: 700;
    color: #081c15; /* Màu xanh đậm hơn cho chữ */
    text-align: center;
    padding-top: 10px;
}

.navigation__logo {
    display: block;
    margin: 20px auto; /* Căn giữa */
    width: 100px; /* Điều chỉnh kích thước */
    height: auto;
    border-radius: 50%;
    border: 1px solid; /* Kích thước viền, kiểu viền, cần thiết để màu viền có hiệu lực */
  border-color: #27ae60;
}

.navigation__link {
    list-style: none;
    padding-left: 0;
}

.navigation__link__items {
    margin: 25px 10px;
    border-radius: 15px;
    color: #081c15; /* Màu chữ xanh đậm */
}

.navigation__link__items .navigation__link__items__route {
    color: #081c15; /* Màu chữ xanh đậm */
    display: block;
    font-size: 1rem;
    padding: 8px;
    font-weight: 400;
    border-radius: 15px;
    width: 100%;
    text-decoration: none;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.navigation__link__items .navigation__link__items__route i {
    font-size: 1.2rem;
    margin-right: 5px;
}

.navigation__link__items .navigation__link__items__route:hover {
    background-color: #95d5b2; /* Màu xanh lá nhạt hơn khi hover */
    color: #ffffff; /* Chữ đổi thành trắng khi hover */
}

.navigation__link__items .router-link-exact-active {
    background-color: #52b788; /* Màu xanh lá đậm hơn khi được chọn */
    color: #ffffff;
}

@media screen and (max-width: 815px) {
    .navigation {
        width: 60px;
    }
    .navigation__link__items .navigation__link__items__route span {
        display: none;
    }
    .navigation__logo {
        width: 40px; /* Thu nhỏ logo trên màn hình nhỏ */
    }
    .navigation__link__items i {
        margin-left: 2px;
    }
    .navigation__title {
        font-size: 1.5rem;
    }

    .navigation:hover {
        width: 200px;
    }
    .navigation:hover .navigation__link__items .navigation__link__items__route span {
        display: inline;
    }
}
</style>

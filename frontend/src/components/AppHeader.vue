<template>
   <div class="header row">
        <div class="header__logo col-auto">
            <router-link to="/" class="header__logo__title">
                <img class="header__logo__img" src="../assets/logo.png" alt="Logo" />
            </router-link>
        </div>
        <div class="header__button col-auto">
            <div class="header__function__item header__function__cart">
                <router-link to="/cart">
                    <i class="fa-solid fa-bag-shopping header__icon__cart"></i>
                </router-link>
            </div>
            <div class="header__function__item header__function__bar" @click="handleNav">
                <i class="fa-solid fa-bars "></i>
            </div>
        </div>

        <div class="header__menu col-md-10 col-sm-5 row" :class="{ 'header__menu--active': showNav}">
            <div class="header__navbar col-md-6">
                <router-link to="/" class="header__navbar__link">Trang chủ</router-link>
                <router-link to="/product" class="header__navbar__link">Sản phẩm</router-link>
                <router-link to="/about" class="header__navbar__link">Giới thiệu</router-link>
            </div>
                
            <div class="header__function col-md-6 justify-content-end">
                <Search />
                <div class="header__function__item header__function__cart">
                    <router-link to="/cart">
                        <i class="fa-solid fa-bag-shopping header__icon__cart"></i>
                    </router-link>

                    <!-- Thông báo chỗ này -->
                </div>
                <div class="header__function__item header__function__notification">
                    <i class="fa-solid fa-bell" @click="toggleNotification"></i>
                    <span v-if="notifications.length > 0" class="notification-dot"></span>
                    <div class="notification-dropdown" v-if="showNotifications">
                        <p v-if="notifications.length === 0">Không có thông báo</p>
                        <ul v-else>
                            <li v-for="(notification, index) in notifications" :key="index">
                                {{ notification }}
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div v-if="!userStore.login" class="header__function__item header__function__info">
                    <router-link to="/register">
                        <button class="btn btn-outline-info">Đăng ký</button>
                    </router-link>
                    <router-link to="/login">
                        <button class="btn btn-info">Đăng nhập</button>
                    </router-link>
                </div>
                <div v-else class="header__function__item header__function__info header__function__info--auth">
                    <p><i class="fa-regular fa-user"></i>{{ userStore.user.ho +' '+ userStore.user.ten }}</p>
                    <div class="header__function__info__nav">
                        <router-link to="/edituser">Thông tin người dùng</router-link>
                        <router-link to="/editpassword">Đổi mật khẩu</router-link>
                        <router-link to="/order">Đơn hàng</router-link>
                        <button class="btn btn-outline-info" @click="userStore.logout()"><i class="fa-solid fa-right-from-bracket"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/services/user.service';
import Search from './Search.vue';
import { useUserStore } from '@/stores/userStore';

export default {
    components: { Search },
    created() {
        this.getUser();
        this.loadNotifications();
    },
    data() {
        return {
            showNav: false,
            showNotifications: false,
            userStore: useUserStore(),
            user: {},
            search: '',
            notifications: [], // Danh sách thông báo
        };
    },
    methods: {
        handleNav() {
            this.showNav = !this.showNav;
        },
        
        async getUser() {
            if(this.userStore.login) {
                this.user = await userService.get(this.userStore.user._id);
            }
        },
        async loadNotifications() {
            try {
                // Gọi API để lấy tất cả đơn hàng
                const orders = await userService.getAllOrder();

                // Xử lý danh sách đơn hàng để tạo thông báo
                this.notifications = orders
                    .filter(order => order.notify === 1) // Chỉ lấy đơn có notify = 1
                    .map(order => `Đơn hàng ${order._id} của bạn ${order.trangthai}`); // Tạo thông báo
            } catch (error) {
                console.error("Lỗi khi tải thông báo:", error);
            }
        },
        toggleNotification() {
            this.showNotifications = !this.showNotifications;
        },
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');

.header {
    background-color: var(--color-background);
    align-items: center;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 8px 0px;
    z-index: 1;
    width: calc(100% + 12px);
    /* height: 100px; */
}
.header__logo {
    
    margin-left: 10px;
}
.header__logo__img{
    display: block;
    margin: 20px auto; /* Căn giữa */
    width: 100px; /* Điều chỉnh kích thước */
    height: auto;
    border-radius: 50%;
    border: 1px solid; /* Kích thước viền, kiểu viền, cần thiết để màu viền có hiệu lực */
  border-color: #27ae60;
}
/* .header__logo__title {
    font-family: "Satisfy", cursive;
    font-size: 1.8rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--color-main);
} */

.header__navbar {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* padding: 0 100px; */
}

.header__navbar a {
    font-size: 1rem;
    text-decoration: none;
    color: rgb(0, 0, 0);
    font-weight: 600;
    padding: 5px;
    position: relative;
}

.header__navbar a::before {
    height: 3px;
    background: #007a3f;
    content: " ";
    width: 0%;
    left: 1px;
    bottom: 3px;
    position: absolute;
    transition: ease 0.2s;
}
.header__navbar a:hover::before{
    width: 100%;
    /* background-color: #fff; */
}
.header__navbar a:hover {
    color: rgb(111, 255, 71);
}

.header__navbar .router-link-exact-active {
    color: rgb(85, 218, 48);
}
.header__navbar .router-link-exact-active::before {
    color: rgb(111, 255, 71);
    width: 100%;
} 



.header__icon__cart {
    text-decoration: none;
    color: #169400;
    font-size: 1.5rem;
    border-radius: 50%;
    margin-right: 15px;
}

.header__icon__cart:hover {
    color: #20d400;
}

/* Nút mặc định */
button {
    background-color: #d5ffd2 !important; /* Xanh lá nhạt */
    color: #169400 !important; /* Màu xanh lá đậm */
    border: 1px solid #169400 !important; /* Viền cùng màu với màu chữ */
    border-radius: 5px;
    padding: 8px 15px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

/* Hiệu ứng hover cho nút */
button:hover {
    background-color: #8dfc79 !important; /* Xanh lá đậm */
    color: #ffffff; /* Trắng */
    border-color: #d5ffd2; /* Viền đổi thành xanh lá nhạt */
}

/* Nút với viền nhưng không có màu nền (outline) */
.btn-outline-info {
    background-color: transparent;
    color: #169400;
    border: 1px solid #169400;
}

/* Hover cho nút outline */
.btn-outline-info:hover {
    background-color: #169400;
    color: #ffffff;
}

/* Nút chính (đầy màu nền) */
.btn-info {
    background-color: #169400;
    color: #ffffff;
    border: none;
}

/* Hover cho nút chính */
.btn-info:hover {
    background-color: #20d400; /* Xanh lá sáng hơn */
    color: #ffffff;
}


.header__function {
    display: flex;
    justify-content: end;
    align-items: center;
}
.header__menu {
    flex-grow: 1;
}

.header__function__info--auth {
    display: flex;
    color: #222;
    align-items: center;
    padding-right: 10px;
    position: relative;
}
.header__function__info p{
    margin: auto;
    margin-right: 10px;
    padding: 5px;
    border-radius: 10px;
}

.header__function__info button {
    /* background-color: var(--color-main); */
    border-radius: 20px;
    margin-right: 8px;
}


.header__function__info .header__function__info__nav {
    position: absolute;
    top: 100%;
    background-color: #d5ffd2;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 80%;
    display: none;
    text-align: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.header__function__info:hover .header__function__info__nav {
    display: block;
}

.header__function__info .header__function__info__nav a {
    display: block;
    width: 80%;
    color: #222;
    margin: 5px 10px;
    text-decoration: none;
}

.header__function__info .header__function__info__nav a:hover {
    color: #169400;
}
.header .header__button {
    display: none;
}
.fa-regular {
    border: 2px solid #222;
    margin-right: 5px;
    padding: 5px;
    border-radius: 50%;
}
.header__function__notification {
    position: relative;
    cursor: pointer;
}

.header__function__notification i {
    font-size: 1.5rem;
    color: #169400;
}

.header__function__notification i:hover {
    color: #20d400;
}

.notification-dot {
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: red;
    border-radius: 50%;
    border: 2px solid white;
}

.notification-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 250px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 8px;
    z-index: 10;
    padding: 10px;
}

.notification-dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.notification-dropdown li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
}

.notification-dropdown li:hover {
    background-color: #d5ffd2;
    color: #169400;
}

.notification-dropdown p {
    text-align: center;
    color: #777;
    margin: 0;
}

@media only screen and (max-width: 790px) {
    .header {
        position: sticky;
    }
    .header .header__menu {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: var(--color-background);
        flex-direction: column;
        align-items: end;
        padding: 20px;
        box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
        display: none;
    }
    .header__navbar, .header__function {
        flex-direction: column;
        align-items: start;
    }
    .header__navbar {
        justify-content: center;
    }

    .header__function__cart {
        display: none;
    }

    .header__function{
        align-items: center;
    }

    .header__function__item {
        padding-top: 15px;
        text-align: center;
    }
    
    .header .header__button {
        /* margin-right: 20px; */
        color: #222;
        font-size: 1.4rem;
        cursor: pointer;
        border-radius: 10px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header__button .header__function__item {
        padding: 0;
        margin-left: 10px;
        display: block;
    }

    .header__button .header__function__item.header__function__bar {
        padding: 4px 11px;
        border-radius: 7px;
    }

    .header .header__button .header__function__bar:hover {
        background-color: #cbffc7;
    } 

    .header__navbar a {
        padding-bottom: 20px;
        width: 100%;
    }

    .header__navbar a:hover {
        background-color: #d5ffd2;
    }

    .header .header__menu--active {
        display: block;
        z-index: 1;
    }
    .header__function__search {
        min-width: 100%;
    }

}

</style>
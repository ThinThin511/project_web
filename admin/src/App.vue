<script>
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue'
import { useUserStore } from './stores/userStore';
export default {
    components: { Navbar, Header },
    data() {
        return {
            userStore: useUserStore()
        }
    }
}
</script>

<template>
    <div id="app" class="app">
        <!-- <div class="app__nav"> -->
            <Navbar v-if="userStore.login" />
        <!-- </div> -->
        <div class="app__view">
            <Header v-if="userStore.login"></Header>
            <router-view class="view"/>
        </div>
        <!-- <Register /> -->
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&family=Noto+Sans+HK:wght@100..900&family=Oswald:wght@200&family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap');

.app {
    padding: 0;
    font-family: "Josefin Sans", sans-serif;
    background-color: #f0fdf4; /* Nền xanh lá nhạt */
    background-size: cover;
    display: flex;
    --color-main: #2d6a4f; /* Xanh lá đậm */
    --color-background: #ffffff; /* Trắng */
}

.app__view {
    flex-grow: 1;
    /* margin: 10px 20px 10px 10px; */
}

.error {
    background-color: #ffccd5; /* Nền đỏ nhạt */
    border-color: #e63946; /* Viền đỏ */
    padding: 10px;
    border-radius: 5px;
    color: #721c24; /* Đỏ đậm */
}
/* .app-view {
    flex-grow: 1;
} */
</style>

<template>
    <!-- Thông báo Thành công -->
    <div class="notification" @click="hideNotify" v-if="message == 'Thành công' && !hide"> 
        <div class="notification__message notification__message--success">
            <i class="ri-checkbox-circle-fill"></i>
            <p>{{ message }}</p>
        </div>
    </div>

    <!-- Thông báo Lỗi -->
    <div class="notification" @click="hideNotify" v-if="message != 'Thành công' && message && !hide"> 
        <div class="notification__message notification__message--error">
            <i class="ri-close-circle-fill"></i>
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: String,
    },
    data() {
        return {
            hide: false,
        };
    },
    methods: {
        hideNotify() {
            this.hide = true;
        },
    }
};
</script>

<style>
/* Thông báo chính */
.notification {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Nội dung thông báo */
.notification__message {
    background-color: #ffffff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 20px 40px;
    text-align: center;
    font-size: 1.2rem;
    color: #081c15;
    animation: fadeIn 0.5s ease-out;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Hiệu ứng fade in */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Icon */
.notification__message i {
    font-size: 3rem;
    margin-bottom: 10px;
}

/* Thành công */
.notification__message--success {
    border: 2px solid #95d5b2;
    color: #2d6a4f;
}

/* Lỗi */
.notification__message--error {
    border: 2px solid #e63946;
    color: #e63946;
}

/* Hiệu ứng hover */
.notification__message:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}

/* Responsive */
@media screen and (max-width: 768px) {
    .notification__message {
        padding: 15px 30px;
        font-size: 1rem;
    }

    .notification__message i {
        font-size: 2.5rem;
    }
}
</style>

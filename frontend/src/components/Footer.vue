<template>
    <footer>
        <div class="footer__top">
            <div class="footer__left">
                <h2>Gia Dụng Xanh</h2>
                <p>Bản quyền © 2024 Gia Dụng Xanh. Tất cả các quyền được bảo vệ.</p>
                <p>Công ty TNHH Gia Dụng Xanh</p>
                <p>Địa chỉ: 123 Đường ABC, Phường 1, Quận 1, TP. Hồ Chí Minh, Việt Nam</p>
                <p>Giấy phép số: 123456789 do Sở KH&ĐT TP.HCM cấp ngày 01/01/2024</p>
            </div>
            <div class="footer__middle">
                <h3>Về Gia Dụng Xanh</h3>
                <ul>
                    <li><a href="#">Giới thiệu</a></li>
                    <li><a href="#">Sản phẩm</a></li>
                    <li><a href="#">Chính sách bảo mật</a></li>
                    <li><a href="#">Chính sách đổi trả</a></li>
                </ul>
            </div>
            <div class="footer__right">
                <h3>Cửa hàng</h3>
                <ul>
                    <li><a href="#">Chính sách bán hàng</a></li>
                    <li><a href="#">Chính sách giao hàng</a></li>
                    <li><a href="#">Chính sách trả hàng, hoàn tiền</a></li>
                    <li><a href="#">Chính sách bảo hành</a></li>
                </ul>
            </div>
            <div class="footer__icons">
                <h3>Liên kết</h3>
                
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-tiktok"></i></a>
            </div>
        </div>
    </footer>
</template>

<style scoped>
footer {
    background-color: #f8f8f8;
    padding: 20px;
    font-size: 14px;
    color: #333;
}

.footer__top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* Đảm bảo các phần tử căn lên trên cùng */
    flex-wrap: wrap; /* Cho phép các phần tử chuyển dòng khi cần */
}

.footer__left, .footer__middle, .footer__right, .footer__icons {
    flex: 1;
    margin-right: 20px;
}

.footer__left h2 {
    font-size: 24px;
    font-weight: bold;
    color: #2a9d8f;
}

.footer__middle h3, .footer__right h3, .footer__icons h3 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #264653;
}

.footer__middle ul, .footer__right ul {
    list-style-type: none;
    padding: 0;
}

.footer__middle li, .footer__right li {
    margin-bottom: 8px;
}

.footer__middle a, .footer__right a {
    text-decoration: none;
    color: #264653;
    font-size: 14px;
    transition: color 0.3s ease, transform 0.3s ease;
}

.footer__middle a:hover, .footer__right a:hover {
    color: #e76f51;
    transform: translateX(5px);
}

.footer__icons {
    
    gap: 10px;
    justify-content: flex-start;
}

.footer__icons a {
    font-size: 24px;
    color: #333;
    transition: color 0.3s ease, transform 0.3s ease;
    margin-left: 6pt;
}

.footer__icons a:hover {
    color: #2a9d8f;
    transform: scale(1.1); /* Hiệu ứng phóng to khi hover */
}

footer input[type="email"] {
    padding: 8px;
    font-size: 14px;
    margin-right: 10px;
    width: 200px;
}

footer button {
    padding: 8px 16px;
    font-size: 14px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

footer button:hover {
    background-color: #0056b3;
}
</style>

<template>
    <footer>
        <div class="footer">
            <div class="footer-left">
                <p>&copy; 2024 - Thư Viện</p>
                <p class="footer-description">Chuyên cung cấp dịch vụ mượn sách và các tài liệu học tập chất lượng</p>
            </div>
            <div class="footer-links">
                <ul>
                    <li>Địa chỉ: Thành phố Cần Thơ, Việt Nam</li>
                    <li>Email: phamvocongthien@project.com</li>
                    <li>Số điện thoại: 0783 736 507</li>
                </ul>
            </div>
            <div class="footer-social">
                <ul>
                    <li><a href="#" target="_blank">Facebook</a></li>
                    <li><a href="#" target="_blank">Instagram</a></li>
                    <li><a href="#" target="_blank">Twitter</a></li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<style>
.footer {
    background-color: #f4f4f4; /* Nền sáng nhạt hơn */
    color: #333; /* Chữ màu tối dễ đọc */
    padding: 40px 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px; /* Đổ bóng nhẹ */
}

.footer-left {
    flex: 1;
    max-width: 300px;
    margin-right: 20px;
}

.footer-description {
    font-size: 0.9rem;
    color: #666; /* Màu chữ nhạt hơn cho phần mô tả */
    margin-top: 10px;
}

.footer-links, .footer-social {
    flex: 1;
    max-width: 250px;
}

.footer-links ul, .footer-social ul {
    list-style: none;
    padding: 0;
}

.footer-links li, .footer-social li {
    margin-bottom: 10px;
}

.footer-links li a, .footer-social li a {
    color: #333; /* Màu chữ tối dễ đọc */
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease;
}

.footer-links li a:hover, .footer-social li a:hover {
    color: #2ecc71; /* Màu xanh lá khi hover */
}

.footer-social ul {
    display: flex;
    justify-content: space-around;
    padding-left: 0;
}

.footer-social li {
    list-style-type: none;
}

.footer-social li a {
    font-size: 1.2rem;
}

.footer p {
    font-size: 1rem;
    margin: 0;
}

@media (max-width: 768px) {
    .footer {
        flex-direction: column;
        text-align: center;
    }

    .footer-left, .footer-links, .footer-social {
        max-width: 100%;
        margin-bottom: 20px;
    }

    .footer-social ul {
        justify-content: center;
    }
}

</style>
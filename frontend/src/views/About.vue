<template>
    <div class="header__left"> 
    <router-link to="/" class="header__left__link">Gia dụng xanh</router-link> 
    <span> / {{ this.$route.name }}</span>
</div>
    <div class="about">
        <div class="about__inside">
            <h1>Giới thiệu</h1>
            <p style="text-align: justify;">
                Gia Dụng Xanh chuyên cung cấp các sản phẩm đồ gia dụng chất lượng cao với giá cả hợp lý. Từ các thiết bị nhà bếp, đồ dùng phòng tắm, đồ trang trí nội thất cho đến các sản phẩm bảo vệ sức khỏe, chúng tôi cam kết mang đến cho khách hàng những sản phẩm tiện ích, thân thiện với môi trường.
            </p>
            <p style="text-align: justify;">
                Với phương châm “Sản phẩm chất lượng, giá trị bền lâu”, Gia Dụng Xanh luôn cập nhật những xu hướng mới trong ngành đồ gia dụng để đáp ứng nhu cầu đa dạng của khách hàng. Chúng tôi nhập khẩu các sản phẩm từ những thương hiệu nổi tiếng trong và ngoài nước, đảm bảo tính năng vượt trội và độ bền cao.
            </p>
            <p style="text-align: justify;">
                Gia Dụng Xanh không chỉ bán các sản phẩm mà còn mang đến những giải pháp tối ưu cho không gian sống của bạn. Chúng tôi tự hào là điểm đến đáng tin cậy cho các gia đình trong việc chọn lựa những món đồ nội thất tiện ích và an toàn.
            </p>
            <p style="text-align: justify;">
                Các sản phẩm của chúng tôi bao gồm: dụng cụ nhà bếp, đồ dùng vệ sinh, sản phẩm trang trí, đèn chiếu sáng, thiết bị điện tử, các vật dụng chăm sóc sức khỏe, và nhiều sản phẩm khác. Đặc biệt, chúng tôi chú trọng vào việc phát triển các sản phẩm thân thiện với môi trường, tiết kiệm năng lượng và giúp bảo vệ sức khỏe người tiêu dùng.
            </p>
            <p style="text-align: justify;">
                Hãy đến với Gia Dụng Xanh để tìm cho ngôi nhà của bạn những sản phẩm chất lượng, tiện dụng và thân thiện với môi trường. Chúng tôi cam kết mang đến sự hài lòng tuyệt đối cho khách hàng!
            </p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
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
.about {
    color: #000;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/about.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    text-align: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.about__inside {
    background-color: rgba(255, 255, 255, 0.9); /* Lớp nền trắng mờ */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding: 30px;
    max-width: 800px;
    width: 90%;
    text-align: justify;
    color: #333; /* Đổi sang màu chữ dễ đọc hơn */
}

.about h1 {
    color: #169400; /* Màu xanh chủ đạo */
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 20px;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.about p {
    margin: 20px 0;
    line-height: 1.8;
    font-size: 1.1rem;
    color: #444; /* Tăng độ tương phản chữ */
    text-align: justify;
}

.about button {
    font-size: 1.1rem;
    border-radius: 30px;
    padding: 10px 20px;
    background-color: #169400;
    color: white;
    border: none;
    transition: background-color 0.3s;
    cursor: pointer;
}

.about button:hover {
    background-color: #20d400;
}

</style>
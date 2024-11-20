<template>
    <!-- <AppHeader /> -->
    <div class="home">
        <div class="home__one">
            <div class="home__one__element">
                <h1>Chào mừng đến với Thư Viện Sách</h1>
                <p>Sở hữu không gian mua sắm rộng rãi, thoáng mát với đầy đủ các thể loại sách đa dạng phong phú, từ sách văn học, khoa học kỹ thuật, kinh tế, ngoại ngữ,... đến sách thiếu nhi, truyện tranh,... đáp ứng mọi nhu cầu đọc của quý khách hàng.</p>
                <router-link to="/product">
                    <button class="">Xem Sách</button>
                </router-link>
            </div>
        </div>
        <div class="home__two">
            <div class="home__two__left">
                <img src="../assets/homepic1.jpg" alt="">
                <img src="../assets/homepic2.png" alt="">
            </div>  
            <div class="home__two__right">
                <h2>Cửa hàng chúng tôi</h2>
                <p>
                    Không gian thư viện được bài trí tinh tế với những góc đọc nhỏ xinh, ánh sáng dịu nhẹ, tạo cảm giác thư giãn và dễ chịu. Những chiếc ghế êm ái tựa như mời gọi ta chìm đắm vào từng trang sách, đắm chìm trong những câu chuyện, những khám phá mới mẻ.
                </p>
                <p>
                    Thiên đường tri thức là nơi chắp cánh cho ước mơ, nuôi dưỡng niềm đam mê và lan tỏa tri thức đến cộng đồng. Đến đây, bạn không chỉ tìm được những cuốn sách yêu thích mà còn có cơ hội gặp gỡ những người bạn đồng điệu, cùng nhau chia sẻ niềm đam mê đọc và học hỏi.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap');
/* Phần giới thiệu */
.home__one {
    color: #000;
    height: calc(100vh - 100px);
    max-width: 100%;
    background: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('../assets/homepage.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    text-align: center;
    margin: 10px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.home__one__element {
    width: 100%;
    text-align: center;
    padding: 20px;
}

.home__one h1 {
    font-family: "Tilt Neon", sans-serif;
    color: #2E8B57; /* Xanh lá nhạt */
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.home__one p {
    width: 60%;
    margin: auto;
    color: #333; /* Đổi màu chữ thành xám đậm */
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 30px;
}

.home__one button {
    font-size: 1.2rem;
    border-radius: 20px;
    padding: 10px 40px;
    background-color: #2E8B57; /* Xanh lá nhạt */
    color: #fff;
    font-weight: 600;
    border: none;
    box-shadow: 0 4px 10px rgba(46, 139, 87, 0.3);
    transition: background-color 0.3s, transform 0.2s;
    cursor: pointer;
}

.home__one button:hover {
    background-color: #3CB371; /* Xanh lá đậm hơn khi hover */
    transform: scale(1.05);
}

/* Phần giới thiệu cửa hàng */
.home__two {
    background-color: #f9f9f9;
    color: #333;
    padding: 40px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.home__two__left {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    align-items: center;
    max-width: 50%;
}

.home__two__left img {
    display: block;
    border-radius: 15px;
    max-width: 45%;
    height: auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s, box-shadow 0.3s;
}

.home__two__left img:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.home__two__right {
    max-width: 40%;
    text-align: left;
    padding: 10px;
}

.home__two__right h2 {
    color: #2E8B57; /* Xanh lá nhạt */
    font-weight: 600;
    margin-bottom: 20px;
    font-size: 2rem;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
}

.home__two__right p {
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 20px;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
    .home__two {
        flex-direction: column;
    }

    .home__two__left,
    .home__two__right {
        max-width: 100%;
    }

    .home__one p {
        width: 90%;
    }
}


</style>
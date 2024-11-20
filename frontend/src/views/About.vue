<template>
    <div class="about">
        <div class="about__inside">
            <h1>Giới thiệu</h1>
            <p style="text-align: justify;">Sách quốc văn với nhiều thể loại đa dạng như sách giáo khoa - tham khảo, giáo trình, sách học ngữ, từ điển, sách tham khảo thuộc nhiều chuyên ngành phong phú: văn học, tâm lý – giáo dục, khoa học kỹ thuật, khoa học kinh tế - xã hội, khoa học thường thức, sách phong thủy, nghệ thuật sống, danh ngôn, sách thiếu nhi, truyện tranh, truyện đọc, từ điển, công nghệ thông tin, khoa học – kỹ thuật, nấu ăn, làm đẹp...  của nhiều Nhà xuất bản, nhà cung cấp sách có uy tín như: NXB Trẻ, Giáo Dục, Kim Đồng, Văn hóa -Văn Nghệ, Tổng hợp TP.HCM, Chính Trị Quốc Gia; Công ty Đông A, Nhã Nam, Bách Việt, Alphabook, Thái Hà, Minh Lâm, Đinh Tị, Minh Long, TGM, Sáng Tạo Trí Việt, Khang Việt, Toàn Phúc…</p>
            <p style="text-align: justify;">Gồm Phân xưởng in và Phân xưởng thành phẩm: với nhiều máy in hiện đại của Đức và Nhật: Heidelberg, Komori, Akiyama, Lithrone, Mitsubishi… cùng nhiều máy móc, thiết bị khác như: máy cắt, máy vô bìa sách, máy bế hộp…  Đội ngũ công nhân tay nghề cao, đã cho ra những sản phẩm có chất lượng tốt, nhờ đó, sản xuất theo đúng nhu cầu - thị hiếu của khách hàng và hình thành được quy trình in & phát hành.</p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.about {
    color: #000;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/home_about.jpg");
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
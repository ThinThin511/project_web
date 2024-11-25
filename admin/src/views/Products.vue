<template>
    <div class="product">
        <div class="product__header">
            <div class="product__header__action">
                <button @click="handleProduct">+</button>
            </div>
        </div>
        <div class="product__form" :class="{ 'product__form--active': product_form }">
            <form action="" @submit.prevent="handleSubmit">
                <p class="btn btn-outline-danger close" @click="handleProduct">&times;</p>
                <h3 v-if="!product._id">Thêm sản phẩm</h3>
                <h3 v-else>Chỉnh sửa sản phẩm</h3>
                <div class="product__form__item">
                    <p>Tên:</p>
                    <input required type="text" v-model="ten">
                </div>
                <div class="product__form__item">
                    <p>Hình ảnh:</p>
                    <img v-if="product.hinhanh && !hinhanhPreview" :src="'http://localhost:3000/static/' + product.hinhanh" alt="Hình ảnh sản phẩm">
                    <img v-else-if="hinhanhPreview" :src="hinhanhPreview" alt="Hình ảnh xem trước">
                    <input type="file" accept="image/*" @change="handleImage($event.target.files[0])">
                </div>
                <div class="product__form__item">
                    <p>Đơn giá:</p>
                    <input required type="number" v-model="dongia">
                </div>
                <div class="product__form__item">
                    <p>Số lượng:</p>
                    <input required type="number" v-model="soluong">
                </div>
                <div class="product__form__item">
                    <p>Danh mục:</p>
                    <select v-model="danhmuc">
                        <option v-for="category in categories" :value="category.ten" :key="category._id">{{ category.ten }}</option>
                    </select>
                </div>
                <div class="product__form__item">
                    <p>Nhà sản xuất:</p>
                    <select v-model="nhasanxuat">
                        <option v-for="manufacturer in manufacturers" :value="manufacturer.ten" :key="manufacturer._id">{{ manufacturer.ten }}</option>
                    </select>
                </div>
                <div class="product__form__item">
                    <p>Mô tả:</p>
                    <textarea v-model="mota" rows="3"></textarea>
                </div>
                <button v-if="!product._id">Thêm</button>
                <button v-else>Cập nhật</button>
            </form>
        </div>
        <TableProduct :nameTable="this.$route.name" @edit="handleEditProduct"></TableProduct>
    </div>
</template>

<script>
import TableProduct from '@/components/TableProduct.vue';
import ProductService from '@/services/product.service.js';
import StaffService from '@/services/staff.service.js';

export default {
    components: {
        TableProduct,
    },
    methods: {
        handleProduct() {
            this.resetForm();
            this.product_form = !this.product_form;
        },
        handleEditProduct(product) {
            this.product = product;
            const { ten, hinhanh, dongia, danhmuc, soluong, mota, nhasanxuat } = product;
            this.ten = ten;
            this.hinhanhPreview = null;
            this.dongia = dongia;
            this.danhmuc = danhmuc;
            this.soluong = soluong;
            this.mota = mota;
            this.nhasanxuat = nhasanxuat;
            this.product_form = !this.product_form;
        },
        async handleSubmit() {
            const data = new FormData();
            data.append('ten', this.ten);
            
            data.append('dongia', this.dongia);
            data.append('danhmuc', this.danhmuc);
            data.append('soluong', this.soluong);
            data.append('mota', this.mota);
            data.append('nhasanxuat', this.nhasanxuat);

            if (this.product._id == null) {
                data.append('hinhanh', this.hinhanh);
                if (await ProductService.addProduct(data)) {
                    alert('Thêm sản phẩm thành công!');
                    this.product_form = !this.product_form;
                }
            } else {
                data.append('_id', this.product._id);
                this.hinhanhPreview != null ? data.append('hinhanh', this.hinhanh) : data.append('hinhanh', this.product.hinhanh);
                if (await ProductService.updateProduct(data)) {
                    alert('Cập nhật sản phẩm thành công!');
                    this.product_form = !this.product_form;
                }
            }
        },
        handleImage(img) {
            this.hinhanh = img;
            this.hinhanhPreview = URL.createObjectURL(img);
        },
        resetForm() {
            this.ten = '';
            this.danhmuc = '';
            this.nhasanxuat = '';
            this.mota = '';
            this.dongia = 0;
            this.soluong = 0;
            this.hinhanh = null;
            this.hinhanhPreview = null;
            this.product = {};
        },
    },
    async mounted() {
        this.categories = await StaffService.getAllCategories();
        this.categories = this.categories.filter(item => item.deleted != 1);
        this.manufacturers = await StaffService.getAllManufacturer();
        this.manufacturers = this.manufacturers.filter(item => item.deleted != 1);
    },
    data() {
        return {
            product_form: false,
            product: {},
            categories: [],
            manufacturers: [],
            ten: '',
            danhmuc: '',
            nhasanxuat: '',
            mota: '',
            dongia: 0,
            soluong: 0,
            hinhanh: null,
            hinhanhPreview: null,
        };
    },
};

</script>
<style>
.product__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-wrap: wrap;
}

.product__header input {
    font-size: 0.9rem;
    padding: 5px 7px;
    border-radius: 7px;
    border: none;
    width: 10rem;
}

.product__header__action {
    display: flex;
    align-items: center;
    position: absolute;
    right: 20px;
    top: 35px;
}

.product__header__search input:focus, .product__header__filter select:focus {
    border: none;
    outline: none;
}

.product__header__action button {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    border: none;
    font-weight: bold;
    font-size: 20px;
    background-color: #2d6a4f; /* Xanh lá đậm */
    color: white;
    margin-right: 10px;
    transition: background-color 0.3s ease, transform 0.2s ease;
}
.product__header__action button:hover {
   background-color: #40916c; /* Xanh lá sáng hơn */
    transform: scale(1.1);
}

.product__header__filter {
    background-color: #fffefe;
    border-radius: 7px;
    overflow: hidden;
    padding: 1px 0 2px 10px;
    margin-right: 5px;
}

.product__header__filter select{
    font-size: 0.9rem;
    padding: 5px 3px;
    border: none;
    /* width: 10rem; */
}

.product__form {
    background-color: rgba(255, 255, 255, 0.5); /* Nền sáng nhạt hơn với tỷ lệ trong suốt */
    width: 100%;
    position: fixed;
    z-index: 1;
    height: 80%;
    top: -200%;
    left: 0;
    display: flex;
    transition: top 0.5s ease;
}

.product__form.product__form--active {
    top: 0;
}

.product__form form {
    position: relative;
    background-color: #fff; /* Nền sáng cho form */
    margin: auto;
    height: fit-content;
    text-align: center;
    border-radius: 12px; /* Bo góc mềm mại */
    color: #333; /* Chữ màu tối */
    padding: 30px 35px;
    width: 50%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
}

.product__form form h3 {
    padding: 15px;
    color: #2ecc71; /* Màu xanh lá nhạt cho tiêu đề */
    font-weight: bold;
    font-size: 1.6rem;
    margin-bottom: 20px; /* Khoảng cách dưới tiêu đề */
}

.product__form__item {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px; /* Khoảng cách giữa các mục */
    text-align: start;
    margin-bottom: 5px; /* Khoảng cách giữa các mục */
}

.product__form__item p {
    width: 120px;
    margin: 5px 0;
    color: #555; /* Màu chữ đậm hơn */
    font-size: 1rem;
}

.product__form__item input,
.product__form__item select,
.product__form__item textarea {
    flex-grow: 1;
    border-radius: 8px;
    border: 1px solid #ddd; /* Đường viền sáng */
    padding: 8px 10px;
    font-size: 1rem;
    background-color: #f7f7f7; /* Nền sáng cho các ô nhập liệu */
}

.product__form__item input:focus,
.product__form__item select:focus,
.product__form__item textarea:focus {
    outline: none;
    border: 2px solid #2ecc71; /* Màu xanh lá nhạt khi focus */
}

.product__form form button {
    width: 160px;
    height: 45px;
    border-radius: 12px;
    background-color: #2ecc71; /* Màu nút chính xanh lá nhạt */
    border: none;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin-top: 20px; /* Khoảng cách trên nút */
}

.product__form form button:hover {
    background-color: #27ae60; /* Màu nút khi hover (xanh lá đậm hơn) */
    transform: scale(1.05);
}

.product__form form .close {
    position: absolute;
    right: 15px;
    top: 15px;
    cursor: pointer;
    font-size: 1.5rem;
    background: none;
    color: #e74c3c; /* Màu đỏ cho nút đóng */
    border: none;
    font-weight: bold;
    transition: color 0.3s ease;
}

.product__form form .close:hover {
    color: #c0392b; /* Màu đỏ đậm khi hover */
}

.product__form__item img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 10px;
}

</style>

  
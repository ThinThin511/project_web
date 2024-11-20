<template>
    <div class="header__search">
        <i class="ri-search-line"></i>
        <input type="text" placeholder="Tìm kiếm" v-model="search" @keyup="getAllProduct">
    </div>
    <div class="tables">
        <div class="table__name">{{ nameTable }}</div>
        <div class="table__title row" >
            <div class="table__title__item col-sm-1">STT</div>
            <div class="table__title__item col-sm-2">HÌNH ẢNH</div>
            <div class="table__title__item col-sm-2">
                TÊN
            </div>
            <div class="table__title__item col-sm-2">GIÁ
                
            </div>
            <div class="table__title__item col-sm-2">SỐ LƯỢNG

            </div>
            <div class="table__title__item col-sm-2"></div>
        </div>
        <div v-for="(item, index) in list" class="table__list row" :key="item.id">
            <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
            <div class="table__list__item col-sm-2"><Image :src="item.hinhanh" /></div>
            <div class="table__list__item col-sm-2">{{ item.ten }} <br> {{ item.category }}</div>
            <div class="table__list__item col-sm-2">{{ item.dongia }}</div>
            <div class="table__list__item col-sm-2">{{ item.soluong }}</div>
            <div class="table__list__item table__list__item--edit col-sm-1">
                <i class="ri-edit-line table__icon" @click="handleEmit(item)"></i>
            </div>
            <div class=" table__list__item table__list__item--delete col-sm-1">
                <i class="ri-delete-bin-2-line table__icon" @click="confirmDelete(item)"></i>
            </div>
        </div>
    </div>
</template>
<script>
import Image from '@/components/Image.vue';
import ProductService from '@/services/product.service.js'
import router from '@/router';
export default {
    props: [
        "nameTable",
    ],
    mounted() {
        this.getAllProduct();
        // this.query = this.$route.query.search;
    },
    components: {
        Image
    },
    watch: {
        list(newValue) {
            this.getAllProduct();
        },
    },
    emits: ['edit'],
    computed: {
        productStrings() {
            return this.list.map((product) => {
                const { ten, tacgia, mota, nhaxuatban } = product;
                return [ten, tacgia, mota, nhaxuatban].join(" ").toUpperCase();
            });
        },
        filteredProducts() {
            if (this.search == '') return this.list;
            return this.list.filter((_products, index) =>
                    this.productStrings[index].includes(this.search.toUpperCase())
            );
        },
    },
    methods: {
        async getAllProduct() {
            this.list = await ProductService.getAll();
            this.list = this.list.filter(item => item.deleted == 0);

            if(this.search != '') {
                this.list = this.filteredProducts;
            }
        },
        handleSort(item) {
            if(item == 'name') {
                this.sort_name = !this.sort_name;
                this.sort_price = false;
                this.sort_quantity = false;
            }
            if(item == 'price') {
                this.sort_price = !this.sort_price;
                this.sort_name = false;
                this.sort_quantity = false;
            }
            if(item == 'quantity') {
                this.sort_quantity = !this.sort_quantity;
                this.sort_price = false;
                this.sort_name = false;
            }
        },
        handleEmit(product) {
            this.$emit('edit', product);
        },
        confirmDelete(product) {
            if (window.confirm('Are you sure you want to delete this product?')) {
                this.deleteProduct(product);
            }
        },
        async handleDelete(product) {
            console.log(product)
            if (await ProductService.deleteProduct(product)) 
                this.getAllProduct();
        },
    },
    data() {
        return {
            list: [],
            sort_name: false,
            sort_price: false,
            sort_quantity: false,
            search: '',
            query: '',
        }
    }
}


</script>
<style>
.tables {
    flex-grow: 1;
    background-color: #ffffff; /* Nền trắng */
    border: 2px solid #95d5b2; /* Viền xanh lá nhạt */
    border-radius: 15px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
    text-align: center;
    margin-top: 40px;
    margin-right: 10px;
}

/* Tên bảng */
.table__name {
    background: linear-gradient(to right, #95d5b2, #2d6a4f); /* Gradient xanh lá */
    position: relative;
    height: 80px;
    margin: 0 5px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
    top: -40px;
    text-align: start;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-weight: 600;
    font-size: 1.2rem;
    color: #ffffff; /* Chữ trắng */
}

/* Tiêu đề */
.table__title {
    font-weight: 700;
    color: #2d6a4f; /* Xanh lá đậm */
    font-size: 0.9rem;
    border-bottom: 2px solid #95d5b2;
    padding-bottom: 15px;
}

/* Tiêu đề cột */
.table__title__item {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Danh sách */
.table__list {
    height: 100px;
    color: #000000;
    border-top: 1px solid #c0c0c0;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
}

/* Dòng xen kẽ */
.table__list:nth-child(even) {
    background-color: #f4fdf7; /* Nền xanh lá nhạt */
}

/* Icon chỉnh sửa */
.table__list__item--edit i {
    color: #2d6a4f; /* Xanh lá đậm */
    font-size: 1.3rem;
    padding: 7px;
    border-radius: 50%;
}

.table__list__item--edit i:hover {
    background-color: #95d5b2; /* Nền xanh lá nhạt khi hover */
    color: #ffffff; /* Chữ trắng khi hover */
    cursor: pointer;
}

/* Icon xóa */
.table__list__item--delete i {
    color: #e63946; /* Đỏ */
    font-size: 1.3rem;
    padding: 7px;
    border-radius: 50%;
}

.table__list__item--delete i:hover {
    background-color: #ffccd5; /* Nền đỏ nhạt khi hover */
    cursor: pointer;
}

/* Hộp tìm kiếm */
.header__search {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 0px 4px;
    border: 1px solid #95d5b2;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
    width: fit-content;
}

.header__search input {
    outline: none;
    border: none;
    border-radius: 15pt;
}

/* Responsive */
@media screen and (max-width: 768px) {
    .table__list {
        font-size: 0.8rem;
    }

    .header__search input {
        font-size: 0.9rem;
    }
}


</style>

  
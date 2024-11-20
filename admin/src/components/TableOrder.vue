<template>
    <div class="header__search">
        <i class="ri-search-line"></i>
        <input type="text" placeholder="Tìm kiếm" v-model="search" @keyup="getAllProduct">
    </div>
    <div class="tables">
        <div class="table__name">{{ nameTable }}</div>
        <div class="table__title row" >
            <div class="table__title__item col-sm-1">STT</div>
            <div class="table__title__item col-sm-3">MÃ PHIẾU</div>
            <div class="table__title__item col-sm-2">
                TÊN KHÁCH HÀNG
            </div>
            <!-- <div class="table__title__item col-sm-1">TỔNG TIỀN
               
            </div> -->
            <div class="table__title__item col-sm-1">NGÀY MƯỢN</div>
            <div class="table__title__item col-sm-1">NGÀY TRẢ</div>
            <div class="table__title__item col-sm-2">TRẠNG THÁI</div>
            <div class="table__title__item col-sm-1"></div>

        </div>
        <div v-for="(item, index) in list" class="table__list row" :key="item.id">
            <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
            <div class="table__list__item col-sm-3">{{ item._id }}</div>
            <div class="table__list__item col-sm-2">
                {{ item.docgia.ho+' '+item.docgia.ten }}
            </div>
            <!-- <div class="table__list__item col-sm-1">{{ item.tongtien }}</div> -->
            <div class="table__list__item col-sm-1">{{ item.ngaymuon }}</div>
            <div class="table__list__item col-sm-1">{{ item.ngaytra }}</div>
            <div v-if="item.trangthai == 'Đã trả'" class="table__list__item col-sm-2 text-success">
                {{ item.trangthai }}
            </div>
            <div v-else-if="item.trangthai == 'Quá hạn'" class="table__list__item col-sm-2 text-danger">
                {{ item.trangthai }}
            </div>
            <div v-else class="table__list__item col-sm-2 text-primary">
                {{ item.trangthai }}
            </div>
            <div class="table__list__item col-sm-1">
                <i class="ri-pencil-line" @click="handleEmit(item)"></i>
            </div>
        </div>
    </div>
</template>
<script>
import StaffService from '@/services/staff.service.js'
export default {
    
    props: [
        "nameTable"
    ],
    watch: {
        list(newValue) {
            this.getAllOrder();
        }
    },
    mounted() {
        this.getAllOrder()
    },
    computed: {
        productStrings() {
            return this.list.map((product) => {
                const { ho, ten, diachi, sodienthoai } = product.docgia;
                const { ngaymuon, ngaytra, trangthai, _id } = product;
                return [ten, ho,diachi, _id, sodienthoai, trangthai, ngaymuon, ngaytra ].join(" ").toUpperCase();
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
        async getAllOrder() {
            this.list = await StaffService.getAllOrder();
            if(this.search != '') {
                this.list = this.filteredProducts;
            }
        },
        handleEmit(product) {
            this.$emit('edit', product);
        },
    },
    data() {
        return {
            list: [],
            search: ''
        }
    }
}


</script>
<style scoped>
.tables {
    flex-grow: 1;
    background-color: #ffffff; /* Nền trắng */
    border: 2px solid #95d5b2; /* Viền xanh lá nhạt */
    border-radius: 15px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;
    text-align: center;
    margin-top: 40px;
    margin-right: 10px;
}

/* Tên bảng */
.table__name {
    background: linear-gradient(to right, #95d5b2, #2d6a4f); /* Gradient xanh lá nhạt đến đậm */
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
    color: #ffffff; /* Chữ màu trắng */
}

/* Tiêu đề cột */
.table__title {
    font-weight: 700;
    color: #2d6a4f; /* Màu xanh lá đậm */
    font-size: 0.9rem;
    padding-bottom: 15px;
    border-bottom: 2px solid #95d5b2;
}

/* Các mục tiêu đề */
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

.table__list:nth-child(even) {
    background-color: #f4fdf7; /* Nền xanh lá rất nhạt */
}

.table__list__item i {
    color: #2d6a4f; /* Xanh lá đậm */
    font-size: 1.3rem;
    padding: 7px;
    border-radius: 50%;
}

.table__list__item i:hover {
    background-color: #95d5b2; /* Xanh lá nhạt khi hover */
    color: #ffffff; /* Chữ trắng khi hover */
    cursor: pointer;
}

/* Các trạng thái */
.text-success {
    color: #2d6a4f; /* Xanh lá đậm */
    font-weight: 600;
}

.text-danger {
    color: #e63946; /* Đỏ cảnh báo */
    font-weight: 600;
}

.text-primary {
    color: #457b9d; /* Xanh biển */
    font-weight: 600;
}

/* Tìm kiếm */


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

  
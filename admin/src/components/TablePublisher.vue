<template>
    <div class="header__search">
        <i class="ri-search-line"></i>
        <input type="text" placeholder="Tìm kiếm" v-model="search" @keyup="getAllProduct">
    </div>
    <div class="tables">
        <div class="table__name">{{ nameTable }}</div>
        <div class="table__title row" >
            <div class="table__title__item col-sm-1">STT</div>
            <div class="table__title__item col-sm-3">MÃ</div>
            <div class="table__title__item col-sm-3">
                TÊN
            </div>
            <div class="table__title__item col-sm-3">ĐỊA CHỈ
               
            </div>
            <div class="table__title__item col-sm-2"></div>

        </div>
        <div v-for="(item, index) in list" class="table__list row" :key="item.id">
            <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
            <div class="table__list__item col-sm-3">{{ item._id }}</div>
            <div class="table__list__item col-sm-3">
                {{ item.ten }}
            </div>
            <div class="table__list__item col-sm-3">
                {{ item.diachi }}
            </div>

            <div class="table__list__item col-sm-1">
                <i class="ri-pencil-line" @click="handleEmit(item)"></i>
            </div>
            <div class=" table__list__item table__list__item--delete col-sm-1">
                <i class="ri-delete-bin-2-line table__icon" @click="confirmDelete(item)"></i>
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
            this.getAllManufacturer();
        }
    },
    mounted() {
        this.getAllManufacturer()
    },
    computed: {
        productStrings() {
            return this.list.map((product) => {
                const { ten, diachi } = product;
                return [ten, diachi].join(" ").toUpperCase();
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
        async getAllManufacturer() {
            this.list = await StaffService.getAllManufacturer();
            this.list = this.list.filter(item => item.deleted != 1);
            if(this.search != '') {
                this.list = this.filteredProducts;
            }
        },
        handleEmit(manufacturer) {
            this.$emit('edit', manufacturer);
        },
        confirmDelete(manufacturer) {
            if (window.confirm('Are you sure you want to delete this manufacturer?')) {
                this.handleDelete(manufacturer);
            }
        },
        async handleDelete(manufacturer) {
            const data = {
                _id: manufacturer._id,
                ten: manufacturer.ten,
                diachi: manufacturer.diachi
            }
            console.log(data)
            if (await StaffService.deleteManufacturer(data)) 
                this.getAllManufacturer();
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
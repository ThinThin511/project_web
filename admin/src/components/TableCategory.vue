<template>
    <div class="header__search">
        <i class="ri-search-line"></i>
        <input type="text" placeholder="Tìm kiếm" v-model="search" @keyup="getAllCategories">
    </div>
    <div class="tables">
        <div class="table__name">{{ nameTable }}</div>
        <div class="table__title row">
            <div class="table__title__item col-sm-1">STT</div>
            <div class="table__title__item col-sm-3">MÃ</div>
            <div class="table__title__item col-sm-3">TÊN</div>
            <div class="table__title__item col-sm-3">MÔ TẢ</div>
            <div class="table__title__item col-sm-2"></div>
        </div>
        <div v-for="(item, index) in list" class="table__list row" :key="item.id">
            <div class="table__list__item col-sm-1">{{ index + 1 }}</div>
            <div class="table__list__item col-sm-3">{{ item._id }}</div>
            <div class="table__list__item col-sm-3">{{ item.ten }}</div>
            <div class="table__list__item col-sm-3">{{ item.mota }}</div>

            <div class="table__list__item col-sm-1">
                <i class="ri-pencil-line" @click="handleEmit(item)"></i>
            </div>
            <div class="table__list__item table__list__item--delete col-sm-1">
                <i class="ri-delete-bin-2-line table__icon" @click="confirmDelete(item)"></i>
            </div>
        </div>
    </div>
</template>

<script>
import StaffService from '@/services/staff.service.js';

export default {
    props: ["nameTable"],
    watch: {
        list(newValue) {
            this.getAllCategories();
        }
    },
    mounted() {
        this.getAllCategories();
    },
    computed: {
        categoryStrings() {
            return this.list.map((category) => {
                const { ten, mota } = category;
                return [ten, mota].join(" ").toUpperCase();
            });
        },
        filteredCategories() {
            if (this.search == '') return this.list;
            return this.list.filter((_categories, index) =>
                this.categoryStrings[index].includes(this.search.toUpperCase())
            );
        },
    },
    methods: {
        async getAllCategories() {
            this.list = await StaffService.getAllCategories();
            this.list = this.list.filter(item => item.deleted != 1);
            if (this.search != '') {
                this.list = this.filteredCategories;
            }
        },
        handleEmit(category) {
            this.$emit('edit', category);
        },
        confirmDelete(category) {
            if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
                this.handleDelete(category);
            }
        },
        async handleDelete(category) {
            const data = {
                _id: category._id,
                ten: category.ten,
                mota: category.mota
            };
            console.log(data);
            if (await StaffService.deleteCategory(data)) 
                this.getAllCategories();
        },
    },
    data() {
        return {
            list: [],
            search: ''
        };
    }
};
</script>

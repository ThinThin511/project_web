<template>
    <div class="product">
        <div class="product__header">
            <div class="product__header__action">
                <button @click="handleCategory">+</button>
            </div>
        </div>
        <div class="product__form" :class="{'product__form--active': category_form }">
            <form action="" @submit.prevent="handleSubmit">
                <p class="btn btn-outline-danger close" @click="handleCategory">&times</p>
                <h3>Danh mục</h3>
                <div class="product__form__item">
                    <p>Tên:</p>
                    <input required type="text" v-model="ten">
                </div>
                <div class="product__form__item">
                    <p>Mô tả:</p>
                    <input required type="text" v-model="mota">
                </div>
                <button>Xác nhận</button>
            </form>
        </div>
        <TableCategory :nameTable="this.$route.name" @edit="handleEditCategory" />
    </div>
</template>

<script>
import StaffService from '@/services/staff.service.js'
import TableCategory from '@/components/TableCategory.vue'

export default {
    components: {
        TableCategory
    },
    methods: {
        handleCategory() {
            this.ten = '';
            this.mota = '';
            this.id = null;
            this.category_form = !this.category_form;
        },
        handleEditCategory(category) {
            this.ten = category.ten;
            this.mota = category.mota;
            this.id = category._id;
            this.category_form = !this.category_form;
        },
        async handleSubmit() {
            if(this.id == null) {
                const data = {
                    ten: this.ten,
                    mota: this.mota
                }
                if(await StaffService.addCategory(data)) {
                    this.category_form = !this.category_form;
                }
            }
            if(this.id != null) {
                const data = {
                    ten: this.ten,
                    mota: this.mota,
                    _id: this.id
                }
                if(await StaffService.updateCategory(data)) {
                    this.category_form = !this.category_form;
                }
            }

        }
    },
    data() {
        return {
            category_form: false,
            ten: '',
            mota: '',
            id: null,
        }
    }
}
</script>

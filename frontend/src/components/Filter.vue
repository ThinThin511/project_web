<template>
    <div class="filter">
        <div class="filter__category">
            <label>Loại hàng:</label>
            <select @change="filterCategory" v-model="selectedCategory" class="form-select form-select-sm w-100">
                <option :value="''">Tất cả</option>
                <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
        </div>
        <div class="filter__price">
            Sắp xếp giá:
            <select 
                @change="handleSort" 
                v-model="sort" 
                class="form-select form-select-sm w-75 d-inline-block"
            >
                <option :value="''">Mặc định</option>
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
            </select>
        </div>
        <div class="filter__range">
            <label>Mức giá: {{ formatPrice(minPrice) }} VNĐ - {{ formatPrice(maxPrice) }} VNĐ</label>
            <div class="range-wrapper">
                <!-- Thanh trượt giá thấp nhất -->
                <input 
                    type="range" 
                    v-model="minPrice" 
                    :min="propsMin" 
                    :max="propsMax" 
                    @input="filterPrice"
                />
                <!-- Thanh trượt giá cao nhất -->
                <input 
                    type="range" 
                    v-model="maxPrice" 
                    :min="propsMin" 
                    :max="propsMax" 
                    @input="filterPrice"
                />
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
    min: {
        type: Number,
        required: true,
    },
    max: {
        type: Number,
        required: true,
    },
    categories: { // Danh sách loại hàng được truyền từ component cha
            type: Array,
            required: true,
        },
},
computed: {
    propsMin() {
        return this.min;
    },
    propsMax() {
        return this.max;
    },
    formatPrice() {
        return (price) => parseInt(price).toLocaleString(); // Định dạng tiền tệ
    }
},
data() {
    return {
        minPrice: this.min, // Giá thấp nhất
        maxPrice: this.max, // Giá cao nhất
        selectedCategory: '',
    };
},
watch: {
    min(newVal) {
        this.minPrice = newVal; // Cập nhật giá trị nếu props thay đổi
    },
    max(newVal) {
        this.maxPrice = newVal;
    }
},
    methods: {
        handleSort() {
            this.$emit('sort', this.sort);
        },
        filterPrice() {
            this.$emit('range', { minPrice: this.minPrice, maxPrice: this.maxPrice });
        },
        filterCategory() {
            this.$emit('filterCategory', this.selectedCategory); // Phát sự kiện và gửi loại hàng được chọn về cha
        },
    }
};
</script>

<style scoped>
.filter {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    color: #333;
    font-family: 'Arial', sans-serif;
    max-width: 300px;
    margin: auto;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}
.filter__category {
    margin-bottom: 16px;
}

.filter__category label {
    font-size: 14px;
    font-weight: bold;
    color: #388e3c;
}

.filter__category select {
    margin-top: 8px;
}

.filter__price, .filter__range {
    margin-bottom: 16px;
}

.filter__price label, .filter__range label {
    font-size: 14px;
    font-weight: bold;
    color: #555;
}

.range-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px; /* Khoảng cách giữa 2 thanh trượt */
    width: 100%;
}

.range-wrapper input[type="range"] {
    flex: 1;
    appearance: none;
    width: 100%;
    background: #dcedc8; /* Màu xanh nhạt */
    height: 6px;
    border-radius: 5px;
    outline: none;
}

.range-wrapper input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #4caf50; /* Màu xanh lá */
    border: 2px solid #fff;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.range-wrapper input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    background: #388e3c; /* Xanh lá đậm hơn khi hover */
}

.range-wrapper input[type="range"]::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #4caf50;
    border: 2px solid #fff;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.range-wrapper input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.1);
    background: #388e3c;
}





.range-wrapper span {
    font-size: 14px;
    color: #555;
    margin: 0 8px; /* Khoảng cách giữa các thành phần */
}

input[type="number"] {
    width: 100%;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
    font-size: 14px;
    color: #333;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

input[type="number"]:focus {
    outline: none;
    border-color: #b71c1c;
    box-shadow: 0 0 4px rgba(183, 28, 28, 0.4);
}

</style>

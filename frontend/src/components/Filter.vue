<template>
    <div class="filter">
        <div class="filter__price">
            Sắp xếp giá:
            <select @change="handleSort" v-model="sort">
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
        }
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
    flex: 1; /* Để mỗi thanh trượt chiếm không gian ngang đều */
}

.range-wrapper input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #b71c1c;
    border: 2px solid #fff;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.range-wrapper input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    background: #880e4f;
}

.range-wrapper input[type="range"]::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #b71c1c;
    border: 2px solid #fff;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;
}

.range-wrapper input[type="range"]::-moz-range-thumb:hover {
    transform: scale(1.1);
    background: #880e4f;
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

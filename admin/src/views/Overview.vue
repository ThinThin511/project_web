<template>
  <div>
    <h1>Thống Kê</h1>

    <!-- Chọn tùy chọn thống kê -->
    <section>
      <label for="timePeriod">Chọn khoảng thời gian:</label>
      <select v-model="timePeriod" id="timePeriod">
        <option value="day">Theo ngày</option>
        <option value="month">Theo tháng</option>
        <option value="year">Theo năm</option>
      </select>
    </section>

    <!-- Biểu đồ Doanh thu theo thời gian -->
    <section>
      <h2>Doanh thu theo {{ timePeriod === 'day' ? 'ngày' : timePeriod === 'month' ? 'tháng' : 'năm' }}</h2>
      <div class="chart-container">
        <canvas id="revenueChart"></canvas>
      </div>
    </section>

    <!-- Bảng sản phẩm bán chạy -->
    <section>
      <h2>Sản phẩm bán chạy</h2>
      <table>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng bán</th>
            <th>Doanh thu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in bestSellingProducts" :key="product.product">
            <td>{{ product.name }}</td>
            <td>{{ product.quantitySold }}</td>
            <td>{{ product.revenue.toLocaleString() }} VNĐ</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

export default {
  data() {
    return {
      revenueByTime: [], // Dữ liệu doanh thu
      bestSellingProducts: [], // Dữ liệu sản phẩm bán chạy
      timePeriod: 'day', // Mặc định thống kê theo ngày
      revenueChart: null, // Biểu đồ doanh thu
    };
  },
  methods: {
    async fetchStatistics() {
      try {
        // Gửi yêu cầu lấy dữ liệu từ API với thời gian được chọn
        const response = await axios.get(`http://localhost:3000/api/staff/statistics`, {
          params: { timePeriod: this.timePeriod }
        });
        this.revenueByTime = response.data.revenueByTime;
        this.bestSellingProducts = response.data.bestSellingProducts;

        // Sau khi lấy dữ liệu, vẽ biểu đồ
        this.renderChart();
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", error);
      }
    },
    renderChart() {
      const ctx = document.getElementById("revenueChart").getContext("2d");

      // Nếu biểu đồ đã tồn tại, hủy nó đi
      if (this.revenueChart) {
        this.revenueChart.destroy();
      }

      // Tạo biểu đồ mới và lưu vào data của Vue
      this.revenueChart = new Chart(ctx, {
        type: "bar",  // Đảm bảo sử dụng type là 'bar'
        data: {
          labels: this.revenueByTime.map((r) => r.time), // Các ngày/tháng/năm
          datasets: [
            {
              label: "Doanh thu (VNĐ)",
              data: this.revenueByTime.map((r) => r.revenue), // Doanh thu theo thời gian
              backgroundColor: "rgba(102, 255, 91)",
              borderColor: "#2c6b2f",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: this.timePeriod === 'day' ? "Ngày" : this.timePeriod === 'month' ? "Tháng" : "Năm",
              },
            },
            y: {
              title: {
                display: true,
                text: "Doanh thu (VNĐ)",
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.fetchStatistics(); // Lấy dữ liệu khi component được mount
  },
  watch: {
    timePeriod() {
      // Khi thời gian thay đổi, gọi lại API để lấy dữ liệu mới
      this.fetchStatistics();
    }
  },
};
</script>

<style scoped>
/* Kiểu dáng cơ bản */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9; /* Màu nền sáng */
  color: #333; /* Màu chữ tối */
}

h1, h2 {
  color: #2c6b2f; /* Màu xanh lá cây đậm cho tiêu đề */
  margin-bottom: 20px;
  font-weight: 600;
}

/* Định dạng các phần tử section */
section {
  padding: 20px;
  margin-bottom: 30px;
  background-color: white;
  box-shadow: 0 2px 4px rgb(78, 78, 78); /* Màu nền trắng và bóng nhẹ */
  border-radius: 8px;
}

/* Định dạng select box */
select {
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  width: 100%;
  max-width: 250px;
  background-color: #e6f5e6; /* Màu xanh nhạt cho select box */
  color: #2c6b2f;
}

/* Định dạng biểu đồ */
.chart-container {
  width: 100%;
  height: 400px;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #ddd;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

/* Định dạng bảng */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Bóng nhẹ cho bảng */
  border-radius: 8px;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

table th {
  background-color: #2c6b2f; /* Màu xanh lá cây đậm cho tiêu đề bảng */
  color: white;
  font-weight: bold;
}

table td {
  background-color: #f9f9f9; /* Màu nền sáng cho các ô dữ liệu */
}

table tr:hover {
  background-color: #f1f1f1; /* Hiệu ứng hover cho hàng */
}

/* Định dạng chung cho các section */
section h2 {
  color: #2c6b2f;
  margin-bottom: 15px;
  font-weight: 600;
}

/* Định dạng các nút */
button {
  padding: 10px 20px;
  background-color: #2c6b2f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #236d28; /* Màu xanh đậm hơn khi hover */
}
</style>

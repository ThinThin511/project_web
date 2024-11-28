<template>
  <div>
    <h1>Thống Kê</h1>

    <!-- Biểu đồ Doanh thu theo ngày -->
    <section>
      <h2>Doanh thu theo ngày</h2>
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
// Import các thành phần cần thiết từ Chart.js
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";

// Đăng ký các thành phần đã import vào Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

export default {
  data() {
    return {
      revenueByTime: [], // Dữ liệu doanh thu
      bestSellingProducts: [], // Dữ liệu sản phẩm bán chạy
    };
  },
  methods: {
    async fetchStatistics() {
      try {
        // Gửi yêu cầu lấy dữ liệu từ API
        const response = await axios.get("http://localhost:3000/api/staff/statistics");
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
      new Chart(ctx, {
        type: "bar",  // Đảm bảo sử dụng type là 'bar'
        data: {
          labels: this.revenueByTime.map((r) => r.time), // Các ngày
          datasets: [
            {
              label: "Doanh thu (VNĐ)",
              data: this.revenueByTime.map((r) => r.revenue), // Doanh thu theo ngày
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
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
                text: "Ngày",
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
};
</script>

<style>
/* Kiểu dáng cơ bản */
h1, h2 {
  text-align: center;
  margin-bottom: 20px;
}

.chart-container {
  width: 100%;
  height: 400px;
  margin: 20px auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

table th {
  background-color: #f4f4f4;
}
</style>

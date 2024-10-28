<template>
    <div class="dashboard-container">
      <div class="dashboard-grid">
        <!-- Cards en la parte superior -->
        <div class="card hover-card horizontal-card">
            <div class="text-content">
                <h6>Usuarios Totales</h6>
                <p class="value">682</p>
            </div>
            <div class="chart-placeholder"></div>
        </div>
        <div class="card hover-card horizontal-card">
          <h6>New clients</h6>
          <p class="value">321</p>
          <div class="chart-placeholder"></div>
        </div>
        <div class="card hover-card horizontal-card">
          <h6>Earnings</h6>
          <p class="value">$350.40</p>
          <div class="chart-placeholder"></div>
        </div>
        <div class="card hover-card horizontal-card">
          <h6>Activity</h6>
          <p class="value">$540.50</p>
          <div class="chart-placeholder"></div>
        </div>
  
        <!-- Gráfica principal -->
        <div class="card big-card hover-card">
          <h6>Total Spent</h6>
          <p class="value">$682.5</p>
          <div class="chart-placeholder big-chart"></div>
        </div>
      </div>
    </div>
  </template>
 
<script>

export default {
    name: 'PanelAdmin',
    data() {
        return {
            mensaje: 'Hola desde el panel de administración',
            }
        }
    }

</script>

  
  <style scoped>
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Roboto+Mono&family=Russo+One&display=swap');
     
  .dashboard-container {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 90vh;
  }
  
  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-right: 20px;
    margin-left: 20px;
    column-gap: 40px;
    row-gap: 20px;
  }
  
  .card {
    font-family: "DM Sans", sans-serif;
    background: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    align-items: center;
    }


  .hover-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .horizontal-card {
    flex-direction: row;
    justify-content: space-between;
    }
    .text-content {
        display: flex;
        flex-direction: column;
        }
  .big-card {
    grid-column: span 2;
  }
  
  .profile-card {
    text-align: center;
    flex-direction: column;
  }
  
  .profile-picture img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    transition: transform 0.3s ease;
  }
  .profile-card:hover .profile-picture img {
    transform: scale(1.1);
    }
  .value {
    font-size: 24px;
    font-weight: bold;
  }
  
  .chart-placeholder {
    background-image: url('@/assets/images/line-1.png');
    background-size: cover;
    height: 60px;
    width: 60px;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .big-chart {
    height: 200px;
  }
  
  .balance-info {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .percentage {
    font-size: 14px;
  }
  
  .positive {
    color: green;
  }
  
  .negative {
    color: red;
  }
  
  .status {
    font-size: 14px;
    color: green;
  }
  
  .balance-chart {
    height: 150px;
  }
  </style>
  



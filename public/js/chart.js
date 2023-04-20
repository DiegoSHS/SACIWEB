var options = {
    chart: {
      height: 280,
      type: "area"
    },
    dataLabels: {
      enabled: false
    },
    series: [
      {
        name: "Series 1",
        data: <%- JSON.stringify(values) %>,
      },
    ],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: 
      <%- JSON.stringify(times) %>,
    }
  };
  
  
  var chart1 = new ApexCharts(document.querySelector("#chart1"), options);
  var chart2 = new ApexCharts(document.querySelector("#chart2"), options);
  var chart3 = new ApexCharts(document.querySelector("#chart3"), options);
  var chart4 = new ApexCharts(document.querySelector("#chart4"), options);
  var chart5 = new ApexCharts(document.querySelector("#chart5"), options);
  var chart6 = new ApexCharts(document.querySelector("#chart6"), options);
  var chart7 = new ApexCharts(document.querySelector("#chart7"), options);
  var chart8 = new ApexCharts(document.querySelector("#chart8"), options);
  var chart9 = new ApexCharts(document.querySelector("#chart9"), options);
  
  chart1.render();
  chart2.render();
  chart3.render();
  chart4.render();
  chart5.render();
  chart6.render();
  chart7.render();
  chart8.render();
  chart9.render();
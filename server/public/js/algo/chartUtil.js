CHART_COLOR = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

USERRANK_CHART_OPTION = {
  legend: {
    position: 'bottom'
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }
    ]
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 30,
      bottom: 10
    }
  }
};

WEEKLY_SOLVE_CHART_OPTION = {
  legend: {
    position: 'left'
  },
  scales: {
    yAxes: [
      {
        stacked: false,
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  layout: {
    padding: {
      left: 10,
      right: 10,
      top: 20,
      bottom: 0
    }
  }
};

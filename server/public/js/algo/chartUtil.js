const USERRANK_CHART_OPTION = {
  plugins: {
    datalabels: {
      formatter: function(value, context) {
        const index = context.dataIndex;
        const datasets = context.chart.data.datasets[0];
        const name = context.chart.data.labels[index];
        const total = datasets.data.reduce((prev, next) => prev + next);
        const percentage = Math.floor((value / total) * 100 + 0.5);
        return `${name}\n${percentage}%`;
      }
    }
  },
  legend: {
    position: 'bottom'
  },
  scales: {},
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

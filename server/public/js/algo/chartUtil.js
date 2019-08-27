const USERRANK_CHART_OPTION = {
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

const WEEKLY_SOLVE_CHART_OPTION = {
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

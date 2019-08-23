class AlgoChart {
  constructor(userRank) {
    const ctx = document.getElementById('userRankChart').getContext('2d');

    const ids = [];
    const counts = [];
    userRank.forEach((v, i) => {
      counts.push(v.count);
      ids.push(v.bojId);
    });
    this.drawChart(ctx, 'pie', ids, counts);
  }

  drawChart(ctx, type, labels, datas) {
    const myChart = new Chart(ctx, {
      type: type,
      data: {
        labels: [...labels],
        datasets: [
          {
            label: '# of Votes',
            data: [...datas],
            backgroundColor: CHART_COLOR,
            borderColor: CHART_COLOR,
            borderWidth: 1
          }
        ]
      },
      CHART_OPTION
    });
  }
}

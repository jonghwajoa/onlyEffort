class AlgoChart {
  constructor(userRank, dailySolve) {
    const userRankCtx = document.getElementById('userRankChart').getContext('2d');
    const weeklySolveCtx = document.getElementById('weeklySolveChart').getContext('2d');

    const userRnakData = this.preProcessingUserRank(userRank);
    userRnakData.label = 'User Solve Count Rank';

    this.userRankChart = this.drawChart(userRankCtx, userRnakData);
    this.weeklySolveChart = this.drawMulipleLineChart(weeklySolveCtx);

    const dailySolveData = this.preProcessingDailySolve(dailySolve);
    this.updateWeeklySolveChart(dailySolveData);
  }

  updateWeeklySolveChart(dailySolveData) {
    let index = 0;
    for (const key in dailySolveData) {
      const line = {
        label: key,
        data: dailySolveData[key],
        showLine: true,
        fill: false,
        borderColor: CHART_COLOR[index]
      };
      this.weeklySolveChart.data.datasets[index++] = line;
    }
    this.weeklySolveChart.update();
  }

  preProcessingDailySolve(dailySolve) {
    const obj = {};
    for (const e of dailySolve) {
      if (!obj[e.bojId]) {
        obj[e.bojId] = [];
      }
      obj[e.bojId].push({ x: e.date, y: e.count });
    }

    return obj;
  }

  preProcessingUserRank(userRank) {
    const labels = [];
    const data = [];
    userRank.forEach((v, i) => {
      data.push(v.count);
      labels.push(v.bojId);
    });
    return { labels, data };
  }

  drawChart(ctx, { labels, data, label }, option) {
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [...labels],
        datasets: [
          {
            label,
            data: [...data],
            backgroundColor: CHART_COLOR,
            borderColor: CHART_COLOR,
            borderWidth: 1
          }
        ]
      },
      options: USERRANK_CHART_OPTION
    });
  }

  drawMulipleLineChart(ctx) {
    return new Chart(ctx, {
      type: 'scatter',
      options: WEEKLY_SOLVE_CHART_OPTION
    });
  }
}

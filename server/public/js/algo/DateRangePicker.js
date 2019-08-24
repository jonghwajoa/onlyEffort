class DateRangePicker {
  constructor() {
    this.eventInit();
  }

  eventInit() {
    const select = $('#range-select');
    $('#searchRangeSolve').click(async () => {
      const success = status => status === 200;
      const user = select.val();
      console.log(start.format('YYYMMDD'));
      const path = `/api/${user}/range?start=${start.format('YYYYMMDD')}&end=${end.format('YYYYMMDD')}`;
      try {
        const rangeSolve = await ajaxUtil.sendGetAjax(path, success);
        this.rangeSolveProcessing(JSON.parse(rangeSolve));
      } catch (e) {
        console.log(e);
      }
    });
  }

  rangeSolveProcessing(rangeSolve) {
    let table = '<table class="table table-striped mt-2 range-table">';
    table += '<thead><tr>';
    table += '<th scope="col">#</th>';
    table += '<th scope="col">문제번호</th>';
    table += '<th scope="col">문제이름</th>';
    table += '<th scope="col">date</th>';
    table += '</tr></thead>';
    table += '<tbody>';
    rangeSolve.forEach((e, i) => {
      table += `<tr><th scope="row">${i + 1}</th>`;
      table += `<td><a target="_blank" rel="noopener noreferrer" href="https://www.acmicpc.net/problem/${e.number}">
      ${e.number}</a>`;
      table += `</td><td>${e.name}</td><td>${e.date}</td></tr>`;
    });
    table += '</tbody></table>';

    document.getElementById('range-wrap').innerHTML = table;
  }
}

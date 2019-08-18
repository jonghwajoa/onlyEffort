const axios = require('axios');
const cheerio = require('cheerio');

class API {
  constructor() {
    this.boj = axios.create({
      baseURL: 'https://www.acmicpc.net/',
      headers: {
        Accept: 'application/json'
      }
    });
  }

  async getSolveProblem(id) {
    return this._getSolveProblem(await this.boj.get(`user/${id}`));
  }

  _getSolveProblem(html) {
    const solveObj = {};
    const $ = cheerio.load(html.data);
    const solve = $('div.row')
      .children('div.col-md-9')
      .children('div.panel-default');

    const problemNumber = $(solve[0])
      .find('div.panel-body')
      .find('span.problem_number a');

    const problemName = $(solve[0])
      .find('div.panel-body')
      .find('span.problem_title a');

    const length = problemNumber.length;
    for (let j = 0; j < length; j++) {
      const num = $(problemNumber[j]).text();
      const name = $(problemName[j]).text();
      solveObj[num] = name;
    }

    return solveObj;
  }
}

module.exports = API;

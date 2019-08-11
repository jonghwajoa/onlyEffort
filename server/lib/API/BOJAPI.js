const axios = require('axios');
const cheerio = require('cheerio');

class BOJAPI {
  constructor() {
    this.boj = axios.create({
      baseURL: 'https://www.acmicpc.net/',
      // timeout: 3000,
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

    const len = solve.length;
    for (let i = 0; i < len; i++) {
      const text = $(solve[i])
        .find('div.panel-heading h3.panel-title')
        .text();

      solveObj[text] = [];

      const problemNumber = $(solve[i])
        .find('div.panel-body')
        .find('span.problem_number a');

      const problemName = $(solve[i])
        .find('div.panel-body')
        .find('span.problem_title a');

      const length = problemNumber.length;
      for (let j = 0; j < length; j++) {
        const num = $(problemNumber[j]).text();
        const name = $(problemName[j]).text();
        solveObj[text][j] = { num, name };
      }
    }

    return solveObj;
  }

  async getVsProblem(id, compareId) {
    return this._getVsProblem(await this.boj.get(`vs/${id}/${compareId}`));
  }

  _getVsProblem(html) {
    const compareObj = {};
    const $ = cheerio.load(html.data);
    const vs = $('div.container > div.row > div.col-md-12');

    const len = vs.length - 1;
    for (let i = 1; i < len; i++) {
      const header = $(vs[i])
        .find('div.panel-heading')
        .children('h3')
        .children('a')
        .text();

      compareObj[header] = [];
      const problemNumber = $(vs[i])
        .find('div.panel-body')
        .find('span.problem_number a');

      const problemName = $(vs[i])
        .find('div.panel-body')
        .find('span.problem_title a');

      const length = problemName.length;
      for (let j = 0; j < length; j++) {
        const name = $(problemName[j]).text();

        const num = $(problemNumber[j]).text();
        compareObj[header][j] = { num, name };
      }
    }
    return compareObj;
  }
}

module.exports = BOJAPI;

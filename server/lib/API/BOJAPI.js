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
    // const html = await this.boj.get(`vs/${id}/${compareId}`);
    return this._getVsProblem(fs.readFileSync('vs.html'), 'utf8');
  }

  _getVsProblem(html) {
    const $ = cheerio.load(html);
    const $problemNumberList = $('div.row div.col-md-12');
  }
}

module.exports = BOJAPI;

const should = require('should');
const moment = require('moment');
const { LAST_WEEK, TODAY, YESTERDAY } = require('../../library/Date');

describe('# date Libray..', () => {
  it('# TODAY는 오늘날짜를 YYYYMMDD 형태로 반환한다.', () => {
    TODAY.should.be.equals(moment().format('YYYYMMDD'));
  });

  it('# YESTERDAY는 어제의 날짜를 YYYYMMDD 형태로 반환한다.', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    YESTERDAY.should.be.equals(moment(date).format('YYYYMMDD'));
  });
});

const should = require('should');
const moment = require('moment');
const { getLastWeek, getStartDateOfWeek, getToday, getYesterday, getDateOfWeek } = require('../../library/Date');

describe('# date Libray..', () => {
  it('# TODAY는 오늘날짜를 YYYYMMDD 형태로 반환한다.', () => {
    getToday().should.be.equals(moment().format('YYYYMMDD'));
  });

  it('# YESTERDAY는 어제의 날짜를 YYYYMMDD 형태로 반환한다.', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    getYesterday().should.be.equals(moment(date).format('YYYYMMDD'));
  });

  it('# getStartDateOfWeek는 월요일을 반납한다.', () => {
    getStartDateOfWeek().should.be.equals(20190826);
  });

  it('# getStartDateOfWeek는 number type을 반환한다.', () => {
    getStartDateOfWeek().should.be.type('number');
  });

  it('# getLastWeek은 지난주를 반환한다.', () => {
    getLastWeek().should.be.equals(34);
  });

  it('# getDateOfWeek은 년과 weekNumber에 해당하는 월요일을 반환한다.', () => {
    getDateOfWeek(2019, 34).should.be.eqls(20190819);
    getDateOfWeek(2019, 1).should.be.eqls(20181231);
    getDateOfWeek(2019, 55).should.be.eqls(20200113);
  });
});

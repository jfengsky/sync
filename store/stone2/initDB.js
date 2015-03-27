/**
 * 初始化indexDB 数据库
 */
(function() {
  window.Stone = {

    // 数据库名
    DBName: 'stone',

    // 自定义职业的表名
    professTable: 'profess',

    // 自定义职业表有两个字段
    //  cname: 中文名        String
    //  belong: 属于什么职业  Number
    professName: 'cname',
    professBelog: 'belong',

    // 定义结果的表名
    resultTable: 'result',

    // 结果的表只有一个字段
    // time: 时间   毫秒格式
    resultTime: 'time'

  };

  // 检查职业数据表是否存在, 判断localStorage的StoneTable是否为'profess'
  if (localStorage.getItem('StoneTable') !== 'profess') {
    // 创建数据库和表
    Idb.createData({
      DBname: Stone.DBName,
      DBver: 1,
      tableName: Stone.professTable,
      perfer: [{
        key: Stone.professName
      }, {
        key: Stone.professBelog
      }],
      callback: function() {
        // console.log('table has create');
        localStorage.setItem('StoneTable', 'profess');
      }
    });
  };

  // 检查结果数据库是否存在, 判断localStorage的StoneResult是否为'result'
  if (localStorage.getItem('StoneResult') !== 'result') {
    Idb.createData({
      DBname: Stone.DBName,
      DBver: 2,
      tableName: Stone.resultTable,
      perfer: [{
        key: Stone.resultTime
      },{
        key: 'start'
      },{
        key: 'result'
      },{
        key: 'playProfess'
      },{
        key: 'playBelong'
      },{
        key: 'enimyProfess'
      },{
        key: 'enimyBelong'
      }],
      callback: function() {
        // console.log('table has create');
        localStorage.setItem('StoneResult', 'result');
      }
    });
  }
})();
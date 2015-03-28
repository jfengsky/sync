// 自己根据需要封装的indexDB方法
(function() {
  var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
  window.Idb = {

    /**
     * 检查数据库是否存在
     * @param  {String} _name  数据库名
     * @return {Boolean}
     */
    // checkDB: function(_name){
    //   console.log(_name);
    //   var request = indexedDB.open(_name);
    //   request.onsuccess = function(ev){
    //     console.log('success');
    //     console.log(ev);
    //   };
    //   request.onerror = function(ev){
    //     console.log('error');
    //     console.log(ev);
    //   };
    // },
    /**
     * 创建数据库
     * @param  {Object} _options 参数
     *   {
     *     DBname: '',              // 数据库名
     *     DBver: 1,                // 版本
     *     callback: function(){} // 成功回调
     *   }
     *
     */
    createDB: function(_options) {
      var request = indexedDB.open(_options.DBname, _options.DBver);
      request.onsuccess = function(evt) {
        if (_options.callback) {
          _options.callback(evt)
        }
      };
    },

    /**
     * 删除数据库
     * @param  {String} _name  数据库名
     * @return
     */
    deleteDB: function(_name) {
      indexedDB.deleteDatabase(_name);
    },

    /**
     * 检查表是否存在
     * @param  {[type]} _options [description]
     * @return {[type]}          [description]
     */
    // checkTable: function(_options){
    //   var db,
    //     request = indexedDB.open(_options.DBname);
    // },

    /**
     * 创建表
     * @param  @param  {Object} _options 参数
     * @return {[type]}          [description]
     */
    createTable: function(_options) {
      var request = indexedDB.open(_options.DBname, _options.DBver);
      request.onupgradeneeded = function(evt) {
        objectStore = evt.currentTarget.result.createObjectStore(_options.tableName, {
          keyPath: "id",
          autoIncrement: true
        });
      }
    },

    /**
     * 创建带字段的数据库
     * @param  {Object} _options 参数
     *   {
     *     DBname: 'Stone',
     *     DBver: 2,
     *     tableName: 'profess',
     *     perfer: [{
     *       key: 'key1'
     *     },{
     *       key: 'key2'
     *     }{
     *       key: 'key3'
     *     }],
     *     callback: function(){}
     *   }
     * @return
     */
    createData: function(_options) {
      var request = indexedDB.open(_options.DBname, _options.DBver),
        perfer = _options.perfer;
      request.onupgradeneeded = function(evt) {
        var objectStore = evt.currentTarget.result.createObjectStore(_options.tableName, {
          keyPath: "id",
          autoIncrement: true
        });

        for (var i = 0; i < perfer.length; i++) {
          objectStore.createIndex(perfer[i].key, perfer[i].key, {
            unique: false
          });
        };

        if (_options.callback) {
          _options.callback(evt)
        }
      }
    },

    /**
     * 添加数据
     * @param  {Object} _options 参数
     *   {
     *     DBname: 'Stone',
     *     tableName: 'profess',
     *     data: [{
     *       key1: 'key11',
     *       key2: 'key22',
     *       key3: 'key33'
     *     }],
     *     callback: function(){}
     *   }
     * @param
     */
    addData: function(_options) {
      var db,
        request = indexedDB.open(_options.DBname);

      request.onsuccess = function(evt) {
        var transaction,
          objectStore,
          req,
          wirteDb = {},
          data = _options.data;
        db = evt.target.result;
        transaction = db.transaction(_options.tableName, 'readwrite');
        objectStore = transaction.objectStore(_options.tableName);
        for (var i = 0; i < data.length; i++) {
          for (var key in data[i]) {
            wirteDb[key] = data[i][key]
          }
        };
        req = objectStore.add(wirteDb);
        req.onsuccess = function(evt) {
          if (_options.callback) {
            _options.callback(evt);
            db.close();
          };
        };
      }
    },

    /**
     * 删除数据
     * @param  {Object} _options 参数
     *   {
     *     DBname: 'Stone',
     *     tableName: 'profess',
     *     id: 1,
     *     callback: function(){}
     *   }
     * @return
     */
    deleteData: function(_options) {
      var db,
        request = indexedDB.open(_options.DBname);
      request.onsuccess = function(evt) {
        var transaction,
          objectStore,
          req;
        db = evt.target.result;
        transaction = db.transaction(_options.tableName, 'readwrite');
        objectStore = transaction.objectStore(_options.tableName);
        req = objectStore.delete(_options.id);
        req.onsuccess = function(evt) {
          if (_options.callback) {
            _options.callback(evt);
            db.close();
          }
        }
      }
    },

    /**
     * 获取所有数据
     * @param  {Object} _options 参数
     *   {
     *     DBname: 'Stone',
     *     tableName: 'profess',
     *     callback: function(){}
     *   }
     * @return
     */
    getData: function(_options) {
      var db,
        request = indexedDB.open(_options.DBname);
      request.onsuccess = function(evt) {
        var transaction,
          objectStore,
          req,
          tempData = [];
        db = evt.target.result;
        transaction = db.transaction(_options.tableName, 'readwrite');
        objectStore = transaction.objectStore(_options.tableName);
        req = objectStore.openCursor();
        req.onsuccess = function(evt) {
          var cursor = evt.target.result;
          if (cursor) {
            tempData.push(cursor.value);
            cursor.continue();
          } else {
            _options.callback(tempData);
            db.close();
          };
        }
      }
    },

    /**
     * 获取对战结果数据
     * @param  {[type]} _options [description]
     * @return {[type]}          [description]
     */
    getResult: function(_options) {
      this.getData({
        DBname: Stone.DBName,
        tableName: Stone.resultTable,
        callback: function(_data) {
          _options.callback(_data);
        }
      });
    }

  };
})();
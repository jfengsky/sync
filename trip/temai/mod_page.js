// Generated by CoffeeScript 1.7.1
define(function(require, exports, module) {
  "use strict";
  var $, Page;
  $ = require('jquery');
  Page = function() {
    var self;
    self = this;

    /*
     * 每个页码显示逻辑
     * @param {Number}  _page     当前页码
     * @param {Boolean} _current  是否高亮
     */
    this._sigPage = function(_page, _current) {
      var html;
      html = '<a href="javascript:void(0)" data-tag="' + _page + '">' + _page + '</a>';
      if (_current) {
        html = '<a href="javascript:void(0)" class="current" data-tag="' + _page + '">' + _page + '</a>';
      }
      return html;
    };

    /*
     * 省略号
     */
    this._morePage = '<span class="pkg_page_ellipsis">...</span>';

    /*
     * 页码直接跳转
     */
    this._tplGoto = '<span class="pkg_pagevalue">到<input type="text" class="pkg_page_num" name="" id="J_turnpage" value="">页<input type="button" class="pkg_page_submit" value="确定" id="J_pagebtn" name=""></span>';

    /*
     * 页面中间处理
     */
    this._tplPage = function(_data) {
      var html, i, _i, _j, _k, _l, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
      html = '';
      if (_data.totalPage <= 6 && _data.currentPage <= 6) {
        for (i = _i = 1, _ref = _data.totalPage; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          if (i === _data.currentPage) {
            html += self._sigPage(i, true);
          } else {
            html += self._sigPage(i);
          }
        }
      } else if (_data.totalPage > 6 && _data.currentPage <= 6) {
        for (i = _j = 1, _ref1 = i + 5; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
          if (i === _data.currentPage) {
            html += self._sigPage(i, true);
          } else {
            html += self._sigPage(i);
          }
        }
        html += self._morePage;
        html += self._sigPage(_data.totalPage);
      } else if (_data.totalPage > 6 && _data.currentPage > 6 && _data.currentPage < (_data.totalPage - 2)) {
        html += self._sigPage(1);
        html += self._morePage;
        for (i = _k = _ref2 = _data.currentPage - 2, _ref3 = _data.currentPage; _ref2 <= _ref3 ? _k <= _ref3 : _k >= _ref3; i = _ref2 <= _ref3 ? ++_k : --_k) {
          if (i === _data.currentPage) {
            html += self._sigPage(i, true);
          } else {
            html += self._sigPage(i);
          }
        }
        for (i = _l = _ref4 = _data.currentPage + 1, _ref5 = _data.currentPage + 2; _ref4 <= _ref5 ? _l <= _ref5 : _l >= _ref5; i = _ref4 <= _ref5 ? ++_l : --_l) {
          html += self._sigPage(i);
        }
        html += self._morePage;
        html += self._sigPage(_data.totalPage);
      } else if (_data.totalPage > 6 && _data.currentPage > 6 && _data.currentPage >= (_data.totalPage - 2)) {
        html += self._sigPage(1);
        html += self._morePage;
        for (i = _m = _ref6 = _data.currentPage - 2, _ref7 = _data.currentPage; _ref6 <= _ref7 ? _m <= _ref7 : _m >= _ref7; i = _ref6 <= _ref7 ? ++_m : --_m) {
          if (i === _data.currentPage) {
            html += self._sigPage(i, true);
          } else {
            html += self._sigPage(i);
          }
        }
        if (_data.totalPage !== _data.currentPage) {
          for (i = _n = _ref8 = _data.currentPage + 1, _ref9 = _data.totalPage; _ref8 <= _ref9 ? _n <= _ref9 : _n >= _ref9; i = _ref8 <= _ref9 ? ++_n : --_n) {
            html += self._sigPage(i);
          }
        }
      }
      return html;
    };
    this._tpl = function(_data) {
      var html;
      html = '<div class="pkg_page basefix">';
      if (_data.currentPage === 1 && _data.totalPage <= 1) {
        return;
      } else if (_data.currentPage === 1 && _data.totalPage > 1) {
        html += '<a href="javascript:void(0)" class="up up_nocurrent"><b></b></a>';
        html += self._tplPage(_data);
        html += '<a href="javascript:void(0)" class="down">下一页<b></b></a>';
        html += self._tplGoto;
      } else if (_data.currentPage === _data.totalPage) {
        html += '<a href="javascript:void(0)" class="up"><b></b></a>';
        html += self._tplPage(_data);
        html += '<a href="javascript:void(0)" class="down down_nocurrent">下一页<b></b></a>';
        html += self._tplGoto;
      } else if (_data.currentPage > 1) {
        html += '<a href="javascript:void(0)" class="up"><b></b></a>';
        html += self._tplPage(_data);
        html += '<a href="javascript:void(0)" class="down">下一页<b></b></a>';
        html += self._tplGoto;
      }
      return html += '</div>';
    };
    this.init = function(_data) {
      return $('#J_page').html(self._tpl(_data));
    };
  };
  module.exports = Page;
});

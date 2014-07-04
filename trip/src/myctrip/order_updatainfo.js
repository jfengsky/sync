/**
 * 上传组件
 * 是否图片 isimg:(true:是图片,false不是图片)
 * 尺寸imgwidth:
 *     imgheight
 */
define(function (require, exports, module) {
  "use strict";

  var JQ = require('jquery'),

      // 可上传的文件类型
      fileUpType = ['jpeg', 'jpg', 'png', 'gif', 'pdf', 'doc', 'docx', 'excel', 'xlsx', 'msword','xls'],

      // 当前正在进行的ajax请求
      Ajaxing,

      // 操作记录
      infoModifys = [];
      /*
        infoModifys = [{
        "OrderId": ,
        "ClientId": ,
        "StuffId": 
      }];
       */
  var qbo = '';
  if (GV.app.detail.data.qb_o) {
      qbo = GV.app.detail.data.qb_o;
  };
  function checkUpdata(){
    var loadImg = '<img src="http://pic.c-ctrip.com/packages111012/loading_50-0816.gif" id="J_loadImg" style="margin: 10px 0 10px 45%">';
    
    /**
     * 记录操作，以便最后保存操作
     * @param  {Json} _data 操作记录
     * @return {Json}
     */
    this._saveControl = function( _data ){
      if(infoModifys.length <= 0){
        infoModifys.push(_data);
      } else {
        JQ.each(infoModifys, function(_index, _item){
          if(_item.ClientId === _data.ClientId){
            _item.StuffId.push(_data.StuffId[0]);
          } else {
            infoModifys.push(_data)
          }
        });
      };

      // 去掉重复操作记录
      infoModifys.each(function(_item){
        _item.StuffId.unique();
      });
    };
    /**
     * 文件区块模板
     * @param _data
     * @private
     */
    this._docTpl = function(_data, _args, _status){
      var tpl = '',
          backfileName = _data.ArchivesOriginalName,
          backNameArr = backfileName.split('.'),
          backfileAchiveId = _data.ArchiveItemId,
          fileLastName = backNameArr[backNameArr.length - 1],
          backfileIsDoc = false,
          backfileIsExcel = false,
          viewDelTpl = '';
      if( fileLastName === 'doc' || fileLastName === 'docx' || fileLastName === 'pdf' ) {
        backfileIsDoc = true
      };
      if( fileLastName === 'excel' || fileLastName === 'xlsx' || fileLastName === 'xls'){
        backfileIsExcel = true;
      };
      if(_status === 'T'){
        viewDelTpl = '<a class="J_downinfo" href="javascript:void(0)" data-href="../OrderDetailManage/MaterialDownload.aspx?OrderId=' + _args.OrderId + '&ArchiveItemId='+ _data.ArchiveItemId +'">下载</a>';
      } else {
        viewDelTpl = '<a class="J_downinfo" href="javascript:void(0)" data-href="../OrderDetailManage/MaterialDownload.aspx?OrderId=' + _args.OrderId + '&ArchiveItemId='+ _data.ArchiveItemId +'">下载</a>|<a href="javascript:void(0)" class="J_infodel" data-id="'+ _data.ArchiveItemId +'">删除</a>';
      }
      if( backfileIsDoc ){
        tpl = '<li class="visa_word"><a href="javascript:void(0)" class="visa_wordtxt"><span>' + unescape(_data.ArchivesOriginalName) + '</span></a><p>' + viewDelTpl + '</p></li>'
      } else if ( backfileIsExcel ) {
        tpl = '<li class="visa_word visa_excel"><a href="javascript:void(0)" class="visa_wordtxt"><span>' + unescape(_data.ArchivesOriginalName) + '</span></a><p>' + viewDelTpl + '</p></li>'
      }
      // var docTpl = '<li><a href="javascript:void(0)" class="visa_word"><span>' + _data.ArchivesOriginalName + '</span></a><p><a href="../OrderDetailManage/MaterialDownload.aspx?OrderId=' + _args.OrderId + '&ArchiveItemId='+ _data.ArchiveItemId +'">下载</a>|<a href="javascript:void(0)" class="J_infodel" data-id="'+ _data.ArchiveItemId +'">删除</a></p></li>';
      // var docTpl = '<li class="visa_word"><a href="javascript:void(0)" class="visa_wordtxt"><span>' + _data.ArchivesOriginalName + '</span></a><p><a href="../OrderDetailManage/MaterialDownload.aspx?OrderId=' + _args.OrderId + '&ArchiveItemId='+ _data.ArchivesItemId +'">下载</a>|<a href="javascript:void(0)" class="J_infodel" data-id="'+ _data.ArchivesItemId +'">删除</a></p></li>',
          // excelTpl = '<li class="visa_word visa_excel"><a href="javascript:void(0)" class="visa_wordtxt"><span>' + _data.ArchivesOriginalName + '</span></a><p><a href="../OrderDetailManage/MaterialDownload.aspx?OrderId=' + _args.OrderId + '&ArchiveItemId='+ _data.ArchivesItemId +'">下载</a>|<a href="javascript:void(0)" class="J_infodel" data-id="'+ _data.ArchivesItemId +'">删除</a></p></li>';
      return tpl
    };

    /**
     * 图片区块模板
     * @param _data
     * @returns {string}
     * @private
     */
    this._tpl = function(_data, _args, _status){
      var tpl = '',
          imgType = _data.ArchivesOriginalName.split('.'),
          viewDelTpl = '';
      if (_status === 'T'){
        viewDelTpl = '<a class="J_downinfo" href="javascript:void(0)" data-href="../OrderDetailManage/MaterialDownload.aspx?OrderId=' + _args.OrderId + '&ArchiveItemId='+ _data.ArchiveItemId +'">下载</a>';
      } else {
        viewDelTpl = '<a class="J_downinfo" href="javascript:void(0)" data-href="../OrderDetailManage/MaterialDownload.aspx?OrderId=' + _args.OrderId + '&ArchiveItemId='+ _data.ArchiveItemId +'">下载</a>|<a href="javascript:void(0)" class="J_infodel" data-id="'+ _data.ArchiveItemId +'">删除</a>';
      };
      if( (!!window.ActiveXObject&&!window.XMLHttpRequest) ) {
        // tpl = '<li><a href="javascript:void(0)" class="visa_word"><span>' + _data.ArchivesOriginalName + '</span></a><p><a href="../OrderDetailManage/MaterialDownload.aspx?OrderId=' + _args.OrderId + '&ArchiveItemId='+ _data.ArchiveItemId +'">下载</a>|<a href="javascript:void(0)" class="J_infodel" data-id="'+ _data.ArchiveItemId +'">删除</a></p></li>';
        tpl = '<li><a href="javascript:void(0)" class="visa_idcardimg J_viewImage" data-id="' + _data.ArchiveItemId + '"><span>' + unescape(_data.ArchivesOriginalName) + '</span></a><p>' + viewDelTpl + '</p></li>';
      } else {
        // tpl = '<li><a href="javascript:void(0)" class="visa_idcardimg J_viewImage"><img src="data:image/' + imgType[1] + ';base64,' + _data.Base64Image + '" /></a><p><a href="../OrderDetailManage/MaterialDownload.aspx?OrderId=' + _args.OrderId + '&ArchiveItemId='+ _data.ArchiveItemId +'">下载</a>|<a href="javascript:void(0)" class="J_infodel" data-id="'+ _data.ArchiveItemId +'">删除</a></p><a href="javascript:void(0)" class="visa_zoomin"></a></li>';
        tpl = '<li><a href="javascript:void(0)" class="visa_idcardimg J_viewImage" data-id="' + _data.ArchiveItemId + '"><img src="data:image/' + imgType[1] + ';base64,' + _data.Base64Image + '" /></a><p>' + viewDelTpl + '</p><a href="javascript:void(0)" class="visa_zoomin"></a></li>';
      }
      return tpl;
    };

    /**
     * 上传组件判断
     * @return 
     */
    this._checkBro = function(){
      var upDataPlug;

      // 浏览器是否支持 html5 fileAPI
      
      if( window.File && window.FileReader && window.FileList && window.Blob ){
        upDataPlug = require('../Modules/swfupload/mod_h5upload');
      } else {
        upDataPlug = require('../Modules/swfupload/mod_swfupload');
      }
      return upDataPlug;
    };

    /**
     * 删除材料
     * @param  {JQObject} _tag  对应容器
     * @param  {Object}   _data 返回数据
     * @return 
     */
    this._delInfo = function(_tag, _data, _upDataJson){
      var self = this;
      if(_data.errno === 0){
        _tag.fadeOut(function(){
          _tag.remove();
        });
        // 记录该操作用于最后的保存操作
        self._saveControl({
          "OrderId":_upDataJson.OrderId,
          "ClientId":_upDataJson.ClientId,
          "StuffId": [_upDataJson.StuffId]
        });
      }
      // else {
      //   console.log(_data.errmsg);
      // }
    };

    /**
     * 查看大图
     * @param  {[type]} _data [description]
     * @return {[type]}       [description]
     */
    this._viewImage = function(_data){
      var data = _data.data,
          imgType = data.ArchivesOriginalName.split('.'),
          imageWindow;
      if( (!!window.ActiveXObject&&!window.XMLHttpRequest) ) {
        imageWindow = window.open('','','');
        imageWindow.document.write('<!--\n' +
          '------=_NextPart_000_0000_01CA9F59.AFB45FE0\n' +
          'Content-Type: image/' + imgType[1] + '\n' +
          'Content-Transfer-Encoding: base64\n' +
          'Content-Location:' + data.ArchivesOriginalName + '\n' +
          '\n' + data.Base64Image +
          '\n' +
          '!-->\n' +
          '<img src="data:image/'+ imgType[1] +';base64,' + data.Base64Image + '"' +
          ' onerror="src=\'mhtml:\' + document.location.href + \'!'+ data.ArchivesOriginalName +'\';"/>');
      } else {
        JQ('body').append('<div id="J_largeImg" styld="display:none"><img src="data:image/' + imgType[1] + ';base64,' + data.Base64Image + '"/>');
        $('#J_largeImg').mask();
        JQ(document).bind('click.large', function(ev){
          if( JQ(ev.target).get(0).tagName != 'IMG'){
            $('#J_largeImg').unmask();
            $('#J_largeImg').remove();
            JQ(document).unbind('click.large');
          }
        });
      };

    };

    this._viewIeImage = function(_data){
      var data = _data.data;
      var imgType = data.ArchivesOriginalName.split('.');
      var myWindow=window.open('','','');
      myWindow.document.write("弹出窗口'");
//      JQ('body').append('<div id="J_largeImg" styld="display:none"><img src="data:image/' + imgType[1] + ';base64,' + data.Base64Image + '"/>');
//      $('#J_largeImg').mask();
//      JQ(document).bind('click.large', function(ev){
//        if( JQ(ev.target).get(0).tagName != 'IMG'){
//          $('#J_largeImg').unmask();
//          $('#J_largeImg').remove();
//          JQ(document).unbind('click.large');
//        }
//      });
    };

    /**
     * 重新修改旅客按钮的ArchiveId
     * @param {Number} _archID 需要修改的id
     */
    this._setArchivesID = function(_Obj, _archID){
      var dataPara = $.parseJSON(JQ(_Obj).attr('data-para'));
      dataPara.ArchivesId = _archID;
      JQ(_Obj).attr('data-para', $.stringifyJSON(dataPara));

    };

    /**
     * 上传成功操作
     *   显示图片或者文件名
     *   修改当前旅客的achieveid
     * @param  {Object} _data 回传参数
     * @return 
     */
    this._upSuccess = function(_data, _argsData, _upDataJson){
      var self = this,
          backfileName = _data.data.ArchivesOriginalName,
          backNameArr = backfileName.split('.'),
          backfileAchiveId = _data.data.ArchiveId,
          fileLastName = backNameArr[backNameArr.length - 1],
          backfileIsImg = false;
      // 获取返回的文件类型
      $('#J_uping').remove();
      JQ.each(['jpg', 'png', 'gif', 'jpeg'], function(_idx, _item){
        if( fileLastName === _item ){
          backfileIsImg = true;
        };
      });

      if(backfileIsImg){
        JQ('#J_visa_idcard').prepend(self._tpl(_data.data, _argsData));
      } else {
        JQ('#J_visa_idcard').prepend(self._docTpl(_data.data, _argsData));
      }

      // 修改旅客按钮的archivesId
      self._setArchivesID(JQ('#J_upTagBtn'), backfileAchiveId);

      // 记录该操作用于最后的保存操作
      self._saveControl({
        "OrderId":_upDataJson.OrderId,
        "ClientId":_upDataJson.ClientId,
        "StuffId": [_upDataJson.StuffId]
      }); 
    };

    /**
     * 统一异步接口，用于：
     *   获取单个文件信息
     *   获取多个文件信息
     *   下载
     *   删除
     * @param  {Object}     _data     传参
     * @param  {Function}   _callback 回调函数
     * @return 
     */
    this._getData = function(_data, _callback){
      Ajaxing = JQ.ajax({
        url: GV.app.detail.api.MaterialOperateUrl,
        type: 'post',
        data: {
            RequestData: $.stringifyJSON(_data),
            "qb_o": qbo
        },
        cache: false,
        dataType: 'json',
        success: function(data){
          if(_callback){
            _callback(data);
          }
        }
      });
    };

    /**
     * 弹出层获取用户所有上传资料
     * // TODO 缓存内容，下次点击不再请求
     * @private
     */
    this._overlayBack = function(_data, _args, _status){
      var _self = this,
          html = '';
      if( _data.errno === 0 && _data.data) {
        JQ.each(_data.data, function(_idx, _item){
          if(_item.IsImage){
            html += _self._tpl(_item, _args, _status);
          } else {
            html += _self._docTpl(_item, _args, _status)
          }
        });
        JQ('#J_loadImg').remove();
        JQ('#J_visa_idcard').prepend(html);
        if( _status !== 'T' ){
            JQ('#J_uparea').show();
          }
        // $('#J_visjmp').mask();
      } else {
        JQ('#J_loadImg').remove();
        JQ('#J_visa_idcard').append('<p id="J_errmsg">' + _data.errmsg + '</p>');
      }
    };

    this.init = function(){
      var self = this,
          upPlug = self._checkBro(),
          // thumbnailWidth = 200,
          // thumbnailHeight = 130,
          upDataJson;
      // var checkSwf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');    
      // (checkSwf) ? alert('你已经安装了插件') : alert('你没有安装插件');

      new upPlug().init('#J_upbutton',{
        maxsize: 5,
        types: fileUpType,
        // data: {},
        // imgwidth: thumbnailWidth,
        // imgheight: thumbnailHeight,
        isimg: true,
        callback: function( _data ){
          var data = $.parseJSON(_data),
          argData = JQ.parseJSON(JQ('#J_visjmp').attr('data-arg'));
          if(data.errno === 0){
            self._upSuccess(data, argData, upDataJson);
          } else {
            alert(data.errmsg);
            $('#J_uping').remove();
          }
          // self._upSuccess($.parseJSON(_data), argData, clickButton, upDataJson);
        }
      });

      



      // 弹出上传浮出层
      JQ('#J_orderbox').undelegate();
      JQ('#J_orderbox').delegate('.J_upoverlay', 'click', function(){
        var upData = JQ(this).attr('data-para'),
            argData,
            // clickButton = this,
            tempTitle = JQ(this).closest('tr').find('.base_visatxt').text(); // 获取弹出层title
        upDataJson = JQ.parseJSON(upData),
        argData = {
          "OrderId": upDataJson.OrderId,
          "FileDownloadDto":{
            "ArchiveId": upDataJson.ArchivesId,
            "ImageType": "T"
            // "ThumbnailHeight": thumbnailHeight,
            // "ThumbnailWidth": thumbnailWidth
          }
        };
        JQ('#J_visjmp p.visa_upload').text(tempTitle)
        JQ('#J_visa_idcard').append(loadImg);
        $('#J_visjmp').mask();



        // TODO 如果ArchivesId = 0 直接弹出上传窗口
        if(upDataJson.ArchivesId === 0){
          JQ('#J_loadImg').remove();
          if( upDataJson.Status !== 'T' ){
            JQ('#J_uparea').show();
          }
        } else {
          // 异步获取要显示的数据
          self._getData(argData, function(_data){
            self._overlayBack(_data, argData, upDataJson.Status)
          });
        };
        // swfuping.customSettings = upDataJson;
        JQ('#J_visjmp').attr('data-tag', upData).attr('data-arg', $.stringifyJSON(argData));
        $(this).attr('id','J_upTagBtn');

        if(!JQ('#J_visjmp').attr('data-first')){
          JQ('#J_visjmp').attr('data-first', 1)
        } else {
          new upPlug().init('#J_upbutton',{
            maxsize: 5,
            types: fileUpType,
            // data: {},
            // imgwidth: thumbnailWidth,
            // imgheight: thumbnailHeight,
            isimg: true,
            callback: function( _data ){
              var data = $.parseJSON(_data),
              argData = JQ.parseJSON(JQ('#J_visjmp').attr('data-arg'));
              if(data.errno === 0){
                self._upSuccess(data, argData, upDataJson);
              } else {
                alert(data.errmsg);
                $('#J_uping').remove();
              }
              // self._upSuccess($.parseJSON(_data), argData, clickButton, upDataJson);
            }
          });
        }

      });
      
      // 关闭上传浮层
      JQ(document).delegate('.J_visjmpclose', 'click', function(){
        // 终止掉正在进行的ajax
        if(Ajaxing){
          Ajaxing.abort();
        };
        if( !window.File && !window.FileReader && !window.FileList && !window.Blob ){
          var hasOpen = JQ('#J_visjmp').attr('data-first');
          if(hasOpen === '1'){
            $('.swfupload').remove();
            JQ('.visa_newadd a').append('<span id="J_upbutton"></span>');
          }
        };
        upDataJson = null;
        JQ('#J_loadImg').remove();
        // $('.swfupload').remove()
//        JQ('#J_upbutton').css('display', 'none');
        // $('#J_upbutton').remove();
        JQ('#J_uparea').hide();
        JQ('#J_errmsg').remove();
        JQ('#J_visa_idcard li').not('.visa_newadd').remove();
        // JQ('.visa_newadd a').append('<span id="J_upbutton"></span>');
        $('#J_visjmp').unmask();
        $('#J_ckerrmsg').html('');
        $('#J_visjmperr').unmask();
        JQ('#J_visjmp').attr('data-tag', '').attr('data-arg','');
        JQ('#J_upTagBtn').removeAttr('id');


        if (!!window.ActiveXObject&&!window.XMLHttpRequest){
            
            var viewData = {
              "OrderId": GV.app.detail.data.OrderId,
              // "SendMessageDto":infoModifys
              "SendMessageDto": {
                "FileMessageItems": infoModifys
              }
            };
            if( infoModifys.length > 0 ){
              self._getData(viewData, function(_data){
                if ( _data.errno === 0 ){
                  // 置空操作记录
                  infoModifys = [];
                  // 直接刷新算了
                  window.location.reload();

                  // setTimeout(function(){
                  //   JQ(_this).val('保存材料');
                  //   JQ(_this).attr('id','btnSave');
                  //   JQ(_this).removeClass('btn_white').addClass('btn_blue');
                  // },2000);
                }
              });
            } else {
              window.location.reload();
            }
        }

      });

      // 删除资料
      JQ('#J_visjmp').undelegate();
      JQ('#J_visjmp').delegate('.J_infodel', 'click', function(ev){
        var delData = {
              "OrderId": upDataJson.OrderId,
              "FileDeleteDTO":{
                "ArchiveItemId": JQ(ev.target).attr('data-id')
              }
            },
            tag = JQ(ev.target).closest('li');
        self._getData(delData, function(_data){
          self._delInfo(tag, _data, upDataJson);
        });
      });

      // 下载材料
      JQ('#J_visjmp').delegate('.J_downinfo', 'click', function(){
        // stopPropagation
        window.open(JQ(this).attr('data-href'),'','');
      });

      // 查看大图
      JQ('#J_visjmp').delegate('.J_viewImage', 'click', function(){
        var viewData = {
          "OrderId": upDataJson.OrderId,
          "FileDownloadDTO":{
            "ImageType": "P",
            // "ArchiveId": upDataJson.ArchivesId,
            "ArchiveItemId": JQ(this).attr('data-id') - 0
          }
        };
        self._getData(viewData, function(_data){
          self._viewImage(_data)
        });
      });

      // 保存材料按钮
      JQ(document).delegate('#btnSave', 'click', function(){
        var viewData = {
          "OrderId": GV.app.detail.data.OrderId,
          // "SendMessageDto":infoModifys
          "SendMessageDto": {
            "FileMessageItems": infoModifys
          }
        },
        _this = this;
        if(infoModifys.length > 0){
          JQ(_this).val('保存中...');
          JQ(_this).removeClass('btn_blue').addClass('btn_white');
          JQ(_this).attr('id','');
          self._getData(viewData, function(_data){
            if ( _data.errno === 0 ){
              JQ(_this).val('保存成功');
              // 置空操作记录
              infoModifys = [];
              // 直接刷新算了
              window.location.reload();

              // setTimeout(function(){
              //   JQ(_this).val('保存材料');
              //   JQ(_this).attr('id','btnSave');
              //   JQ(_this).removeClass('btn_white').addClass('btn_blue');
              // },2000);
            }
          });
        }
      });

      // 未通过按钮
      JQ('#J_orderbox').delegate('.visa_notpass', 'click', function(){
        $('#J_ckerrmsg').html($(this).attr('data-para'));
        $('#J_visjmperr').mask();
      });

      // 关闭按钮
      JQ('#btnClose').click(function(){
        // 直接关闭
        var browserName=navigator.appName; 
        if (browserName=="Netscape") { 
          window.open('','_parent',''); 
          window.close(); 
        } else if (browserName=="Microsoft Internet Explorer") { 
          window.opener = "whocares"; 
          window.close(); 
        }
      });

      // 关闭窗口
      JQ(window).on('beforeunload', function() {
        if(infoModifys.length > 0 && (window.File && window.FileReader && window.FileList && window.Blob) ){
          return '您有未保存的操作，请先保存再关闭窗口!';
        }
      });

      // ie9 双击才能上传提示
      if( navigator.userAgent.indexOf("MSIE")>0 && navigator.userAgent.indexOf("MSIE 9.0")>0 ){
        JQ('#J_uparea').attr('title','请双击选择您的材料上传')
      }

    };
  };

  new checkUpdata().init();
});
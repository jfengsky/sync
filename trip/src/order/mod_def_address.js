/**
 * 根据城市或区返回省，市，(区)
 */
define(function (require, exports, module) {
  var $ = require('jquery'),
      my_addr_data = require("../data/addr_data");
  
  function DefAddress(){}
  
  DefAddress.prototype = {
    init: function( _cityName ){
      var addressArr = [];
      if(!_cityName) return;

      if ( _cityName === '北京' || _cityName === '上海' || _cityName === '天津' || _cityName === '重庆' ){
        addressArr.push(_cityName);
        addressArr.push( _cityName + '市' );
      } else {
        for(var _tempProvince in my_addr_data.addr_data ){
          for (var _tempCityName in my_addr_data.addr_data[_tempProvince]){
            if ( _cityName === _tempCityName ){
              addressArr.push(_tempProvince);
              addressArr.push(_cityName);
              break;
            }
          }
        }
      }

      // for(var _tempProvince in my_addr_data.addr_data ){
      //   if( _tempProvince === '北京' || _tempProvince === '上海' || _tempProvince === '天津' || _tempProvince === '重庆'){
      //     for (var _tempCity in my_addr_data.addr_data[_tempProvince]){
      //       for ( var i = 0; i < my_addr_data.addr_data[_tempProvince][_tempCity].length; i++ ){
      //         if ( my_addr_data.addr_data[_tempProvince][_tempCity][i] === _cityName ) {
      //           addressArr.push(_tempProvince);
      //           addressArr.push(_tempCity);
      //           addressArr.push(_cityName);
      //           break;
      //         }
      //       }
      //     }
      //   } else {
      //     for (var _tempCityName in my_addr_data.addr_data[_tempProvince]){
      //       if ( _cityName === _tempCityName ){
      //         addressArr.push(_tempProvince);
      //         addressArr.push(_cityName);
      //         break;
      //       }
      //     }
      //   }
        
      // }
      return addressArr;
    }
  }

  module.exports = DefAddress;
});

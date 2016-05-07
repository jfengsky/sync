var express = require('express');
var router = express.Router();

// 资源请求为空
var Calendar = require('./freetravel/Calendar');
var Schedule = require('./freetravel/Schedule');
var UserComments = require('./freetravel/UserComments');
var PackagePrice = require('./freetravel/PackagePrice');
var FHResourceSearch = require('./freetravel/FHResourceSearch');
var AjaxGetXResource = require('./freetravel/AjaxGetXResource');
var AirportAndHotelCityMapping = require('./freetravel/AirportAndHotelCityMapping');

router.post('/Calendar/Calendar', function(req, res, next) {
  res.send(Calendar)
});

router.post('/ProductDetail/Schedule', function(req, res, next) {
  res.send(Schedule)
});

router.post('/ProductDetail/UserComments', function(req, res, next) {
  res.send(UserComments)
});

router.post('/ProductDetail/PackagePrice', function(req, res, next) {
  res.send(PackagePrice)
});

router.post('/FHResourceSearch/FHResourceSearch', function(req, res, next) {
  res.send(FHResourceSearch)
});

router.post('/XResource/AjaxGetXResource', function(req, res, next) {
  res.send(AjaxGetXResource)
});

router.get('/Portal/AirportAndHotelCityMapping', function(req, res, next) {
  res.send(AirportAndHotelCityMapping)
});
module.exports = router;

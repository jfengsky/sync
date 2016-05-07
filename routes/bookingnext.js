var express = require('express');
var router = express.Router();

var BookingTips = require('./booking/BookingTips');

var BookingTipsLimit = require('./booking/BookingTipsLimit');

var groupBookingTipsLimit = require('./booking/groupBookingTipsLimit');

var GetAreas = require('./booking/GetAreas');

var GetPromotion = require('./booking/GetPromotion');

var groupGetPromotion = require('./booking/groupGetPromotion');

var InvoiceInfo = require('./booking/InvoiceInfo');

var GetCustomerInfo = require('./booking/GetCustomerInfo');

var GetCustomerTemplate = require('./booking/GetCustomerTemplate');

var LoadBookingInfoV2 = require('./booking/LoadBookingInfoV2');

var GetPolicy = require('./booking/GetPolicy');

var GetRegion = require('./booking/GetRegion');

var CanBookCheck = require('./booking/CanBookCheck');

var SubmitOrder = require('./booking/SubmitOrder');

var grouploadbookinginfo = require('./booking/grouploadbookinginfo');

var groupInvoiceInfo = require('./booking/groupInvoiceInfo');

var groupBookingTips = require('./booking/groupBookingTips');

var ValidatePromotion = require('./booking/ValidatePromotion');

// var ordersubmitvalidation = require('./booking/ordersubmitvalidation');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/LoadBookingInfoV2', function(req, res, next) {
  setTimeout(function(){
    res.send(LoadBookingInfoV2);
  }, 100)
});



router.get('/orderv2/GetCustomerTemplate', function(req, res, next) {
  res.send(GetCustomerTemplate);
});

router.get('/orderinput/GetCustomerInfo', function(req, res, next) {
  res.send(GetCustomerInfo);
});

router.get('/DeliverV2/InvoiceInfo', function(req, res, next) {
  res.send(InvoiceInfo);
});

router.post('/couponv2/GetPromotion', function(req, res, next) {
  setTimeout(function(){
    res.send(GetPromotion);
  }, 100)
});

router.get('/common/GetAreas', function(req, res, next) {
  res.send(GetAreas);
});

router.get('/BookingLimitV2/BookingTipsLimit', function(req, res, next) {
  res.send(BookingTipsLimit);
});

router.get('/BookingLimitV2/BookingTips', function(req, res, next) {
  res.send(BookingTips);
});

router.post('/hotel/GetPolicy', function(req, res, next) {
  res.send(GetPolicy);
});

router.get('/common/GetRegion', function(req, res, next) {
  res.send(GetRegion);
});

router.post('/api/trace/ordersubmitvalidation', function(req, res, next) {
  res.send("success");
});

router.post('/orderv2/CanBookCheck', function(req, res, next) {
  res.send(CanBookCheck);
});

router.post('/orderv2/SubmitOrder', function(req, res, next) {
  res.send(SubmitOrder);
});


// 团队游
router.post('/BookingLimit/BookingTipsLimit', function(req, res, next) {
  res.send(groupBookingTipsLimit);
});

router.post('/Coupon/GetPromotion', function(req, res, next) {
  res.send(groupGetPromotion);
});

router.post('/loadbookinginfo/loadbookinginfo', function(req, res, next) {
  res.send(grouploadbookinginfo);
});

router.get('/deliver/InvoiceInfo', function(req, res, next) {
  res.send(groupInvoiceInfo);
});

router.get('/BookingLimit/BookingTips', function(req, res, next) {
  res.send(groupBookingTips);
});

router.get('/couponv2/ValidatePromotion', function(req, res, next) {
  res.send(ValidatePromotion);
});
module.exports = router;

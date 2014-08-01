/**
 * Description:
 * Author: jiangfeng(jiang.f@ctrip.com)
 * Date: 2014-07-30 13:48
 *
 */
var GV = {
  app:{
    order:{}
  }
};




GV.app.order = {
  vars:{
    handles:{
      bookingCheck: '/booking/Ajax/DetailNew/CanBookingCheck.ashx'
    },
    initData: {
      orderid:228202560,
      totalpay: 1000,
      number: 1,
      payType:['信用卡', '外网自助支付', '现金']
    }
  }
}

describe("GV Data test", function() {

  // handle 测试
  it("bookingCheck handles", function() {
    expect( GV.app.order.vars.handles.bookingCheck ).not.toBe(undefined);
    expect( GV.app.order.vars.handles.bookingCheck ).not.toBe('');
  });

  // orderid测试
  it("initData orderid checke", function(){
    expect( GV.app.order.vars.initData.orderid ).not.toBe('');
    expect( GV.app.order.vars.initData.orderid ).not.toBe(null);
  });

  // 订单总金额测试
  it("totalpay orderid checke", function(){
    expect( GV.app.order.vars.initData.totalpay ).not.toBe('');
    expect( GV.app.order.vars.initData.totalpay ).not.toBe(null);
  });

  // 可拆分数（成人数）测试
  it("number orderid checke", function(){
    expect( GV.app.order.vars.initData.number ).not.toBe('');
    expect( GV.app.order.vars.initData.number ).not.toBe(null);
    expect( GV.app.order.vars.initData.number ).toBeGreaterThan(0);
  });

  // 支付方式测试
  it("payType orderid checke", function(){
    expect( GV.app.order.vars.initData.payType ).not.toBe('');
    expect( GV.app.order.vars.initData.payType ).not.toBe(null);
  });

})
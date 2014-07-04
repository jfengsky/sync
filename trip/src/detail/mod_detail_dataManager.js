// 只处理 ChosedResourceRequest 这一块数据
define(function (require, exports, module) {
    var $ = require('jquery');
    var _ = require('underscore');
    var util = require('./mod_util');
    //var Util = require('../Modules/Util');

    var ChosedResourceRequest;
    var _json;

    var DetailData = GV.app.detail;
    var baoxianCatID = DetailData.data.BaoxianCategoryID;
    var UtilCalendar = require('Modules/Util').calendar;
    // 保险要单独保存
    var baoxianResources = [];

    var dataManager = {
        /*
        * @param {String} [name]
        * @param {Object} _data
        */
        //		setData: function (name, _data) {
        //			if (arguments.length >= 2) {
        //				ChosedResourceRequest[name] = _data
        //			} else {
        //				ChosedResourceRequest = name;
        //			}
        //		},
        setJSON: function (json) {
            _json = json;
            ChosedResourceRequest = json.ChosedResourceRequest;
            // 这两个出现暂且不处理，应该先由后台来处理好
            dataManager.dealChosedHotel(ChosedResourceRequest);
            dataManager.dealHotelInfos(json);
        },







        ///////////////////
        //////////////      单选项、可选项  begin
        ///////////////// 
        getRresourceData: function (id, isSingle) {
            var resourceList = ChosedResourceRequest[isSingle ? 'ChosedSingleResourceList' : 'ChosedOptionResourceList'];
            var resource = _.filter(resourceList, function (r) {
                return r.ProductID == id;
            });
            return resource;
        },
        getSingleData: function (ProductID) {
            return this.getRresourceData(ProductID, true);
        },
        getOptionalData: function (ProductID) {
            return this.getRresourceData(ProductID, false);
        },
        setRresourceData: function (resource, isSingle) {
            var resourceList = ChosedResourceRequest[isSingle ? 'ChosedSingleResourceList' : 'ChosedOptionResourceList'];
            var origin = this.getRresourceData(resource.ProductID, isSingle);
            var index = _.indexOf(resourceList, origin);
            resourceList[index] = resource;
        },
        setSingleData: function (resource) {
            this.setRresourceData(resource, true);
        },
        setOptionalData: function (resource) {
            this.setRresourceData(resource, false);
        },
        ///////////////////
        //////////////      单选项、可选项  end
        ///////////////// 








        ///////////////////
        //////////////      Chosed begin
        ///////////////// 
        /*
        * @param {String} [name]
        */
        getChosedResourceRequest: function (name) {
            return name ? ChosedResourceRequest[name] : ChosedResourceRequest;
        },
        _delEmptyInChosedResource: function (keyName, fieldName) {
            ChosedResourceRequest[keyName] = _.filter(ChosedResourceRequest[keyName], function (resource) {
                return resource[fieldName] > 0;
            });
            return this;
        },
        delEmptyOptionInChosedResource: function () {
            return this._delEmptyInChosedResource('ChosedOptionResourceList', 'UseCopies');
        },
        //单选
        getChosedSingle: function (SegmentNumber) {
            // choseudResource 单选项中的 SegmentID 其实是 SegmentNumber
            return _.find(ChosedResourceRequest.ChosedSingleResourceList, function (single) { return single.SegmentID == SegmentNumber });
        },
        setChosedSingle: function (SegmentNumber, data) {
            var index = _.indexOf(ChosedResourceRequest.ChosedSingleResourceList, this.getChosedSingle(SegmentNumber));
            if (index >= 0) {
                // 资源中的单选项的segmentid 应该传入segmentnumber，契约有问题，以后修改。
                // 坑啊，这名字起得蛋疼啊
                data.SegmentID = SegmentNumber;
                ChosedResourceRequest.ChosedSingleResourceList[index] = data;
            }
        },
        //可选
        _setOneBaoxianByResourceID: function (baoxian) {
            if (!_.isNumber(baoxian.UseCopies) || _.isNaN(baoxian.UseCopies)) {
                //alert('弹出框返回的数据错误：' + baoxian.UseCopies + '，现在先做容错处理，返回 1')
                baoxian.UseCopies = 1;
            }
            var prevBaoxian = _.find(ChosedResourceRequest.ChosedOptionResourceList, function (optional) { return optional.ProductID == baoxian.ProductID });
            var index = _.indexOf(ChosedResourceRequest.ChosedOptionResourceList, prevBaoxian);
            if (index >= 0)
                ChosedResourceRequest.ChosedOptionResourceList[index] = baoxian;
        },
        setChosedBaoxian: function (BaoxianData) {

            // 方案1，
            //ChosedResourceRequest.ChosedOptionResourceList = _.filter(ChosedResourceRequest.ChosedOptionResourceList, function (optional) {
            //	return optional.CategoryID != baoxianCatID;
            //});
            //ChosedResourceRequest.ChosedOptionResourceList = ChosedResourceRequest.ChosedOptionResourceList.concat(BaoxianData);

            // 方案 2
            _.each(BaoxianData, _.bind(function (baoxian) {
                this._setOneBaoxianByResourceID(baoxian);
            }, this));
        },
        getChosedBaoxian: function () {
            // ChosedResouce 中的 保险
            var baoxianChosed = [];
            var list = _json.ChosedResourceRequest.ChosedOptionResourceList;
            // 此时 baoxianResources 应该已经有了，因为先初始化 保险，才会调用这个方法
            _.each(baoxianResources, function (baoxian) {
                var bx = _.find(list, function (option) { return option.ProductID == baoxian.ResourceID });
                baoxianChosed.push(bx);
            });
            return baoxianChosed;
        },
        getChosedOptional: function (ResourceID) {
            return _.find(ChosedResourceRequest.ChosedOptionResourceList, function (optional) { return optional.ProductID == ResourceID });
        },
        //setChosedOptional: function (ResourceID, data) {
        //	var index = _.indexOf(ChosedResourceRequest.ChosedOptionResourceList, this.getChosedOptional(ResourceID));
        //	if (index >= 0)
        //		ChosedResourceRequest.ChosedOptionResourceList[index] = data;
        //},
        //酒店
        /*
        * TODO,应该是后台把数据处理正确了再传过来
        * 目的：ChosedResource 里面，每个 Segment 下面应该只有一个酒店一个房型
        * 现状：后台数据有问题，ChosedResource 很多条同一个 Segment、HotelID 的数据：[{Segment:1...},{Segment:1...},{Segment:1...},{Segment:1...}]
        */
        dealChosedHotel: function (ChosedResourceRequest) {
            var ChosedHotelResourceList = [];
            var ChosedSegment = [];
            _.each(ChosedResourceRequest.ChosedHotelResourceList, function (hotel) {
                if (ChosedSegment.indexOf(hotel.Segement) == -1) {
                    ChosedHotelResourceList.push(hotel);
                    ChosedSegment.push(hotel.Segement);
                }
            });
            //return ChosedHotelResourceList;
            ChosedResourceRequest.ChosedHotelResourceList = ChosedHotelResourceList;
        },
        // 问题，同 dealChosedHotel
        dealHotelInfos: function (json) {
            _.each(json.HotelInfos, function (hotel) {
                // 每个酒店只取第一个房间
                hotel.RoomInfos = [hotel.RoomInfos[0]];
            });
        },
        getChosedHotel: function (SegmentNumber) {
            //Segement 接口就写错了
            return _.find(ChosedResourceRequest.ChosedHotelResourceList, function (hotel) { return hotel.Segement == SegmentNumber });
        },
        setChosedHotel: function (SegmentNumber, data) {
            var index = _.indexOf(ChosedResourceRequest.ChosedHotelResourceList, this.getChosedHotel(SegmentNumber));
            ChosedResourceRequest.ChosedHotelResourceList[index] = data;
        },
        //机票
        getChosedFlight: function () {
            //return _.find();
            return ChosedResourceRequest.ChosedFlightResource;
        },
        setChosedFlight: function (ChosedFlightResource) {
            ChosedResourceRequest.ChosedFlightResource = ChosedFlightResource;
        },
        ///////////////////
        //////////////      Chosed end
        ///////////////// 









        ///////////////////
        //////////////      Segment begin
        ///////////////// 
        // 获取行程段信息
        getSegmentDatasById: function (SegmentID) {
            return _.find(_json.SegmentDatas, function (segment) { return segment.SegmentID == SegmentID });
        },
        // 获取行程段信息
        getSegmentDatasByNumber: function (SegmentNumber) {
            return _.find(_json.SegmentDatas, function (segment) { return segment.SegmentNumber == SegmentNumber });
        },
        ///////////////////
        //////////////      Segment end
        ///////////////// 





        ///////////////////
        //////////////      机票、酒店 begin
        ///////////////// 
        setHotelData: function (SegmentNumber, data) {
            var index = _.indexOf(_json.HotelInfos, this.getHotelData(SegmentNumber));
            if (index >= 0) {
                _json.HotelInfos[index] = data;
            }
        },
        getHotelData: function (SegmentNumber) {
            return _.find(_json.HotelInfos, function (hotel) { return hotel.SegmentNumber == SegmentNumber });
        },
        getHotelDefaultCompareMoney: function (index) {
            index = index || 0;
            //  如果酒店为0，就不需要比较房型价格了
            var defaultRoom = _json.HotelInfos && _json.HotelInfos[index] && _json.HotelInfos[index].RoomInfos[0];
            if (defaultRoom) {
                return defaultRoom.SelectedRoomNum * defaultRoom.RoomPrice;
            }
        },
        setFlightData: function (SegmentNumber, data) {
            var index = _.indexOf(_json.FlightInfos, this.getFlightData(SegmentNumber));
            if (index >= 0) {
                _json.FlightInfos[index] = data;
            }
        },
        getFlightData: function (SegmentNumber) {
            return _.find(_json.FlightInfos, function (flight) { return flight.TripSegmentNo == SegmentNumber });
        },
        ///////////////////
        //////////////      机票、酒店 end
        ///////////////// 





        ///////////////////
        //////////////      保险 begin
        ///////////////// 
        // 保险需要单独处理
        // 返回多个保险，但是只放进去一个，等弹出框的时候，再把所有保险都拿出来
        //		dealBaoxian: function (json) {
        //			var baoxianCatId = GV.app.detail.data.BaoxianCategoryID;
        //			baoxianResources = _.filter(json.OptionResources, function (option) { return option.CategoryID == baoxianCatId });
        //			// 需要改变保险的 TotalCount，以便模版显示 更多 按钮
        //			var baoxianCount = baoxianResources.length;
        //			_.each(baoxianResources, function (baoxian) {
        //				baoxian.TotalCount = baoxianCount
        //				//将保险选择的份数初始化为 0
        //				baoxian.UseCopies = 0;
        //			});

        //			if (baoxianResources.length > 1) {
        //				var otherResource = _.difference(json.OptionResources, baoxianResources);
        //				otherResource.unshift(baoxianResources[0]);

        //				json.OptionResources = otherResource;
        //				// 还有顺带过滤掉是否需要显示
        //				//json.OptionResources = _.filter(otherResource, function (resource) { return resource.IsDisplay });
        //			}
        //		},
        getResourceBaoxian: function () {
            return baoxianResources;
        },
        ///////////////////
        //////////////      保险 end
        ///////////////// 




        ///////////////////
        //////////////      单选项 begin
        ///////////////// 
        dealSingle: function (json) {
            // 小武连排序也不排，什么都不弄
            // 按照 SegmentNumber 从小到大排序
            json.SingleResources = _.sortBy(json.SingleResources, 'SegmentNumber');
            json.ChosedResourceRequest.ChosedSingleResourceList = _.sortBy(json.ChosedResourceRequest.ChosedSingleResourceList, 'SegmentID');

            var shownTraffics = [];
            _.each(json.SingleResources, _.bind(function (single) {
                // 22 --> 套餐，只有一个套餐则隐藏，多于一个套餐则显示一个（第一次只返回一个）且有按钮
                //single.IsShow = single.CategoryID != 22 || single.TotalCount > 1;
                single.IsShow = single.TotalCount > 1;
                single.TotalPrice = util.decimal(single.TotalCount * single.Price, 2);
                single.TitlteName = single.CategoryName;
                single.IsTitleShow = true;

                // TODO:这里的逻辑是不是有问题，应该是下面注释的这个判断才对？ -- 如果是这样的话，下面的对 traffic.IsTitleShow 的逻辑也要改了
                //if ((single.IsTraffic = _.indexOf(DetailData.data.TrafficCategoryID, single.CategoryID) >= 0) && single.IsShow) {
                if (single.IsTraffic = _.indexOf(DetailData.data.TrafficCategoryID, single.CategoryID) >= 0 && this.IsShow) {
                    shownTraffics.push(single);
                }

                // 小武：还有那个出发日期 知道怎么处理么 \n 用 segmentid 去行程段找到 出发日期 就可以了
                // 如果这里找不到，就是数据有问题
                var segmentData = this.getSegmentDatasById(single.SegmentID);
                single.DepartureDate = segmentData && segmentData.DepartureDate;
            }, this));

            _.each(shownTraffics, function (traffic, i) {
                traffic.TitlteName = '交通资源';
                traffic.IsTitleShow = i === 0;
                traffic.Rowspan = 1; //shownTraffics.length;
            });
        },
        ///////////////////
        //////////////      单选项 end
        ///////////////// 







        ///////////////////
        //////////////      可选项，看看每个ID，有几条
        ///////////////// 
        // 可选项通用的显示规则（包括保险）
        isOptionalShown: function (optional) {
            //return !((optional.IsChooseRequired) || !optional.IsDisplay);
            //return !optional.IsChooseRequired && optional.IsDisplay;
            // 改回原来的逻辑
            var notDisplay = (optional.IsChooseRequired == true && optional.IsChooseDate == false) || optional.IsDisplay == false;
            return !notDisplay;
        },
        getBaoxianData: function (ResourceID) {
            //var baoxian = _.filter(_json.OptionResources, function (optional) { return optional.IsBaoxian });
            return _.filter(_json.OptionResources, function (optional) { return optional.ResourceID == ResourceID })[0];
        },
        dealOptional: function (json) {
            //GV.app.detail.data.ProductPattenId = 4;
            var isOptionalShown = this.isOptionalShown;
            var baoxianCatId = GV.app.detail.data.BaoxianCategoryID;
            // 竟然后台的数据连顺序都不能保证，比如 如果有两个保险，至少这两个是挨着的，算了
            var tempOption = _.groupBy(json.OptionResources, function (optional) {
                return optional.CategoryID;
            });
            var AdultNum = json.BaseInfo.AdultNum;
            // 是否是【团队游】
            var isTour = _.indexOf([1, 3, 4], GV.app.detail.data.ProductPattenId);
            var optRes = []; //, baoxianShownCount = 0;
            // 每次ajax回来都要初始化数据
            baoxianResources = [];
            _.each(tempOption, function (optionalArr, catId) {
                var optLen = optionalArr.length;

                // 全部都降序排列
                optionalArr.sort(function (a1, a2) { return a1.SeqNum < a2.SeqNum })

                // 1. 保证顺序，同一个类别的要挨着
                // 2. 同一个类别只能显示一个 title
                _.each(optionalArr, function (optional, i) {
                    optional.ThisCategoryTotalCount = optLen;
                    optional.Rowspan = 1; //optLen;
                    // if((IsChooseRequired == true && IsChooseDate == false) || IsDisplay == false) 则不显示
                    // 弹出框（只有保险有弹出框）内的只需判断这一个就行了。不过资源框还要做额外的判断（在下面）
                    //optional.IsPopupShow = optional.IsShow = !((optional.IsChooseRequired && !optional.IsChooseDate) || !optional.IsDisplay);
                    // IsChooseRequired --意思：可选必选项-- 不显示
                    optional.IsPopupShow = optional.IsShow = isOptionalShown(optional);
                    // 现在显示规则有变化，每个类型的产品都有可能会不显示（IsShow === false）,
                    // 因此 Title 的显示要在后面才能判断
                    //optional.IsShowTitle = i === 0;
                    var firstInventory = optional.Inventory[0];
                    // 是否是【单房差】
                    var isDanfangcha = optional.CategoryID == 30;

                    // 5.【小武】 如果 IsChooseDate === true，且可选日期大于1，则显示日期的可下拉状态，否则，显示 “--”
                    optional.IsDropdownDateShow = optional.Inventory.length > 1 && optional.IsChooseDate;
                    optional.OnlyDate = optional.IsDropdownDateShow ? '' : optional.Inventory[0].Date;

                    // 处理默认值不在可选范围内的问题
                    _.each(optional.Inventory, function (inventory) {
                        // 2014-02-27 现在的逻辑改为这样（郁添、夏洪波）：
                        /**
                        * 可选范围是：从Min 到 Max 按 step 显示
                        * 同时，再加一个：Math.min(0, Default, Min)，如果 Min 已经是 0 了，自然不用加了
                        
                        */
                        /*
                        【规则二】：
                        2014-03-06 夏洪波：
                        如果是团队游：1,3,4
                        如果有单房差：30
                        如果成人数是奇数
                        单房差不能选择0份
                        */
                        // -------------- 2014-03-10 规则二，先注释
                        //var rule2 = AdultNum % 2 && isTour && isDanfangcha;
                        //if (rule2) {
                        //    var min = Math.min(inventory.MinQuantity, inventory.DefaultQuantity);
                        //    if (min == 0) {
                        //        min = Math.max(inventory.MinQuantity, inventory.DefaultQuantity);
                        //    }
                        //    if (min == 0) {
                        //        min = min + inventory.StepQuantity;
                        //    }
                        //    inventory.MinQuantity = min;
                        //    if (inventory.DefaultQuantity == 0) {
                        //        inventory.DefaultQuantity = min;
                        //    }
                        //}
                        //else {
                        inventory.MinQuantity = Math.min(inventory.MinQuantity, inventory.DefaultQuantity);
                        //}
                        //var realMin = Math.min(0, inventory.DefaultQuantity, inventory.MinQuantity);
                        //// 比最小值还小的值
                        //if (realMin != inventory.MinQuantity) inventory.moreMinQuantity = realMin;

                        // 【规则一】：非必选的可选项，最小值必须为 0
                        var rule1 = !optional.IsChooseRequired;
                        // 【规则1】 不能覆盖【规则2】
                        //if (rule1 && !rule2) {
                        if (rule1) {
                            inventory.MinQuantity = 0;
                        }
                        // 小武说判断最大值，会有副作用，那就注释掉
                        //inventory.MaxQuantity = Math.max(inventory.MaxQuantity, inventory.DefaultQuantity);
                    });
                    optional.TotalPrice = util.decimal(firstInventory.DefaultQuantity * firstInventory.Price, 2);

                    // 保险需要一些特殊处理
                    if (optional.CategoryID == baoxianCatId) {
                        //将保险选择的份数初始化为 0
                        optional.IsBaoxian = true;
                        //optional.UseCopies = 0;
                        baoxianResources.push(optional);

                        // 保险，只显示第一个
                        /*optional.Rowspan = 1;
                        if (i !== 0) {
                        optional.IsShow = false;
                        }*/
                        // 保险，默认值大于0的都显示
                        if (optional.Inventory[0].DefaultQuantity > 0) {
                            //baoxianShownCount += 1;
                        }
                        // 跟小武确认后：【只能根据条件继续把保险 仍然显示的判断为 隐藏，而不能把 已经隐藏的 判断为 显示】
                        // 保险：在【可选项通用规则的基础上】增加这个规则
                        else {
                            optional.IsShow = false;
                        }
                    }
                    else {
                        optRes.push(optional);
                    }

                });

                //if (catId == baoxianCatID) {
                //	// 保险需要合并的数量
                //	var shownBaoxian = _.filter(optionalArr, function (baoxian) { return baoxian.IsShow }),
                //		baoxianShownCount = shownBaoxian.length;
                //	_.each(shownBaoxian, function (baoxian, i) {
                //		baoxian.Rowspan = baoxianShownCount;
                //		baoxian.IsShowTitle = i === 0;
                //	});
                //}
                //else {
                // 资源框中显示的
                var shownCategory_in_resourceBox = _.filter(optionalArr, function (optional) { return optional.IsShow }),
                // 弹出框中显示的
                    shownCategory_in_popup = _.filter(optionalArr, function (optional) { return optional.IsPopupShow });
                _.each(optionalArr, function (optional) {
                    // 此类别在资源框中显示的数量
                    optional.ThisCategory_TotalShownCount_in_resourceBox = shownCategory_in_resourceBox.length;
                    // 此类别在弹出框中显示的数量
                    optional.ThisCategory_TotalShownCount_in_popup = shownCategory_in_popup.length;
                });
                _.each(shownCategory_in_resourceBox, function (optional, i) {
                    optional.Rowspan = 1; //categoryShownCount;
                    optional.IsShowTitle = i === 0;
                });
                // 保险至少要显示一个，排序后， SeqNum 最大的显示出来
                if (catId == baoxianCatId) {
                    if (shownCategory_in_resourceBox.length === 0) {
                        // 首先遵从可选项的显示规则，同时，如果保险一个都没有显示，
                        // 就从通过可选项规则的那些里面显示第一个（即可选项判断之后的显示判断规则不是必须的）。
                        var left = _.filter(optionalArr, function (optional) { return isOptionalShown(optional) });
                        var baoxian = left[0]; //optionalArr[0];
                        if (baoxian) {
                            baoxian.IsShow = true;
                            baoxian.IsShowTitle = true;
                            baoxian.Rowspan = 1;
                        }
                    }
                }
                //}
            });
            // 保险放在最前面
            json.OptionResources = baoxianResources.concat(optRes);

            // 可选项的每一项，有多个 Inventery，处理默认选择哪一个
            _.each(json.OptionResources, function (optional) {
                // 默认为 0
                optional.useInventoryIndex = 0;
                var optionalInChoosedResource = _.find(json.ChosedResourceRequest.ChosedOptionResourceList, function (optionalChoosed) { return optionalChoosed.ProductID == optional.ResourceID });
                if (optionalInChoosedResource) {
                    if (optional.Inventory) {
                        for (var i = 0, len = optional.Inventory.length; i < len; i++) {
                            if (util.isSameDay(optional.Inventory[i].Date, optionalInChoosedResource.UseDate)) break;
                        }
                        optional.useInventoryIndex = i;
                    }
                }
            });

            //判断是否没有选择保险
            json.needBaoxianNotice = false;
            if(baoxianResources.length){
                var _i = 0;
                _.each(baoxianResources, function(optional){
                    if(optional.Inventory[optional.useInventoryIndex].DefaultQuantity != 0) _i++;
                });
                if(_i == 0){
                    json.needBaoxianNotice = true;
                };
            }
        },



        ///////////////////
        //////////////      机票 begin
        ///////////////// 
        /*
        //------------------------------------------------原始数据
        FlightInfos: [
        // 行程段1，有两个换乘
        {
        TripSegmentNo: 1,
        // 这个数组肯定只有一条，小武确认的
        // 
        Flights: [{
        ...
        // 这个数组才是最重要的，要根据这个，把他提取出来，直接放在FlightInfos数组下面
        // 
        FlightDetails:[
        // 行程段1 ， 换乘 1
        {
        FlightNo: "FM9537"
        DarkMorning: //到（上一层） Flights 中取数据
        NextDay: 0,//到（上一层） Flights 中取数据
        PlaneType：//到（上一层） Flights 中取数据
        ClassName：//到（上一层） Flights 中取数据
        经停（FlightStops）：//到（上一层） Flights 中取数据，有就显示“经停”两个字，并且弹窗这个字段的内容，如果没有，就不显示“经停”这两个字
        限制（Remarks）： //到（上一层） Flights 中取数据
        TripSegmentNo： //到（上两层） FlightInfos 中取数据
        HasMoreFlights： //到（上两层） FlightInfos 中取数据
        ..
        },
        // 行程段1 ， 换乘 2
        {
        FlightNo: "FM9538"
        ..
        }]
        }],
        HasMoreFlights: true
        },
        // 行程段2，无换乘
        {
        TripSegmentNo: 2,
        ...
                   
        }
        ]
        ===================> 处理后的数据
        FlightInfos:[
        // 行程段1 ， 换乘 1
        {
        TripSegmentNo: 1,
        FlightNo: "FM9537",
        ..
        HasMoreFlights:true,
        CSSHasBorder:false //计算得到，(非最后一个的行程段)的(最后一个换乘) 为 true
        HasTransfer: true //计算得到，只有 行程段内有换乘，且不是最后一个的换乘，为 true
        HasMoreButton: true //计算得到，只有 HasMoreFlight 为 true，且是第一个行程段的第一个换乘（或无换乘），为 true
        MoreButtonRowSpan: 当前这个转换后的数组数量，如果一项的 HasTransfer 为 true，以2的数量来累加（因为html结构中 中转  这一条也是一个 tr）
        },
        // 行程段1 ， 换乘 2
        {
        TripSegmentNo: 1,
        FlightNo: "FM9538"
        ..
        HasMoreFlights:true,
        CSSHasBorder:true
        },
        // 行程段2 ， 无换乘 
        {
        TripSegmentNo: 2,
        FlightNo: "..."
        ..
        HasMoreFlights:true,
        CSSHasBorder:false
        }
        ]
        */
        dealFlightInfo: function (json) {
            var FlightInfosDealed = [];
            var MoreButtonRowSpan = 0;
            if (!_.isEmpty(json.FlightInfos)) {
                // 行程段
                var flightInfoLen = json.FlightInfos.length;
                _.each(json.FlightInfos, function (flightInfo, i) {
                    // 这个数组(Flights)只有一项
                    _.each(flightInfo.Flights, function (flight) {
                        var flightDetailLen = flight.FlightDetails.length;
                        // 换乘
                        _.each(flight.FlightDetails, function (flightDetail, j) {

                            // 小武直接把【DarkMorning】和【NextDay】放到【flightDetail】了，就不用外层去取了
                            //flightDetail.DarkMorning = flight.DarkMorning;
                            //flightDetail.NextDay = flight.NextDay;

                            flightDetail.PlaneType = flightDetail.Aircraft;
                            flightDetail.ClassName = flightDetail.ClassName;
                            // peic: TransfersOrStops 这个不用了是吧？ 朱小武：恩
                            flightDetail.TransfersOrStops = flight.TransfersOrStops;
                            flightDetail.Remarks = flight.Remarks;
                            flightDetail.TripSegmentNo = flightInfo.TripSegmentNo;
                            flightDetail.HasMoreFlights = flightInfo.HasMoreFlights;

                            flightDetail.CSSHasBorder = (i != flightInfoLen - 1) && (j == flightDetailLen - 1);
                            flightDetail.HasTransfer = flightDetailLen > 1 && (j != flightDetailLen - 1);
                            flightDetail.HasMoreButton = flightInfo.HasMoreFlights && i == 0 && j == 0;
                            //flightDetail.MoreButtonRowSpan = 
                            flightDetail.DirectFlightChannel = flight.DirectFlightChannel;

                            // 这三个是单独的 tr，但是和其他的 flight 是并列的 tr。
                            // 理想的情况是：每一个 flight 都单独一个容器包裹最好了
                            // 这个数组的顺序和模板中的排列顺序保持一致
                            var trs = flightDetail.trs = ['Flight', 'HasTransfer', 'DirectFlightChannel'];
                            if (flightDetail.CSSHasBorder) {
                                flightDetail.CSSBorderWhere = flightDetail[trs[2]] ? trs[2] : (flightDetail[trs[1]] ? trs[1] : trs[0]);
                            }

                            var thisFlightTrCount = 1;
                            if (flightDetail.HasTransfer) thisFlightTrCount++;
                            if (flightDetail.DirectFlightChannel) thisFlightTrCount++;
                            flightDetail.trCount = thisFlightTrCount;

                            FlightInfosDealed.push(flightDetail);
                        });
                    });
                });
                _.each(FlightInfosDealed, function (flightDetail) {
                    MoreButtonRowSpan += flightDetail.trCount; //(flightDetail.HasTransfer ? 2 : 1);
                });
                if (FlightInfosDealed.length) FlightInfosDealed[0].MoreButtonRowSpan = MoreButtonRowSpan;

                //直连机票，确保 ChosedResourceRequest 中有被设置过 DirectFlightChannel
                _.each(json.FlightInfos, function (flightInfo, i) {
                    var TripSegment = json.ChosedResourceRequest.ChosedFlightResource.TripSegments[i];
                    // Flights 数组只有一项
                    if (!_.isUndefined(flightInfo.Flights[0].DirectFlightChannel) && _.isUndefined(TripSegment.DirectFlightChannel)) {
                        TripSegment.DirectFlightChannel = flightInfo.Flights[0].DirectFlightChannel;
                    }
                });
            }
            json.FlightInfosDealed = FlightInfosDealed;
            //console.log(window.a = FlightInfosDealed);
        },
        ///////////////////
        //////////////      机票 end
        ///////////////// 


        ///////////////////
        //////////////      酒店 begin
        ///////////////// 
        //<del>初始选择第一个酒店的第一个房间</dev>
        // 初始选择每个行程段的酒店的第一个房间
        dealHotelInfo: function (json) {
            //			if (json.HotelInfos[0] && json.HotelInfos[0].RoomInfos[0]) {
            //				json.HotelInfos[0].RoomInfos[0].Select = true;
            //			}
            if (json.HotelInfos) {
                _.each(json.HotelInfos, function (hotel) {
                    hotel.RoomInfos[0].Select = true;
                });
            }
            // 处理最大值最小值
            if (json.HotelInfos) {
                _.each(json.HotelInfos, function (hotel) {
                    _.each(hotel.RoomInfos, function (room) {
                        room.MinRoom = Math.min(room.MinRoom, room.SelectedRoomNum);
                        // 小武说判断最大值，会有副作用，那就注释掉
                        //room.MaxRoom = Math.max(room.MaxRoom, room.SelectedRoomNum);
                    });
                });
            }
        },
        ///////////////////
        //////////////      酒店 end
        ///////////////// 


        ///////////////////
        //////////////      可选资源处理 begin
        ///////////////// 
        dealResource: function (json) {
            json.IsShowHotel = !_.isEmpty(json.HotelInfos);
            json.IsShowFlight = !_.isEmpty(json.FlightInfos);
            // 可选资源至少有一个显示
            json.IsShowSingleOptionalTable = (!_.isEmpty(json.OptionResources) && _.some(json.OptionResources, function (optional) { return optional.IsShow }))
            // 或 单选资源至少有一个显示
                                            || (!_.isEmpty(json.SingleResources) && _.some(json.SingleResources, function (single) { return single.IsShow }));
            // 酒店不为空 或 机票不为空 或 有单选可选
            json.IsShowResource = json.IsShowHotel || json.IsShowFlight || json.IsShowSingleOptionalTable;
        },
        ///////////////////
        //////////////      可选资源处理 end
        ///////////////// 



        getOptionalRequestData: function (AdultQuantity, ChildQuantity, barTopProductID) {
            var SegmentDatas = _json.SegmentDatas,
                first = SegmentDatas[0],
		        last = SegmentDatas[SegmentDatas.length - 1],
                data = {
                    "ProductID": DetailData.data.IsTourGroupProduct ? barTopProductID : DetailData.data.ProductID,
                    "DepartureCityID": first.DepartureCityID,
                    "DepartureDate": first.DepartureDate,
                    "ReturnDate": last.DepartureDate,
                    "LodgingDays": _.reduce(SegmentDatas, function (memo, ele) { return memo + ele.LodgingDays }, 0),
                    // 小武说，天数相减再加 1
                    "TravelDays": (UtilCalendar.strToDate(util.dtdate(last.DepartureDate)) - UtilCalendar.strToDate(util.dtdate(first.DepartureDate))) / 86400000 + 1,
                    "ResourceCategory": 0,
                    "AdultQuantity": AdultQuantity,
                    "ChildQuantity": ChildQuantity,
                    "ReturnCount": 9999,
                    "ResourceRelations": null,
                    "IsSuperOrder": DetailData.isSuperOrder
                };
            return data;
        },



        ///////////////////
        //////////////      大日历 数据 begin
        ///////////////// 
        calendar: {
            bigCalendar: null, //GV.app.detail.initData.bigCalendar,
            //ajaxError: false,
            //loadData: function () {
            //	$.ajax({
            //		type: 'GET',
            //		url: GV.app.detail.api.getCalendar,
            //		data: {
            //			ProductID: DetailData.data.ProductID
            //			, StartCity: DetailData.data.StartCityID
            //			, SalesCity: DetailData.data.SalesCity
            //			, MinPrice: DetailData.bigCalendarParemeter.minPrice
            //			, EffectDate: util.dtdate(DetailData.bigCalendarParemeter.effectDate)
            //			, ExpireDate: util.dtdate(DetailData.bigCalendarParemeter.expireDate)
            //		}
            //	})
            //	.done(_.bind(function (json) {
            //		if (_.isString(json)) json = $.parseJSON(json);
            //		if (!json.data || !json.data.bigCalendar) {
            //			this.ajaxError = true;
            //			//alert('日历返回的数据有错误，不带这么玩的');
            //			return;
            //		}
            //		var bigCalendar = this.bigCalendar = json.data.bigCalendar;

            //		//festivalsDate":[{"Date": "{0}", "Name": "{1}", "Type": {2}, "OnlineShow": {3}, "OfflineShow": {4}, "OrderShow": {5} }]
            //		if (bigCalendar.festivalsDate) {
            //			_.each(bigCalendar.festivalsDate, function (festival) {
            //				if (festival.OnlineShow) {
            //					var dateInAvailableDate = _.find(bigCalendar.availableDate, function (d) { return d.Date == festival.Date });
            //					dateInAvailableDate && (dateInAvailableDate.IsShowFestival = true);
            //				}
            //			});
            //		}

            //		this.init();

            //		GV.emit('calendar-data-loaded');
            //	}, this))
            //	.fail(function () {
            //		'';
            //	});
            //},
            dealData: function () {
                var bigCalendar = this.bigCalendar;
                //festivalsDate":[{"Date": "{0}", "Name": "{1}", "Type": {2}, "OnlineShow": {3}, "OfflineShow": {4}, "OrderShow": {5} }]
                if (bigCalendar.festivalsDate) {
                    _.each(bigCalendar.festivalsDate, function (festival) {
                        if (festival.OnlineShow) {
                            var dateInAvailableDate = _.find(bigCalendar.availableDate, function (d) { return d.Date == festival.Date });
                            if (dateInAvailableDate) {
                                dateInAvailableDate.IsShowFestival = true;
                                dateInAvailableDate.FestivalName = festival.Name;
                            }
                        }
                    });
                }
            },
            availableDate: {},
            tourGroupDate: {},
            riskRewardDate: {},
            init: function (data) {
                //if (this.ajaxError) return;

                //if (!this.bigCalendar) {
                //	this.loadData();
                //}
                //else {
                this.bigCalendar = data;

                this.dealData();

                this.bigCalendar.dateRange = _.map(this.bigCalendar.dateRange, function (date) {
                    return util.dtdate(date);
                });
                _.each(this.bigCalendar.availableDate, _.bind(function (d) {
                    this.availableDate[d.Date] = d;
                }, this));
                //}

                if (DetailData.data.IsTourGroupProduct) {  
                    this.tourGroupDate = _.filter(this.availableDate, function (d) {
                        return d.TourGroupCalenderInfo && d.TourGroupCalenderInfo.length;
                    });
                }

                if (DetailData.ClientSource == "Offline") {
                    this.riskRewardDate = _.filter(this.availableDate, function(d){
                        return ("RiskReward" in d) && d.RiskReward != -1;
                    });
                }
            },
            getMinPrice: function (date) {
                var date = this.getDateData(date);
                return (date && date.MinPrice) || 0;
            },
            getDateData: function (date) {
                return this.availableDate[util.dtdate(date)];
            },
            getAvailableDate: function () {
                return this.availableDate;
            },
            getBigCalendar: function () {
                return this.bigCalendar;
            },
            getFirstAvailableDate: function () {
                return this.bigCalendar.availableDate[0];
            },
            getTourGroupData: function (date) {
                var data = _.filter(this.tourGroupDate, function (d) {
                    return d.Date == date;
                });
                return (data && data[0]) || null;
            },
            getRiskRewardData: function (date) {
                var data = _.filter(this.riskRewardDate, function (d) {
                    return d.Date == date;
                });
                if (data && data[0]) return data[0].RiskReward;
                else return null;
            },
            getRiskRemarkData: function(date){
                var data = _.filter(this.riskRewardDate, function (d) {
                    return d.Date == date;
                });
                if (data && data[0]) return data[0].RiskRemark;
                else return null;
            }
        }
        ///////////////////
        //////////////      大日历 数据 end
        ///////////////// 
    };

    module.exports = dataManager;
});
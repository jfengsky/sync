/* 
* 详情页图片视频预览部分
*
* @doc http://www.peichao01.com/static_content/ctrip/html/ProductPreviewManager.html
*
* @author peic<peic@ctrip.com>
* 
*/
define(function (require, exports, module) {
	var $ = require("../../../lib/jquery"),
		_ = require("../../../lib/underscore"),
		inherit = require("../../../lib/inherit"),
		EventEmitter = require("Modules/EventEmitter");

	var evt = new EventEmitter();

	var PREVIEW_TYPE = {
		IMAGE: 'image',
		VIDEO: 'video'
	};
	var CHANGE_TYPE = {
		AUTO: 'auto',
		PREVIEW_CLICK: 'preview_click',
		LIST_CLICK: 'list_click'
	};
	// 大图是在 Gallery 中的索引
	var indexOfBigInGallery = 0;

	/*
	* @method 
	*
	* @event 'change-list'(nowIndex)
	* @event 'change-preview'(nowIndex, previewType[ image | video ], changeType{})
	*/
	var PreviewList = inherit({
		/*
		* @param {jQueryNode} nodeWrap
		* @param {Number} countImage
		*
		* @param {String} [ classPicCurrent ]
		* @param {Number} [ interval ]
		*/
		__constructor: function (options) {
			this.options = _.extend({
				classPicCurrent: 'current',
				interval: 4000
			}, options);
			var node = this.nodeWrap = this.options.nodeWrap;

			this.nodeListWrap = node.find('.small_photo_wrap>ul');
			this.nodeLists = this.nodeListWrap.find('li');
			this.nodePreviews = this.nodeListWrap.find('li a');

			this.nodeListNextBtn = node.find('.small_photo_control .next');
			this.nodeListPrevBtn = node.find('.small_photo_control .prev');
			this.nextBtnDisabled = false;
			this.prevBtnDisabled = false;

			this.countList = this.nodeLists.length;
			this.countPreview = this.nodePreviews.length;
			this.countPreviewEachList = 5; //this.nodeLists.eq(0).find('a').length;
			this.widthEachList = 82 + 10; //width + marging-right
			this.nowPreviewListIndex = 0;
			this.nowPreviewPicIndex = 0;

			// 目前循环播放等只用到图片，视频直接跳过
			this.countTotalUsage = this.options.countImage; //this.countPreview

			this.setTimeoutId = null;
			this.isPlaying = false;

			this._checkBtnPermission();

			_.bindAll(this, 'onPreviewClick', 'onNextClick', 'onPrevClick');
			this.nodeLists.on('click', 'a', this.onPreviewClick);
			this.nodeListNextBtn.on('click', this.onNextClick);
			this.nodeListPrevBtn.on('click', this.onPrevClick);
		},
		_checkBtnPermission: function () {
			if (this.countList === 1) {
				this._swtichBtnPermission('prev', false)._swtichBtnPermission('next', false);
			}
			else {
				this._swtichBtnPermission('prev', this.nowPreviewListIndex !== 0)
					._swtichBtnPermission('next', this.nowPreviewListIndex !== this.countList - 1);
			}
			return this;
		},
		/*
		* @param {String} btn[next | prev]
		* @param {Boolean} disable
		*/
		_swtichBtnPermission: function (btn, enable) {
			if (btn == 'next') {
				this.nextBtnDisabled = !enable;
				this.nodeListNextBtn[enable ? 'removeClass' : 'addClass']('next_disable');
			} else if (btn == 'prev') {
				this.prevBtnDisabled = !enable;
				this.nodeListPrevBtn[enable ? 'removeClass' : 'addClass']('prev_disable');
			}
			return this;
		},
		changeList: function (index) {
			if (index === this.nowPreviewListIndex || index < 0 || index >= this.countList) return this;

			this.nodeListWrap.stop(true).animate({ left: -(index * this.widthEachList) + 'px' });

			this.nowPreviewListIndex = index;

			this._checkBtnPermission();

			this.emit('change-list', index);
			return this;
		},
		nextList: function () {
			var next = this.nowPreviewListIndex === (this.countList - 1) ? 0 : (this.nowPreviewListIndex + 1);
			return this.changeList(next);
		},
		prevList: function () {
			var prev = this.nowPreviewListIndex === 0 ? (this.countList - 1) : (this.nowPreviewListIndex - 1);
			return this.changeList(prev);
		},
		_getTotalCount: function (changeType) {
			// 在列表中点击，可以进入任何地方。
			// 而预览区进来的则只能使用【可用范围"countTotalUsage" -- 根据设定，范围为：全部或只有图片】
			var totalCount = changeType === CHANGE_TYPE.LIST_CLICK ? this.countPreview : this.countTotalUsage;
			return totalCount;
		},
		changePic: function (index, changeType) {
			if (index === this.nowPreviewPicIndex || index < 0 || index >= this._getTotalCount(changeType)) return this;

			// pic
			var klass = this.options.classPicCurrent;
			this.nodePreviews.eq(this.nowPreviewPicIndex).removeClass(klass);
			this.nodePreviews.eq(index).addClass(klass);

			this.nowPreviewPicIndex = index;

			// list
			if (this.countList > 1) {
				var listIndexWithThePicIndex = Math.floor(index / this.countPreviewEachList);
				this.changeList(listIndexWithThePicIndex);
			}

			this.emit('change-preview', index, this.nodePreviews.eq(index).data('type'), changeType);
			return this;
		},
		nextPic: function (changeType) {
			var next = this.nowPreviewPicIndex === (this._getTotalCount(changeType) - 1) ? 0 : (this.nowPreviewPicIndex + 1);
			return this.changePic(next, changeType);
		},
		prevPic: function (changeType) {
			var prev = this.nowPreviewPicIndex === 0 ? (this._getTotalCount(changeType) - 1) : (this.nowPreviewPicIndex - 1);
			return this.changePic(prev, changeType);
		},
		play: function () {
			if (this.isPlaying) return this;

			this.isPlaying = true;

			var timeout = this.options.interval;
			this.setTimeoutId = setTimeout(_.bind(function () {
				this.nextPic(CHANGE_TYPE.AUTO);
				this.setTimeoutId = setTimeout(_.bind(arguments.callee, this), timeout);
			}, this), timeout);

			return this;
		},
		stop: function () {
			if (!this.isPlaying) return this;

			this.isPlaying = false;
			clearTimeout(this.setTimeoutId);

			return this;
		},
		onPreviewClick: function (e) {
			var a = $(e.currentTarget);
			var liIndex = a.parents('li').index();
			var index = a.index() + liIndex * this.countPreviewEachList;
			this.changePic(index, CHANGE_TYPE.LIST_CLICK);
		},
		onNextClick: function (e) {
			// 目前不允许循环点击，但是自动播放可以循环，不通过这个函数
			if (this.nextBtnDisabled) return;

			this.nextList();
		},
		onPrevClick: function (e) {
			if (this.prevBtnDisabled) return;

			this.prevList();
		}
	});
	EventEmitter.mixTo(PreviewList);


	var tplPicIntro = Handlebars.compile('{{nowIndex}}/{{total}} {{ImageDesc}}');
	/*
	* @method show()
	* @method hide()
	*/
	var PreviewBase = inherit({
		/*
		* @param {jQueryNode} nodeWrap
		*/
		__constructor: function (options) {
			this.options = _.extend({}, options);
			this.nodeWrap = this.options.nodeWrap;
		},
		hide: function () {
			this.nodeWrap.hide();
			return this;
		},
		show: function () {
			this.nodeWrap.show();
			return this;
		}
	});
	EventEmitter.mixTo(PreviewBase);
	/*
	*
	* one pic, not a pic manager
	* 
	* @method changePic()
	*
	* @event 'play'()
	* @event 'stop'()
	* @event 'next'()
	* @event 'prev'()
	* 
	* @event 'change'(index, changeType)
	*/
	var PicView = inherit(PreviewBase, {
		/*
		* @param {jQueryNode} nodeWrap
		* @param {Number} totalCount
		*/
		__constructor: function (options) {
			this.__base(options);
			this.type = 'image';

			var node = this.nodeWrap;

			this.nodePic = node.find('>img');
			this.nodeIntro = node.find('.photo_name>p');

			this.nodeBtnNext = node.find('.next');
			this.nodeBtnPrev = node.find('.prev');
			this.nodeBtnStop = node.find('.stop');
			this.nodeBtnPlay = node.find('.play');

			this.shouldPlay = this.nodeBtnPlay.is(':hidden');

			_.bindAll(this, 'onNextClick', 'onPrevClick', 'onPlayClick', 'onStopClick');
			this.nodeBtnNext.on('click', this.onNextClick);
			this.nodeBtnPrev.on('click', this.onPrevClick);
			this.nodeBtnPlay.on('click', this.onPlayClick);
			this.nodeBtnStop.on('click', this.onStopClick);
		},
		/*
		* @param nowIndex
		* @param ImageDesc
		* @param Url
		*/
		changePic: function (data, changeType) {
			data.total = this.options.totalCount;
			data.nowIndex += 1;

			this.nodePic.attr('src', data.Url).attr('alt', data.ImageDesc);
			this.nodeIntro.html(tplPicIntro(data));

			return this.emit('change', this.nowIndex, changeType);
		},
		switchPlayBtn: function (play) {
			if (play) {
				this.nodeBtnPlay.hide();
				this.nodeBtnStop.show();
			}
			else {
				this.nodeBtnPlay.show();
				this.nodeBtnStop.hide();
			}
			return this;
		},
		onNextClick: function (e) {
			this.emit('next');
		},
		onPrevClick: function (e) {
			this.emit('prev');
		},
		onPlayClick: function (e) {
			this.switchPlayBtn(true);
			evt.emit('play');
		},
		onStopClick: function (e) {
			this.switchPlayBtn(false);
			evt.emit('stop');
		}
	});


	/*
	* 
	* one pic, not a pic manager
	*
	* @method changeVideo
	* 
	* @event 'change'(index, changeType)
	*/
	var VideoView = inherit(PreviewBase, {
		/*
		* @param {jQueryNode} nodeWrap
		*/
		__constructor: function (options) {
			this.__base(options);
			this.type = 'video';
		},
		/*
		* @param Url 
		* @param nowIndex
		*/
		changeVideo: function (data, changeType) {
			this.nowIndex = data.nowIndex;
			var html;
			if (data.Url.match(/^\s*<embed/)) {
				//"<embed src="http://player.youku.com/player.php/sid/123/partnerid/XMTY2OA==/v.swf" quality="high" width="100%" height="100%" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" wmode="transparent" allowFullScreen="true" ></embed>"
				html = data.Url;
			}
			else{
				html = '<embed src="' + data.Url + '" quality="high" width="100%" height="100%" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" wmode="transparent">'
			}
			this.nodeWrap.html(html);
			//this.nodeVideo.attr('src', data.url);
			return this.emit('change', this.nowIndex, changeType);
		}
	});



	var ProductPreviewManager = inherit({
		/*
		* @param {jQueryNode} nodeWrap
		* @param {Object} data
		* @param {Number} countImage
		*/
		__constructor: function (options) {
			this.options = _.extend({}, options);
			var node = this.nodeWrap = this.options.nodeWrap;

			this.list = new PreviewList({
				nodeWrap: node.find('.attraction_photo_small'),
				countImage: options.countImage
			});

			this.pic = new PicView({
				nodeWrap: node.find('#js-preview-photo'),
				totalCount: this.list.countTotalUsage
			});

			this.video = new VideoView({
				nodeWrap: node.find('#js-preview-video')
				//, totalCount: this.list.countPreview
			});

			_.bindAll(this, 'onListPreviewChange', 'onEvtPlay', 'onEvtStop', 'onPicNext', 'onPicPrev');
			this.list.on('change-preview', this.onListPreviewChange);
			this.pic.on('next', this.onPicNext);
			this.pic.on('prev', this.onPicPrev);
			evt.on('play', this.onEvtPlay);
			evt.on('stop', this.onEvtStop);

			if (this.pic.shouldPlay) evt.emit('play');
		},
		onListPreviewChange: function (index, previewType, changeType) {
			var data = this.options.data[index];
			if (previewType == PREVIEW_TYPE.IMAGE) {

				// 到图片之后，如果是被自动暂停了，则自动恢复播放
				if (!this.list.isPlaying && this.isStopedAutomatically) {
					this.isStopedAutomatically = false;
					this.pic.switchPlayBtn(true);
					this.list.play();
				}

				this.video.hide();
				this.pic.show()
					.changePic({
						nowIndex: index,
						Url: data.Gallery[indexOfBigInGallery].Url,
						ImageDesc: data.ImageDesc
					});
			}
			else if (previewType == PREVIEW_TYPE.VIDEO) {

				// 到视频之后，自动停止播放
				if (this.list.isPlaying) {
					this.isStopedAutomatically = true;
					this.pic.switchPlayBtn(false);
					this.list.stop();
				}

				this.pic.hide();
				this.video.show()
					.changeVideo({
						nowIndex: index,
						Url: data.VideoUrl
					});

			}
		},
		onEvtPlay: function () {
			this.list.play();
		},
		onEvtStop: function () {
			this.list.stop();
		},
		onPicNext: function () {
			this.list.nextPic(CHANGE_TYPE.PREVIEW_CLICK);
		},
		onPicPrev: function () {
			this.list.prevPic(CHANGE_TYPE.PREVIEW_CLICK);
		}
	}, {
		PREVIEW_TYPE: PREVIEW_TYPE,
		CHANGE_TYPE: CHANGE_TYPE
	});
	EventEmitter.mixTo(ProductPreviewManager);

	module.exports = ProductPreviewManager;
});
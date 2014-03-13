/*
@Author peic@Ctrip.com
@Create 2013/11/19
@Update 2014/01/16

���ܣ�http://www.peichao01.com/static_content/doc/html/introduce-EventEmitter.html

Api�ο���http://nodejs.org/api/events.html
	����һ���෽����EventEmitter.mixTo()  �����캯����ʵ�����������¼�����
	���������¼�����removeAllListeners��, ��maxListeners��
	maxListeners������Ĭ��Ϊ�����ƣ�������10.

���Լ��� all �¼����μ� backbone

Instance methods:
	emitter.addListener(event, listener)
	emitter.on(event, listener)
	emitter.once(event, listener)
	emitter.removeListener(event, listener)
	emitter.removeAllListeners([event])
	emitter.setMaxListeners(number)
	emitter.listeners(event)
	emitter.emit(event, [arg1], [arg2], [...])
Class Methods:
	EventEmitter.listenerCount(emitter, event)
	EventEmitter.mixTo(instanceOrConstructor)
Event:
	'newListener'(event, listener)
	'removeListener'(event, listener)
	'removeAllListeners'(event)
	'maxListeners'(event, listener)
*/
define(function (require, exports, module) {

    var indexOf = function (arr, obj) {
        if (Array.prototype.indexOf) return arr.indexOf(obj);
        for (var i = 0, len = arr; i < len; i++) if (arr[i] === obj) return i;
        return -1;
    };
    var log = function (msg) { try { console.log(msg) } catch (e) { } };
    var notice = function (msg) { log('[NOTICE] ' + msg) };

    function EventEmitter() { }

    var listenersName = '__cacheListeners__',
		maxName = '__maxListener__',
		innerEvent = ['newListener', 'maxListeners', 'removeListener', 'removeAllListeners'];

    var methods = {
        addListener: function (event, listener) {
            var caches = this[listenersName] || (this[listenersName] = {}),
				cache = caches[event] || (caches[event] = []);
            if (!this[maxName] || cache.length < this[maxName]) {
                cache.push(listener);
                this.emit('newListener', event, listener);
            } else {
                this.emit('maxListeners', event, listener);
            }
            return this;
        },
        once: function (event, listener) {
            this.addListener(event, cb);
            var self = this;
            function cb(args) {
                listener.apply(null, [].slice.call(arguments, 0));
                self.removeListener(event, cb);
            }
            return this;
        },
        removeListener: function (event, listener) {
            var caches, cache, index;
            if ((caches = this[listenersName]) && (cache = caches[event]) && (index = indexOf(cache, listener)) >= 0) {
                cache.splice(index, 1);
                this.emit('removeListener', event, listener);
            }
            return this;
        },
        removeAllListeners: function (event) {
            //emit first, or the listeners on this event will be removed too.
            this.emit('removeAllListeners', event);
            if (event) this[listenersName] && (this[listenersName][event] = []);
            else this[listenersName] = {};
            return this;
        },
        setMaxListeners: function (n) {
            if (typeof n === 'number') this[maxName] = n;
            return this;
        },
        listeners: function (event) {
            return (this[listenersName] && this[listenersName][event]) || [];
        },
        emit: function (event, arg1, arg2__) {
            var caches, cache, allCache, args, i, ii, isInnerEvent;
            args = [].slice.call(arguments, 1);
            if (event == 'all') notice('Are you sure you want to emit("all")?');
            if ((caches = this[listenersName]) && (cache = caches[event]) && (ii = cache.length)) {
                for (i = 0; i < ii; i++) cache[i].apply(this, args);
            }
            if (caches && (allCache = caches.all) && (ii = allCache.length)) {
                if (!(isInnerEvent = indexOf(innerEvent, event) >= 0)) {
                    args.unshift(event);
                    for (i = 0; i < ii; i++) allCache[i].apply(this, args);
                }
            }
            return this;
        }
    };
    methods.on = methods.addListener;

    var classMethods = {
        listenerCount: function (emitter, event) {
            return emitter.listeners(event).length;
        },
        mixTo: function (insOrCons) {
            var isFunc = typeof insOrCons === 'function',
				reiver = isFunc ? insOrCons.prototype : insOrCons;
            if (isFunc)
                for (var key in classMethods)
                    if (classMethods.hasOwnProperty(key)) insOrCons[key] = classMethods[key];
            for (var key in methods)
                if (methods.hasOwnProperty(key)) reiver[key] = methods[key];
            return insOrCons;
        }
    };
    classMethods.mixTo(EventEmitter);

    // add event ability to the Global GV object.
    EventEmitter.mixTo(this.GV || (this.GV = {}));

    window.EventEmitter = EventEmitter;

    module.exports = EventEmitter;
});

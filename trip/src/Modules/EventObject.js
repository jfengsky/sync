define(function (require, exports, module) {
    var inherit = require('lib/inherit');
    var _ = require('underscore');

    var Event = inherit({
        __constructor: function (map) {
            this.isPreventDefault = false;
            this.isStopPropagation = false;
            _.extend(this, map);
        },
        preventDefault: function () {
            this.isPreventDefault = true;
            return this;
        },
        stopPropagation: function () {
            this.isStopPropagation = true;
            return this;
        }
    });
    module.exports = Event;
});
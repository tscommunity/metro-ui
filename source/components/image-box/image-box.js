/* global Metro */
(function(Metro, $) {
    'use strict';

    var ImageBoxDefaultConfig = {
        image: null,
        size: "cover",
        repeat: false,
        color: "transparent",
        attachment: "scroll",
        origin: "border",
        onImageBoxCreate: Metro.noop
    };

    Metro.imageBoxSetup = function (options) {
        ImageBoxDefaultConfig = $.extend({}, ImageBoxDefaultConfig, options);
    };

    if (typeof window["metroImageBoxSetup"] !== undefined) {
        Metro.imageBoxSetup(window["metroImageBoxSetup"]);
    }

    Metro.Component('image-box', {
        init: function( options, elem ) {
            this._super(elem, options, ImageBoxDefaultConfig, {
                // define instance vars here
            });
            return this;
        },

        _create: function(){
            this._createStructure();

            this._fireEvent('image-box-create');
        },

        _createStructure: function(){
            var element = this.element, o = this.options;

            element.addClass("image-box");
            element.css({
                backgroundImage: "url("+o.image+")",
                backgroundSize: o.size,
                backgroundRepeat: o.repeat,
                backgroundColor: o.color,
                backgroundAttachment: o.attachment,
                backgroundOrigin: o.origin
            });
        },

        _createEvents: function(){
        },

        changeAttribute: function(attr, newValue){
            var element = this.element;
            var attrName = attr.replace("data-", "");

            if (["image", "size", "repeat", "color", "attachment", "origin"].indexOf(attrName) > -1) {
                element.css("background-"+attrName, attrName === "image" ? "url("+newValue+")" : newValue);
            }
        },

        destroy: function(){
            return this.element;
        }
    });
}(Metro, m4q));
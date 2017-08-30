(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jQuery'],factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jQuery'));
    } else {
        root.uit  = root.uit || {};
        if (typeof Object.assign == 'function') {
            // console.log('assign');
            root.uit = Object.assign(root.uit, factory(jQuery));
        } else if (typeof jQuery != 'undefined') {
            // console.log('jQuery');
            root.uit = jQuery.extend(root.uit, factory(jQuery));
        } else {
            // console.log('none');
            var extend = function() {
                var extended = {};
                for(key in arguments) {
                    var argument = arguments[key];
                    for (prop in argument) {
                        if (Object.prototype.hasOwnProperty.call(argument, prop)) {
                            extended[prop] = argument[prop];
                        }
                    }
                }
                return extended;
            };
            root.uit = extend(root.uit, factory(jQuery));
        }
    }
})(this, function($) {
    'use strict';

    var uit = {};

    // layer popup
    var layer = uit.layer = function(origin, target, options) {
        if (!(this instanceof layer)) {
            return new layer(origin, target, options);
        }
        if (!origin) {
            return false;
        }
        if (!target) {
            target = '#layer'; // default target id
        }
        var defaults = {
            styleClass : '.layer', // layer popup style class
            closeButton : '.layer-btn-close',
            dimmedClickable : true,
            wrapper : '.layer-wrap',
            content : '.layer-content'
            // ajax : 'url' - optional
        };
        var c = this, o,
            $target = $(target),
            $wrapper, $content, $closeButton;

        // extend 조건식 - 추후 확정되면 수정
        if (typeof Object.assign != 'function') {
            o = $.extend(defaults, options);
        } else {
            o = Object.assign({}, defaults, options);
        }

        c.event = {
            clickClose : function() {
                $closeButton.on('click.clickClose', c.close);
                $target.focus(); // 접근성
                if (o.dimmedClickable) {
                    $wrapper.on('click.clickDimmed', c.close);
                    $content.on('click.clickDimmed', function(event) {
                        event.stopPropagation();
                    });
                }
            }
        };

        c.close = function() {
            $closeButton.off('click.clickClose');
            if (o.dimmedClickable) {
                $wrapper.off('click.clickDimmed');
                $content.off('click.clickDimmed');
            }
            $target.removeClass(o.styleClass);
            $(origin).focus(); // 접근성
        };

        c.init = function() {
            if ($target.length <= 0) {
                var contDiv = document.createElement('div');
                contDiv.id = target.replace('#','');
                contDiv.className = o.styleClass.replace('.','');
                contDiv.tabIndex = '0';
                document.body.appendChild(contDiv);
                $target = $(target);
            } else {
                $target.addClass(o.styleClass);
            }

            if ((o.ajax)&&($target.attr('data-ajax')!==o.ajax)) {
                $.ajax({
                    type: "GET",
                    url: o.ajax,
                    success: function(data) {
                        $target.html(data);
                        $target.attr('data-ajax', o.ajax);
                        $closeButton = $target.find(o.closeButton);
                        if (o.dimmedClickable) {
                            $wrapper = $target.find(o.wrapper);
                            $content = $target.find(o.content);
                        }
                        c.event.clickClose();
                    }
                });
            } else {
                $closeButton = $target.find(o.closeButton);
                if (o.dimmedClickable) {
                    $wrapper = $target.find(o.wrapper);
                    $content = $target.find(o.content);
                }
                c.event.clickClose();
            }
        };

        c.init();
    };

    return uit;
});

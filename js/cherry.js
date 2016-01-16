/**
 * Author Nazar Shershin
 * Version 1.0
 * 2016
 */

/*
 * Not editable params
 */
$.serviceOptions = {
    errorClass: 'error',
    type: ['field', 'popup', 'underfield'],
    actionsType: ['submit', 'click', 'change', 'select'],
    keyup_time: 300,
    valid_date_name: 'data-id',
    criticalError: {
        el_not_exist: 'Canvas element not exist',
        params_format: 'Wrong params. Please check documentation',
    },
    validPrevImgClass: 'valid_prev_img',
    elementAttribute: {min: 'data-min', max: 'data-max', in: 'data-in', ajax: 'data-ajax', file: 'data-file'},
}
var cherry = $c = {
    canvas: false,
    init: function (selector, options, callback) {
        var element = document.querySelector(selector);
        if (element)
        {
            this.canvas = element.getContext('2d');
            /* set options */
            if (options.width !== 'undefined') {
                this.canvas.width = options.width;
                //element.style.width = options.width + "px";
            }
            if (options.height !== 'undefined') {
                this.canvas.height = options.height;
                //element.style.height = options.height + "px";
            }
            /* return object*/
            return callback(this);
        } else {
            this.serviceError('el_not_exist');
        }
    },
    /**
     * FIGURES
     **/
    line: function (from, to, options) {
        var end;
        /* check from*/
        if (typeof from != 'object' || from.length != 2) {
            this.serviceError('params_format');return this;
        }
        /* check to */
        if (typeof to != 'object') {
            this.serviceError('params_format');return this;
        } else {
            if (typeof to[0] == 'object') {
                for (var i in to) {
                    if (to[i].length != 2) {
                        this.serviceError('params_format');return this;
                    }
                }
            } else {
                if (to.length != 2) {
                    this.serviceError('params_format');return this;
                }
            }
        }
        this.canvas.beginPath();
        this.canvas.moveTo(from[0], from[1]);
        if (typeof options == 'object') {
            if (options.color != undefined)
                this.canvas.strokeStyle = options.color;

            if (options.width != undefined)
                this.canvas.lineWidth = options.width;

            if (options.lineCap != undefined)
                this.canvas.lineCap = options.lineCap;

            if (options.lineJoin != undefined)
                this.canvas.lineJoin = options.lineJoin;
        }
        if (typeof to[0] == 'object') {
            for (var i in to) {
                end = to[i];
                this.canvas.lineTo(to[i][0], to[i][1]);
            }
        } else {
            end = to;
            this.canvas.lineTo(to[0], to[1]);
        }
        this.canvas.stroke();
        this.canvas.closePath();

        return {
            from: end,
            options: options,
            line: function (to, options) {
                return cherry.line(this.from, to, options !== 'undefined' ? options : this.options);
            }
        };
    },
    /*style*/
    color: function (color) {
        this.canvas.fillStyle = color;
    },
    /**************************************************************************
     ********************SERVICE ERROR***************************************** 
     **************************************************************************/
    service_errors: [],
    serviceError: function (key) {
        if ($.serviceOptions.criticalError[key] != undefined)
        {
            var mess = 'Error:: ' + $.serviceOptions.criticalError[key] + '!!!';
            this.service_errors.push(mess)
            return console.log(mess);
        } else {
            this.serviceError('bad_error_type');
        }
    }
}
var is_debug = true;
var p = function () {
    if (is_debug) {
        console.log.apply(console, arguments);
    }
}
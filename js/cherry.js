/**
 * Author Nazar Shershin
 * Version 1.0
 * 2016
 */

/*
 * Not editable params
 */
var loading = false;
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
})();
$.serviceOptions = {
    errorClass: 'error',
    type: ['field', 'popup', 'underfield'],
    actionsType: ['submit', 'click', 'change', 'select'],
    keyup_time: 300,
    valid_date_name: 'data-id',
    criticalError: {
        el_not_exist: 'Canvas element not exist',
        params_format: 'Wrong params. Please check documentation',
        must_be_string: 'This parameter have to be string',
        image_not_found: 'Image {path} not found'
    },
    validPrevImgClass: 'valid_prev_img',
    elementAttribute: {min: 'data-min', max: 'data-max', in: 'data-in', ajax: 'data-ajax', file: 'data-file'},
}
var cherry = $c = {
    options: {
        frame: true
    },
    images: {},
    canvas: false,
    frame_count: 0,
    per_min: 0,
    lastTime: false,
    init: function (selector, options, callback, game) {
        var element = document.querySelector(selector),
                $this = this;
        if (element)
        {
            $this.canvas = element.getContext('2d');

            /* set options */
            if (options.width !== undefined) {
                $this.canvas.width = options.width;
                //element.style.width = options.width + "px";
            }
            if (options.height !== undefined) {
                $this.canvas.height = options.height;
                //element.style.height = options.height + "px";
            }
            if (options.frame !== undefined) {
                $this.options.frame = options.frame;
            }
            //
            if (typeof game == 'object') {
                $this.__proto__ = game;
                if (game.resources != undefined && game.resources instanceof Object) {
                    for (var i in game.resources) {
                        _load(i, game.resources[i]);
                    }
                    function _load(url, path) {
                        if ($this.images[url]) {
                            return $this.images[url];
                        } else {
                            var img = new Image();
                            img.src = path;
                            img.onload = function () {
                                $this.images[url] = img;
                                if(ready())
                                    animate($this) 
                            };
                            $this.images[url] = false;
                        }
                    }
                    function ready(){
                        for (var i in game.resources) {
                            if(!$this.images[i])
                                return false;
                        }
                        return true;
                    }
                }else{
                    animate($this);
                }
            }
            
            /* return object*/
            var     last_show = 0,
                    lastFrame,
                    per_min = 0;
            function animate($this) {
                requestAnimFrame(function () {
                    $this.lastTime = Date.now();
                    /*clear place*/
                    $this.canvas.clearRect(0, 0, $this.canvas.width, $this.canvas.height);
                    $this.frame_count++;
                    if ($this.lastTime > last_show + 1000) {
                        last_show = $this.lastTime;
                        per_min = $this.frame_count - lastFrame;
                        lastFrame = $this.frame_count;
                    }
                    /* render callback*/
                    callback($this);
                    /* end - callback*/
                    if (per_min)
                        $this.text('Frames per sec: ' + per_min, {position: [20, 14]});

                    if ($this.options.frame)
                        return animate($this);

                });
            }
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
            this.serviceError('params_format');
            return this;
        }
        /* check to */
        if (typeof to != 'object') {
            this.serviceError('params_format');
            return this;
        } else {
            if (typeof to[0] == 'object') {
                for (var i in to) {
                    if (to[i].length != 2) {
                        this.serviceError('params_format');
                        return this;
                    }
                }
            } else {
                if (to.length != 2) {
                    this.serviceError('params_format');
                    return this;
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
            },
            remove: function () {
                return true;
            },
            grad: function () {
                return cherry.grad();
            }
        };
    },
    /*style*/
    color: function (color) {
        this.canvas.fillStyle = color;
    },
    grad: function () {
        var grad = this.canvas.createLinearGradient(123, 123, 1, 190);
        grad.addColor(0.4, 'blue');
        return grad;
    },
    /* rect */
    rect: function (x1, y1, x2, y2, options) {
        var condition = {
            fillStyle: this.canvas.fillStyle,
            lineWidth: this.canvas.lineWidth,
            strokeStyle: this.canvas.strokeStyle
        }
        this.canvas.beginPath();
        this.canvas.rect(x1, y1, x2, y2);
        if (typeof options == 'object') {
            if (options.background != undefined) {
                this.canvas.fillStyle = options.background;
                this.canvas.fill();
            }
            if (options.width != undefined)
                this.canvas.lineWidth = options.width;

            if (options.line != undefined) {
                this.canvas.strokeStyle = options.line;
                this.canvas.stroke();
            }

        }
        this.backCondition(condition);
        return {
            rect: function (x1, y1, x2, y2, options) {
                return cherry.rect(x1, y1, x2, y2, options);
            }
        }
    },
    /* TEXT */
    text: function (string, options) {
        var condition = {
            font: this.canvas.font,
            fillStyle: this.canvas.fillStyle,
            textAlign: this.canvas.textAlign,
            textBaseline: this.canvas.textBaseline,
        }
        var x, y = 0, old_font = this.canvas.font;
        if (typeof options == 'object') {
            if (options.position != undefined && typeof options.position == 'object') {
                x = options.position[0];
                y = options.position[1];
            }

            if (options.font != undefined)
                this.canvas.font = options.font;

            if (options.color != undefined)
                this.canvas.fillStyle = options.color;

            if (options.align != undefined)
                this.canvas.textAlign = options.align;
            /* alphabetic, top, hanging, middle, ideographic, bottom*/
            if (options.baseline != undefined)
                this.canvas.textBaseline = options.baseline;

        }
        if (typeof string != 'string') {
            this.serviceError('must_be_string');
        } else {
            if (options.stroke !== undefined && options.stroke)
                this.canvas.strokeText(string, x, y);
            else
                this.canvas.fillText(string, x, y);
        }
        this.backCondition(condition);
        return {
            text: function (string, options) {
                return cherry.text(string, options);
            }
        }

    },
    /* DRAW IMAGE */
    image: function (img, options) {
        if (typeof img != 'object') {
            this.serviceError('image_not_found',{path:img});
        } else {
            if (options != undefined) {
                if (options[0] instanceof Object && options.length == 3) {
                    cherry.canvas.drawImage(img, 
                        options[2][0], options[2][1], 
                        options[1][0], options[1][1],
                        options[0][0], options[0][1], 
                        options[1][0], options[1][1]);

                }else{
                    if (options.length == 2) {
                        this.canvas.drawImage(img, options[0], options[1]);
                    }
                    if (options.length == 4) {
                        this.canvas.drawImage(img, options[0], options[1], options[2], options[3]);
                    }
                    
                }
            } else {
                this.canvas.drawImage(img, 0, 0);
            }

        }

        return {
            image: function (options) {
                return cherry.image(img, options);
            }
        };
    },
    /* back to last condition */
    backCondition: function (condition) {
        for (var i in condition) {
            this.canvas[i] = condition[i];
        }
    },
    /**************************************************************************
     ********************SERVICE ERROR***************************************** 
     **************************************************************************/
    service_errors: [],
    serviceError: function (key, replaces) {
        if ($.serviceOptions.criticalError[key] != undefined)
        {
            var mess = 'Error:: ' + $.serviceOptions.criticalError[key] + '!!!';
            if(replaces instanceof Object){
                for(var key in replaces){
                    mess = mess.replace("{"+key+"}", replaces[key]);
                }
            }
            this.service_errors.push(mess)
            return console.log(mess);
        } else {
            this.serviceError('bad_error_type');
        }
    },
}
var is_debug = true;
var p = function () {
    if (is_debug) {
        console.log.apply(console, arguments);
    }
}
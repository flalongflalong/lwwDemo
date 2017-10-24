/**
 * Created by pc on 2017/10/16.
 */
!function (a, b) {
    "function" == typeof define && deifne.amd ? define(["jquery"], b) : a.Cus = b(a.$ || a.jQuery)
}(this, function (a)
{
    function k() {
        var a = document,
            b = a.getElementById("checkBrowserforIE"),
            c = 3,
            d = b ? b : a.createElement("div"),
            e = d.getElementsByTagName("i");
        for (d.id = "checkBrowserforIE"; d.innerHTML = "<!--[if gt IE " + ++c + "]><i></i><![endif]-->", e[0];);
        return d = null,
            c > 4 ? c : !1
    }
    var l = k(),
        m = l && 9 > l,
        n = {
            $: {}
        },
        s = {};
    a.extend(n,
        {
            defaultFn: s,
            setDefaultFn: function (b) {
                s = a.extend(!0, {}, s, b),
                    n.defaultFn = s
            },
            checkIE: !! window.ActiveXObject || "ActiveXObject" in window,
            ie8: m,
            //判断浏览器是否支持html5本地存储
            localStorageSupport:function () {
                return (('localStorage' in window) && window['localStorage'] !== null)
            },
            indexedDbInit:function (DBO) {
                window.indexedDB.open(DBO.name, 1).onsuccess = function(event) {
                    console.log('数据库打开成功!!!')
                    DBO.db = event.target;
                };
            },
            //创建下拉窗口
            createDropdownMenu:function(el,menuOpt) {
                el.attr('data-toggle','dropdown').addClass('dropdown-toggle');
                var h = '<ul class="dropdown-menu animated fadeInRight m-t-xs">';
                a.each(menuOpt,function (index,c) {
                    var co = c.openOption,ct = c.title,cc = c.class;
                    h += '<li '+ (cc?"class='"+cc+"'":"") +'>'+ (co?'<a '+ (!co.target?'class="J_menuItem"':"") + ' href="'+ co.url +'">'+ (ct?ct:"") +'</a>':'') +'</li>';
                })
                h += '</ul>';
                return $(h).insertAfter(el)
            },
            readData: function (b, c) {
                var d = c && jQuery.isFunction(c);
                if (!b) throw new Error("readData£º[" + b + "] is not exist !");
                "string" == typeof b ? a.ajax({
                    type: "get",
                    url: b,
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback: "get",
                    success: function (a) {
                        d && c(a)
                    },
                    error: function () {
                        alert("error")
                    }
                }) : "[object Array]" === Object.prototype.toString.apply(b) && d && c(b)
            }
        })
    var t = n;
    return window.ist = t,n
}),
    function () {
        function a(c, d) {
            this.target = $(c),
                this.$el = $(b).appendTo(this.target),
                this.$progressBar = this.$el.find(".progress-bar"),
                this.option = $.extend({}, a.defaults, d),
                this.valuenow = 0,
                this.init()
        }
        $.progress = function (b, c) {
            return new a(b, c)
        };
        var b = '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div>';
        a.defaults = {
            valuemin: 0,
            valuemax: 100
        },$.extend(a.prototype, {
            init: function () {
                this.$progressBar.attr({
                    "aria-valuemin": this.option.valuemin,
                    "aria-valuemax": this.option.valuemax,
                    "aria-valuenow": this.valuenow
                })
            },
            getValue: function () {
                return this.valuenow
            },
            setValue: function (a) {
                var b = 0;
                a = Number(a),
                    a >= this.option.valuemax ? (b = 1, this.valuenow = this.option.valuemax) : 0 > a ? (b = 0, this.valuenow = this.option.valuemin) : (b = a / this.option.valuemax, this.valuenow = a),
                    this.$progressBar.attr("aria-valuenow", this.valuenow).css("width", 100 * b + "%")
            }
        })
    }()
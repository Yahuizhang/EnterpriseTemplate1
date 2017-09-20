/**
 * Created by zhang on 2017/9/19.
 */
var wz = {
    //公共方法
    method: {
        //检测横屏竖屏
        //obj 自定义遮盖层对象
        orientation: function (obj) {
            //横屏旋转提示
            if (!wz.browser.versions.mobile) {//如果是PC端
                obj.hide();
            }
            else {//手机端
                if (window.orientation == 90 || window.orientation == -90) {//默认刷新页面是横屏时
                    obj.show();
                }
                window.onorientationchange = function () {
                    switch (window.orientation) {
                        case -90:
                            obj.show();
                            break;
                        case 90:
                            obj.show();
                            break;
                        case 0:
                            obj.hide();
                            break;
                        case 180:
                            obj.hide();
                            break;
                    }
                }
            }
        },
        //判断文本内容
        checkInfo: {
            IsNum: function (txt) {
                return !/\D/ig.test(txt);
            },
            IsPhone: function (txt) {
                return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(txt);
            },
            IsMail: function (txt) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(txt);
            },
            IsTel: function (txt) {
                return /^0[\d]{2,3}-[\d]{7,8}$/.test(txt);
            },
            IsUserName: function (txt) {
                return /^[a-z0-9_-]{3,16}$/.test(txt);
            },
            IsCN: function (txt) {
                return !/[^\u4E00-\u9FA5]/g.test(txt);
            },
            IsIDCard: function (txt) {
                return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(txt);
            },
            IsUrl: function (txt) {
                return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(txt);
            },
            IsImg: function (txt) {
                return /.(gif|jpg|jpeg|png|gif)$/.test(txt);
            },
            IsImgBase64: function (txt) {
                return /^data:image\/(jpg|jpeg|png|gif);base64,/.test(txt);
            }
        },
        //判断文本内容IsNum,IsPhone,IsMail,IsTel,UserName,email
        checkInfo1: function (txt) {
            return {
                IsNum: !/\D/ig.test(txt),
                IsPhone: /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(txt),
                IsMail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(txt),
                IsTel: /^0[\d]{2,3}-[\d]{7,8}$/.test(txt),
                IsUserName: /^[a-z0-9_-]{3,16}$/.test(txt),
                IsCN: /[^\u4E00-\u9FA5]/g.test(txt),
                IsIDCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(txt),
                IsUrl: /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(txt),
                IsImg: /.(gif|jpg|jpeg|png|gif)$/.test(txt),
                IsImgBase64: /^data:image\/(jpg|jpeg|png|gif);base64,/.test(txt)
            };
        },
        //字符长度限制，超出添加省略号
        //obj 对象
        //length 长度
        subString: function (obj, length) {
            $.each(obj, function (index) {
                if (obj.eq(index).text().length > length) {
                    obj.eq(index).text(obj.eq(index).text().substring(0, length - 1) + "...");
                }
            });
        }
    },

    //手机适配功能
    //size 适配尺寸 默认$("#mobile_css").attr("href")
    //url css地址  默认640
    //callback 适配结束回调
    //wz.intelligent.init({
    //    callback: function () {
    //        do sth
    //    }
    //});
    intelligent: {
        cssPropertyArr: {
            cssPropertyArray: [],
            regBackgroundArray: []
        },
        data: {
            url: $("#mobile_css").attr("href"),
            size: 640,
            callback: {}
        },
        init: function (options) {
            $.extend(this.data, options);
            $.ajax({
                url: this.data.url,
                type: "GET",
                dataType: "html",
                success: function (data) {
                    setTimeout(function () {
                        wz.intelligent.cssNameAttr(data, options);
                    }, 1);
                }
            });
        },
        cssNameAttr: function (cssdata, options) {
            var g, h, i, j, k, l, d = cssdata, data = wz.intelligent.data,
                e = "/*startdom*/",
                f = "/*enddom*/";
            g = "", h = "",
                d = d.substr(d.indexOf(e) + e.length),
                d = d.substring(0, d.indexOf(f)),
                g = cssdata.substr(cssdata.indexOf(f) + f.length),
                i = d.replace(/([\d\.]+)(?:px)/gi, "|"),
                j = d.match(/([\d\.]+)(?:px)/gi),
                k = i.split("|"),
                l = function () {
                    if (j == null) { return false; }
                    var e, f, h, i, l, m, n, o, p, q, r, a = "", c = "", d = $(window).width(), cssPropertyArr = wz.intelligent.cssNameAttr;
                    for (cssPropertyArr.cssPropertyArray = [], cssPropertyArr.regBackgroundArray = [], e = 0, f = j.length; f >= e; e++) {
                        f > e && (h = parseInt(j[e]),
                            i = Math.round(h / data.size * d),
                            cssPropertyArr.cssPropertyArray.push(i + "px")),
                            a += e == cssPropertyArr.cssPropertyArray.length ? k[e] : k[e] + cssPropertyArr.cssPropertyArray[e];
                    }
                    if (a.indexOf("jpg") > -1 || a.indexOf("png") > -1 || a.indexOf("gif") > -1) {
                        for (l = a.replace(/(?=\()[^)]+(?=\))/g, "||"),
                                 m = a.match(/(?=\()[^)]+(?=\))/g),
                                 n = l.split("||"),
                                 e = 0, o = m.length; o >= e; e++) {
                            o > e && (p = m[e].replace(/[(""'')"]/g, ""), p = p.replace(/^..\//g, ""),
                                q = "(" + p,
                                cssPropertyArr.regBackgroundArray.push(q)),
                                c += e == cssPropertyArr.regBackgroundArray.length ? n[e] : n[e] + cssPropertyArr.regBackgroundArray[e];
                        }
                    }
                    else {
                        c += a;
                    }
                    $("#resizestyle").remove(),
                        r = '<style id="resizestyle" type="text/css">' + (c) + "</style>",
                    $(window).width() <= data.size && $("head:eq(0)").append(r);
                    if ((data.callback && typeof (data.callback) === "function") && data.callback()) {
                        data.callback();
                    }
                }
            l(),
                $(window).on("resize", function () {
                    wz.browser.versions_v2.iPad() || wz.browser.versions_v2.iPhone() ? l() : (clearTimeout(h),
                        h = setTimeout(function () {
                            l();
                        }, 10))
                });
        }
    },
    //手机适配功能支持横屏  参照尺寸 横板1472*1104（安全区域：1472*828）  竖版768*1024（安全区域：576*1024）
    //size 适配尺寸 默认[1024, 1472]
    //autoScreen 横竖版7设置 ["height", "width"] 默认竖版 一般不用重写
    //url css地址  默认$("#mobile_css").attr("href")
    //callback 适配结束回调
    //wz.intelligent_v2.init({
    //    callback: function () {
    //        do sth
    //    }
    //});
    intelligent_v2: {
        cssPropertyArr: {
            cssPropertyArray: [],
            regBackgroundArray: []
        },
        data: {
            url: $("#mobile_css").attr("href"),
            size: [1024, 1472],
            autoScreen: ["height", "width"],//默认竖版
            callback: {}
        },
        init: function (options) {
            $.extend(this.data, options);
            $.ajax({
                url: this.data.url,
                type: "GET",
                dataType: "html",
                success: function (data) {
                    setTimeout(function () {
                        wz.intelligent_v2.cssNameAttr(data, options);
                    }, 1);
                }
            });
        },
        cssNameAttr: function (cssdata, options) {
            var g, h, i, j, k, l, d = cssdata, data = wz.intelligent_v2.data,
                e = "/*startdom*/",
                f = "/*enddom*/";
            g = "", h = "",
                d = d.substr(d.indexOf(e) + e.length),
                d = d.substring(0, d.indexOf(f)),
                g = cssdata.substr(cssdata.indexOf(f) + f.length),
                i = d.replace(/([\d\.]+)(?:px)/gi, "|"),
                j = d.match(/([\d\.]+)(?:px)/gi),
                k = i.split("|"),
                l = function () {
                    if (j == null) { return false; }
                    var width = $(window).width();
                    var height = $(window).height();
                    var type = 0;
                    if (width > height) {//横屏
                        type = 1;
                    }
                    else {//竖屏
                        type = 0;
                    }
                    var e, f, h, i, l, m, n, o, p, q, r, a = "", c = "", d, cssPropertyArr = wz.intelligent_v2.cssNameAttr;
                    if (wz.intelligent_v2.data.autoScreen[type] == "height") { d = $(window).height(); } else { d = $(window).width(); }
                    for (cssPropertyArr.cssPropertyArray = [], cssPropertyArr.regBackgroundArray = [], e = 0, f = j.length; f >= e; e++) {
                        f > e && (h = parseInt(j[e]),
                            i = Math.round(h / data.size[type] * d),
                            cssPropertyArr.cssPropertyArray.push(i + "px")),
                            a += e == cssPropertyArr.cssPropertyArray.length ? k[e] : k[e] + cssPropertyArr.cssPropertyArray[e];
                    }
                    if (a.indexOf("jpg") > -1 || a.indexOf("png") > -1 || a.indexOf("gif") > -1) {
                        for (l = a.replace(/(?=\()[^)]+(?=\))/g, "||"),
                                 m = a.match(/(?=\()[^)]+(?=\))/g),
                                 n = l.split("||"),
                                 e = 0, o = m.length; o >= e; e++) {
                            o > e && (p = m[e].replace(/[(""'')"]/g, ""), p = p.replace(/^..\//g, ""),
                                q = "(" + p,
                                cssPropertyArr.regBackgroundArray.push(q)),
                                c += e == cssPropertyArr.regBackgroundArray.length ? n[e] : n[e] + cssPropertyArr.regBackgroundArray[e];
                        }
                    }
                    else {
                        c += a;
                    }
                    $("#resizestyle").remove(),
                        r = '<style id="resizestyle" type="text/css">' + (c) + "</style>",
                    $(window).width() <= data.size[type] && $("head:eq(0)").append(r);
                    if ((data.callback && typeof (data.callback) === "function") && data.callback()) {
                        data.callback();
                    }
                }
            l(),
                $(window).on("resize", function () {
                    wz.browser.versions_v2.iPad() || wz.browser.versions_v2.iPhone() ? l() : (clearTimeout(h),
                        h = setTimeout(function () {
                            l();
                        }, 10));
                });
        }
    },

    //startimer开始时间 基本格式2016/01/12 01:11:00
    //endtimer结束时间 基本格式2016/01/12 01:12:00
    djs_timer: {
        data: {
            startimer: "",
            endtimer: "",
            loop: 1000,
            day: "",
            hour: "",
            min: "",
            sec: "",
            timer: null,
            time_data: "over",
            msallow: false
        },
        //startimer开始时间 基本格式2016/01/12 01:11:00
        //endtimer结束时间 基本格式2016/01/12 01:12:00
        //callback 返回实时时间json对象
        //overtimer 整个倒计时结束
        init: function (options) {
            $.extend(this.data, options);
            this.doit(options);
        },
        complete: function (options) {
            clearInterval(wz.djs_timer.data.timer);
            if ((options.overtimer && typeof (options.overtimer) === "function") && options.overtimer(this.data.time_data)) {
                options.overtimer(this.data.time_data);
            }
        },
        doit: function (options) {
            var NowTime;
            NowTime = options.startimer == null ? new Date() : new Date(options.startimer);
            var EndTime = new Date(options.endtimer);

            var d = 0, h = 0, m = 0, s = 0, time_str, t;
            if (wz.djs_timer.data.loop < 1000) {
                console.log("友情提示：loop低于1000ms对于页面性能和常规业务逻辑没任何意义");
                if (!wz.djs_timer.data.msallow) { return false; }
            }
            if (wz.djs_timer.data.loop > EndTime.getTime() - NowTime.getTime()) {
                console.log("友情提示：间隔时间loop大于开始时间到结束时间，没有监听意义，1.检查endtimer是否大于startimer或大于当前本机时间。2.检查loop的值是不是比总时间还大");
                return false;
            }
            else {
                if ((options.begincallback && typeof (options.begincallback) === "function") && options.begincallback()) {
                    options.begincallback();
                }
                if (main()) { }
                else {
                    wz.djs_timer.data.timer = setInterval(function () {
                        main();
                    }, wz.djs_timer.data.loop);
                }
                function main() {
                    t = EndTime.getTime() - NowTime.getTime();
                    if (t >= 0) {//倒计时未结束
                        d = wz.method.fomatFloat(Math.floor(t / wz.djs_timer.data.loop / 60 / 60 / 24) * (wz.djs_timer.data.loop / 1000), 0);
                        h = wz.method.fomatFloat(Math.floor(t / wz.djs_timer.data.loop / 60 / 60 % 24) * (wz.djs_timer.data.loop / 1000), 0);
                        m = wz.method.fomatFloat(Math.floor(t / wz.djs_timer.data.loop / 60 % 60) * (wz.djs_timer.data.loop / 1000), 0);
                        s = wz.method.fomatFloat(Math.floor(t / wz.djs_timer.data.loop % 60) * (wz.djs_timer.data.loop / 1000), 2);

                        //整理数据start
                        NowTime = new Date(NowTime.valueOf() + wz.djs_timer.data.loop);
                        wz.djs_timer.data.day = d < 10 ? "0" + d : d;
                        wz.djs_timer.data.hour = h < 10 ? "0" + h : h;
                        wz.djs_timer.data.min = m < 10 ? "0" + m : m;
                        wz.djs_timer.data.sec = s < 10 ? "0" + s : s;

                        time_str = wz.djs_timer.data.day + wz.djs_timer.data.hour + wz.djs_timer.data.min + wz.djs_timer.data.sec;
                        wz.djs_timer.data.time_data = {
                            "day": "" + wz.djs_timer.data.day + "",
                            "hour": "" + wz.djs_timer.data.hour + "",
                            "min": "" + wz.djs_timer.data.min + "",
                            "sec": "" + wz.djs_timer.data.sec + ""
                        };
                        //整理数据end

                        if (time_str == "00000000") {//倒计时结束
                            wz.djs_timer.complete(options);
                        }
                        else {//倒计时执行中
                            if ((options.callback && typeof (options.callback) === "function") && options.callback(wz.djs_timer.data.time_data)) {
                                options.callback(wz.djs_timer.data.time_data);
                            }
                        }
                    }
                    else {//倒计时结束
                        wz.djs_timer.complete(options);
                        return true;
                    }
                }
            }
        }
    },
    //obj最外框父容器对象
    //data[{"href":"","src":""}]
    //loop自动轮播启动时间
    //IsHavePoint是否有导航小点true/false
    //autoplay自动轮播true/false
    //pointColor单个导航选中颜色 *可选属性
    //pointBgColor单个导航背景颜色 *可选属性
    //lazyload是否启用图片懒加载true/false，配合lazyload.js使用 *可选属性
    //callback回调函数，自定义导航样式
    lunbo: function (obj, udata, loop, IsHavePoint, autoplay, pointColor, pointBgColor, lazyload, cssCallback) {
        var locojoy_lb = {
            data: {
                width: obj.width(),
                height: obj.height(),
                img: udata,
                loop: loop,
                IsHavePoint: IsHavePoint,
                autoplay: autoplay,
                pointColor: pointColor,
                pointBgColor: pointBgColor,
                lazyload: lazyload
            },
            //创建DOM文档、添加样式
            createHTML: function () {
                var data = locojoy_lb.data;
                obj.css({ "position": "relative", "overflow": "hidden", "width": data.width, "height": data.height }).append($("<ul></ul>"));
                var ul = obj.find("ul");
                ul.css({ "position": "absolute", "z-index": "1", "width": data.width * data.img.length, "height": data.height });
                for (var i = 0; i < data.img.length; i++) {
                    if (i == 0) {
                        if (data.img[0].href != "") {
                            ul.append("<li style='z-index:2;'><a href='" + data.img[i].href + "' target='_blank'><img style='width:100%;height:100%;' src='" + data.img[i].src + "' alt=''/></a></li>");
                        }
                    }
                    else {
                        var html;
                        if (data.img[i].href != "") {
                            if (data.lazyload) {
                                html = "<li style='z-index:1;'><a href='" + data.img[i].href + "' target='_blank'><img style='width:100%;height:100%;' data-original='" + data.img[i].src + "' alt=''/></a></li>";
                                //SCRIPT5007: 无法获取未定义或 null 引用的属性“src”
                                //由于数组最后一项的逗号没有去掉，用eval解析的时候， chrome 和 firefox 会忽略掉最后的逗号， IE8则会认为逗号之后还有个undefined，IE6会报错
                            }
                            else {
                                html = "<li style='z-index:1;'><a href='" + data.img[i].href + "' target='_blank'><img style='width:100%;height:100%;' src='" + data.img[i].src + "' alt=''/></a></li>";
                            }
                            ul.append(html);
                        }
                    }
                }
                var li = ul.find("li");
                li.css({ "position": "absolute", "margin": "0", "padding": "0", "width": data.width, "height": data.height, "left": "0", "top": "0", "list-style": "none", "background-size": data.width + "px " + data.height + "px" })
                    .find("a").css({ "display": "block", "width": data.width, "height": data.height, "cursor": "pointer" });
                //带指向圆点
                if (data.IsHavePoint) {
                    var data = locojoy_lb.data;
                    obj.append("<dl></dl>");
                    var dl = obj.find("dl");
                    dl.css({
                        "position": "absolute", "z-index": "2", "height": "auto", "width": "auto", "bottom": data.height * 0.02,
                        "left": "50%", "margin-left": -1 * ((data.height * 0.03 * data.img.length) + (data.height * 0.03 * 0.8)) * 0.5
                    });
                    for (var i = 0; i < data.img.length; i++) {
                        dl.append("<dd style='width:" + data.height * 0.03 + "px; height:" + data.height * 0.03 + "px; background-color:" + data.pointBgColor + "; border-radius:50%; float:left;margin:0 " + data.height * 0.03 * 0.8 / data.img.length / 2 + "px; cursor:pointer;'></dd>");
                    }
                    dl.find("dd:first").css({ "background-color": data.pointColor });
                    if ((cssCallback && typeof (cssCallback) === "function") && cssCallback()) {
                        cssCallback();
                    }
                }
                obj.find("dd").on("click", function () {
                    index = $(this).index();
                    obj.find("li").stop();
                    obj.find("li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
                    $(this).css({ "background-color": data.pointColor }).siblings().css({ "background-color": data.pointBgColor });
                });
            },
            //自动轮播事件
            automatic: function () {
                var data = locojoy_lb.data;
                var index = 0;
                var timer;
                picTimer();
                function picTimer() {
                    timer = setInterval(function () {
                        obj.find("li").stop();
                        obj.find("li").eq(index + 1).fadeIn(1000).siblings().fadeOut(1000);
                        obj.find("dd").eq(index + 1).css({ "background-color": data.pointColor }).siblings().css({ "background-color": data.pointBgColor });
                        if (data.lazyload) {
                            obj.find("li").eq(index + 1).find("img").trigger("sporty");
                        }
                        if (index == data.img.length - 1) {
                            index = 0;
                            obj.find("li").eq(0).fadeIn(1000).siblings().fadeOut(1000);
                            obj.find("dd").eq(0).css({ "background-color": data.pointColor }).siblings().css({ "background-color": data.pointBgColor });
                        }
                        else {
                            index++;
                        }
                    }, data.loop);
                }
                obj.find("li,dd").on("mouseout", function () {
                    picTimer();
                });

                obj.find("li,dd").on("mouseover", function () {
                    clearInterval(timer);
                });
            },
        };
        locojoy_lb.createHTML();
        if (locojoy_lb.data.autoplay) {
            locojoy_lb.automatic();
        }
    },
    //嵌入框
    iframe: {
        //处理iframe 默认内容呈现
        //obj_str iframe的id
        load: function (obj_str) {
            var pTar = null;
            if (document.getElementById) {
                pTar = document.getElementById(obj_str);
            }
            else {
                eval('pTar = ' + down + ';');
            }
            if (pTar && !window.opera) {
                //begin resizing iframe
                pTar.style.display = "block"
                if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight) {
                    //ns6 syntax
                    pTar.height = pTar.contentDocument.body.offsetHeight + 20;
                    pTar.width = pTar.contentDocument.body.scrollWidth + 20;
                }
                else if (pTar.Document && pTar.Document.body.scrollHeight) {
                    //ie5+ syntax
                    pTar.height = pTar.Document.body.scrollHeight;
                    pTar.width = pTar.Document.body.scrollWidth;
                }
            }
        },
        //子页面获取iframe对象
        //id_str要获取的iframe的ID
        get: function (id_str) {
            return $(window.parent.document).find("iframe#" + id_str);
        }
    },
    //公共页脚
    //wz.footer.init({
    //    obj:"$("body:eq(0)")",   //添加到的位置
    //    jwwlink: "",     //京网文链接
    //    imgUrl: "http://update2.locojoy.com/wz/images/icon_jww.png",  //京网文图标链接
    //    bgColor: "#D7D7D7",  //背景颜色
    //    color: "#535353",   //字体颜色
    //    jwwfont: "京网文[2013]0539-166号",
    //    company: "北京乐动卓越科技有限公司",  //公司名
    //    jzjhlink: "http://www.locojoy.com/jzjh/jzjh.html",  //家长监护
    //    fwxylink: "http://www.locojoy.com/jzjh/sertcp.html",  //服务协议
    //    acolor: "#0085d9", //a链接颜色
    //    customCss: function (obj) {
    //    }
    //});
    footer: {
        data: {
            obj: $("body:eq(0)"),
            css: "",
            html: "",
            jwwlink: "#",
            imgUrl: "http://update2.locojoy.com/wz/images/icon_jww.png",
            bgColor: "initial",
            color: "#535353",
            time: new Date(),
            company: "北京乐动卓越科技有限公司",
            jwwfont: "京网文[2013]0539-166号",
            jzjhlink: "http://www.locojoy.com/jzjh/jzjh.html",
            fwxylink: "http://www.locojoy.com/jzjh/sertcp.html",
            acolor: "#0085d9",
            customCss: function () { }
        },
        init: function (options) {
            options = $.extend(this.data, options);
            this.reBuild(options);
            var resizeTimer = "";
            $(window).resize(function () {
                if (wz.browser.versions_v2.mobile()) {
                    wz.footer.reBuild();
                } else {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function () {
                        wz.footer.reBuild();
                    }, 10);
                };
            });
        },
        reBuild: function (options) {
            if (wz.browser.versions_v2.mobile()) {
                if (wz.browser.versions_v2.iPad()) {
                    this.data.css = "footer{position:relative;padding:20px 0;background-color:" + this.data.bgColor + "}footer p{width:100%;color:" + this.data.color + ";font-size:14px;height:auto;text-align:center}footer p span{vertical-align:middle}footer p a{color:" + this.data.acolor + ";cursor:pointer}";
                    this.createMobileHtml();
                }
                else {
                    this.data.css = "footer{position:relative;padding:" + wz.method.reMobileNum(20) + "px 0;background-color:" + this.data.bgColor + "}footer p{position:relative;width:100%;color:" + this.data.color + ";font-size:" + wz.method.reMobileNum(24) + "px;height:auto;text-align:center}footer p span{vertical-align:middle}footer p a{color:" + this.data.acolor + ";cursor:pointer}";
                    this.createMobileHtml();
                }
            }
            else {
                this.data.css = "footer{position:relative;padding:50px 0;background-color:" + this.data.bgColor + "}footer p{width:100%;color:" + this.data.color + ";font-size:14px;height:auto;text-align:center}footer p span{vertical-align:middle}footer p a{color:" + this.data.acolor + ";cursor:pointer}footer p a.icon{vertical-align:middle;display:inline-block;width:20px;height:23px;margin:2px 2px 0 10px}";
                this.createPcHtml();
            }
            $("#footer,footer").remove();
            $("head:eq(0)").append("<style type='text/css' id='footer'>" + this.data.css + "</style>");
            this.data.obj.append(this.data.html);
            if ((this.data.customCss && typeof (this.data.customCss) === "function") && this.data.customCss($("footer"))) {
                this.data.customCss($("footer"));
            }
        },
        createMobileHtml: function () {
            var str = "";
            str += "<footer>";
            str += "<p><span>" + this.data.company + "版权所有&nbsp;&copy;" + (this.data.time.getFullYear() - 7) + "-" + this.data.time.getFullYear() + "</span></p>";
            str += "<p><a href='" + this.data.jzjhlink + "'>家长监护</a>&nbsp;<a href='" + this.data.fwxylink + "'>服务协议</a></p>";
            str += "</footer>";
            this.data.html = str;
        },
        createPcHtml: function () {
            var str = "";
            str += "<footer>";
            str += "<p><span>" + this.data.company + "版权所有&nbsp;&copy;" + (this.data.time.getFullYear() - 7) + "-" + this.data.time.getFullYear() + "</span><a href='" + this.data.jwwlink + "'target='_blank' class='icon'><img src='" + this.data.imgUrl + "' /></a><span>" + this.data.jwwfont + "&nbsp;<a href='" + this.data.jzjhlink + "'>家长监护</a>&nbsp;<a href='" + this.data.fwxylink + "'>服务协议</a></span></p>";
            str += "</footer>";
            this.data.html = str;
        }
    },
    //说明：要求后台建立一个与接口同源的空白中转页并声明domain与跨域页的domain一致，后台支撑再建立一个状态返回页 页面标题头为result,一般用于上传文件类型，参数过长的请求，例如上传图片base64过长
    //调用方式：
    //wz.crossDomain.init({
    //      domain: domain,
    //      action: action,
    //      bridge: bridge,
    //      data: data,
    //      loading: function () {
    //          console.log("加载中,请稍后....");
    //      },
    //      success: function (data) {
    //          console.log(data);
    //      }
    //  });
    crossDomain: {
        data: {
            domain: "",
            action: "",
            bridge: "",
            data: "",
            json: null
        },
        init: function (options) {
            options = $.extend(wz.crossDomain.data, options);
            wz.crossDomain.cross(options);
        },
        cross: function (options) {
            if (options.json == null) {
                if ($("#myiframe")) {
                    $("#myiframe").remove();
                }
                document.domain = options.domain;
                var ifr = $("<iframe></iframe>");
                //创建iframe
                ifr.attr({ "src": options.bridge, "id": "myiframe" });
                $("body:eq(0)").append(ifr);
                ifr.hide();

                var doc = ifr.contents().find("body");
                //创建Form
                var form = $("<form></form>");
                //把创建的form添加到body中
                doc.append(form);
                //设置属性，添加接口链接
                form.attr({ "action": options.action, "method": "post", "target": "_self" }); // _self -> 当前页面 _blank -> 新页面

                //创建Input
                $.each(options.data, function (index, data) {
                    form.append($("<input type='text' name='" + index + "' value='" + data + "'/>"));
                });

                //提交表单
                form.submit();

                //监听表单提交
                var loading_count = 0;
                var timer = setInterval(function () {
                    var result_ifr = ifr.contents();//定位到动态创建的form
                    var title = result_ifr.find("head").find("title").text();
                    if (title == "result") {
                        clearInterval(timer);
                        //构建json字符串
                        var str = "{";
                        $.each(result_ifr.find("body").find("div"), function () {
                            str += '"' + $(this).attr("id") + '":"' + $(this).html() + '",';
                        });
                        str = str.substring(0, str.length - 1);
                        str += "}";
                        //字符串形式回掉原页面函数，对象类型会出现错误
                        result_ifr.find("head").append("<script>var arg=\'" + str + "\'; window.top.wz.crossDomain.callback(arg);<\/script>");
                    }
                    else {
                        loading_count++;
                        if (loading_count == 1) {
                            if ((options.loading && typeof (options.loading) === "function") && options.loading()) {
                                options.loading();
                            }
                        }
                    }
                }, 100);
            }
            else {
                if ((options.success && typeof (options.success) === "function") && options.success(options.json)) {
                    options.success(options.json);
                }
                wz.crossDomain.data.json = null;
            }
        },
        callback: function (arg) {
            var data = $.parseJSON(arg);
            wz.crossDomain.data.json = data;
            wz.crossDomain.init({ json: data });
        }
    },



};
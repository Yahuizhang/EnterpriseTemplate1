/**
 * Created by zhang on 2017/9/19.
 */
var wz = {
    //浏览器
    browser: {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                //IE内核
                trident: u.indexOf('Trident') > -1,
                //IE7内核
                trident7: u.indexOf('MSIE 7') > -1,
                //遨游
                Maxthon: u.indexOf('Maxthon') > -1,
                //opera内核
                presto: u.indexOf('Presto') > -1,
                //苹果、谷歌内核
                webKit: u.indexOf('AppleWebKit') > -1,
                //火狐浏览器
                firefox: /.*(Firefox)\/([\w.]+).*/.test(u),
                //火狐内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                //Safari浏览器
                safari: /.*Version\/([\w.]+).*(Safari).*/.test(u),
                //是否为移动终端
                mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                //ios终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                //android终端或者uc浏览器
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                //是否为iPhone或者QQHD浏览器
                iPhone: u.indexOf('iPhone') > -1,
                //是否iPad
                iPad: u.indexOf('iPad') > -1,
                //是否web应该程序，没有头部与底部
                webApp: u.indexOf('Safari') == -1,
                //是否微信
                weixin: u.indexOf('MicroMessenger') > -1,
                //是否QQ
                qq: u.match(/\sQQ/i) == " qq",
                //是否WP
                wp: u.indexOf("Windows Phone") > -1
            };
        }(),
        //页面语言
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
        //判断pc机（补充方法）
        IsPC: function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        //是否为支持H5的浏览器
        IsH5browser: function () {
            if (typeof (Worker) !== "undefined") { return true; } else { return false; }
        },
        versions_v2: {
            //IE内核
            trident: function () {
                return navigator.userAgent.indexOf('Trident') > -1;
            },
            //IE7内核
            trident7: function () {
                return navigator.userAgent.indexOf('MSIE 7') > -1;
            },
            //遨游
            Maxthon: function () {
                return navigator.userAgent.indexOf('Maxthon') > -1;
            },
            //opera内核
            presto: function () {
                return navigator.userAgent.indexOf('Presto') > -1;
            },
            //苹果、谷歌内核
            webKit: function () {
                return; navigator.userAgent.indexOf('AppleWebKit') > -1
            },
            //火狐浏览器
            firefox: function () {
                return /.*(Firefox)\/([\w.]+).*/.test(navigator.userAgent);
            },
            //火狐内核
            gecko: function () {
                return navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1;
            },
            //Safari浏览器
            safari: function () {
                return /.*Version\/([\w.]+).*(Safari).*/.test(navigator.userAgent);
            },
            //是否为移动终端
            mobile: function () {
                return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
            },
            //ios终端
            ios: function () {
                return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            },
            //android终端或者uc浏览器
            android: function () {
                return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;
            },
            //是否为iPhone或者QQHD浏览器
            iPhone: function () {
                return navigator.userAgent.indexOf('iPhone') > -1;
            },
            //是否iPad
            iPad: function () {
                return navigator.userAgent.indexOf('iPad') > -1;
            },
            //是否web应该程序，没有头部与底部
            webApp: function () {
                return navigator.userAgent.indexOf('Safari') == -1;
            },
            //是否微信
            weixin: function () {
                return navigator.userAgent.indexOf('MicroMessenger') > -1;
            },
            //是否QQ
            qq: function () {
                return navigator.userAgent.match(/\sQQ/i) == " qq";
            },
            wp: function () {
                return navigator.userAgent.indexOf("Windows Phone") > -1;
            }
        }
    },
    //公共方法
    method: {
        //初始化手机页面
        //fulldiv 高度跟显示屏一样高的父容器
        //notouchmove 页面是否固定 bool类型
        page_code: function (fulldiv, notouchmove) {
            $("body a").css({ "text-decoration": "none" });
            $("a,input,button").focus(function () { this.blur(); });
            if (fulldiv != "" || fulldiv != null) {
                fulldiv.css("height", $(window).height() + "px");
            }
            if (notouchmove) {
                document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
            }
        },
        //获取页面参数
        //paras 参数标识
        request: function (paras) {
            var url = location.href;
            var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
            var paraObj = {};
            for (var i = 0; j = paraString[i]; i++) {
                paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
            }
            var returnValue = paraObj[paras.toLowerCase()];
            if (typeof (returnValue) == "undefined") {
                return "";
            } else {
                return returnValue;
            }
        },
        //封装打字机效果
        //obj 父容器对象
        //font 要打印出的文字
        //speed 速率
        //callback 打印结束回调函数
        print_font: function (obj, font, speed, callback) {
            var seq = 0;
            if (speed == null || speed == "") {
                speed = 60;
            }
            var timer = setInterval(function () {
                obj.html(font.substring(0, seq));
                seq++;
                if (seq == font.length + 1) {
                    seq = 0;
                    clearInterval(timer);
                    setTimeout(function () {
                        if ((callback && typeof (callback) === "function") && callback()) {
                            callback();
                        }
                    }, 2000);
                }
            }, speed);
        },
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
        //获取星期几  date格式 2015/9/22
        getWeekDay: function (date) {
            var day = new Date(Date.parse(date));
            var today = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
            return today[day.getDay()];
        },
        //获取某月有几天 1-12月
        //year 年
        //month 月
        getMonthDays: function (year, month) {
            if (month < 1 || month > 12) {
                return 30;
            }
            var arrMon = new Array(13);
            arrMon[1] = 31;
            if (year % 4 == 0) {
                arrMon[2] = 29;
            } else {
                arrMon[2] = 28;
            }
            arrMon[3] = 31; arrMon[4] = 30;
            arrMon[5] = 31; arrMon[6] = 30;
            arrMon[7] = 31; arrMon[8] = 31;
            arrMon[9] = 30; arrMon[10] = 31;
            arrMon[11] = 30; arrMon[12] = 31;
            return arrMon[month];
        },
        //返回随机数 不包括开始和结束值
        //start 开始数
        //end 结束数
        random: function (start, end) {
            return start > end ? 0 : Math.abs(parseInt(Math.random() * (start - end + 1) + end));
        },
        //反编码地址（一般带汉字的地址会被浏览器编译后生成乱码地址）
        //url 需要反编译的地址
        unencoded_url: function (url) {
            url = url.replace(/%3A/g, ":");
            url = url.replace(/%2F/g, "/");
            url = url.replace(/%3F/g, "?");
            url = url.replace(/%3D/g, "=");
            return url;
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
        //返回字符串中所有数字
        //str 例子：a32b2  返回322
        returNum: function (str) {
            str = str.split("");
            var endstr = "";
            for (i = 0; i < str.length; i++) {
                if (!/\D/ig.test(str[i])) {
                    endstr += str[i];
                }
            }
            return endstr;
        },
        //格式化浮点类型数字
        //num 原数据
        //pos 保留几位小数
        fomatFloat: function (num, pos) {
            return Math.round(num * Math.pow(10, pos)) / Math.pow(10, pos);
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
        },
        //检查是否存在限制的字符内
        //str 限制字符或字符串
        //charList 要检查的字符串
        IsStrInLimitChars: function (str, charList) {
            var retValue = true;
            if (str.trim().length <= 0) {
                retValue = false;
            }
            else {
                for (var i = 0; i < str.trim().length; i++) {
                    if (charList.indexOf(str.trim().substring(i, i + 1)) < 0) {
                        retValue = false;
                        break;
                    }
                }
            }
            return retValue;
        },
        //缩进0.5em    obj对象
        textIndent: function (obj) {
            $.each(obj, function () {
                var firstChar = $(this).text().substring(0, 1);
                if (firstChar == "《" || firstChar == "【") {
                    $(this).css({ "text-indent": "-0.5em" });
                }
            });
        },
        //获取站点域名
        getRootPath: function () {
            var curWwwPath = window.document.location.href;
            var pathName = window.document.location.pathname;
            var pos = curWwwPath.indexOf(pathName);
            var localhostPaht = curWwwPath.substring(0, pos);
            var localhost = window.location.host;
            var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
            if (wz.method.checkPathUrl(localhost)) {
                return localhostPaht;
            }
            else {
                return (localhostPaht + projectName);
            }
        },
        //返回域名判断 虚拟路径返回false  反之true
        checkPathUrl: function (localhost) {
            if (localhost == null || localhost == "") { return false; }
            if (!wz.method.checkIP(localhost)) {
                if (localhost.indexOf("localhost") > -1) {
                    return false;//localhost
                }
                return true;//域名
            }
            else {
                return false;//IP
            }
        },
        //判断是否为IP地址 是返回true
        checkIP: function (ip) {
            var str = ip.match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/g);
            if (str == null || str == "") {
                return false;
            }
            else if (RegExp.$1 > 255 || RegExp.$2 > 255 || RegExp.$3 > 255 || RegExp.$4 > 255) {
                return false;
            }
            else {
                return true;
            }
        },
        //checkJs 检查js域名数组 例子var myCheck = ["update2.locojoy.com", "192.168.11.38"];
        checkJs: function (checkPath) {
            var srcArr = document.getElementsByTagName('script');
            for (var i = 0; i < srcArr.length; i++) {
                var src = srcArr[i].src;
                if (!(checkPath.indexOf(src.split('/')[2]) > -1)) {
                    srcArr[i].src = "";
                    srcArr[i].parentNode.removeChild(srcArr[i]);
                }
            }
        },
        //倒数60s(一般用于验证码)
        //btn_obj按钮
        //num自定义秒数
        //cover_obj按钮锁遮罩对象隐现
        //stop_time停止时间  当同时多个按钮调用本方法需设置一般值为:(num*调用次数)
        //callback 倒计时结束回调函数
        timerYzm: function (btn_obj, num, cover_obj, stop_time, callback) {
            if (num == null || num == "undefined") {
                num = 60;
            }
            cover_obj.show();
            if (num > 0) {
                btn_obj.html(num + 's后可重发');
                btn_obj.val(num + 's后可重发');
            }
            else {
                if (stop_time == null || stop_time == "undefined") {
                    clearTimeout(timer_yzm);
                }
                else {
                    if (num < -1 * stop_time) {
                        clearTimeout(timer_yzm);
                    }
                }
                btn_obj.html('获取验证码');
                btn_obj.val('获取验证码');
                cover_obj.hide();
                if ((callback && typeof (callback) === "function") && callback()) {
                    callback();
                }
                return;
            }
            timer_yzm = setTimeout(function () {
                wz.method.timerYzm(btn_obj, --num, cover_obj, stop_time, callback)
            }, 1000);
        },
        //倒数60s(一般用于验证码)暂不支持多线程同时执行
        //num自定义秒数
        //begincallback 开始执行回调
        //callback 执行过程回调
        //overtimer 执行结束回调
        /*wz.method.timerYzm_v2.init($("#btn1"), {
         num: 10,
         begincallback: function () {
         },
         callback: function (e) {
         console.log(e);
         },
         overtimer: function () {
         console.log("1结束");
         }
         });
         */
        timerYzm_v2: {
            data: {
                num: 60,
                desc: "s后可重发",
                enddesc: "获取验证码",
                copy: null,
                prev: null,
                timer: null
            },
            init: function (obj, options) {
                $.extend(this.data, options);
                this.createLockDom(obj, options);
                this.data.timer = "timer" + obj.attr("id");
                this.data.timer = setInterval(function () {
                    wz.method.timerYzm_v2.doit(obj, options);
                }, 1000);
            },
            doit: function (obj, options) {
                var _data = this.data;
                if (wz.method.timerYzm_v2.data.num > 0) {
                    --wz.method.timerYzm_v2.data.num;
                    obj.html(wz.method.timerYzm_v2.data.num + wz.method.timerYzm_v2.data.desc);
                    obj.val(wz.method.timerYzm_v2.data.num + wz.method.timerYzm_v2.data.desc);
                    if ((options.callback && typeof (options.callback) === "function") && options.callback(wz.method.timerYzm_v2.data.num)) {
                        options.callback(wz.method.timerYzm_v2.data.num);
                    }
                    if (wz.method.timerYzm_v2.data.num == 0) {
                        clearInterval(wz.method.timerYzm_v2.data.timer);
                        //重新添加节点
                        if (obj.next().index() == -1) {//后方没有结点
                            obj.parent().append(wz.method.timerYzm_v2.data.copy);
                        }
                        else {//后方有结点
                            if (obj.prev().index() == -1) {//前方没有结点
                                obj.next().before(wz.method.timerYzm_v2.data.copy);
                            }
                            else {
                                obj.prev().after(wz.method.timerYzm_v2.data.copy);
                            }
                        }
                        wz.method.timerYzm_v2.data.copy.html(wz.method.timerYzm_v2.data.enddesc);
                        wz.method.timerYzm_v2.data.copy.val(wz.method.timerYzm_v2.data.enddesc);
                        obj.remove();
                        if ((options.overtimer && typeof (options.overtimer) === "function") && options.overtimer(wz.method.timerYzm_v2.data.num)) {
                            options.overtimer(wz.method.timerYzm_v2.data.num);
                        }
                    }
                }
                else {
                    clearInterval(wz.method.timerYzm_v2.data.timer);
                    return false;
                }
            },
            createLockDom: function (obj, options) {
                if ((options.begincallback && typeof (options.begincallback) === "function") && options.begincallback()) {
                    options.begincallback();
                }
                obj.val(this.data.num + this.data.desc);
                obj.html(this.data.num + this.data.desc);
                this.data.copy = obj.clone(true);
                obj.unbind("click");
            }
        },
        //百分比方法
        //obj    父容器对象
        //val    比值50/100或50%
        //color  比值条颜色
        //radius 是否为圆角
        //callback
        baifenbi: function (obj, val, valshow, color, radius, callback) {
            obj.css({ "position": "relative", "overflow": "hidden" });
            var width = obj.width(),
                height = obj.height(),
                radius_val = height / 2,
                num1, num2, nowVal;
            if (val == "" || val == null) {
                return false;
            }
            else {
                if (val.indexOf("/") > -1) {
                    num1 = val.split("/")[0];
                    num2 = val.split("/")[1];
                    nowVal = Math.floor((num1 * width) / num2);
                }
                if (val.indexOf("%") > -1) {
                    num1 = val.split("%")[0];
                    num2 = val.split("%")[1];
                    nowVal = Math.floor((num1 * width) / 100);
                }
            }
            if (valshow == "" || valshow == null) {
                valshow = false;
            }
            else {
                if (valshow) {
                    obj.append("<span>" + val + "</span>");
                }
            }
            obj.append("<div></div>");
            obj.find("span").css({ "position": "absolute", "display": "block", "z-index": "1", "width": "100%", "height": "100%", "text-align": "center", "line-height": height + 2 + "px", "font-size": height / 2 + 4 + "px" });
            obj.find("div").css({ "position": "absolute", "z-index": "0", "width": "0px", "height": "100%", "background-color": color });
            if (radius) {
                obj.find("div").css({ "border-radius": height / 2 + "px" });
            }
            obj.find("div").animate({ "width": nowVal + "px" }, 500);
            if ((callback && typeof (callback) === "function") && callback()) {
                callback();
            }
        },
        //返回顶部
        //对象ID
        //startcallback，gobackTop回调函数
        gobackTop: {
            data: {
                obj: null,
                startcallback: function () { },
                gobackTop: function () { }
            },
            init: function (options) {
                $.extend(this.data, options);
                this.doit(options);
            },
            doit: function (options) {
                var data = this.data;
                window.onscroll = function () {
                    if (document.documentElement.scrollTop + document.body.scrollTop > 0) {
                        data.obj.fadeIn(100);
                        if ((data.startcallback && typeof (data.startcallback) === "function") && data.startcallback()) {
                            data.startcallback();
                        }
                    } else {
                        data.obj.fadeOut(100);
                        if ((data.gobackTop && typeof (data.gobackTop) === "function") && data.gobackTop()) {
                            data.gobackTop();
                        }
                    }
                }
                data.obj.on("click", function () {
                    var Timer = setInterval(GoTop, 10);
                    function GoTop() {
                        if (document.documentElement.scrollTop + document.body.scrollTop < 1) {
                            clearInterval(Timer);
                        } else {
                            document.documentElement.scrollTop /= 1.1;
                            document.body.scrollTop /= 1.1;
                        }
                    }
                });
            }
        },
        //判断是否为某页（网页地址）
        //str 例子：index.html 可判断页面是否为index.html
        IsWhichPage: function (str) {
            var href = window.location.href.replace(/#+/, "");
            var arg = href.split("/");
            if (arg[arg.length - 1].toLowerCase() == "") {
                if (str.toLowerCase() == "index.html") {
                    return true;
                }
                else {
                    return true;
                }
            }
            else {
                if (arg[arg.length - 1].toLowerCase() == str) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        //检查是否点了除当前对象以外的地方
        //id 对象
        //callback 回调函数
        IsClickOther: function (id, callback) {
            $(document).click(function (e) {
                e = window.event || e;
                obj = e.srcElement ? e.srcElement : e.target;
                var array = id.split(",");
                if (obj.id != array[0] && obj.id != array[1]) {
                    if ((callback && typeof (callback) === "function") && callback()) {
                        callback();
                    }
                    return;
                }
            });
        },
        //换算成手机大小数据
        reMobileNum: function (num) {
            return Math.round((parseInt(num) / 640) * $(window).width());
        },
        /*
         obj jquery对象
         type 按钮功能类型
         1.default   默认样式  （提示（针对下载按钮，对分享未作处理）没有图片提示 ， browser和share类型才有图片提示）
         2.download  下载按钮类别样式   （提示到浏览器中打开下载）
         3.share     分享按钮类别    （提示分享 一般用于分享按钮提示，自动屏蔽下载链接）
         ios       ios链接
         android   android链接
         wp        wp链接
         pc        pc链接
         other     其他
         以上链接支持： 文本、链接、越狱链接
         img 属性url width  height
         img为自定提示图片  在default下不生效  支持：一般地址和base64地址  宽高：图片真实宽高用于定位和适配
         callback 回调函数 返回obj，type，navigator，msg
         obj:事件处理对象，已转为jquery对象
         type:类型
         navigator:操作平台
         msg:提示信息，返回link各属性值
         调用示例：
         wz.method.addBtnCode({
         obj: $(".divlink1,.divlink2"),
         type: "share",//default download share
         ios: "http://www.baidu.com",
         android: "http://www.sina.com",
         wp: "itms-services:///?action=download-manifest&url=https://raw.githubusercontent.com/wangjiudong/mtg/master/download20160604_wai.plist",
         pc: "敬请期待",
         other:"敬请期待",
         //img: { "url": imgdatabase64test, "width": 428, "height": 495 },//注销本行会自动随机出默认提示图片，如需要自定义图片时启用本行
         callback: function (data) {
         console.log(data);
         }
         });
         */
        addBtnCode: function (options) {
            var error = "很抱歉,该操作系统不支持下载!";
            var data = {
                obj: null,
                type: "default",
                ios: error,
                android: error,
                wp: error,
                pc: error,
                other: error,
                msg: {
                    weixin: "请在浏览器中打开,对您造成的不便敬请谅解!",
                    browser: "请在微信或其他可分享的app中打开进行分享操作!",
                },
                img: { "url": "", "width": "", "height": "" },
                url: {
                    download: [
                        { "url": "http://update2.locojoy.com/wz/images/browser1.png", "width": 562, "height": 586 },
                        { "url": "http://update2.locojoy.com/wz/images/browser2.png", "width": 503, "height": 383 },
                        { "url": "http://update2.locojoy.com/wz/images/browser3.png", "width": 580, "height": 759 }
                    ],
                    share: [
                        { "url": "http://update2.locojoy.com/wz/images/share1.png", "width": 545, "height": 607 },
                        { "url": "http://update2.locojoy.com/wz/images/share2.png", "width": 517, "height": 356 },
                        { "url": "http://update2.locojoy.com/wz/images/share3.png", "width": 535, "height": 446 },
                        { "url": "http://update2.locojoy.com/wz/images/share4.png", "width": 569, "height": 420 }
                    ]
                },
                navigator: "",
                zindex: "9999999"
            };
            $.extend(data, options);
            var redata, _this;
            var html, str, isPhone, img_index;
            if (data.type != "default" && wz.browser.versions_v2.weixin()) {//不是默认样式且只在微信中时
                if (data.img.src != "" && (wz.method.checkInfo.IsUrl(data.img.url) || wz.method.checkInfo.IsImgBase64(data.img.url))) {
                    $("body:eq(0)").append("<img src='" + data.img.url + "' width='0' height='0' display='none'/>");
                }
                else {
                    img_index = wz.method.random(-1, data.url[data.type].length);//随机显示图片下表
                    $("body:eq(0)").append("<img src='" + data.url[data.type][img_index].url + "' width='0' height='0' display='none'/>");
                }
            }
            if (data.obj == null) {
                return;
            }
            data.obj.on("click", function (e) {
                _this = e.target || e.srcElement;
                if (wz.browser.versions_v2.mobile()) {
                    if (wz.browser.versions_v2.weixin()) {
                        data.navigator = "weixin";
                        linkCode(data.msg.weixin);
                    }
                    else {
                        if (data.type == "share") {
                            data.navigator = "browser";
                            linkCode(data.msg.browser);
                        }
                        else if (wz.browser.versions_v2.ios()) {
                            data.navigator = "ios";
                            linkCode(data.ios);
                        }
                        else if (wz.browser.versions_v2.android) {
                            data.navigator = "android";
                            linkCode(data.android);
                        }
                        else if (wz.browser.versions_v2.wp) {
                            data.navigator = "wp";
                            linkCode(data.wp);
                        }
                        else {
                            data.navigator = "other";
                            linkCode(data.other);
                        }
                    }
                }
                else {
                    if (data.type == "share") {
                        data.navigator = "pc";
                        linkCode(data.msg.browser);
                    }
                    else {
                        data.navigator = "pc";
                        linkCode(data.pc);
                    }
                }
            });
            //赋予对象链接，或者不是url时返回提示
            function linkCode(url) {
                redata = { "obj": $(_this), "type": data.type, "navigator": data.navigator, "msg": url };
                data.obj.css({ "cursor": "pointer" });
                if (wz.method.checkInfo.IsUrl(url)) {
                    data.obj.attr({ "href": url, "key": url });
                    if (wz.browser.versions_v2.ios()) {
                        data.obj.attr({ "target": "_blank" });
                    }
                    else {
                        data.obj.removeAttr("target");
                    }
                    data.obj.click();
                    callback();
                }
                else {//不是下载地址得弹出提示
                    bluidCover();
                    callback();
                    if (wz.browser.versions_v2.weixin() && data.type != "default") {
                        $(".wz_cover_opacity,.wz_showimg_part").stop().fadeIn(200);
                    }
                    else {
                        $(".wz_cover_opacity,.wz_note_part").stop().fadeIn(200);
                    }
                    return false;
                }
                function callback() {
                    if ((options.callback && typeof (options.callback) === "function") && options.callback(redata)) {
                        options.callback(redata);
                    }
                }
            }
            //创建遮罩层
            function bluidCover() {
                isPhone = $(window).width() < 700 ? true : false;
                $(".wz_cover_opacity,.wz_note_part,.wz_showimg_part,#coveresizestyle").remove();
                //创建cover结构
                html = "<div class='wz_cover_opacity'></div>";
                css = '<style id="coveresizestyle" type="text/css">';
                css += ".wz_cover_opacity{position:fixed;top:0;left:0;right:0;bottom:0;background-color:#000;opacity:.9;background-color:rgba(0,0,0,.9);filter:alpha(Opacity=90);z-index:" + (parseInt(data.zindex) - 1) + ";-webkit-transform:translateZ(0);display:none;}";
                if (wz.browser.versions_v2.weixin()) {
                    bluidweixin(data.type);
                }
                else {
                    bluidDefault(redata.msg);
                }
                $("body:eq(0)").append($(html));
                $("head:eq(0)").append(css);
                close();
            }
            //构建默认部分dom和样式
            function bluidDefault(str) {
                html += "<div class='wz_note_part'>" + str + "</div>";
                css += ".wz_note_part{position:fixed;top:" + code(40, 40) + "px;right:" + code(40, 40) + "px;width:" + code(480, 480) + "px;padding:" + code(20, 20) + "px;background-color:#fff;z-index:" + data.zindex + ";-webkit-transform:translateZ(0);border-radius:" + code(10, 6) + "px;display:none;}";
                css += ".wz_note_part:after{position:absolute;border:solid transparent;content:' ';left:88%;top:-" + code(38, 30) + "px;border-width:" + code(20, 15) + "px;border-bottom-color:#fff}</style>";
            }
            //构建微信部分dom和样式
            function bluidweixin(type) {
                html += "<div class='wz_showimg_part'></div>";
                var obj;
                switch (type) {
                    case "download":
                        obj = data.url["download"][img_index];
                        createImgDom(obj);
                        break;
                    case "share":
                        obj = data.url["share"][img_index];
                        createImgDom(obj);
                        break;
                    default:
                        bluidDefault(redata.msg);
                        break;
                }
                function createImgDom(obj) {
                    if (data.img.url != "" && (wz.method.checkInfo.IsUrl(data.img.url) || wz.method.checkInfo.IsImgBase64(data.img.url))) {//自定义图片
                        css += ".wz_showimg_part{position:fixed;width:" + code(data.img.width, data.img.width) + "px;height:" + code(data.img.height, data.img.height) + "px;top:" + code(40, 40) + "px;right:" + code(30, 30) + "px;background:url('" + data.img.url + "') no-repeat;background-size:" + code(data.img.width, data.img.width) + "px " + code(data.img.height, data.img.height) + "px;z-index:" + data.zindex + "}";
                    }
                    else {//默认图片
                        css += ".wz_showimg_part{position:fixed;width:" + code(obj.width, obj.width) + "px;height:" + code(obj.height, obj.height) + "px;top:" + code(40, 40) + "px;right:" + code(30, 30) + "px;background:url('" + obj.url + "') no-repeat;background-size:" + code(obj.width, obj.width) + "px " + code(obj.height, obj.height) + "px;z-index:" + data.zindex + "}";
                    }
                }
            }
            function code(num, num2) {
                return isPhone ? wz.method.reMobileNum(num) : num2;
            }
            //关闭
            function close() {
                $(".wz_cover_opacity,.wz_showimg_part").on("click", function () {
                    $(".wz_cover_opacity,.wz_note_part,.wz_showimg_part").stop().fadeOut(100);
                });
            }
        }//method结束点
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
    //微信分享 difference（朋友圈，发给朋友，QQ，微博） 值 （false或空）和true
    wxShares_func: function (title, desc, link, imgUrl, difference) {
        var different = difference;
        if (difference == "" || difference == null || difference == undefined || difference == false) {
            different == false;
        }
        else {
            different = true;
        }
        var shareUrl = "http://wx.locojoy.com/oauth/iSignatureV1"; //微信接口用 与locojoy域名相同的站点才能使用，与公共账号关联的
        var _this = this;
        var myLink = encodeURIComponent(encodeURIComponent(window.location.href)); //例子："http://"+location.host+location.pathname;//"http://mtzqdn.locojoy.com/huodong1.html";
        $.ajax({
            type: "GET",
            url: shareUrl,
            crossDomain: true,
            dataType: "jsonp",
            data: "&url=" + myLink,
            success: function (rst) {
                if (rst['error']) { //请求的数据返回错误的时候
                    // alert(rst['error']);
                } else {
                    var data = rst["data"];
                    share_api(data);
                };
            }
        });

        function share_api(data) {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data["appid"], // 必填，公众号的唯一标识
                timestamp: data["timestamp"], // 必填，生成签名的时间戳
                nonceStr: data["noncestr"], // 必填，生成签名的随机串
                signature: data["signature"], // 必填，签名，见附录1
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onRecordEnd',
                    'playVoice',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(function () {
                shareContent();
            });

            function shareContent() {
                var shareData, shareDataFriend, shareDataQQ, shareDataWeibo;
                if (!different) {//都一样
                    shareData = {
                        title: title,
                        link: link,
                        imgUrl: imgUrl
                    }
                    shareDataFriend = {
                        title: title,
                        desc: desc,
                        link: link,
                        imgUrl: imgUrl
                    };
                    shareDataQQ = {
                        title: title,
                        desc: desc,
                        link: link,
                        imgUrl: imgUrl
                    };
                    shareDataWeibo = {
                        title: title,
                        desc: desc,
                        link: link,
                        imgUrl: imgUrl
                    };
                }
                else {//不一样
                    shareData = {
                        title: title[0],
                        link: link[0],
                        imgUrl: imgUrl[0]
                    }
                    shareDataFriend = {
                        title: title[1],
                        desc: desc[1],
                        link: link[1],
                        imgUrl: imgUrl[1]
                    };
                    shareDataQQ = {
                        title: title[2],
                        desc: desc[2],
                        link: link[2],
                        imgUrl: imgUrl[2]
                    };
                    shareDataWeibo = {
                        title: title[3],
                        desc: desc[3],
                        link: link[3],
                        imgUrl: imgUrl[3]
                    };
                }

                wx.onMenuShareTimeline({
                    title: shareData.title,
                    link: shareData.link,
                    imgUrl: shareData.imgUrl,
                    trigger: function (res) { //用户点击分享到朋友圈
                    },
                    success: function (res) { //用户确认分享后执行的回调函数
                    },
                    cancel: function (res) { //用户取消分享后执行的回调函数
                    },
                    fail: function (res) {
                        // alert(JSON.stringify(res));
                    }
                });
                wx.onMenuShareAppMessage({
                    title: shareDataFriend.title,
                    desc: shareDataFriend.desc,
                    link: shareDataFriend.link,
                    imgUrl: shareDataFriend.imgUrl,
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                wx.onMenuShareQQ({
                    title: shareDataQQ.title,
                    desc: shareDataQQ.desc,
                    link: shareDataQQ.link,
                    imgUrl: shareDataQQ.imgUrl,
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareWeibo({
                    title: shareDataWeibo.title,
                    desc: shareDataWeibo.desc,
                    link: shareDataWeibo.link,
                    imgUrl: shareDataWeibo.imgUrl,
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            };
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
    //灰度方法 调用方法wz.setContentGray.grayscale(obj)
    setContentGray: {
        grayscale: (function () { var config = { colorProps: ['color', 'backgroundColor', 'borderBottomColor', 'borderTopColor', 'borderLeftColor', 'borderRightColor', 'backgroundImage'], externalImageHandler: { init: function (el, src) { if (el.nodeName.toLowerCase() === 'img') { } else { data(el).backgroundImageSRC = src; el.style.backgroundImage = '' } }, reset: function (el) { if (el.nodeName.toLowerCase() === 'img') { } else { el.style.backgroundImage = 'url(' + (data(el).backgroundImageSRC || '') + ')' } } } }, log = function () { try { window.console.log.apply(console, arguments) } catch (e) { } }, isExternal = function (url) { return (new RegExp('https?://(?!' + window.location.hostname + ')')).test(url) }, data = (function () { var cache = [0], expando = 'data' + (+new Date()); return function (elem) { var cacheIndex = elem[expando], nextCacheIndex = cache.length; if (!cacheIndex) { cacheIndex = elem[expando] = nextCacheIndex; cache[cacheIndex] = {} } return cache[cacheIndex] } })(), desatIMG = function (img, prepare, realEl) { var canvas = document.createElement('canvas'), context = canvas.getContext('2d'), height = img.naturalHeight || img.offsetHeight || img.height, width = img.naturalWidth || img.offsetWidth || img.width, imgData; canvas.height = height; canvas.width = width; context.drawImage(img, 0, 0); try { imgData = context.getImageData(0, 0, width, height) } catch (e) { } if (prepare) { desatIMG.preparing = true; var y = 0; (function () { if (!desatIMG.preparing) { return } if (y === height) { context.putImageData(imgData, 0, 0, 0, 0, width, height); realEl ? (data(realEl).BGdataURL = canvas.toDataURL()) : (data(img).dataURL = canvas.toDataURL()) } for (var x = 0; x < width; x++) { var i = (y * width + x) * 4; imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = RGBtoGRAYSCALE(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]) } y++; setTimeout(arguments.callee, 0) })(); return } else { desatIMG.preparing = false } for (var y = 0; y < height; y++) { for (var x = 0; x < width; x++) { var i = (y * width + x) * 4; imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = RGBtoGRAYSCALE(imgData.data[i], imgData.data[i + 1], imgData.data[i + 2]) } } context.putImageData(imgData, 0, 0, 0, 0, width, height); return canvas }, getStyle = function (el, prop) { var style = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(el, null)[prop] : el.currentStyle[prop]; if (style && /^#[A-F0-9]/i.test(style)) { var hex = style.match(/[A-F0-9]{2}/ig); style = 'rgb(' + parseInt(hex[0], 16) + ',' + parseInt(hex[1], 16) + ',' + parseInt(hex[2], 16) + ')' } return style }, RGBtoGRAYSCALE = function (r, g, b) { return parseInt((0.2125 * r) + (0.7154 * g) + (0.0721 * b), 10) }, getAllNodes = function (context) { var all = Array.prototype.slice.call(context.getElementsByTagName('*')); all.unshift(context); return all }; var init = function (context) { if (context && context[0] && context.length && context[0].nodeName) { var allContexts = Array.prototype.slice.call(context), cIndex = -1, cLen = allContexts.length; while (++cIndex < cLen) { init.call(this, allContexts[cIndex]) } return } context = context || document.documentElement; if (!document.createElement('canvas').getContext) { context.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)'; context.style.zoom = 1; return } var all = getAllNodes(context), i = -1, len = all.length; while (++i < len) { var cur = all[i]; if (cur.nodeName.toLowerCase() === 'img') { var src = cur.getAttribute('src'); if (!src) { continue } if (isExternal(src)) { config.externalImageHandler.init(cur, src) } else { data(cur).realSRC = src; try { cur.src = data(cur).dataURL || desatIMG(cur).toDataURL() } catch (e) { config.externalImageHandler.init(cur, src) } } } else { for (var pIndex = 0, pLen = config.colorProps.length; pIndex < pLen; pIndex++) { var prop = config.colorProps[pIndex], style = getStyle(cur, prop); if (!style) { continue } if (cur.style[prop]) { data(cur)[prop] = style } if (style.substring(0, 4) === 'rgb(') { var monoRGB = RGBtoGRAYSCALE.apply(null, style.match(/\d+/g)); cur.style[prop] = style = 'rgb(' + monoRGB + ',' + monoRGB + ',' + monoRGB + ')'; continue } if (style.indexOf('url(') > -1) { var urlPatt = /\(['"]?(.+?)['"]?\)/, url = style.match(urlPatt)[1]; if (isExternal(url)) { config.externalImageHandler.init(cur, url); data(cur).externalBG = true; continue } try { var imgSRC = data(cur).BGdataURL || (function () { var temp = document.createElement('img'); temp.src = url; return desatIMG(temp).toDataURL() })(); cur.style[prop] = style.replace(urlPatt, function (_, url) { return '(' + imgSRC + ')' }) } catch (e) { config.externalImageHandler.init(cur, url) } } } } } }; init.reset = function (context) { if (context && context[0] && context.length && context[0].nodeName) { var allContexts = Array.prototype.slice.call(context), cIndex = -1, cLen = allContexts.length; while (++cIndex < cLen) { init.reset.call(this, allContexts[cIndex]) } return } context = context || document.documentElement; if (!document.createElement('canvas').getContext) { context.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(grayscale=0)'; return } var all = getAllNodes(context), i = -1, len = all.length; while (++i < len) { var cur = all[i]; if (cur.nodeName.toLowerCase() === 'img') { var src = cur.getAttribute('src'); if (isExternal(src)) { config.externalImageHandler.reset(cur, src) } cur.src = data(cur).realSRC || src } else { for (var pIndex = 0, pLen = config.colorProps.length; pIndex < pLen; pIndex++) { if (data(cur).externalBG) { config.externalImageHandler.reset(cur) } var prop = config.colorProps[pIndex]; cur.style[prop] = data(cur)[prop] || '' } } } }; init.prepare = function (context) { if (context && context[0] && context.length && context[0].nodeName) { var allContexts = Array.prototype.slice.call(context), cIndex = -1, cLen = allContexts.length; while (++cIndex < cLen) { init.prepare.call(null, allContexts[cIndex]) } return } context = context || document.documentElement; if (!document.createElement('canvas').getContext) { return } var all = getAllNodes(context), i = -1, len = all.length; while (++i < len) { var cur = all[i]; if (data(cur).skip) { return } if (cur.nodeName.toLowerCase() === 'img') { if (cur.getAttribute('src') && !isExternal(cur.src)) { desatIMG(cur, true) } } else { var style = getStyle(cur, 'backgroundImage'); if (style.indexOf('url(') > -1) { var urlPatt = /\(['"]?(.+?)['"]?\)/, url = style.match(urlPatt)[1]; if (!isExternal(url)) { var temp = document.createElement('img'); temp.src = url; desatIMG(temp, true, cur) } } } } }; return init })(),
    }


};
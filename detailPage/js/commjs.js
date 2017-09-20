/**
 * Created by Administrator on 2017/9/20.
 */
// intelligent_v2: {
//     cssPropertyArr: {
//         cssPropertyArray: [],
//             regBackgroundArray: []
//     },
//     data: {
//         url: $("#mobile_css").attr("href"),
//             size: [1024, 1472],
//             autoScreen: ["height", "width"],//默认竖版
//             callback: {}
//     },
//     init: function (options) {
//         $.extend(this.data, options);
//         $.ajax({
//             url: this.data.url,
//             type: "GET",
//             dataType: "html",
//             success: function (data) {
//                 setTimeout(function () {
//                     wz.intelligent_v2.cssNameAttr(data, options);
//                 }, 1);
//             }
//         });
//     },
//     cssNameAttr: function (cssdata, options) {
//         var g, h, i, j, k, l, d = cssdata, data = wz.intelligent_v2.data,
//             e = "/*startdom*/",
//             f = "/*enddom*/";
//         g = "", h = "",
//             d = d.substr(d.indexOf(e) + e.length),
//             d = d.substring(0, d.indexOf(f)),
//             g = cssdata.substr(cssdata.indexOf(f) + f.length),
//             i = d.replace(/([\d\.]+)(?:px)/gi, "|"),
//             j = d.match(/([\d\.]+)(?:px)/gi),
//             k = i.split("|"),
//             l = function () {
//                 if (j == null) { return false; }
//                 var width = $(window).width();
//                 var height = $(window).height();
//                 var type = 0;
//                 if (width > height) {//横屏
//                     type = 1;
//                 }
//                 else {//竖屏
//                     type = 0;
//                 }
//                 var e, f, h, i, l, m, n, o, p, q, r, a = "", c = "", d, cssPropertyArr = wz.intelligent_v2.cssNameAttr;
//                 if (wz.intelligent_v2.data.autoScreen[type] == "height") { d = $(window).height(); } else { d = $(window).width(); }
//                 for (cssPropertyArr.cssPropertyArray = [], cssPropertyArr.regBackgroundArray = [], e = 0, f = j.length; f >= e; e++) {
//                     f > e && (h = parseInt(j[e]),
//                         i = Math.round(h / data.size[type] * d),
//                         cssPropertyArr.cssPropertyArray.push(i + "px")),
//                         a += e == cssPropertyArr.cssPropertyArray.length ? k[e] : k[e] + cssPropertyArr.cssPropertyArray[e];
//                 }
//                 if (a.indexOf("jpg") > -1 || a.indexOf("png") > -1 || a.indexOf("gif") > -1) {
//                     for (l = a.replace(/(?=\()[^)]+(?=\))/g, "||"),
//                              m = a.match(/(?=\()[^)]+(?=\))/g),
//                              n = l.split("||"),
//                              e = 0, o = m.length; o >= e; e++) {
//                         o > e && (p = m[e].replace(/[(""'')"]/g, ""), p = p.replace(/^..\//g, ""),
//                             q = "(" + p,
//                             cssPropertyArr.regBackgroundArray.push(q)),
//                             c += e == cssPropertyArr.regBackgroundArray.length ? n[e] : n[e] + cssPropertyArr.regBackgroundArray[e];
//                     }
//                 }
//                 else {
//                     c += a;
//                 }
//                 $("#resizestyle").remove(),
//                     r = '<style id="resizestyle" type="text/css">' + (c) + "</style>",
//                 $(window).width() <= data.size[type] && $("head:eq(0)").append(r);
//                 if ((data.callback && typeof (data.callback) === "function") && data.callback()) {
//                     data.callback();
//                 }
//             }
//         l(),
//             $(window).on("resize", function () {
//                 wz.browser.versions_v2.iPad() || wz.browser.versions_v2.iPhone() ? l() : (clearTimeout(h),
//                     h = setTimeout(function () {
//                         l();
//                     }, 10));
//             });
//     }
// },
(function intellgent(){

})
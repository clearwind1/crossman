/**
 * Created by yang on 15/9/20.
 */
var GameUtil;
(function (GameUtil) {
    /**
     * 创建矩形实心框
     * @param x {number} x轴坐标
     * @param y {number} y轴坐标
     * @param width {number} 长度
     * @param height {number} 高度
     * @param alpha {number} 透明度
     * @param color {number} 颜色
     * @returns {egret.Shape}
     */
    function createRect(x, y, width, height, alpha, color, ellipseWidth, ellipseHeight) {
        if (alpha === void 0) { alpha = 1; }
        if (color === void 0) { color = 0x000000; }
        if (ellipseWidth === void 0) { ellipseWidth = 0; }
        var shp = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRoundRect(0, 0, width, height, ellipseWidth, ellipseHeight);
        //shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        return shp;
    }
    GameUtil.createRect = createRect;
    /**
     * 创建一个实心的圆
     * @param x     x轴坐标
     * @param y     y轴坐标
     * @param r     半径
     * @param alpha 透明度
     * @param color 颜色
     */
    function createCircle(x, y, r, alpha, color) {
        if (alpha === void 0) { alpha = 1; }
        if (color === void 0) { color = 0x000000; }
        var shp = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawCircle(0, 0, r);
        shp.graphics.endFill();
        return shp;
    }
    GameUtil.createCircle = createCircle;
    /**
     * 将Object转化成 =& post字符串;
     * @param postData
     * @returns {string}
     */
    function objectToString(postData) {
        var s = '';
        for (var key in postData) {
            var k_v = key + '=' + postData[key];
            s += k_v + '&';
        }
        s = s.substr(0, s.length - 1);
        return s;
    }
    GameUtil.objectToString = objectToString;
    /**
     * 正则表达式判断是否为中文
     * @param name
     * @returns {boolean}
     */
    function isChineseName(name) {
        return /^[\u4e00-\u9fa5]+$/.test(name);
    }
    GameUtil.isChineseName = isChineseName;
    function removeimag(name) {
        name = name.replace(/^/, '');
        return name;
    }
    GameUtil.removeimag = removeimag;
    /**
     * 正则表达式判断是否为手机号码
     * @param num
     * @returns {boolean}
     */
    function isPhoneNum(num) {
        num = num.toUpperCase();
        return /^0\d{2,3}-?\d{7,11}$|^1\d{10}$/.test(num);
    }
    GameUtil.isPhoneNum = isPhoneNum;
    /**
     * 本地文件操作
     * @param key {string} 文件的关键字
     * @param data {string} 文件内容
     */
    function saveLocalData(key, data) {
        egret.localStorage.setItem(key, data);
    }
    GameUtil.saveLocalData = saveLocalData;
    function readLocalData(key) {
        return egret.localStorage.getItem(key);
    }
    GameUtil.readLocalData = readLocalData;
    function clearLocalData(key) {
        if (key != null) {
            egret.localStorage.removeItem(key);
        }
        else {
            egret.localStorage.clear();
        }
    }
    GameUtil.clearLocalData = clearLocalData;
    /**
     * 获取当前链接参数
     * @param name 参数名
     */
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return null;
    }
    GameUtil.getQueryString = getQueryString;
    function setscreenY(y) {
        if (y >= GameConfig.DesignHeight / 2) {
            return GameConfig.getSH() - (GameConfig.DesignHeight - y);
        }
        else {
            return y;
        }
    }
    GameUtil.setscreenY = setscreenY;
    /**
     * 向服务器发起微信红包请求
     * @param money     金额
     * @param openid    玩家openid
     * @param nickname  玩家昵称
     * @param backfun   完成回调函数
     * @param cont      函数域
     */
    function getredPack(money, openid, nickNm, backfun, cont, url) {
        if (url === void 0) { url = GameConfig.IP; }
        var ipstr = window['getIP'];
        //console.log('ipstr======',ipstr);
        //alert('ipstr====='+ipstr);
        var ipstrspl;
        for (var i = 0; i < ipstr.split('|').length; i++) {
            if (ipstr.split('|')[i].length > 6) {
                ipstrspl = ipstr.split('|')[i];
                break;
            }
        }
        //alert('ipstrspl======'+ipstrspl);
        //console.log('ipstrspl====',ipstrspl);
        //console.log("money======", money);
        var param = {
            openId: openid,
            amount: money,
            ip: ipstrspl,
            nickname: nickNm,
            gameid: 0
        };
        GameUtil.Http.getinstance().send(param, "/weixinpay/pay", backfun, cont, url);
    }
    GameUtil.getredPack = getredPack;
    /**判断类型 */
    function isSomeType(type) {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf(type) != -1) {
            return true;
        }
        else {
            return false;
        }
    }
    GameUtil.isSomeType = isSomeType;
    /**
     * 定位相对位置
     * @param objtarget     要改变位置的对象
     * @param objfixed      相对位置的对象
     * @param posx          x轴位置
     * @param posy          y轴位置
     * @param anx
     */
    function relativepos(objtarget, objfixed, posx, posy, anx) {
        if (anx === void 0) { anx = false; }
        if (!anx) {
            objtarget.x = objfixed.x - objfixed.width / 2 + posx;
            objtarget.y = objfixed.y - objfixed.height / 2 + posy;
        }
    }
    GameUtil.relativepos = relativepos;
    /**
     * 绝对位置x
     * @dis 与右边距的距离
     */
    function absposx(dis) {
        return (GameConfig.getSW() - dis);
    }
    GameUtil.absposx = absposx;
    /**
     * 绝对位置y
     * @dis 与底部边距的距离
     */
    function absposy(dis) {
        return (GameConfig.getSH() - dis);
    }
    GameUtil.absposy = absposy;
    function trace() {
        var optionalParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            optionalParams[_i - 0] = arguments[_i];
        }
        optionalParams[0] = "[DebugLog]" + optionalParams[0];
        console.log.apply(console, optionalParams);
    }
    GameUtil.trace = trace;
    /**
     * 获取两者间较大者
     */
    function MAX(a, b) {
        return (a > b ? a : b);
    }
    GameUtil.MAX = MAX;
    /**
     * 获取两者间较小者
     */
    function MIN(a, b) {
        return (a < b ? a : b);
    }
    GameUtil.MIN = MIN;
    /**
     * 清除定时器
     */
    function clearinterval(intervalarr) {
        //trace('clear interval====');
        for (var i = 0; i < intervalarr.length; i++) {
            var interval = intervalarr[i];
            //var index: number = intervalarr.indexOf(interval);
            //if (index > -1) {
            egret.clearInterval(interval);
        }
        intervalarr = [];
    }
    GameUtil.clearinterval = clearinterval;
    function getText(url) {
        // var url = "http://h5.sxd55.com/config/moregamename.json";
        var request = new egret.HttpRequest();
        var respHandler = function (evt) {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request = evt.currentTarget;
                    console.log("respHandler:n", request.response);
                    return request.response;
                //break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.log("respHandler io error");
                    break;
            }
        };
        var progressHandler = function (evt) {
            console.log("progress:", evt.bytesLoaded, evt.bytesTotal);
        };
        request.once(egret.Event.COMPLETE, respHandler, null);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, null);
        request.once(egret.ProgressEvent.PROGRESS, progressHandler, null);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }
    GameUtil.getText = getText;
    function Telnumber(num) {
        window.location.href = "tel://" + num;
    }
    GameUtil.Telnumber = Telnumber;
    function checkChild(element, arr) {
        if (arr.indexOf(element) != -1) {
            return true;
        }
        return false;
    }
    GameUtil.checkChild = checkChild;
    function getrect(obj, offx, offy) {
        if (offx === void 0) { offx = 0; }
        if (offy === void 0) { offy = 0; }
        var rect = obj.getBounds();
        rect.x = obj.x - obj.width / 2 + offx;
        rect.y = obj.y - obj.height / 2 + offy;
        return rect;
    }
    GameUtil.getrect = getrect;
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=utils.js.map
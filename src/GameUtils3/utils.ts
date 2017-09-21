/**
 * Created by yang on 15/9/20.
 */
module GameUtil {
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
    export function createRect(x: number, y: number, width: number, height: number, alpha: number = 1, color: number = 0x000000, ellipseWidth: number = 0, ellipseHeight?: number): egret.Shape {
        var shp: egret.Shape = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawRoundRect(0, 0, width, height, ellipseWidth, ellipseHeight);
        //shp.graphics.drawRect(0, 0, width, height);
        shp.graphics.endFill();
        return shp;
    }
    /**
     * 创建一个实心的圆
     * @param x     x轴坐标
     * @param y     y轴坐标
     * @param r     半径
     * @param alpha 透明度
     * @param color 颜色
     */
    export function createCircle(x: number, y: number, r: number, alpha: number = 1, color: number = 0x000000): egret.Shape {
        var shp: egret.Shape = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color, alpha);
        shp.graphics.drawCircle(0, 0, r);
        shp.graphics.endFill();
        return shp;
    }

    /**
     * 将Object转化成 =& post字符串;
     * @param postData
     * @returns {string}
     */
    export function objectToString(postData): string {
        var s = '';
        for (var key in postData) {
            var k_v = key + '=' + postData[key];
            s += k_v + '&';
        }
        s = s.substr(0, s.length - 1);
        return s;
    }

    /**
     * 正则表达式判断是否为中文
     * @param name
     * @returns {boolean}
     */
    export function isChineseName(name: string): boolean {
        return /^[\u4e00-\u9fa5]+$/.test(name);
    }

    export function removeimag(name: string): string {

        name = name.replace(/^/, '');
        return name;
    }

    /**
     * 正则表达式判断是否为手机号码
     * @param num
     * @returns {boolean}
     */
    export function isPhoneNum(num: string): boolean {
        num = num.toUpperCase();
        return /^0\d{2,3}-?\d{7,11}$|^1\d{10}$/.test(num);
    }

    /**
     * 本地文件操作
     * @param key {string} 文件的关键字
     * @param data {string} 文件内容
     */
    export function saveLocalData(key: string, data: string) {
        egret.localStorage.setItem(key, data);
    }
    export function readLocalData(key: string): string {
        return egret.localStorage.getItem(key);
    }
    export function clearLocalData(key: string) {
        if (key != null) {
            egret.localStorage.removeItem(key);
        }
        else {
            egret.localStorage.clear();
        }

    }

    /**
     * 获取当前链接参数
     * @param name 参数名
     */
    export function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }

    export function setscreenY(y: number): number {
        if (y >= GameConfig.DesignHeight / 2) {
            return GameConfig.getSH() - (GameConfig.DesignHeight - y);
        } else {
            return y;
        }
    }
    /**
     * 向服务器发起微信红包请求
     * @param money     金额
     * @param openid    玩家openid
     * @param nickname  玩家昵称
     * @param backfun   完成回调函数
     * @param cont      函数域
     */
    export function getredPack(money: number, openid: any, nickNm: string, backfun: Function, cont: any, url: string = GameConfig.IP) {
        var ipstr: string = window['getIP'];
        //console.log('ipstr======',ipstr);
        //alert('ipstr====='+ipstr);
        var ipstrspl: string;
        for (var i: number = 0; i < ipstr.split('|').length; i++) {
            if (ipstr.split('|')[i].length > 6) {
                ipstrspl = ipstr.split('|')[i];
                break;
            }
        }
        //alert('ipstrspl======'+ipstrspl);
        //console.log('ipstrspl====',ipstrspl);
        //console.log("money======", money);
        var param: Object = {
            openId: openid,
            amount: money,
            ip: ipstrspl,
            nickname: nickNm,
            gameid: 0
        }
        GameUtil.Http.getinstance().send(param, "/weixinpay/pay", backfun, cont, url);
    }
    /**判断类型 */
    export function isSomeType(type: string) {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf(type) != -1) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 定位相对位置
     * @param objtarget     要改变位置的对象
     * @param objfixed      相对位置的对象
     * @param posx          x轴位置
     * @param posy          y轴位置
     * @param anx
     */
    export function relativepos(objtarget: any, objfixed: any, posx: number, posy: number, anx: boolean = false) {
        if (!anx) {
            objtarget.x = objfixed.x - objfixed.width / 2 + posx;
            objtarget.y = objfixed.y - objfixed.height / 2 + posy;
        }
    }
    /**
     * 绝对位置x
     * @dis 与右边距的距离
     */
    export function absposx(dis: number): number {
        return (GameConfig.getSW() - dis);
    }
    /**
     * 绝对位置y
     * @dis 与底部边距的距离
     */
    export function absposy(dis: number): number {
        return (GameConfig.getSH() - dis);
    }

    export function trace(...optionalParams: any[]): void {
        optionalParams[0] = "[DebugLog]" + optionalParams[0];
        console.log.apply(console, optionalParams);
    }
    /**
     * 获取两者间较大者
     */
    export function MAX(a: any, b: any): any {
        return (a > b ? a : b);
    }
    /**
     * 获取两者间较小者
     */
    export function MIN(a: any, b: any): any {
        return (a < b ? a : b);
    }
    /**
     * 清除定时器
     */
    export function clearinterval(intervalarr: any) {
        //trace('clear interval====');
        for (var i: number = 0; i < intervalarr.length; i++) {
            var interval: number = intervalarr[i];
            //var index: number = intervalarr.indexOf(interval);
            //if (index > -1) {
            egret.clearInterval(interval);
            //intervalarr.splice(index, 1);
            //}

        }
        intervalarr = [];
    }

    export function getText(url: string): any {
        // var url = "http://h5.sxd55.com/config/moregamename.json";
        var request: egret.HttpRequest = new egret.HttpRequest();
        var respHandler = function (evt: egret.Event): void {
            switch (evt.type) {
                case egret.Event.COMPLETE:
                    var request: egret.HttpRequest = evt.currentTarget;
                    console.log("respHandler:n", request.response);
                    return request.response;

                //break;
                case egret.IOErrorEvent.IO_ERROR:
                    console.log("respHandler io error");
                    break;
            }
        }
        var progressHandler = function (evt: egret.ProgressEvent): void {
            console.log("progress:", evt.bytesLoaded, evt.bytesTotal);
        }
        request.once(egret.Event.COMPLETE, respHandler, null);
        request.once(egret.IOErrorEvent.IO_ERROR, respHandler, null);
        request.once(egret.ProgressEvent.PROGRESS, progressHandler, null);
        request.open(url, egret.HttpMethod.GET);
        request.send();
    }

    export function Telnumber(num: string) {
        window.location.href = "tel://" + num;
    }

    export function checkChild(element: any, arr: any[]) {
        if (arr.indexOf(element) != -1) {
            return true;
        }
        return false;
    }

    export function getrect(obj: any, offx = 0, offy = 0): egret.Rectangle {
        var rect: egret.Rectangle = obj.getBounds();
        rect.x = obj.x - obj.width / 2 + offx;
        rect.y = obj.y - obj.height / 2 + offy;

        return rect;
    }

}
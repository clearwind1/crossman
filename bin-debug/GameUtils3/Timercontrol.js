/**
 * Create by hardy on 16/12/28
 * 定时器类
 */
var Timercontrol = (function () {
    function Timercontrol(delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 0; }
        this.timer = new egret.Timer(delay, repeatCount);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
    }
    var d = __define,c=Timercontrol,p=c.prototype;
    /**
     * 初始化
     * @delay 延迟时间
     * @repeatCount 重复次数，0为无限重复（默认0）
     */
    p.init = function (tagetobj, fun, params) {
        console.log('inittime');
        this.tagetobj = tagetobj;
        this.fun = fun;
        this.params = params;
    };
    p.start = function () {
        this.timer.start();
    };
    p.stop = function () {
        this.timer.stop();
    };
    /**
     * 回调函数
     */
    p.timerFunc = function (event) {
        //console.log('run');
        if (this.tagetobj) {
            this.fun.apply(this.tagetobj, this.params);
        }
    };
    return Timercontrol;
}());
egret.registerClass(Timercontrol,'Timercontrol');
//# sourceMappingURL=Timercontrol.js.map
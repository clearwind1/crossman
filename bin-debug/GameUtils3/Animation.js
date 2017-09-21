/**
 * 帧动画
 * Created by pior on 15/9/28.
 */
var Animation = (function (_super) {
    __extends(Animation, _super);
    /**
     * 创建一个帧动画。
     * @param textureName {string} 帧动画文件名的前缀。
     * @param totalNumber {number} 总帧数。
     * @param frameRate {number} 帧率。
     */
    function Animation(textureName, totalNumber, frameRate, posx, posy) {
        _super.call(this, RES.getRes(textureName + '1' + '_png'), posx, posy);
        this.currentNumber = 0;
        this.countNumber = 0;
        this.bLoopCount = 0;
        this.endcallfun = null;
        this.thisObj = null;
        this.params = [];
        this.bremove = true;
        this.bpause = false;
        this.textureName = textureName;
        this.totalNumber = totalNumber;
        this.frameRate = frameRate;
    }
    var d = __define,c=Animation,p=c.prototype;
    /**
     * 设置动画循环次数，参数小于0为无限循环
     * @param bloopcount {number}
     */
    p.setLoop = function (bloopcount) {
        if (bloopcount == 0)
            bloopcount = 1;
        this.bLoopCount = bloopcount - 1;
    };
    p.setRemove = function (bremove) {
        this.bremove = bremove;
    };
    /**播放 */
    p.play = function () {
        this.intervaltag = egret.setInterval(this.run, this, this.frameRate);
    };
    p.run = function () {
        this.nextFrame();
    };
    p.pause = function () {
        this.bpause = true;
    };
    p.resume = function () {
        this.bpause = false;
    };
    p.stop = function () {
        egret.clearInterval(this.intervaltag);
    };
    p.nextFrame = function () {
        if (this.bpause) {
            return;
        }
        this.currentNumber++;
        if (this.currentNumber >= this.totalNumber) {
            this.currentNumber = 1;
            if (this.bLoopCount == 0) {
                this.stop();
                if (this.endcallfun != null)
                    this.endcallfun.apply(this.thisObj, this.params);
                if (this.bremove)
                    this.parent.removeChild(this);
                return;
            }
            else if (this.bLoopCount > 0) {
                this.bLoopCount--;
            }
        }
        this.setNewTexture(RES.getRes(this.textureName + this.currentNumber + '_png'));
    };
    /**切换动画 */
    p.switchani = function (textureName, totalNumber, loopcount, bremove, frameRate) {
        if (loopcount === void 0) { loopcount = -1; }
        if (bremove === void 0) { bremove = true; }
        if (frameRate === void 0) { frameRate = this.frameRate; }
        this.stop();
        this.textureName = textureName;
        this.totalNumber = totalNumber;
        this.currentNumber = 0;
        this.bLoopCount = loopcount;
        this.bremove = bremove;
        this.frameRate = frameRate;
        this.play();
    };
    /**
     * 动画播放完毕后要执行的函数
     * @param func {Function} 所要执行的函数
     * @param thisobj {any} 执行函数的stage
     */
    p.setendcall = function (func, thisobj, params) {
        this.thisObj = thisobj;
        this.endcallfun = func;
        this.params = params;
    };
    return Animation;
}(MyBitmap));
egret.registerClass(Animation,'Animation');
//# sourceMappingURL=Animation.js.map
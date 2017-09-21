/**
 * 等待响应
 * Created by pior on 15/11/11.
 */
var GameUtil;
(function (GameUtil) {
    var WaitServerPanel = (function (_super) {
        __extends(WaitServerPanel, _super);
        function WaitServerPanel(alpha) {
            if (alpha === void 0) { alpha = 0; }
            _super.call(this);
            this.init(alpha);
        }
        var d = __define,c=WaitServerPanel,p=c.prototype;
        p.init = function (alpha) {
            this.coverBg = GameUtil.createRect(0, 0, 640, 1136, 0);
            this.addChild(this.coverBg);
            this.touchEnabled = true;
        };
        p.setAlpha = function (aplha) {
            this.coverBg.alpha = aplha;
        };
        WaitServerPanel.getInstace = function () {
            if (this._instance == null) {
                this._instance = new GameUtil.WaitServerPanel(0);
            }
            return this._instance;
        };
        return WaitServerPanel;
    }(egret.DisplayObjectContainer));
    GameUtil.WaitServerPanel = WaitServerPanel;
    egret.registerClass(WaitServerPanel,'GameUtil.WaitServerPanel');
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=WaitServerPanel.js.map
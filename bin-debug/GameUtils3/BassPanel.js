/**
 * 基础面板类
 * Created by pior on 15/9/28.
 */
var GameUtil;
(function (GameUtil) {
    var BassPanel = (function (_super) {
        __extends(BassPanel, _super);
        function BassPanel(params) {
            _super.call(this);
            this.mStageW = egret.MainContext.instance.stage.stageWidth;
            this.mStageH = egret.MainContext.instance.stage.stageHeight;
            if (params)
                this.params = params;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var d = __define,c=BassPanel,p=c.prototype;
        p.onAddToStage = function (event) {
            if (this.params)
                this.init(this.params);
            else
                this.init();
        };
        p.init = function (params) {
        };
        return BassPanel;
    }(egret.DisplayObjectContainer));
    GameUtil.BassPanel = BassPanel;
    egret.registerClass(BassPanel,'GameUtil.BassPanel');
    /*
     *场景类
     */
    var GameScene = (function () {
        function GameScene() {
        }
        var d = __define,c=GameScene,p=c.prototype;
        /**
         * 初始化场景类
         * @param stage
         */
        GameScene.init = function (stage) {
            this.MainStage = stage;
        };
        /**
         * 切换场景
         * @param scene {egret.DisplayObjectContainer} 所要切换到的场景
         * @param transtype {number} 切换场景时的动画类型
         * @param duration {number} 切换场景的时间
         */
        GameScene.runscene = function (scene, transtype, duration) {
            if (transtype === void 0) { transtype = SceneEffect.NullAction; }
            if (duration === void 0) { duration = 800; }
            if (this.curScene == null) {
                //console.log("curscenenull");
                this.curScene = scene;
                this.MainStage.addChild(this.curScene);
                return;
            }
            if (transtype == SceneEffect.NullAction) {
                //console.log("curscenenullaction");
                if (this.curScene != null) {
                    this.MainStage.removeChild(this.curScene);
                }
                this.curScene = scene;
                this.MainStage.addChild(this.curScene);
                return;
            }
            else {
                this.nextScene = scene;
                this.MainStage.addChild(this.nextScene);
                //场景动画
                if (transtype == SceneEffect.TransAlpha) {
                    this.nextScene.alpha = 0;
                    egret.Tween.get(this.curScene).to({ alpha: 0 }, duration);
                    egret.Tween.get(this.nextScene).to({ alpha: 1 }, duration);
                }
                if (transtype == SceneEffect.CrossLeft) {
                    this.nextScene.x = -this.MainStage.stageWidth;
                    egret.Tween.get(this.curScene).to({ x: this.MainStage.stageWidth }, duration);
                    egret.Tween.get(this.nextScene).to({ x: 0 }, duration);
                }
                if (transtype == SceneEffect.OpenDoor) {
                }
                var local = this;
                egret.setTimeout(function () {
                    local.MainStage.removeChild(local.curScene);
                    local.curScene = local.nextScene;
                }, this, duration);
            }
        };
        GameScene.curScene = null;
        GameScene.nextScene = null;
        GameScene.MainStage = null;
        return GameScene;
    }());
    GameUtil.GameScene = GameScene;
    egret.registerClass(GameScene,'GameUtil.GameScene');
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=BassPanel.js.map
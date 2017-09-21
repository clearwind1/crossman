/**
 * Created by pior on 15/9/29.
 */
var GameUtil;
(function (GameUtil) {
    /**
     * 加载进度界面
     * Process interface loading
     */
    var LoadingPanel = (function (_super) {
        __extends(LoadingPanel, _super);
        function LoadingPanel(fun, obj, offx, offy, isgif, gifTotal) {
            if (offx === void 0) { offx = 0; }
            if (offy === void 0) { offy = 0; }
            if (isgif === void 0) { isgif = false; }
            if (gifTotal === void 0) { gifTotal = 4; }
            _super.call(this);
            this.loadedfun = fun;
            this.thisObj = obj;
            this.IsGif = isgif;
            this.gifTotalcount = gifTotal;
            this.loadingbarOffX = offx;
            this.loadingbarOffY = offy;
        }
        var d = __define,c=LoadingPanel,p=c.prototype;
        p.init = function () {
            //RES.getResByUrl(this.imageUrl,this.onComplete,this,RES.ResourceItem.TYPE_IMAGE);
            new GameUtil.LoadingLogopre(this.onComplete, this);
            if (GameConfig.IsLoadSound)
                this.loadsound();
        };
        p.loadsound = function () {
            for (var i = 0; i < GameConfig.SoundName.length; i++) {
                var soundname = GameConfig.SoundName[i];
                GameData._i().gamesound[i] = new MySound(soundname);
                var soundtype = soundname.indexOf('bgm') > 0 ? egret.Sound.MUSIC : egret.Sound.EFFECT;
                GameData._i().gamesound[i].soundtype = soundtype;
            }
        };
        p.onComplete = function (event) {
            //console.log("onComplete");
            if (this.IsGif) {
                this.gifruncount = 0;
                this.loadingbar = new MyBitmap(RES.getRes("loadinggif0_png"), this.mStageW / 2 + this.loadingbarOffX, this.mStageH / 2 + this.loadingbarOffY);
                this.addChild(this.loadingbar);
                egret.setInterval(this.rungif, this, 150);
            }
            else {
                this.loadingbar = new MyBitmap(RES.getRes("loadingbar_png"), this.loadingbarOffX, this.mStageH / 2 + this.loadingbarOffY);
                this.loadingbar.x = (this.mStageW - this.loadingbar.texture.textureWidth) / 2;
                this.loadingbar.anchorOffsetX = 0;
                var w = this.loadingbar.texture.textureWidth - 8;
                var h = this.loadingbar.texture.textureHeight - 8;
                var rect = new egret.Rectangle(4, 4, w, h);
                this.loadingbar.scale9Grid = rect;
                this.addChild(this.loadingbar);
                this.loadingbar.width = 10;
            }
            this.loadingRes();
        };
        p.rungif = function () {
            this.gifruncount++;
            if (this.gifruncount >= this.gifTotalcount) {
                this.gifruncount = 0;
            }
            this.loadingbar.setNewTexture(RES.getRes("loadinggif" + this.gifruncount + "_png"));
        };
        p.loadingRes = function () {
            //设置加载进度界面
            //Config to load process interface
            this.loadingView = new LoadingUI();
            this.loadingView.x = this.mStageW / 2;
            this.loadingView.y = this.mStageH / 2 + this.loadingbarOffY + 30;
            this.addChild(this.loadingView);
            this.loadingView.anchorOffsetX = this.loadingView.width / 2;
            //初始化Resource资源加载库
            //initiate Resource loading library
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/default.res.json", "resource/");
        };
        /**
         * 配置文件加载完成,开始预加载preload资源组。
         * configuration file loading is completed, start to pre-load the preload resource group
         */
        p.onConfigComplete = function (event) {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup("preload");
        };
        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        p.onResourceLoadComplete = function (event) {
            if (event.groupName == "preload") {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                //if(GameUtil.GameConfig.bRunFPS)
                //    egret.Profiler.run();
                this.loadedfun.apply(this.thisObj);
            }
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        p.onResourceLoadError = function (event) {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        };
        /**
         * preload资源组加载进度
         * Loading process of preload resource group
         */
        p.onResourceProgress = function (event) {
            if (event.groupName == "preload") {
                if (!this.IsGif) {
                    this.setPro(event.itemsLoaded / event.itemsTotal);
                }
                this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
            }
        };
        p.setPro = function (persend) {
            this.loadingbar.width = this.loadingbar.texture.textureWidth * persend;
            //console.log("this.width=====",this.width);
        };
        p.getPro = function () {
            return this.loadingbar.width / this.loadingbar.texture.textureWidth;
        };
        return LoadingPanel;
    }(GameUtil.BassPanel));
    GameUtil.LoadingPanel = LoadingPanel;
    egret.registerClass(LoadingPanel,'GameUtil.LoadingPanel');
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=LoadingPanel.js.map
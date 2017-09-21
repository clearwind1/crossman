/**
 * Created by pior on 16/1/15.
 */
var GameUtil;
(function (GameUtil) {
    /**
     * 加载进度界面
     * Process interface loading
     */
    var LoadingLogopre = (function () {
        function LoadingLogopre(fun, obj) {
            this.loadedfun = fun;
            this.thisObj = obj;
            this.loadingRes();
        }
        var d = __define,c=LoadingLogopre,p=c.prototype;
        p.loadingRes = function () {
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
            RES.loadGroup("preloading");
        };
        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        p.onResourceLoadComplete = function (event) {
            if (event.groupName == "preloading") {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
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
            if (event.groupName == "preloading") {
            }
        };
        return LoadingLogopre;
    }());
    GameUtil.LoadingLogopre = LoadingLogopre;
    egret.registerClass(LoadingLogopre,'GameUtil.LoadingLogopre');
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=LoadingLogopre.js.map
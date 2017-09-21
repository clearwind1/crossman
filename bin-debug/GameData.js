/**
 * Created by pior on 16/12/15.
 * 游戏数据
 */
var GameData = (function () {
    function GameData() {
        this.gamesound = []; //游戏声音
        this.init();
    }
    var d = __define,c=GameData,p=c.prototype;
    p.init = function () {
        this.GamePause = false;
        this.GameOver = false;
        this.isLoadingend = false;
        this.gamescore = 0;
        this.GameLevel = 1;
    };
    GameData._i = function () {
        return (this._inst = (this._inst == null ? new GameData() : this._inst));
    };
    GameData._inst = null;
    return GameData;
}());
egret.registerClass(GameData,'GameData');
//# sourceMappingURL=GameData.js.map
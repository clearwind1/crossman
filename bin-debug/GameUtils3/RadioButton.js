/**
 * 单选按钮
 * Created by pior on 15/11/10.
 */
var GameUtil;
(function (GameUtil) {
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        function RadioButton(normalt, selectt) {
            _super.call(this);
            this.item = [];
            this.curseltTag = 0;
            this.itemCount = -1;
            this.normalTexture = normalt;
            this.selectTexture = selectt;
            this.init();
        }
        var d = __define,c=RadioButton,p=c.prototype;
        p.init = function () {
        };
        p.addItem = function (item, pox, poy) {
            this.itemCount++;
            var itemcon = new egret.DisplayObjectContainer();
            var itembtn = new GameUtil.Menu(this, this.normalTexture, this.normalTexture, this.chooseButton, [this.itemCount]);
            itembtn.x = pox;
            itembtn.y = poy;
            itemcon.addChild(itembtn);
            item.x = pox + itembtn.width / 2 + item.width / 2;
            item.y = poy;
            itemcon.addChild(item);
            this.item.push(itembtn);
            this.addChild(itemcon);
            if (this.itemCount == 0) {
                itembtn.setButtonTexture(this.selectTexture, this.selectTexture);
            }
        };
        p.chooseButton = function (tag) {
            if (tag != this.curseltTag) {
                var itembtn = this.item[tag];
                itembtn.setButtonTexture(this.selectTexture, this.selectTexture);
                var lastbtn = this.item[this.curseltTag];
                lastbtn.setButtonTexture(this.normalTexture, this.normalTexture);
                this.curseltTag = tag;
            }
        };
        p.getCurSelectTag = function () {
            return this.curseltTag;
        };
        return RadioButton;
    }(egret.DisplayObjectContainer));
    GameUtil.RadioButton = RadioButton;
    egret.registerClass(RadioButton,'GameUtil.RadioButton');
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=RadioButton.js.map
/**
 * Created by pior on 15/12/30.
 */
var GameUtil;
(function (GameUtil) {
    var InputTextFiled = (function (_super) {
        __extends(InputTextFiled, _super);
        function InputTextFiled(x, y, size, width, height, anchorX, anchorY) {
            if (anchorX === void 0) { anchorX = 0.5; }
            if (anchorY === void 0) { anchorY = 0.5; }
            _super.call(this, x, y, size, anchorX, anchorY);
            this.width = width;
            this.height = size;
            this.type = egret.TextFieldType.INPUT;
            this.baseText = "";
            this.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
            this.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
        }
        var d = __define,c=InputTextFiled,p=c.prototype;
        p.setBaseText = function (basetext, alpha) {
            this.baseText = basetext;
            this.baseTextAlpha = alpha;
            this.setText(this.baseText);
            this.alpha = this.baseTextAlpha;
            //console.log("height=====",this.anchorOffsetY);
        };
        p.setBaseTextSize = function (size, sourcesize) {
            this.basetextsize = size;
            this.sourcesize = sourcesize;
            if (this.text == this.baseText) {
                this.setSize(this.basetextsize);
                this.height = size;
            }
        };
        p.onFocusIn = function (event) {
            //console.log("focusein");
            if (this.text == this.baseText) {
                this.setText("");
                this.height = this.sourcesize;
                this.setSize(this.sourcesize);
                this.alpha = 1;
            }
        };
        p.onFocusOut = function (event) {
            //console.log("focuseout");
            if (this.text == "") {
                this.setText(this.baseText);
                this.alpha = this.baseTextAlpha;
                this.height = this.basetextsize;
                this.setSize(this.basetextsize);
            }
            //console.log("outheight=====",this.anchorOffsetY);
        };
        return InputTextFiled;
    }(GameUtil.MyTextField));
    GameUtil.InputTextFiled = InputTextFiled;
    egret.registerClass(InputTextFiled,'GameUtil.InputTextFiled');
})(GameUtil || (GameUtil = {}));
//# sourceMappingURL=InputTextFiled.js.map
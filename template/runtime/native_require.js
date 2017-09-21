
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/weixinapi/weixinapi.js",
	"bin-debug/BGMPlayer.js",
	"bin-debug/GameData.js",
	"bin-debug/GameUtils3/BassPanel.js",
	"bin-debug/Othercontainer.js",
	"bin-debug/GameHelpPageShow.js",
	"bin-debug/GameOverPageShow.js",
	"bin-debug/GameRankPageShow.js",
	"bin-debug/GameScene.js",
	"bin-debug/GameSetting.js",
	"bin-debug/GameUtils3/AdaptGamelayer.js",
	"bin-debug/GameUtils3/MyBitmap.js",
	"bin-debug/GameUtils3/Animation.js",
	"bin-debug/GameUtils3/DateUtils.js",
	"bin-debug/GameUtils3/GameConfig.js",
	"bin-debug/GameUtils3/GetImageByUrl.js",
	"bin-debug/GameUtils3/GetResByany.js",
	"bin-debug/GameUtils3/GuideLayer.js",
	"bin-debug/GameUtils3/Http.js",
	"bin-debug/GameUtils3/MyTextField.js",
	"bin-debug/GameUtils3/InputTextFiled.js",
	"bin-debug/GameUtils3/LoadingLogopre.js",
	"bin-debug/GameUtils3/LoadingPanel.js",
	"bin-debug/GameUtils3/Menu.js",
	"bin-debug/GameUtils3/MySound.js",
	"bin-debug/GameUtils3/ProgressBar.js",
	"bin-debug/GameUtils3/RadioButton.js",
	"bin-debug/GameUtils3/RandomUtils.js",
	"bin-debug/GameUtils3/ScrollView.js",
	"bin-debug/GameUtils3/SharePage.js",
	"bin-debug/GameUtils3/Timercontrol.js",
	"bin-debug/GameUtils3/TipsPanel.js",
	"bin-debug/GameUtils3/WaitServerPanel.js",
	"bin-debug/GameUtils3/utils.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/SharePageShow.js",
	"bin-debug/StartGameScene.js",
	"bin-debug/qr/QR8bitByte.js",
	"bin-debug/qr/QRBitBuffer.js",
	"bin-debug/qr/QRPolynomial.js",
	"bin-debug/qr/QRCode.js",
	"bin-debug/qr/QRCodeModel.js",
	"bin-debug/qr/QRErrorCorrectLevel.js",
	"bin-debug/qr/QRMaskPattern.js",
	"bin-debug/qr/QRMath.js",
	"bin-debug/qr/QRMode.js",
	"bin-debug/qr/QRRSBlock.js",
	"bin-debug/qr/QRUtil.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};
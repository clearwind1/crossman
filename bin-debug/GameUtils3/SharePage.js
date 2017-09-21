/**
 * Created by pior on 16/3/22.
 */
var SharePage = (function (_super) {
    __extends(SharePage, _super);
    function SharePage() {
        _super.call(this);
        this.desctext = '盛讯小游戏--泡泡大作战';
        this.newurl = 'http://bubblefightv02.h5.gamexun.com/';
    }
    var d = __define,c=SharePage,p=c.prototype;
    /**
     * 获取签名分享
     */
    p.getSignPackage = function () {
        var urllocal = encodeURIComponent(window.location.href.split('#')[0]);
        //console.log("url=====", urllocal);
        var parma = {
            url: urllocal
        };
        GameUtil.Http.getinstance().send(parma, "/weixinshare/share", this.share, this, "127.0.0.1/php/getweixinconfig.php"); //http://api.h5.gamexun.com/weixinshare/share
        //GameUtil.Http.getinstance().send(parma,"/jssdk/config",this.share,this,'api.sztc.gamexun.com')
    };
    p.share = function (data) {
        console.log("data======", data);
        //this.shareTip();
        //alert("id==="+data['appId']+"\ntimestamp==="+data['timestamp']+"\nnonceStr==="+data['noncestr']+"\nsign==="+data['sign']);
        //........................................................
        //基本配置
        //配置参数
        wx.config({
            debug: true,
            appId: data['appId'],
            timestamp: Number(data['timestamp']),
            nonceStr: data['nonceStr'],
            signature: data['signature'],
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'chooseWXPay'
            ]
        });
        //下面可以加更多接口,可自行扩展
        this.getWeiXinShareTimeline(); //分享朋友圈
        this.getWeiXinShareAppMessage();
    };
    p.setdesctext = function (text) {
        this.desctext = text;
        this.getWeiXinShareAppMessage();
        this.getWeiXinShareTimeline();
    };
    p.setNewUrl = function (url) {
        this.newurl = url;
        this.getWeiXinShareAppMessage();
        this.getWeiXinShareTimeline();
    };
    /**
     * 获取微信分享到朋友圈
     */
    p.getWeiXinShareTimeline = function () {
        var self = this;
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = this.desctext;
        bodyMenuShareTimeline.link = this.newurl;
        bodyMenuShareTimeline.imgUrl = 'http://bubblefightv02.h5.gamexun.com/shareicon.png';
        bodyMenuShareTimeline.trigger = function () {
            // alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = function () {
            //alert('已分享');
            //window[ 'weChat' ]();
            //alert('已分享')
            //self.closesharetip();
            //self.sharesuccess();
        };
        bodyMenuShareTimeline.cancel = function () {
            //alert('已取消');
            // window[ 'weChat' ]();
            //self.closesharetip();
        };
        bodyMenuShareTimeline.fail = function (res) {
            //alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
        //alert('已注册获取“分享到朋友圈”状态事件');
    };
    /**
     * 获取微信分享到朋友
     */
    p.getWeiXinShareAppMessage = function () {
        var self = this;
        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = '盛讯小游戏--泡泡大作战';
        bodyMenuShareAppMessage.desc = this.desctext;
        bodyMenuShareAppMessage.link = this.newurl;
        bodyMenuShareAppMessage.imgUrl = 'http://bubblefightv02.h5.gamexun.com/shareicon.png';
        bodyMenuShareAppMessage.trigger = function () {
            // alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = function () {
            //alert('已分享');
            //self.closesharetip();
            //self.sharesuccess();
        };
        bodyMenuShareAppMessage.cancel = function () {
            //alert('已取消');
            //self.closesharetip();
        };
        bodyMenuShareAppMessage.fail = function (res) {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        // alert('已注册获取“发送给朋友”状态事件');
    };
    p.order = function (resultdata) {
        wx.chooseWXPay({
            appId: resultdata['appId'],
            timestamp: resultdata['timeStamp'],
            nonceStr: resultdata['nonceStr'],
            package: resultdata['package'],
            signType: resultdata['signType'],
            paySign: resultdata['paySign'],
            success: function (res) {
                console.log('success');
                //alert(res);
            },
            cancel: function (res) {
                console.log('faile');
                //alert(res);
            }
        });
    };
    SharePage._i = function () {
        if (this.inst == null) {
            this.inst = new SharePage();
        }
        return this.inst;
    };
    return SharePage;
}(egret.DisplayObjectContainer));
egret.registerClass(SharePage,'SharePage');
//# sourceMappingURL=SharePage.js.map
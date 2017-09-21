/**
 * Created by pior on 16/3/22.
 */


class SharePage extends egret.DisplayObjectContainer
{

    private desctext: string = '盛讯小游戏--泡泡大作战';
    private newurl: string = 'http://bubblefightv02.h5.gamexun.com/';

    public constructor()
    {
        super();
    }
    /**
     * 获取签名分享
     */
    public getSignPackage() {

        var urllocal:string = encodeURIComponent(window.location.href.split('#')[0]);

        //console.log("url=====", urllocal);
        var parma:Object = {
            url: urllocal
        }
        GameUtil.Http.getinstance().send(parma,"/weixinshare/share",this.share,this,"127.0.0.1/php/getweixinconfig.php");//http://api.h5.gamexun.com/weixinshare/share
        //GameUtil.Http.getinstance().send(parma,"/jssdk/config",this.share,this,'api.sztc.gamexun.com')
    }
    private share(data:any):void
    {
        console.log("data======",data);

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
        this.getWeiXinShareTimeline();//分享朋友圈
        this.getWeiXinShareAppMessage();
    }

    public setdesctext(text:string)
    {
        this.desctext = text;
        this.getWeiXinShareAppMessage();
        this.getWeiXinShareTimeline();
    }
    public setNewUrl(url:string)
    {
        this.newurl = url;
        this.getWeiXinShareAppMessage();
        this.getWeiXinShareTimeline();
    }

    /**
     * 获取微信分享到朋友圈
     */
    private getWeiXinShareTimeline() {

        var self:any = this;
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = this.desctext;
        bodyMenuShareTimeline.link = this.newurl;
        bodyMenuShareTimeline.imgUrl = 'http://bubblefightv02.h5.gamexun.com/shareicon.png';
        bodyMenuShareTimeline.trigger = ()=> {
            // alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = ()=> {
            //alert('已分享');
            //window[ 'weChat' ]();
            //alert('已分享')
            //self.closesharetip();
            //self.sharesuccess();
        };
        bodyMenuShareTimeline.cancel = ()=> {
            //alert('已取消');
            // window[ 'weChat' ]();
            //self.closesharetip();
        };
        bodyMenuShareTimeline.fail = (res)=> {
            //alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
        //alert('已注册获取“分享到朋友圈”状态事件');
    }
    /**
     * 获取微信分享到朋友
     */
    private getWeiXinShareAppMessage(){

        var self: any = this;

        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = '盛讯小游戏--泡泡大作战';
        bodyMenuShareAppMessage.desc = this.desctext;
        bodyMenuShareAppMessage.link = this.newurl;
        bodyMenuShareAppMessage.imgUrl = 'http://bubblefightv02.h5.gamexun.com/shareicon.png';
        bodyMenuShareAppMessage.trigger = ()=> {
            // alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = ()=> {
            //alert('已分享');
            //self.closesharetip();
            //self.sharesuccess();
        };
        bodyMenuShareAppMessage.cancel = ()=> {
            //alert('已取消');
            //self.closesharetip();

        };
        bodyMenuShareAppMessage.fail = (res)=> {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        // alert('已注册获取“发送给朋友”状态事件');
    }

    public order(resultdata) {
        wx.chooseWXPay({
            appId: resultdata['appId'],
            timestamp: resultdata['timeStamp'], // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符  
            nonceStr: resultdata['nonceStr'], // 支付签名随机串，不长于 32 位  
            package: resultdata['package'], // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）  
            signType: resultdata['signType'], // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
            paySign: resultdata['paySign'], // 支付签名  
            success: function (res) {
                console.log('success');
                //alert(res);

            },
            cancel: function (res) {
                console.log('faile');
                //alert(res);
            }
        });
    }

    private static inst: SharePage;
    public static _i(): SharePage
    {
        if(this.inst == null)
        {
            this.inst = new SharePage();
        }

        return this.inst;
    }

}
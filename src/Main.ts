//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        /**获取玩家openid 与 分享者shareopenid */
        //PlayerData._i().UserInfo.openid = GameUtil.getQueryString('openid');
        //PlayerData._i().UserInfo.shareopenid = GameUtil.getQueryString('shareopenid');

        // var obj = {
        //     name: 'yang',
        //     age: 1,
        //     sex: '男'
        // };
        // GameUtil.saveLocalData('infoObj', JSON.stringify(obj));
        // var objs = JSON.parse(GameUtil.readLocalData('infoObj'));
        // console.log(objs);

        //return;

        if (!GameConfig.DEBUG) {
            // if (!GameUtil.getQueryString('openid')) {
            //     if (GameUtil.getQueryString('shareopenid')) {
            //         window.location.href = 'http://api.h5.gamexun.com/weixin/auth?game_redirecturl=http://bubblefightv02.h5.gamexun.com/&shareopenid=' + GameUtil.getQueryString('shareopenid');
            //     }
            //     else {
            //         window.location.href = 'http://api.h5.gamexun.com/weixin/auth?game_redirecturl=http://bubblefightv02.h5.gamexun.com/';
            //     }
            // }
            // else {
            //     if (!GameUtil.getQueryString('shareopenid')) {
            //         PlayerData._i().UserInfo.shareopenid = null;
            //     }
            //     else {
            //         PlayerData._i().UserInfo.shareopenid = GameUtil.getQueryString('shareopenid');
            //     }
            //     /**配置游戏基本信息 */
            //     this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;  
            //     this.stage.setContentSize(GameConfig.DesignWidth, GameConfig.DesignHeight);
            //     GameUtil.GameScene.init(this.stage);
            //     GameUtil.GameScene.runscene(new GameUtil.LoadingPanel(this.createGameScene, this, 0, 0));
            // }
        }
        else {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
            this.stage.setContentSize(GameConfig.DesignWidth, GameConfig.DesignHeight);
            GameUtil.GameScene.init(this.stage);
            GameUtil.GameScene.runscene(new GameUtil.LoadingPanel(this.createGameScene, this, 0, 0));
        }
    }
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene(): void {
        //GameConfig.MoreGameName = RES.getRes('moregamename_json');
        //console.log('GameConfig.MoreGameName======', GameConfig.MoreGameName);
        GameUtil.Http.getinstance();
        GameUtil.GameScene.runscene(new StartGameScene());

    }

}



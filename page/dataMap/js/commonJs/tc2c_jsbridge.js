//
//  tc2c_jsbridge.js
//  tc2c_jsbridge
//
//  Created by Liyipeng on 15-3-28.
//  Copyright (c) 2015年 Kailashtech Technology Co., Ltd. All rights reserved.
//

var _ResVersionShow = '1.00.01';    //报表框架版本号
var reportPath = 'report';          //报表获取路径
//判定平台类型
var browserType;                    //平台类型
function checkIosAndroid () {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        browserType = 'ios';
    } else if (/(Android)/i.test(navigator.userAgent)) {
        browserType = 'android';
    } else {
        browserType = 'pc';
    }
}
checkIosAndroid ();
//获取平台类型
function getBrowSerType() {
    return browserType
}

var _tc2c_sysPlatform = "_tc2c_"+ getBrowSerType();     //平台类型

function tc2c_SetPlatformType(type)
{
    _tc2c_sysPlatform = type;

    if (type == '_tc2c_localfile') {
        reportPath = 'reportTemp';
        _tc2c_dataReadType = "_tc2c_localfile";
    }
}

function tc2c_getSysPlatform(){
    return _tc2c_sysPlatform;
}

//Save data to public data cache
function tc2c_SaveDataToDic(data)
{
    var b64 = new Base64();
    var encodeStr = b64.encode(data);
    _tc2c_sysDataCache = {};
    _tc2c_sysDataCache = encodeStr;
}

//Save alert to public data cache
function tc2c_SaveAlertToDic(data)
{
    var b64 = new Base64();
    var encodeStr = b64.encode(data);
    _tc2c_sysAlertCache = "";
    _tc2c_sysAlertCache = encodeStr;
}


//Send info to app(eg. ios/android)
function tc2c_PostNotifyToApp(userInfo) {

    var uriSrc = "";

    //Save data to cache
    tc2c_SaveDataToDic(userInfo);

    if (getBrowSerType() == "ios")
    {
//        uriSrc = "jstc2c://receivedatalogic";
//        
//        iframe = document.createElement("iframe");
//        iframe.style.display = "none";
//        iframe.src = uriSrc;
//        var cleanFn = function(state){
//            //console.log(state)
//            try {
//                iframe.parentNode.removeChild(iframe);
//            } catch (error) {}
//        };
//        iframe.onload = cleanFn;
//        document.documentElement.appendChild(iframe);
        
        window.webkit.messageHandlers.AppModel.postMessage(_tc2c_sysDataCache);
        
    }
    else if (getBrowSerType() == "android") {

        tc2cJSBridge.onAndroidCallback(_tc2c_sysDataCache);
    }
    else {
        uriSrc = "";
    }
}

//Open alert view to app(eg. ios/android)
function tc2c_Alert(msg) {

    tc2c_SaveAlertToDic(msg);

    if (getBrowSerType() == "ios")
    {
        uriSrc = "jstc2c://receivedataalert";

        iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.src = uriSrc;
        var cleanFn = function(state){
            //console.log(state)
            try {
                iframe.parentNode.removeChild(iframe);
            } catch (error) {}
        };
        iframe.onload = cleanFn;
        document.documentElement.appendChild(iframe);
    }
    else if (getBrowSerType() == "android") {

        alert(msg);
    }
    else {

        alert(msg);
    }
}

//前端组包发送
function sendToOS (jsonIn) {
    var transType = jsonIn.transType;
    var httpType = get_TransSendType(transType);
    var osUrl = get_TransUrl(transType);
    var sendJson = jsonIn;

    sendJson.netUrl = osUrl;
    sendJson.sendType = httpType;

    tmp_json = $.toJSON(sendJson);


    tc2c_PostNotifyToApp(tmp_json);
}

/*!
 *  //各交易请求URL链接
 */
var _TransUrl_R01	="report/getReportDir";  //搜索参加点赞、投票活动的用户
var _TransUrl_R03	="report/reportData";  //搜索参加点赞、投票活动的用户
var _TransUrl_R04	="report/setReportDir";  //获取报表目录列表
var _TransUrl_R05	="report/createReport";  //创建报表或报表目录
var _TransUrl_R06	="report/deleteReport";  //删除报表或报表目录
var _TransUrl_R07	="report/getDirConfig";  //获取模板配置信息
var _TransUrl_R08	="sqlConfig/getSqlConfig";  //获取模板sqlConfig
var _TransUrl_R09	="";  //更换模板


var _httpType_Post        =1;
var _httpType_Get         =2;
var _httpType_Delete      =3;
var _httpType_Put         =4;

function get_TransSendType(transType)
{
    var sendType = _httpType_Post;

    return sendType;
}

function get_TransUrl (transType)
{
    var osUrl = "";
    if (transType == "R01")
    {
        osUrl = _TransUrl_R01;
    }
    else if (transType == "R03")
    {
        osUrl = _TransUrl_R03;
    }
    else if (transType == "R04")
    {
        osUrl = _TransUrl_R04;
    }
    else if (transType == "R05")
    {
        osUrl = _TransUrl_R05;
    }
    else if (transType == "R06")
    {
        osUrl = _TransUrl_R06;
    }
    else if (transType == "R07")
    {
        osUrl = _TransUrl_R07;
    }
    else if (transType == "R08")
    {
        osUrl = _TransUrl_R08;
    }
    else if (transType == "R09")
    {
        osUrl = _TransUrl_R09;
    }

    return osUrl;
}

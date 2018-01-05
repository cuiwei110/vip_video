// ==UserScript==
// @name         各大视频站VIP会员地址解析播放
// @namespace    videoVIPParser
// @version      0.0.3
// @description  解析各大视频网站如优酷，腾讯，乐视，爱奇艺，芒果，哔哩哔哩，音悦台等网站VIP或会员视频，可以直接跳转以及备用接口跳转。
// @author       ding(AT)gong.si
// @org-author   王然 https://greasyfork.org/scripts/27530
// @match        *://*.iqiyi.com/v_*
// @match        *://v.youku.com/*
// @match        *://*.le.com/*
// @match        *://v.qq.com/*
// @match        *://*.tudou.com/*
// @match        *://*.mgtv.com/*
// @match        *://film.sohu.com/*
// @match        *://*.acfun.cn/v/*
// @match        *://*.bilibili.com/video/*
// @match        *://vip.1905.com/play/*
// @match        *://vip.pptv.com/show/*
// @match        *://v.yinyuetai.com/video/*
// @match        *://v.yinyuetai.com/playlist/*
// @match        *://*.fun.tv/vplay/*
// @match        *://*.wasu.cn/Play/show/*
// @grant        GM_addStyle
// ==/UserScript==

//日志函数
var debug = false;
var log_count = 1;
function slog(c1,c2,c3){
    c1 = c1?c1:'';
    c2 = c2?c2:'';
    c3 = c3?c3:'';
    if(debug) console.log('#'+ log_count++ +'-ScriptLog:',c1,c2,c3);
}

var theplayurl = window.location.href;

(function() {
    'use strict';
    GM_addStyle('#TManays{z-index:99999; position:absolute; left:0px; top:0px; width:170px; height:auto; border:0; margin:0;}'+
                '#TMul{position:fixed; left:-156px; top:145px;width:140px; background-color:#555; opacity:0.8; border:3px solid #555; list-style:none; margin:0; padding:5px;}'+
                '#TMul li{margin:0; padding:3px;} '+
                '#TMul li a{font-size:15px; margin:0; padding:3px; color:white;} '+
                '#TMGobtn{position:fixed; left:0; top:100px;cursor:pointer;outline:none; width:70px; height:40px; border-width:2px 4px 2px 0px; border-color:#ffff00; background-color:#ffff00; border-style:solid; font:12px "微软雅黑"; color:#ff0000; margin:0; padding:0;} '+
                '#TMbtn{position:fixed; left:0; top:145px;cursor:pointer;outline:none; width:70px; height:40px; border-width:2px 4px 2px 0px; border-color:#ffff00; background-color:#ffff00; border-style:solid; font:12px "微软雅黑"; color:#aaa; margin:0; padding:0;}');
    function btnTg(){
		var btn=document.getElementById("TMbtn");
		var ul=document.getElementById("TMul");
		if(btn.style.left===""||parseInt(btn.style.left)<10){btn.style.left=156+"px";ul.style.left=0; btn.innerText="◁";}else{btn.style.left=0;ul.style.left=-156+"px"; btn.innerText="▷";}
	}

    //添加爱奇艺VIP的解析方式
	function preload_all(){
		if(theplayurl.indexOf('iqiyi') > 0) preload_iqiyi();
	}

    function preload_iqiyi(){
        slog('albumId',Q.PageInfo.playPageInfo.albumId);
        if(Q.PageInfo.playPageInfo.albumId !== undefined ){
            var s = document.createElement("script"), el = document.getElementsByTagName("script")[0];
            s.async = false;
            s.src = document.location.protocol + "//cache.video.qiyi.com/jp/avlist/"+ Q.PageInfo.playPageInfo.albumId +"/1/50/";
            el.parentNode.insertBefore(s, el);
        }
	}
	function prego_all(){
		if(theplayurl.indexOf('iqiyi') > 0) prego_iqiyi();
	}
    function prego_iqiyi(){
		var ele = document.querySelectorAll('li[class="item selected"] > span').length ? document.querySelectorAll('li[class="item selected"] > span')[1] : document.querySelectorAll('li[class="item no selected"] > span')[1];
        if(ele !== undefined ){
            var pd = ele.parentNode.getAttribute('data-pd');
            if(pd > 0){
                var vinfo = tvInfoJs.data.vlist[pd-1];
                if(vinfo.vurl.length > 0){
                    theplayurl = vinfo.vurl;
                }
            }
        }
    }
    function btnGo(){
        prego_all();
        window.open('http://phone.mailseason.com/vip?url='+theplayurl, "_blank");//默认使用mailseason，直接跳转
    }
    preload_all();
    var div=document.createElement("div");
    div.innerHTML='<div id="TManays">'+
  '<ul id="TMul">'+
        '<li><a href="http://api.baiyug.cn/vip/index.php?url='+theplayurl+'" target="_blank">百域阁</a></li>'+
        '<li><a href="http://api.47ks.com/webcloud/?v='+theplayurl+'" target="_blank">47影视云</a></li>'+
        '<li><a href="http://jiexi.071811.cc/jx.php?url='+theplayurl+'" target="_blank">石头云接口</a></li>'+
        '<li><a href="http://www.0335haibo.com/tong.php?url='+theplayurl+'" target="_blank">CKFLV云</a></li>'+
        '<li><a href="http://q.z.vip.totv.72du.com/?url='+theplayurl+'" target="_blank">VIP看看</a></li>'+
        '<li><a href="http://yyygwz.com/index.php?url='+theplayurl+'" target="_blank">yyygwz.com</a></li>'+
        '<li><a href="http://yun.zihu.tv/play.html?url='+theplayurl+'" target="_blank">紫狐</a></li>'+
        '<li><a href="http://www.sfsft.com/admin.php?url='+theplayurl+'" target="_blank">无名小站2</a></li>'+
        '<li><a href="http://www.yydy8.com/common/?url='+theplayurl+'" target="_blank">歪歪电影</a></li>'+
        '<li><a href="http://mt2t.com/yun?url='+theplayurl+'" target="_blank">迷失之梦</a></li>'+
        '<li><a href="http://www.vipjiexi.com/yun.php?url='+theplayurl+'" target="_blank">眼睛会下雨</a></li>'+
        '<li><a href="http://www.tuhao13.com/yunparse/index.php?url='+theplayurl+'" target="_blank">土豪网</a></li>'+
        '<li><a href="http://qtzr.net/s/?qt='+theplayurl+'" target="_blank">舞动秋天</a></li>'+
        '<li><a href="http://api.cloudparse.com/?url='+theplayurl+'" target="_blank">CloudParse</a></li>'+
        '<li><a href="http://www.521804.com/www/jiexi.php?url='+theplayurl+'" target="_blank">爱看影院列表</a></li>'+
   '</ul>'+
	'<button id="TMGobtn">VIP播放 ▶</button>'+
	'<button id="TMbtn">备用 ▷</button>'+
  '</div>';
    document.body.appendChild(div);
    document.querySelector("#TMGobtn").addEventListener("click",btnGo,false);
    document.querySelector("#TMbtn").addEventListener("click",btnTg,false);
})();
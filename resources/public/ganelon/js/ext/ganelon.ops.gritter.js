// Copyright (c) Tomek Lipski. All rights reserved.  The use
// and distribution terms for this software are covered by the Eclipse
// Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
// which can be found in the file LICENSE.txt at the root of this
// distribution.  By using this software in any fashion, you are
// agreeing to be bound by the terms of this license.  You must not
// remove this notice, or any other, from this software.
/*
 * Gritter for jQuery
 * http://www.boedesign.com/
 *
 * Copyright (c) 2012 Jordan Boesch
 * Dual licensed under the MIT and GPL licenses.
 *
 * Date: February 24, 2012
 * Version: 1.7.4
 */
(function(a){a.gritter={},a.gritter.options={position:"",class_name:"",fade_in_speed:"medium",fade_out_speed:1e3,time:6e3},a.gritter.add=function(a){try{return b.add(a||{})}catch(c){var d="Gritter Error: "+c;typeof console!="undefined"&&console.error?console.error(d,a):alert(d)}},a.gritter.remove=function(a,c){b.removeSpecific(a,c||{})},a.gritter.removeAll=function(a){b.stop(a||{})};var b={position:"",fade_in_speed:"",fade_out_speed:"",time:"",_custom_timer:0,_item_count:0,_is_setup:0,_tpl_close:'<div class="gritter-close">×</div>',_tpl_item:'<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]"><span class="gritter-title">[[username]]</span><p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',_tpl_wrap:'<div id="gritter-notice-wrapper"></div>',add:function(c){if(!c.title||!c.text)throw'You need to fill out the first 2 params: "title" and "text"';this._is_setup||this._runSetup();var d=c.title,e=c.text,f=c.image||"",g=c.sticky||!1,h=c.class_name||a.gritter.options.class_name,i=a.gritter.options.position,j=c.time||"";this._verifyWrapper(),this._item_count++;var k=this._item_count,l=this._tpl_item;a(["before_open","after_open","before_close","after_close"]).each(function(d,e){b["_"+e+"_"+k]=a.isFunction(c[e])?c[e]:function(){}}),this._custom_timer=0,j&&(this._custom_timer=j);var m=f!=""?'<img src="'+f+'" class="gritter-image" />':"",n=f!=""?"gritter-with-image":"gritter-without-image";l=this._str_replace(["[[username]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[d,e,this._tpl_close,m,this._item_count,n,h],l);if(this["_before_open_"+k]()===!1)return!1;a("#gritter-notice-wrapper").addClass(i).append(l);var o=a("#gritter-item-"+this._item_count);return o.fadeIn(this.fade_in_speed,function(){b["_after_open_"+k](a(this))}),g||this._setFadeTimer(o,k),a(o).bind("mouseenter mouseleave",function(c){c.type=="mouseenter"?g||b._restoreItemIfFading(a(this),k):g||b._setFadeTimer(a(this),k),b._hoverState(a(this),c.type)}),a(o).find(".gritter-close").click(function(){b.removeSpecific(k,{},null,!0)}),k},_countRemoveWrapper:function(b,c,d){c.remove(),this["_after_close_"+b](c,d),a(".gritter-item-wrapper").length==0&&a("#gritter-notice-wrapper").remove()},_fade:function(a,c,d,e){var d=d||{},f=typeof d.fade!="undefined"?d.fade:!0,g=d.speed||this.fade_out_speed,h=e;this["_before_close_"+c](a,h),e&&a.unbind("mouseenter mouseleave"),f?a.animate({opacity:0},g,function(){a.animate({height:0},300,function(){b._countRemoveWrapper(c,a,h)})}):this._countRemoveWrapper(c,a)},_hoverState:function(a,b){b=="mouseenter"?(a.addClass("hover"),a.find(".gritter-close").show()):(a.removeClass("hover"),a.find(".gritter-close").hide())},removeSpecific:function(b,c,d,e){if(!d)var d=a("#gritter-item-"+b);this._fade(d,b,c||{},e)},_restoreItemIfFading:function(a,b){clearTimeout(this["_int_id_"+b]),a.stop().css({opacity:"",height:""})},_runSetup:function(){for(opt in a.gritter.options)this[opt]=a.gritter.options[opt];this._is_setup=1},_setFadeTimer:function(a,c){var d=this._custom_timer?this._custom_timer:this.time;this["_int_id_"+c]=setTimeout(function(){b._fade(a,c)},d)},stop:function(b){var c=a.isFunction(b.before_close)?b.before_close:function(){},d=a.isFunction(b.after_close)?b.after_close:function(){},e=a("#gritter-notice-wrapper");c(e),e.fadeOut(function(){a(this).remove(),d()})},_str_replace:function(a,b,c,d){var e=0,f=0,g="",h="",i=0,j=0,k=[].concat(a),l=[].concat(b),m=c,n=l instanceof Array,o=m instanceof Array;m=[].concat(m),d&&(this.window[d]=0);for(e=0,i=m.length;e<i;e++){if(m[e]==="")continue;for(f=0,j=k.length;f<j;f++)g=m[e]+"",h=n?l[f]!==undefined?l[f]:"":l[0],m[e]=g.split(k[f]).join(h),d&&m[e]!==g&&(this.window[d]+=(g.length-m[e].length)/k[f].length)}return o?m:m[0]},_verifyWrapper:function(){a("#gritter-notice-wrapper").length==0&&a("body").append(this._tpl_wrap)}}})(jQuery)


Ganelon.registerOperation('notification', function(o) { $.gritter.add(o); });

$.extend($.gritter.options, {
    position: 'bottom-right', // defaults to 'top-right' but can be 'bottom-left', 'bottom-right', 'top-left', 'top-right' (added in 1.7.1)
	fade_in_speed: 'medium', // how fast notifications fade in (string or int)
	fade_out_speed: 2000, // how fast the notices fade out
	time: 6000 // hang on the screen for...
});



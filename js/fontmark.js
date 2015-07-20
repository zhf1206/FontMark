/**
 * 
 * @authors Zeke (zhf_1206@126.com)
 * @date    2015-07-14 13:10:16
 * @version V1.0
 */

(function($) {
	$.fn.fontMark = function(options) {
		/*
		 *	说明：数字放大镜随着字数延伸
		 *	ipttype ： 输入类型（0-默认  1-身份证   2-手机号   3-银行卡）
		 *	separator：分隔符（空格 or 横线）
		 *	sepnum：   分隔位数（默认0,1,2,3……）	
		 *	seprule：  分隔规则默认（身份证： 3 3 4 4 4   手机号： 3 4 4   银行卡：4 4 4 4）
		 */
		var defaults = {
			ipttype: 0,    //输入类型
			separator: ' ',//分隔符
			sepnum: 0,     //分隔位数
			seprule: []    //分隔规则数组
		};
		// Extend our default options with those provided.    
		var opts = $.extend({}, defaults, options);
		// Our plugin implementation code goes here. 
		$this = $(this);

		//定义预展示输入框的坐标
		var glassT = $this.offset().top,
			glassL = $this.offset().left;
		//定义放大显示的Html
		var glassStr = '<div id="bigFont"><nobr><span></span></nobr></div>';
		$this.after($(glassStr));
		$this.keyup(function() {
			$this = $(this);
			showBigInfoBox();
		});
		//分隔规则
		if (opts.sepnum == 0) {
			if (opts.ipttype == 1 && opts.seprule.length == 0) {
				opts.seprule = [3, 3, 4, 4, 4];
			} else if (opts.ipttype == 2 && opts.seprule.length == 0) {
				opts.seprule = [3, 4, 4];
			} else if (opts.ipttype == 3 && opts.seprule.length == 0) {
				opts.seprule = [4, 4, 4, 4];
			} else {
				opts.sepnum = 4;
			}
		}

		//求分隔规则数组开始值		
		function SumSeqRule(idx) {
			var starIdx = 0;
			for (var i = 0; i < idx; i++) {
				starIdx += opts.seprule[i];
			}
			return starIdx;
		}

		//生成放大镜
		function showBigInfoBox() {
			var inputVal = $this.val(),
				len = inputVal.length;
			$("#bigFont").css({
				"top": (glassT - 50) + "px",
				"left": glassL + "px"
			});
			var style = "top:'+(glassT-50)+'px;left:'+glassL+'px;"
			if (!inputVal) {
				$("#bigFont").hide();
				return false;
			}		

			//处理不同类型，格式的逻辑
			$("#bigFont").html('<nobr><span></span></nobr>');
			//新的显示内容
			var bigContent = "";
			var count = opts.sepnum == 0 ? opts.seprule.length : Math.ceil(len / opts.sepnum);
			if (opts.ipttype != 0) {
				//身份证 手机号  银行卡
				for (var i = 0; i < count; i++) {
					bigContent += (i == 0 ? "" : opts.separator) + inputVal.substr(SumSeqRule(i), opts.seprule[i]);
				}
			} else {
				for (var i = 0; i < count; i++) {
					bigContent += (i == 0 ? "" : opts.separator) + inputVal.substr(i * opts.sepnum, opts.sepnum);
				}
			}
			$("#bigFont").find("span").html(bigContent);
			$("#bigFont").show();
		}
		//控制数字放大镜的显示与销毁
		$this.focus(function(event){
			$this = $(this);
			showBigInfoBox();
		});
		$this.blur(function(event){
			$("#bigFont").html("").hide();
		});
	};
})(jQuery);
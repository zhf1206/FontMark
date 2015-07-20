# FontMark
In the input text box above shows amplifier input the content and format

<h2>如何使用</h2>
<pre>
//在首页引用样式表：css/style.css
//在首页引用脚本库：js/jquery-1.11.3.js和js/fontmark.js

  //默认使用
  $("#txtDefault").fontMark({
      ipttype: 0,    //输入类型
			separator: ' ',//分隔符
			sepnum: 0,     //分隔位数
			seprule: []    //分隔规则数组
		});
  
  //身份证格式（3 3 4 4 4）
  $("#txtIdCard").fontMark({
			ipttype:1
		});
		
	//手机号（3 4 4）	
	$("#txtPhone").fontMark({
			ipttype:2
	});
	
  //银行卡（4 4 4 4）
  $("#txtBank").fontMark({
			ipttype:3
  });
		
		
</pre>

<h2>兼容性</h2>
<div>兼容全平台，包括IE6+，Google chrome， Safari，Firefox等</div>

<h2>Demo</h2>
<div>请查看demo.html</div>

#### chrome插件开发

#### chrome.app.runtime.onLaunched.addListener(function(){});

#### chrome.app.window.create(page, {});

	// 当插件启动
	chrome.app.runtime.onLaunched.addListener(function() {
  	 // Center window on screen.
  	 var screenWidth = screen.availWidth;
  	 var screenHeight = screen.availHeight;
  	 var width = 500;
  	 var height = 300;
     
     // 创建一个窗口
  	 chrome.app.window.create('index.html', {
    	id: "helloWorldID",
    	outerBounds: {
      	width: width,
      	height: height,
      	left: Math.round((screenWidth-width)/2),
      	top: Math.round((screenHeight-height)/2)
    	}
  	 });
	});
	

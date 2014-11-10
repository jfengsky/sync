##googleMap 学习

#### 异步创建一个地图
页面html部分:

	// weight和height是地图的大小
	<div id="map_canvas" style="width:600px; height:600px"></div>

js:
	
	var script = document.createElement("script");
    script.type = "text/javascript";
    
    // 注意最后的回掉函数 initialize
    script.src = "http://ditu.google.cn/maps/api/js?key=Xk&sensor=TRUE_OR_FALSE&callback=initialize";
    document.body.appendChild(script);
    
    // 创建一个坐标
    var lang = new google.maps.LatLng(41.902916, 12.4533892);
    
    // 地图配置文件
    var mapOptions = {
            zoom: 16,
            center: lang,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
    
    // 创建一个地图实例
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
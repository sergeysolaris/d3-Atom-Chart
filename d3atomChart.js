var atomChart = function (params) {
		this.settings = params;
	};

	atomChart.prototype.draw = function () {

		var chart = this;

		var canva = d3.select(chart.settings.canvasEl);

		var svg = canva.append("svg")
						.attr("width", chart.settings.canva.width)
						.attr("height", chart.settings.canva.height);
		var centerX = chart.settings.canva.width / 2;
		var centerY = chart.settings.canva.height / 2;


		svg.append("g").attr("class", "g-chart-container");

		d3.select(".g-chart-container").append("svg:image")
			.attr("xlink:href", chart.settings.core.imgUrl)
			.attr("width", chart.settings.core.radius)
			.attr("height", chart.settings.core.radius)
			.attr("x", centerX - chart.settings.core.radius / 2)
			.attr("y", centerY - chart.settings.core.radius / 2);

		var angleDelta = Math.round(360/chart.settings.data.length);
		
		var dataGroups = d3.select(".g-chart-container").selectAll("g")
							.data(chart.settings.data)
							.enter()
							.append("g");


		dataGroups.append("ellipse")
					.attr("cx", centerX)
					.attr("cy", centerY)
					.attr("rx", chart.settings.electron.ellipse.xr)
					.attr("ry", chart.settings.electron.ellipse.yr)
					.attr("style", "stroke: "+ chart.settings.electron.ellipse.stroke +"; fill: transparent;")
					.attr("transform", function(d,i){
						return "rotate(" + (i+1)*angleDelta + ", "+ centerX + ", " + centerY +")";
					});

		var cGroup = dataGroups.append("g").attr("transform", function (d, i){ return "translate("+ centerX +", "+ centerY +")" +  "rotate(" + (i+1)*angleDelta + ")"});


		var textGroup = cGroup.append("g")
				.attr("transform", 
					function (d,i) {
							rnd = Math.floor((Math.random()*360)+1);
							return "translate(" + chart.settings.electron.ellipse.xr*Math.sin(rnd*Math.PI/180) +
								"," + chart.settings.electron.ellipse.yr*Math.cos(rnd*Math.PI/180);+ ")";
					});


		textGroup.append("circle")
				.attr("cx", 0)
				.attr("cy", 0)
				.attr("r", chart.settings.electron.radius)
				.attr("style", "stroke: "+ chart.settings.electron.stroke +"; fill: "+ chart.settings.electron.fill +";");

		textGroup.append("text")
				.attr("style", "stroke: " + chart.settings.electron.textColor + "; fill:" + chart.settings.electron.textColor + ";")
				.attr("text-anchor", "middle")
				.text(function(d) { return d.label })
				.attr("transform", function(d, i){
					return "rotate( -"+ (i+1)*angleDelta + ")";
				});
				

		textGroup.transition()
				.duration(180 / chart.settings.electron.speed)
				.delay(10)
				.each(orbit);

		function orbit() {
			var gr = d3.select(this);
			var angle = Math.floor((Math.random()*360)+1);
			(function repeat() {
				x = chart.settings.electron.ellipse.xr*Math.sin(angle*Math.PI/180);
				y = chart.settings.electron.ellipse.yr*Math.cos(angle*Math.PI/180);
				gr = gr.transition()
					.attr("transform", "translate(" + x + ", " + y +")")
					.each("start", repeat);
					angle += Math.floor((Math.random()*10)+15);
					if (angle >= 360) { angle -= 360; }
			})();
		}
	};
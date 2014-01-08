d3-Atom-Chart
=============

Atom like chart based on d3.js


Usage example
=============

<script type="text/javascript">
	var skillsChart = [{"label":"HTML"}, {"label":"CSS"}, {"label":"PHP"}, {"label":"Unity3D"}, {"label":"jQuery"}, {"label":"d3"}, {"label":"C#"}, {"label":"MYSQL"}, {"label":"SVG"}]; 

	var skills = new atomChart(
			{
				
				data : skillsChart,

				canvasEl : "#canvas",

				canva : { 
					width : 700,
					height: 700
				},

				proton : {
					radius : 150,
					imgUrl : "http://serg.im/images/logo.svg"
				},

				electron : {
					radius : 40,
					fill : "#ccc",
					stroke : "#333",
					textColor : "#fff",
					ellipse : {
						xr : 120,
						yr : 240,
						stroke : "#eee"
					},
					speed : 1
				}
			});
	

	skills.draw();
</script>

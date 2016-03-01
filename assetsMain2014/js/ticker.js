var time=60000;
var prev=function()
{
	var k=$("#fullcontents").find(":first");
	var klast=$("#fullcontents").find(":last");
	k.animate({"opacity":"0"},100,function(){
		klast.detach().prependTo($("#fullcontents"));
			$("#fullcontents").find(":first").animate({"opacity":"1"});
	});
}
var next=function()
{
	var k=$("#fullcontents").find(":first");
	var k2=$("#fullcontents").find(":first").next();
	k.animate({"opacity":"0"},100,function(){
		$(this).detach().appendTo($("#fullcontents"));
			$("#fullcontents").find(":first").animate({"opacity":"1"});

	});
};
$(document).ready(function(){
	var k=$("#fullcontents").find(":first").animate({"opacity":"1"},200);
	$('#tickerprev').click(prev);
	$('#tickernext').click(next);
	var tickertimer=setInterval(next,time);
	$("#ticker").mouseenter(function(){
		clearInterval(tickertimer);
	});
	$("#ticker").mouseleave(function(){
		tickertimer=setInterval(next,time);
	})
});
var user="";
var eventregflag=0;
var userregflag=0;
var clgid=1;
var userstatus,name,tatid;
var minpart, maxpart;
var eventcode,eventcat;
var loggedin = 0;
var currentSidebar = null;
var currentSidebarDisplayed = 0;
var eventDisplayed = 0;

//$(function() {
$('.showEvent').click(function() {
	var id = this.id;
		 $( ".ajaxloader" ).fadeIn(10,function() {
		 	$.ajax({
			dataType: 'json',
			url: '../../content.php.html',
			data: {'event':id},
			type: 'GET',
			success: function(data)
			{
				eventcode = data['code'];
			 	$('#eventName').html(data['name']);
			 	$('#eventTab').empty();
			 	$('#eventContent').empty();
			 	$('#prize').empty();
			 	$('#participate').empty();
			 	var tabLabel = '<li class="active"><a href="#intro" role="tab" data-toggle="tab">Introduction</a></li>'
			 	$('#eventTab').append(tabLabel);
			 	var tabContent = '<div class="tab-pane active" id="intro">'+data['tab1']+'</div>';
			 	$('#eventContent').append(tabContent);

			 	for (var i = 2; i <= data['count']; i++) {
				 	tabLabel = '<li><a href="#tab'+i+'" role="tab" data-toggle="tab">'+data['tab'+i][0]+'</a></li>';
				 	$('#eventTab').append(tabLabel);
				 	tabContent = '<div class="tab-pane" id="tab'+i+'">'+data['tab'+i][1]+'</div>';
				 	$('#eventContent').append(tabContent);
				}
				var participant = data['participation'].split('||@||');
				minpart = participant[0];	
				maxpart = participant[1];
				if(eventcode != 'BPT') {
					tabLabel = '<li><a href="#tab'+i+'" role="tab" data-toggle="tab">CONTACT</a></li>';
					$('#eventTab').append(tabLabel);
					var contactsContent = "EVENT MANAGERS:<br><br>";

					for (var j = 1; j < data['contactsCount']; j++) {
						var contact = data['contact'][j].split('||@||');
						contactsContent = contactsContent + contact[0] + "<br>";
						contactsContent = contactsContent + '(+91)' + contact[1] + "&nbsp&nbsp|&nbsp&nbsp";
						contactsContent = contactsContent + contact[3] + "@tathva.org" + "<br><br>";
					}
					tabContent = '<div class="tab-pane" id="tab'+i+'">'+contactsContent+'</div>';
				 	$('#eventContent').append(tabContent);
				}
				
			 	$('#prize').html(data['prize']);
			 	//$('#prize').html('Will be implemented later');
			 	var participantData = 'Min: ' + minpart + '<br>' + 'Max: ' + maxpart;
				$('#participate').append(participantData);
				eventDisplayed = 1;
				if(eventcode == "MSI" || eventcode == "PRO" || eventcode == "SCH") {
					$('.ereg').prop("disabled",true);
				}
				$( ".ajaxloader" ).fadeOut();
				$('#eventModal').modal('show');
			},
			error: function(jqXHR, tStat) {
				$( ".ajaxloader" ).fadeOut();
				alert("Event cannot be loaded now. Please check your internet connection and try again.");
			}
		});
	 });
});

function updateLogin(data , type) {
	$('.ajaxloader').fadeOut(10,function () {
		if(data[0]==2){
			$("label#reg-uname_error").html("Username already exists.");
			$("label#reg-uname_error").show();
			$("input#reg-uname").focus();
			return false;
		}
		if ((data[0]==1)||(data[0]==-1))
		{
			$('#signinModal').modal('hide');
			if(type == 1) {
				var id = data[2];
				var welcomeContent = "Hello " + data[3].toUpperCase() + "<br/>";
				welcomeContent += "<br/>Your <span style=\"font-family:'fontastique'\";>tathva '14 &nbsp</span>ID:TAT" + id + "<br/>";
				welcomeContent += "<br/>Please close this window to continue";
				$('#welcomeContent').html(welcomeContent);
				$('#welcomeModal').modal("show");
			}
			if(eventDisplayed == 1 && type == 0) {
				$('#reg_success').empty();
				$('#team').empty();
				$('#eventRegModal').modal('show');
			}
			$("input#log-name").val("");
			$("input#log-password").val("");
			user=data[1];
			$("#notloggedin").hide();
			$("#usname").html(data[3]);
			$('#profileshow').show();
			$("#usname").show();
			$('#logout').show();
			/*$.ajax("../../rprofile.php.html", 
			{
				dataType: "json",
				success: fillProfile,
				error: function(){alert("Something went wrong!");}
			});*/
		} 
		else if(data[0]==0)
		{
			$("label#log-password_error").html("Incorrect username/password combination");
			$("label#log-password_error").show();
			$("input#log-name").focus();
		}
		return;
	});
}

function initialize() {
	$("#logout").hide();
	$("#usname").hide();
	$("#profileshow").hide();
	//$("#loggedin-profile").hide();
	$("#notloggedin").show();
	$('.error').hide(); 
}

function fillProfile(d)  { //tat_id: "", name: "", college: "", phone: "", email: "", events: []
	var userDetails = "Tathva ID - TAT"  + d['tat_id'];
	userDetails += "<br/>" + d['college'];
	userDetails += "<br/>" + d['phone'];
	userDetails += "<br/>" + d['email'];
	$('#userDetail').html(userDetails);
	//$("#usid").html("<span class=\"grey\">Tathva ID - </span>TAT"+d['tat_id']);
	//$("#uscollege").html(d['college']);
	//$("#usphone").html("<span class=\"grey\">Phone: </span>"+d['phone']);
	//$("#usmail").html("<span class=\"grey\">Email: </span>"+d['email']);
	var myevents=d['events'];
	if(d['eventno'] != 0)
   	{
		//$("#usersevents").html("<tr>");
		$('#usersevents').html("");
		$('#usersevents').append("<tr><th>EVENT ID</th><th>EVENT NAME</th><th>TEAMMATES</th></tr>")
		$.each(myevents, function(i, item) 
		{
	   		//$("#usersevents").append("<div class=\"profileevent\"><div class='col-md-4'>"+item.eventname+"</div><div class='col-md-4'>"+item.eventcode+""+item.team_id+"</div><div class='col-md-4' id='t"+i+"'></div></div>");
   			var eventContent="", matesContent="";
   			eventContent = "<td>"+item.eventcode+item.team_id+"</td><td>"+item.eventname+"</td>";
   			mymates=myevents[i]['mates'];
   			$.each(mymates, function(j, itema) 
			{
				matesContent += itema.name+" - TAT" + itema.tat_id +'<br/>';
   			});	
   			$('#usersevents').append("<tr>"+eventContent+"<td>"+matesContent+"</td></td>");
   		});
  	}
   	$('#profileModal').modal('show');
}

$('#eventModal').on('hide.bs.modal', function (e) {
  eventDisplayed = 0;
  $('.ereg').prop("disabled",false);
});

$('#eventRegModal').on('hide.bs.modal', function (e) {
 	$('#reg_success').empty();
	$('#team').empty();
	$('#mates_input').prop("disabled",false);
	$('#teammate-submit').prop('disabled',false);
	$('#event-submit').prop('disabled',false);
});

$('#eventRegModal').on('show.bs.modal', function (e) {
	$.ajax({   
		url: "../../rprereged.php.html",
		dataType:'json', 
		success: function(data) {
			$.each(data,function (idx, obj) {
				if(obj.eventcode == eventcode) {
					var details = 'You have already registered for : ' + obj.eventname;
					details += '<br/> Team ID : ' + obj.eventcode + obj.team_id + '<br/>';
					var myTeamMates = obj.mates;
					details += 'Teammates:<br/><table class="tg" class="col-md-12" id="teamMatesTable"><colgroup><col class="col-md-4"><col class="col-md-8"></colgroup>';
					$.each(myTeamMates , function (idx, obj) {
						details += "<tr><td>TAT" + obj.tat_id + "</td><td>" + obj.name + "</td></tr>"; 
					});
					details += '</table>';
					$('#teamDetails').html(details);
					$('#eventRegHide').fadeIn(10);
				}
			});
		},
		error: function() {
			$('#teamDetails').html("Please check your internet connection. Close this window and try again after a few minutes");
			$('#eventRegHide').fadeIn(10);
		}
	}); 
	if(maxpart == 1) {
		$('#mates_input').prop("disabled",true);
		$('#teammate-submit').prop('disabled',true);
		$('#event-submit').prop('disabled',false);
	}
});
$('#eventRegModal').on('hide.bs.modal', function (e) {
	$('#teamDetails').html("");
	$('#eventRegHide').fadeOut(10);
});
$('#signinModal').on('hide.bs.modal', function (e) {
	$("#signinTabHead li a").first().trigger("click"); 
	$('#signinModal form input').val("");
	clgid = 1;
});
$('#welcomeModal').on('hide.bs.modal', function (e) {
	$('#welcomeContent').html("");
	if(eventDisplayed == 1) {
		$('#reg_success').empty();
		$('#team').empty();
		$('#eventRegModal').modal('show');
	}
});

$('.ereg').click(function() {
	if(user == "") {
		$('#signinModal').modal('show');
	}
	else {	
		$('#reg_success').empty();
		$('#team').empty();
		var detail = "<br/>Minimum number of participants is " + minpart + " and maximum is " + maxpart;
		$('#participant').html(detail);
		$('#eventRegModal').modal('show');
	}
});

function tat_logout() {
	$.ajax("../../rlogout.php.html", { //data returned: [1]
		dataType: "json",
		success: function()
		{
			$("#notloggedin").html("...logging out...");
			initialize();
			setTimeout(function(){
				$("#notloggedin").html("<span class='glyphicon glyphicon-off'></span>&nbsp&nbsp&nbspLOGIN");
			},1500);
			user="";
		}
	});
}
function newCollegeSuccess(data){
	if(data[0] == 1) {
		$("input#ncname").val("");
		$("input#college_name").val("");
		$('#newCollegeModal').modal("hide");
		//clgid = data[1];
		//$("input#college_name").val(data[2]);
	}
}

$('#notloggedin').click(function() {
	$('#signinModal').modal('show');
});

$('.ac_item').click(function() {
	if (eventDisplayed == 1) {
		eventDisplayed = 0;
		$('#eventModal').modal('hide');
	};
});

$("#log-submit").click(function() {
	$('.error').hide();  

	var name = $("input#log-name").val();  
	if (name == "") {  
		$("input#log-name").text("invalid");
		$("input#log-name").focus();  
		return false;  
	}  
	var password = $("input#log-password").val();  
	if (password == "") {  
		$("label#log-password_error").show();  
		$("input#log-password").focus();  
		return false;  
	} 
	$('.ajaxloader').fadeIn();
	$.ajax({  
		type: "POST",  
		url: "../../rlogin.php.html",
		dataType:'json',
		data: {'user':name,'pass':password},  
		success: function(data) {
			updateLogin(data,0);
		},
		error:function(jqXHR, tStat){
			alert("Please check your internet connection and try again.");
		}
	});  
	return false;  
}); 

$("#reg-submit").click(function(){
	$('.error').hide();
	var name = $("input#reg-name").val();  
	var filterName = /^[a-zA-Z ]+[a-zA-Z]$/;
	if (name == "") {  
		$("label#reg-name_error").html("This field is required");
		$("label#reg-name_error").show();  
		$("input#reg-name").focus();  
		return false;  
	}  
	else if(name.length < 4){
		$("label#reg-name_error").html("We want names with more than 3 letters!");
		$("label#reg-name_error").show();
		$("input#reg-name").focus();  
		return false;
	}
	else if(!filterName.test(name)) {
		$("label#reg-name_error").html("We want names with letters please!");
		$("label#reg-name_error").show();
		$("input#reg-name").focus();  
		return false;
	}
	else if(name.length > 35){
		$("label#reg-name_error").html("Name exceeding limit!");
		$("label#reg-name_error").show();
		$("input#reg-name").focus();  
		return false;
	}

	var coll=$("input#college_name").val();  
	if (coll == "") {  
		$("label#reg-clg_error").html("This field is required");
		$("label#reg-clg_error").show();  
		$("input#reg-clg").focus();  
		return false;  
	} 
	else if (coll < 4) {  
		$("label#reg-clg_error").html("Enter a valid college name");
		$("label#reg-clg_error").show();  
		$("input#reg-clg").focus();  
		return false;  
	} 
	var phno = $("input#reg-phno").val();  
	var filterPhone = /^[0-9]$/;
	if (phno == "") {  
		$("label#reg-phno_error").html("This field is required");
		$("label#reg-phno_error").show();  
		$("input#reg-phno").focus();  
		return false;  
	} 
	else if(filterPhone.test(phno)){
		$("label#reg-phno_error").html("Only numbers please");
		$("label#reg-phno_error").show();  
		$("input#reg-phno").focus();  
		return false;
	}
	else if (phno.length != 10) {  
		$("label#reg-phno_error").html("Enter a valid mobile number");
		$("label#reg-phno_error").show();  
		$("input#reg-phno").focus();  
		return false;  
	} 

	var email = $("input#reg-email").val(); 
	var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/; 
	if (email == "") {  
		$("label#reg-email_error").html("This field is required");
		$("label#reg-email_error").show();  
		$("input#reg-email").focus();  
		return false;  
	} 
	else if(!filter.test(email)){
		$("label#reg-email_error").html("Valid E-mail please, you will need it to recover your password.");
		$("label#reg-email_error").show();  
		$("input#reg-email").focus(); 
		return false;
	}
	else if(email.length > 50){
		$("label#reg-email_error").html("Email id exceeding limit");
		$("label#reg-email_error").show();  
		$("input#reg-email").focus(); 
		return false;
	}
	
   	var uname = $("input#reg-uname").val();  
	if (uname == "") {  
		$("label#reg-uname_error").html("This field is required");
		$("label#reg-uname_error").show();  
		$("input#reg-uname").focus();  
		return false;  
	} 
	else if (uname.length > 20) {  
		$("label#reg-uname_error").html("Username exceeding limit.");
		$("label#reg-uname_error").show();  
		$("input#reg-uname").focus();  
		return false;  
	} 

	var password = $("input#reg-password").val();  
	if (password == "") {  
		$("label#reg-password_error").html("This field is required");
		$("label#reg-password_error").show();  
		$("input#reg-password").focus();  
		return false;  
	} 
	
	var repassword = $("input#reg-repassword").val();  
	if (repassword == "") {  
		$("label#reg-repassword_error").html("This field is required");
		$("label#reg-repassword_error").show();  
		$("input#reg-repassword").focus();  
		return false;  
	} 
	if(password!=repassword)
	{
		alert(clgid);
		$("label#reg-repassword_error").html("Passwords do not match");
		$("label#reg-repassword_error").show();
		$("input#reg-password").focus();
		return false; 
	}
	$('.ajaxloader').fadeIn();
	$.ajax({  
		type: "POST",  
		url: "../../rsignup.php.html",
		dataType:'json',
		data: {'user':uname,'pass':password,'name':name,'phone':phno,'clg':clgid,'email':email,'recaptcha_challenge_field':$('#recaptcha_challenge_field').val(),'recaptcha_response_field':$('#recaptcha_response_field').val()},
		success: function(data) {
			updateLogin(data,1);
		},
		error: function(jqXHR, tStat) {
			$('.ajaxloader').fadeOut(10);
			alert("Please check your internet connection and try again.");
		}
	});  
	return false;  
}); 


var college_xhr;
$("#college_name").autocomplete({
	source: function( request, response ) {
		if (college_xhr)
			college_xhr.abort();

		college_xhr = $.ajax({
			url: "../../rclg.php.html",
			dataType: "json",
			data: { "q": request.term },
			success: function (data) {
				if (!data.length)
					response( [{ id:"no_college", label: "No matches. Click here to add your college", value: "" }] );
				else
					response( $.map( data, function( item ) {
						return { id: item.id, label: item.name, value: item.name }
					}));
			},
			error: function (jqXHR, tStat) {
				alert("No internet connection. Please check your internet connection and try again later.");
			}
		});
	},
	minLength: 1,
	select: function (event, ui) {
		if (ui.item.id == 'no_college') {
			$('#newCollegeModal').modal('show');
		}
		else {
			$(this).val(ui.item.label);
			clgid=ui.item.id;
			//$("#college_overshadow").html(ui.item.label).show();
			return false;
		}
	}
});

$('#newcollege-submit').click(function() {
	var newCollegeName = $("input#ncname").val(); 
	var filterName = /^[a-zA-Z ]+[a-zA-Z]$/;
	if (newCollegeName == "") {  
		$("label#ncname_error").html("This field is required");
		$("label#ncname_error").show(); 
		$("input#ncname").focus();  
		return false;  
	} 
	else if (newCollegeName < 4) {  
		$("label#ncname_error").html("Enter a valid college name");
		$("label#ncname_error").show();  
		$("input#ncname").focus();  
		return false;  
	} 
	$.ajax({  
		type: "POST",  
		url: "../../rnewclg.php.html",
		dataType:'json',
		data: {'newclg':newCollegeName},
		success: newCollegeSuccess,
		error: function(jqXHR,tStat) {
		 	alert ("Please check your internet connection and try again.");
    	}
	});
	return false;
});


$('#profileshow').click(function() {
	$.ajax("../../rprofile.php.html", 
	{
		dataType: "json",
		success: fillProfile,
		error: function(){
			alert ("Please check your internet connection and try again.");
		}
	});
});

var mates_xhr;

function getMatesIds() {
	var emates = [];
	$("#event_mates>div>div>span").each(function (i) {
		emates[i] = $(this).html();
			//alert($(this).html());
	});
	return emates.join('|');
}

$("#mates_input").autocomplete({
	source: function( request, response ) {
		if (mates_xhr)
			mates_xhr.abort();
		mates_xhr = $.ajax({
			url: "../../rteam.php.html",
			dataType: "json",
			type: "GET",
			data: {
				"q": request.term,
				"event": eventcode,
				"exclude": getMatesIds()
			},
			success: function (data) {
				response( $.map( data, function( item ) 
				{
					var that={
						label: item.name + " (TAT" + item.id + ")",
						value: item.id
						};
						return that;
						
					}));
				},
				error: function (jqXHR, tStat) 
				{
					alert("No internet connection. Please check your internet connection and try again later.");
				}
			});
					//alert(mates_xhr);
			},
minLength: 1,
select: function (event, ui) 
{
	if (ui.item) {
		$('#team').append("<div class='input_mates btn btn-lg' style='cursor:pointer;'>"+ui.item.label+"<span style='display:none'>"+ui.item.value+"</span></div><br>");
		//$("<div><div class='input_mates sbutton' style='cursor:pointer;'>"+ui.item.label+"<span>"+ui.item.value+"</span></div><br></div>").insertBefore(this);
		//var prtpnt = $("#par_hidden").val().split("||@||");
		$('#mates_input').val("");
		if ($("#team>div").length >= maxpart-1) {
			$(this).prop("disabled",true);
			$('#teammate-submit').prop('disabled',true);
		}
			
		//alert($("#event_mates>div").length );
		return false;
	}
}
});

$("#event-submit").click(function () {
	var emates=[];
	$("#team>div>span").each(function (i) {
		emates[i] = $(this).html();
	});
	if (minpart-1 > emates.length) {
		alert("*Minimum number of participants requirement not met!");
		return false;
	}
	$('#mates_input').prop("disabled",true);
	$('#teammate-submit').prop('disabled',true);
	$('#event-submit').prop('disabled',true);
	//prevent user actions before ajax, by displaying an overlay or something
	$.ajax("../../rregister.php.html", {
		dataType: "json",
		data: {"ecode":eventcode, "mates[]":emates},
		type: "POST",
		success: function (d) {
			if(d[0]==1) {
				$('#reg_success').html("Registration successful<br/> Team ID is "+d[2]+d[1] +"<br/><br/>Close this window to continue.");
			}
			else if(d[0]==0)
			{
				$('#team').empty();
				alert(d[1]);
				$('#eventRegModal').modal('hide');
			}
		},
		error:function() {
			$('#team').empty();
			alert(d[1]);
			$('#eventRegModal').modal('hide');
		}
	});
	return false;
});

$(document).ready(function() {
	initialize();

	$.ajax({  
		type: "POST",  
		url: "../../rlogin.php.html",
		dataType:'json', 
		success: function(data) {
			updateLogin(data,0);
		}
	});

});

$(document).keyup(function(e) {
   	if(e.which == 27) {
   		if(eventDisplayed == 1) {
   			eventDisplayed = 0;
   			$('#eventModal').modal('hide');
   		}
   	}
});
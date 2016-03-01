                                                                                                                                                                                                                                                                                                // JavaScript Document
var essentials = [];
var img = new Image();
img.src = "resources/bg-mark6.jpg";
var img2 = new Image();
img2.src = "resources/side-text.png";
var img3 = new Image();
img3.src = "resources/iitbbs-logo.png";
essentials[0] = img;
var pageLoaded = false;
var essential_srcs = ["resources/iitbbs-logo.png","resources/grand%20arcanum.jpg","resources/colloquia-bg.jpg","resources/ibox.png","resources/ingenium-bg.jpg","resources/matricks-bg.png","resources/yanthrix.jpg","resources/circles.png"];
var bursting = false, burst_count=0, burst_speed = 0.0001, burst_dist = 0;
var current_page, prev_page = "";
var signed_in = false;
var signed_in_callback = function(){};
var all_events_state = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var access_token = "";

$(document).ready(function(e) {
    $("body").css("height", $(window).innerHeight());
    $("body").css("width", $(window).innerWidth());
	$(".page").css("height", 660);
    $(".page").css("width", 1360);
	$(".spinner_cover").css("height", $(window).innerHeight());
    $(".spinner_cover").css("width", $(window).innerWidth());
	if($(window).innerWidth()>1300)
	$(".envelope").css("overflow", "hidden");
	
	$(window).on("resize", function(){
			$("body").css("height", $(window).innerHeight());
		    $("body").css("width", $(window).innerWidth());
			/*$(".page").css("height", $(window).innerHeight()*0.98);
		    $(".page").css("width", $(window).innerWidth()*0.98);*/
			$(".spinner_cover").css("height", $(window).innerHeight());
		    $(".spinner_cover").css("width", $(window).innerWidth());
			if($(window).innerWidth()>1300)
			$(".envelope").css("overflow", "hidden");
			else
			$(".envelope").css("overflow", "auto");
		});

	img.onload = function(){
		if(!pageLoaded){
			$(".spinner_cover").fadeOut(700);
			pageLoaded = true;
		}
		};
	setTimeout(function() {
		if(!pageLoaded && img.complete){
			$(".spinner_cover").fadeOut(700);
			pageLoaded = true;		
		}
		}, 250);
		
	$(".themep").on("click", function(){
	$(".theme").css("z-index", 14);
	$(".theme").css("opacity", 1);
	$(".exitway").css("z-index", 13);
	});
	
$(".exitway").on("click", function(){
	$(".theme").css("z-index", 0);
	$(".theme").css("opacity", 0);
	$(".exitway").css("z-index", 0);
	});
	
	var musicPlay = true;
	var audio1 = document.getElementById("audioplayer1");
	var audio2 = document.getElementById("audioplayer2");
	audio1.playbackRate = 1.1;
	audio2.playbackRate = 0.7;
	audio2.onload = function(){
		audio2.currentTime = Math.floor(Math.random()*15);
	}
	$(".audio").on("click", function(){
		if(musicPlay){
			audio1.pause();
			audio2.pause();
			musicPlay = false;
			$(this).attr("src","resources/mute.png");
		}
		else{
			audio1.play();
			audio2.play();
			musicPlay = true;
			$(this).attr("src","resources/audio.png");
		}
	});
	
	var eventsback = function(){
		super_eventi = 0, eventi = 0;
		$(".events_thumbs_env").css({transform: "scale(4,4)"});
		$(".events_details").css({transform: "rotate(0deg) scale(0.1,0.1)"});
		$(".events_quickmenu").fadeOut(200);
		$("#pointer").fadeOut(300);
		$(".events_content, .events_details, .events_menu").fadeOut(300, function(){
			 $(".events_menu").css({transform: "translate(0px, 0px)"});
	 		$(".events_thumbs_env").css({transform: "scale(1,1)"});
			 $(".events_thumbs").fadeIn(200);
			 //$(".events_details").css({transform: "rotate(0deg) scale(0.1,0.1)"});
			});
	};
	
	var gotocategory = function(index){
		if(index<0)
		return;
		super_eventi = index;
		eventi = 0;
		$(".events_content").fadeOut(250);
		$(".tab").fadeOut(250);
		var event_names_html = "";
		$(".events_menu_env").fadeOut(250, function(){
			for(var i=0; i<event_names[super_eventi].length;i++)
			event_names_html += "<div class='events_menu'><p>"+event_names[super_eventi][i]+"</p></div>";
			$(".events_menu_env").html(event_names_html);
			$(".events_menu_env").fadeIn(250);
			$(".events_menu").each(function(index, element) {
				$(".events_menu").eq(index).css("transition-delay", index*0.3+"s");
				//$(".events_menu").eq(index).fadeIn(500);
				$(".events_menu").eq(index).css("opacity",1);
                $(".events_menu").eq(index).css({transform: "translate(0px, "+index*50+"px)"});
				$(".events_quickmenu").fadeIn(300);
    	    });
			setTimeout(function(){
					$(".events_menu").css("transition-delay", "0s");
					}, 650);	
		});
	};
	
	var quickmenu_anim = function(index){
		for(var i=0; i<10; i++){
			if(i!=index && $(".events_quickmenu p").eq(i).hasClass("events_curcategory"))
			$(".events_quickmenu p").eq(i).removeClass("events_curcategory");
		}
		$(".events_quickmenu p").css({transform: "translateY(0px)"});
		if(index==0){
			gohome();
			return;
		}
		$(this).addClass("events_curcategory");
		for(var i=0; i<10; i++){
			if(i<index)
			$(".events_quickmenu p").eq(i).css({transform: "translateY(25px)"});
			else if(i>index)
			$(".events_quickmenu p").eq(i).css({transform: "translateY(-25px)"});
			else
			$(".events_quickmenu p").eq(i).addClass("events_curcategory");
		}
	};
	
	var page = "";
	$(".main_menu p").on("click", function(){
		page = $(this).attr("class");
		page = page.substring(5,page.length);
		if(page === "magna")
		page="lecture";
		if(page === prev_page && !(page==="events"))
		return;
		bursting = true;
		burst_count=0, burst_speed = 0.0001, burst_dist = 0;
		current_page = page;
		$(".wiss_logo").css("opacity", 0);
		$(".wiss_logo").css("z-index", 0);
		$(".themep").css("opacity", 0);
		$(".themep").css("z-index", 0);
		$(".wiss_corner").css("opacity", 1)
		$(".wiss_corner").css("z-index", 5);
		if(prev_page.length>0)
		$("."+prev_page).fadeOut(350, function(){$("."+prev_page).css("opacity",0);});
		/*setTimeout(function(){
			$("."+page).css("opacity", 1);
			$("."+page).css({transform: "scale(1,1)"});
			if(prev_page.length>0)
			$("."+prev_page).css({transform: "scale(0.05,0.05)"});
			prev_page = page;
		}, 300);*/
		if(prev_page === "events")
		eventsback();
		prev_page = page;
		});
		
	var gohome = function(){
		if(prev_page.length>0){
			$("."+prev_page).fadeOut(350, function(){
				$("."+prev_page).css("opacity",0);
				if(prev_page === "events")
				eventsback();
				prev_page = "";page = "";
				$(".wiss_logo").css("opacity", 1);
				$(".wiss_logo").css("z-index", 5);
				$(".themep").css("opacity", 1);
				$(".themep").css("z-index", 5);
				$(".wiss_corner").css("opacity", 0)
				$(".wiss_corner").css("z-index", 0);
			});
		}
	}
	
	$(".home").on("click", function(){
		gohome();
	});
	/*events*/
	
	var event_names = [];
	var event_details = [];
	
	event_names[0] = ["Contrivance", "Electronix", "Green Venture", "Replica", "Smart Frame", "Trebuchet", "Kreativ"];
	event_names[1] = ["CSE", "Mechanical", "Electrical", "Civil", "Metallurgy", "Economics"];
	event_names[2] = ["Sherlock", "LanWar"];
	event_names[3] = ["Finanza", "Pitched", "Plan de Negocious", "Rostrum"];
	event_names[4] = ["Codec", "Intrigue", "Richtig"];
	event_names[5] = ["TechQuiz", "BizQuiz"];
	event_names[6] = ["Robowars", "Kickoff", "Rescue Bot", "Pixelomania", "Navigator"];
	event_names[7] = ["Break The Law", "Smash The Bug", "Maths Olympiad"];
	event_names[8] = ["Coming Soon"];
	
	event_details[0] = [];
	event_details[1] = [];
	event_details[2] = [];
	event_details[3] = [];
	event_details[4] = [];
	event_details[5] = [];
	event_details[6] = [];
	event_details[7] = [];
	event_details[8] = [];
	
	event_details[0][0] = [["Introduction",'<p> â€œIf you have the courage to begin, you have the courage to succeed.â€</p><p> <em>~</em> <em> </em> <a href="../../en.wikipedia.org/wiki/David_Viscott.html" target="_blank" title="who is David Viscott"><em>David Viscott</em></a></p><p> For those who ponder to make something simple and effective, WISSENAIREâ€™15 brings out a competition to prove themselves. Contrivance comprises of building an aerodynamically stable car to traverse a given track. It must complete the track without using any energy sources like a battery, just on the basis of potential energy.</p>'],["Specifications",'<p> <ul><li> Maximum width of the car can be 9cm.</li><li> Maximum length of the car can be 10cm.</li><li> Active sources like motor, batteries etc. Are not allowed.</li></ul></p><p> <strong><u>TRACK SPECIFICATIONS:</u></strong></p><p> <img width="200" height="200" src="resources/track_specs.jpg"/><p></p></p>'],["Event Format",'<p> Using the given potential energy participants should design a prototype of a car which is aerodynamically as well as mechanically efficient to traverse on the given track</p><p> <strong><u>ROUND-1:</u></strong></p><p><ul><li> The car should be traversed along the track</li><li> The distance traversed is measured.</li><li> Each car will be given 3 chances and the best of 3 is considered.</li><li> Top 3 teams will get qualified for the round 3.</li></ul></p><p> <strong><u>ROUND-2:</u></strong></p><p><ul><li> The car should be traversed along the track against a constant air flow.</li><li> The distance traversed is measured.</li><li> Each car is given 3 chances and the best of 3 is considered.</li><li> Top 3 cars will get qualified for the round 3.</li></ul></p><p> <strong><u>ROUND-3:</u></strong></p><p><ul><li> Winners of the rounds 1 &amp; 2 will be selected for this round.</li><li> The car should be traversed along the track and after leaving the track it needs to travel on the sand ground.</li><li> The distance travelled on the sand is measured.</li><li> Each car is given 3 chances and the best of 3 is considered.</li><li> Top 3 cars will get qualified for round 4.</li></ul></p><p> <strong><u>ROUND-4:</u></strong></p><p> The winners of round 3 race against each other on the track under external conditions which will be revealed at the time of the event and the one who finishes the race first will be declared as the winner.</p>'],["Rules",'<p> <ul><li> Each team can have a maximum of 3 members.</li><li> Each participant should bring college ID proof.</li><li> Each team member should be a student of an authorized college.</li><li> There is no restriction on the number of teams from the same college.</li><li> It is not necessary that the part forming a team should be from the same college.</li><li> No participant can be part of more than one team.</li><li> Car cannot be modified between rounds.</li><li> In every round car needs to traverse from the left top point of the track.</li><li> The distance traversed by the car parallel to the track is calculated</li><li> No active power source should be present.</li><li> Any failure in meeting the specifications can lead to disqualification of the team.</li><li> There may be an error of 1 or 2 mm on each side of the track.</li><li> Decision of the event coordinator is final.</li></ul></p>'],["Contact Details",'<p>Sukesh Bondada</p><p>Event Co-ordinatorWISSENAIREâ€™15 </p><p>Email ID: sb24@iitbbs.com</p>'],["PDF", '<a href="PDF/problem statement-contrivance1.pdf" target="_blank">Download</a>']];
	
	event_details[0][1] = [["Introduction",'<p> <em> â€œYou can involve yourself in electronics, computers, puzzles... there\'s a lot of creativity and brain working. There\'s a lot to model trains that people don\'t realize.â€ <br/> </em> -Gary Coleman</p><p> <strong> </strong> Electronics is not only the part of our daily life but also it is subject of innovation. â€œWISSENAIREâ€™15â€ is providing an opportunity to challenge the flow of your circuitry. All you need to do is come up with a strategic circuit based on the problem statement within a stipulated time. So get ready to charge up and strain your brain to solve the junctions and potential barriers at â€œElectronix.â€</p>'],["Event Format",'<p> All the teams have to go through three rounds as described below.<strong></strong></p><p> <strong><u>Round 1</u></strong></p><p><ul><li> This round will consist of an objective and subjective question based on electronics circuits.</li><li> This round will be an elimination round.</li></ul></p><p> <strong><u>Round 2</u></strong></p><p><ul><li> In this round, an error circuit setup will be given and participants have to identify the errors.</li><li> This round will also be an elimination round.</li></ul></p><p> <strong><u></u></strong></p><p> <strong><u>Round 3</u></strong></p><p><ul><li> This round will consist a test of your circuit designing skills and speed of designing circuit within less time as given in problem statement.</li><li> This will be the final round.</li></ul></p>'],["Rules",'<p> <strong><u>RULES AND REGULATION:</u></strong></p><p> Ã˜ Each team can consist a maximum size of three members.</p><p> Ã˜ Problems statements for round 1,2 and 3 will be given on spot.</p><p> Ã˜ Students from different colleges can form a team.</p><p> Ã˜ Any kind of cheating will be strictly prohibited.</p><p> Ã˜ Judges decision will be final decision and each team have to follow it.</p>'],["Judging Criteria",'<p><ul><li> The participants will be announced after each round.</li><li> Round 1 is based on the maximum correct objective and subjective answer.</li><li> Round 2 is based on finding the errors as many as possible in the minimum time.</li><li> Round three is based on output, time taken and efficiency of the answer</li></ul></p>'],["Contact Details",'<p> VIKAS KANTIWAL</p><p> Events Co-ordinator, wissenaireâ€™15</p><p> Mob. No.: +91-8908230331</p><p> Mail ID:- <em>vk14@iitbbs.ac.in</em></p>'],["PDF", '<a href="PDF/Electronix-PS.pdf" target="_blank">Download</a>']];
	
	event_details[0][2] = [["Introduction",'<p> â€œPLANS TO PROTECT AIR, WATER AND WILDLIFE ARE INFACT PLANS TO PROTECT HUMANSâ€</p><p> - Stewart Uda</p><p> â€œNATURE IS WHAT WE ALL HAVE IN COMMONâ€. Although we fail as boon for nature, at least we must not be a curse for it. Every act we do against it has serious effects on the upcoming decades. GO GREEN, SAVE GREEN is the motto of this event. Wissenaire-15 creates platform for young innovative minds, to represent themselves as allies to nature by presenting eco-friendly ideas. These ideas address solutions to problems which are main cause for disturbance in ecology. Who knows, whatâ€™s going to happen? Your contribution may provide eco-friendly solutions to the 21<sup>st</sup> century demands which in return may turn the phase of the world. Pounce on this opportunity to make better, safer, and greener terrestrial sphere!!!!</p>'],["Problem Statement",'<p> Groups that are interested to participate have to present a prototype of a product rendering solutions to problems which have adverse effects on environment. The product should be eco-friendly and sustainable. Products which have the least detrimental effect on environment are highly encouraged. Participants can select any domain of their choice. Domains should relate to improving the condition of our environment. Sample domains are given below.</p><p><ul><li> Green Building</li><li> Future energy resources</li><li> Waste water management</li><li> Reducing pollution caused by automobiles</li><li> Rain water harvesting</li><li> Saving energy in automobiles</li><li> How to manage e-waste</li></ul></p><p> Choosing from these domains is not mandatory. Participants have to design a prototype, which is feasible and environment-friendly satisfying the increasing demand of greener technology for commercial purpose. This is an opportunity to make your own contribution to a cleaner, safer and greener earth.</p>'],["Event Format",'<p> 1) Number of participants must not exceed 3 per team.<br>2) All participants should carry respective institute ID cards to the fest.<br>3) Event consists of three phases.<br>4) First round is an online submission and the second, third rounds will be conducted in IIT Bhubaneswar campus during the fest.</p><p> Round 1:</p><p> 1) In this round, participants have to submit an abstract about their design.<br>2) The abstract should be submitted in PDF format, not exceeding 500 words.<br>3) First round submissions are to be mailed to submissions@wissenaire.org with subject â€œGreen Ventureâ€.<br>4) The last date for mailing your abstract is 01 January 2015.<br>5) Details of the team should be mentioned in that submission.</p><p> Round 2:</p><p> 1) The teams selected on the basis of the online round, have to present the working prototype or design of the product supported by a power point presentation.<br>2) Computers for the presentation will be provided by us.<br>3) The teams will be given 15 minutes to present their idea before the jury, 3 minutes will be allotted for the queries at the end of the presentation.<br>4) Participants of other teams are also free to express their queries.</p>'],["Judging Criteria",'<p>The following aspects are highly reflectedduring evaluation. </p><p><ul><li>Efficiency and the feasibility of the design.</li><li>Innovation.</li><li>Life of the product and maintenance required.</li><li>Investment and eco-friendly nature of the product.</li><li>Power consumption, if that abstract brought into action.</li></ul></p>'],["Contact Details",'<p> Siddhartha Vasireddy</p><p> Event coordinator, Wissenaireâ€™15</p><p> Phone no: - +91-9040893520</p><p> Email: - sv13@iitbbs.ac.in</p>'],["PDF", '<a href="PDF/greenVenture.pdf" target="_blank">Download</a>']];;
	
	event_details[0][3] = [["Introduction",'<p> â€œIf there is magic on this planet, it is contained in water.â€</p><p> ~Loren Eiseley</p><p> Have you ever played with pistons and syringes in your childhood? And ever thought what water can do? If yes, then stream your knowledge of hydraulics with simple designs using your grey matter. WISSENAIREâ€™15 is a platform to prevail with your ideas in designing a machine that uses fundamental hydraulic principles.</p>'],["Event Structure",'<p> <strong><u>ROUND-1:</u></strong></p><p><ul><li> In this round, the arm should lift objects in arena and place it in the different specified position in the arena.</li><li> The objects can be of any shape that can be enclosed within the cube of dimensions 5x5x5 cm<sup>3 </sup>.</li><li> Judging criteria will be the maximum number of successful placements.</li><li> Based on the design and performance, selected teams will be promoted to next round.</li></ul></p><p> <strong><u>ROUND-2:</u></strong></p><p><ul><li> In this round, the arm should lift the objects in arena and place them one upon another</li><li> Objects can be of any shape that can be enclosed within the cube of dimensions 7x7x7 cm<sup>3</sup></li><li> Judging criteria will be on maximum number of objects placed one upon other and the time taken to complete the task.</li><li> Based on performance, selected teams wil be promoted to next round.</li></ul></p><p> <strong><u>ROUND-3:</u></strong></p><p><ul><li> Details of this round will be provided during the time of event.</li><li> For YOUTUBE videos, go through the links provided below<br><a href="http://www.youtube.com/watch?v=vsF95qA1x7I">http://www.youtube.com/watch?v=vsF95qA1x7I</a><br><a href="http://www.youtube.com/watch?v=si-hbr-yu8E">http://www.youtube.com/watch?v=si-hbr-yu8E</a> <br/> <a href="http://www.youtube.com/watch?v=Qeg0y5AAmtI">http://www.youtube.com/watch?v=Qeg0y5AAmtI</a> <br/> <a href="http://www.youtube.com/watch?v=kgLmyEu4elI">http://www.youtube.com/watch?v=kgLmyEu4elI</a> <u></u></li></ul></p>'],["Crane Specifications",'<p><ul><li> Locomotion of base of the arm is strictlyprohibited and area of base of arm should fit in a square region of area 25cmx25cm.4</li><li> Syringes size is limited to 30ml (i.e. 10ml,20ml, 30ml can be used).</li><li> The arm should be able to lift any object toa height of 30cm from the level of base of the mechanical arm.</li><li> The arm should reach horizontal distance inbetween 10cm to 35cm from the centre of its base</li><li> Weights can be placed on base of themechanical arm to stabilize it during the competition.</li><li> The arm should be able to rotate through aminimum angle of 120<sup>0</sup> </li><li> The mechanical body should contain only onearm attached to it</li><li> Materials to be used:<br><ul><li>Syringes (or any other pistons)</li><li>Flexible pipes</li><li>Any liquid</li><li>Wood (plastic, metallic frame)</li><li>Rubber bands</li><li>Pulleys</li><li>Thread</li>*To use any other material other than specified,consult event organizer.</ul></li></ul></p>'],["Rules and Regulation",'<p><ul><li> Maximum of 2 members can form a team.</li><li> Decision made by the judges is final.</li></ul></p><p> The participants have to register online from our website, <a href="../index.html">www.wissenaire.org</a> and each team has to submit the design of the crane (in jpg/jpeg format) through email to submissions@wissenaire.org with subject â€œREPLICAâ€. (Last date for submission â€“05 January 2014)</p><p><ul><li> Locomotion of any part of the machine should be governed by some hydraulic force.</li><li> Use of any type of electrical motors, batteries, springs, compressors or pressurized cylinders and also any other source of stored energy are prohibited.</li><li> Only one member of the team has to operate the crane at any instant.</li><li> And same model of crane should be used for all rounds.</li><li> Prototype should not be ready made.</li><li> <strong>TOUCH â€“</strong> Touching the crane in case of any discrepancy (for example, water leakage, temporary recoverable damage) faced during the operation of crane is allowed. Touching the crane for changing the orientation of the crane is strictly prohibited.</li><li> <strong>Maximum time allowed for one â€œTOUCHâ€ is ONE MINUTE for each round. </strong></li></ul></p>'],["Contact Details",'<p> Sukesh Bondada</p><p> Event Co-ordinator, Wissenaireâ€™15</p><p> Phone: +91-8093566421</p><p> Email:</p><a href="mailto:sb24@iitbbs.com">sb24@iitbbs.com</a>'],["PDF",'<a href="PDF/problemstatement-replica.pdf" target="_blank">Download</a>']];
	
	event_details[0][4] = [["Introduction",'<h3> The whole difference between a construction and a creation is, a thing constructed can be loved after it is constructed, but a thing created is loved before it exists.</h3><p> <strong>-G.K.CHESTERTON</strong></p><p> <strong> Bridges are one of the most useful and magnificent structures of the modern civilization. With ever improving designs bridges carry immense loads daily and are also expected to handle incidental loads due to natural calamities. Model bridges are intended to be simplified versions of real world bridges, which are designed to accept a load in any position and permit the load to travel across the entire bridge. Wissenaire\'15 take immense pleasure in conducting the smart frame, which tests your ability to design and construct the most efficient bridge, specifications provided. </strong></p>'],["Event Format",'<p> <strong><u>Round-1</u></strong> <strong>:</strong></p><p><ul><li> Each team has to submit their design through email to submissions@wissenaire.org with subject â€œSmart Frameâ€.</li><li> The designs should be submitted in JPEG format.</li><li> Last date for submission â€“ January,2015.</li><li> Based on the design, selected teams will be short-listed to next round.</li></ul></p><p> <strong><u></u></strong></p><p> <strong><u>Round-2:</u></strong></p><p><ul><li> This event is conducted during the time of fest.</li><li> The event lasts for 3 hours in which the participants have to make their bridge of given specification (Popsicle stick, glue will be provided by us).</li></ul></p><p> No extra time will be provided.<strong><u></u></strong></p>'],["Specification",'<p><ul><li> The free space between two supports should be more than 80 cm.</li><li> The deck can be extended up to 12 cm. on either side of the supports.</li><li> The Maximum Weight limit of the bridge is 1.0 Kg.</li><li> Width of the bridge: 15cms.</li><li> A smooth continuous bridge deck must be provided along the entire length of bridge.<strong></strong></li><li> Maximum of 2 Popsicle sticks can be bound together in the construction of the bridge.<strong></strong></li></ul></p>'],["Judging Criteria",'<p> 1)bridges will be evaluated based on four factors:<strong><u></u></strong><br><ul><li> Load bearing capacity.<strong><u></u></strong></li><li> Realistic design.<strong><u></u></strong></li><li> Weight of that bridge.<strong><u></u></strong></li><li> Length of that bridge.<strong><u></u></strong></li></ul></p><p> 2)These three categories are described below.<strong><u></u></strong><br><ul><li>The bridge will be scored on the basis of bearing capacity of the bridge to the applied.<strong><u></u></strong></li><li> The bridge will also be evaluated on how realistic the structure is. This will include the feasibility and better logical approach in designing. <strong><u></u></strong></li><li> Score for realistic design is given by judges (out of 5)<strong><u></u></strong></li></ul></p><p> 3)The score given to the each team at the end of their construction of bridge as follows:</p><p><ul><li> <strong> Score=B+ (2*L)(R/(10*W))</strong> <strong><u></u></strong> Where <strong><u></u></strong><br>B=Maximum load capacity (in kilograms) <strong><u></u></strong><br>L=Length of the bridge between the supports (in meters) <strong><u></u></strong><br>R=Realistic design score given by judges (out of 5) <strong><u></u></strong><br>W=Weight of the bridge (in kilo grams) <strong><u></u></strong></li></ul></p><p> 4)The basic judging criteria will be innovation in idea, originality of design and perfection.<strong><u></u></strong></p>'],["Contact Details",'<p> Phanindra Kumar</p><p> Event Co-ordinator, Wissenaireâ€™15</p><p> Phone: +91-7750894706</p><p> Email:</p><a href="mailto:pa11@iitbbs.ac.in">pa11@iitbbs.ac.in</a>'],["PDF",'<a href="PDF/smart frame.pdf" target="_blank">Download</a>']];
	
	event_details[0][5] = [["Introduction",'<p> â€œIf you canâ€™t explain it simply, you donâ€™t understand it well enoughâ€</p><p> - <strong>Albert Einstein</strong></p><p> Trebuchet is one of the earliest innovations of mankind, perhaps it is the basis of all other inventions. With advancement in the field of design and technology, life has become much more complex .wissenaire\'15 provides you an opportunity to take you back to that ancient innovation and enrich your knowledge in controlling it.<em></em></p>'],["Specifications",'<p> 1. Arm of the trebuchet should be made only with wood.<br>2. The trebuchet should fit in a 60cm x 60cm x 60cm box.<br>3. Trebuchet should be made by using any mechanism related to counter weight but NOT CATAPULT mechanism.<br>4. The weight of the ball provided will be 56.7gms and radius approximately 3cm.</p><p> <strong>'],["Arena",'</strong> :</p><p> 1. In all the rounds the position of the trebuchet will be restricted to a marked line.<br>2. All the distances will be measured from this particular line only.</p>'],["Event Rules",'<p> 1. Maximum of 3 members can form a team.<br>2. Readymade mechanisms should not be used.<br>3. CATAPULT or its mechanism should not be used.<br>4. The ball where it first lands when projected is the distance covered<br>5. The participants have to register online from our website, <a href="../Downloads/problem state/Grand Arcanum/Trebuchet/www.wissenaire.org">www.wissenaire.org</a> and each team has to submit the design of the crane (in jpg/jpeg format) through email to submissions@wissenaire.org with subject â€œTREBUCHETâ€. (Last date for submission â€“)<br>6. The ball shouldnâ€™t roll and hit the target .It should hit the target directly without landing anywhere and the target has to fall to gain the points.</p><p> <strong>Final Judgement:</strong></p><p> The team which secures maximum number of points will be declared as winner.</p>'],["Contact Details",'<p> Avula vamshikrishna,</p><p> Event Co-ordinator,</p><p> Contact no: +91-720 559 5202,</p><p> Email ID: va10@iitbbs.ac.in</p>'],["PDF",'<a href="PDF/Trebuchet problem statement.pdf" target="_blank">Download</a>'],["",'']];
	
	event_details[0][6] = [["Introduction",'<p> Creativity is putting your imagination to work,it involves breaking out of established patterns in order to look at things in a different way.Enchant us with your creativity in video making at Wissenaire\'15. Speak with snaps and stir us with your lens work. Kreativ invites one and all to drive their innovation to the fullest and captivate everyone\'s senses</p>'],["Rules",'<p> Ã˜ The video should be of 10 minutes (approx.). There will be additional 3 minute Q&amp;A session in which the judges ask questions related to the video. Participants of other teams are also allowed to ask questions.</p><p> Ã˜ Team should comprise maximum of 2 members.</p><p> Ã˜ Students from different colleges can form a team.</p><p> Ã˜ Plagiarism and any kind of obscenity in the video are not encouraged.<a name="_GoBack"></a></p>'],["Judging Criteria",'<p> Judgement is based on the following aspects:</p><p> Ã˜ Creativity involved in making the video</p><p> Ã˜ Subject of the video</p><p> Ã˜ Innovation</p><p> Ã˜ Quality of the video</p><p> Ã˜ Performance in the Q&amp;A session</p>'],["Contact",'<p> B Y SANTOSH</p><p> Event coordinator ,Wissenaireâ€™15<a name="_GoBack"></a></p><p> Ph-no-7749995770</p><p> E-mail-sb23@iitbbs.ac.in</p>'],["PDF",'<a href="PDF/PROBLEM STATEMENT_kreativ.pdf" target="_blank">Download</a>'],["",'']];
	
	event_details[1][0] = [["Introduction",'<p>"You can have brilliant ideas, but if you can&#8217;t get them across, your ideas won\'t get you anywhere."</p><p> -Lee Laccoca</p><p> Colloquia is a presentation event in which young talented minds prove themselves by presenting over the chosen domain for few minutes in presence of delegates. It attains experience, gains communication skills and forbid buck fever.</p><p> Colloquia CSE provides a great opportunity for the tech enthusiasts around the globe to demonstrate their skills and knowledge over a specific domain.</p><p> This time colloquia CSE booms with outstanding domains, covering almost all the trending topics. So seize this chance and let IIT Bhubaneswar hear the power of your speech.</p>'],["Domains",'<p> <ul><li>Augmented reality</li><li> Brain to brain communication</li><li> Visual surveillance</li><li> Testing a cloud application</li><li> Performance optimizing on a Cloud infrastructure</li><li>CAN bus architecture</li><li> Robotic control system for beating-heart surgeon</li><li> One application using randomized algorithm</li><li> Autonomous driving using lane cantering control</li><li> Cyber physical system, security and checking</li><li> Remote health monitoring system</li><li> Collaborative robotics</li><li> Proof of 4 colour theorem</li><li> Vehicular communication, protocols and securities.</li></ul><br/></p>'],["Event Format",'<p>Round 1: (Online)</p><p>1 Participants have to mail the .ppt files electing their topic of interest provided in the list of domains.</p><p>2 Participants should submit their .ppt files to <a href="mailto:submissions@wissenaire.org">submissions@wissenaire.org</a> with subject of mail as Colloquia-Computer Science.</p><p>3 Complete details of the all participants, taking part in the presentation, should be mentioned in the submissions.</p><p>4 Specify topic of the presentation as the heading of the submission.</p><p>5 Last date for submission is 5th January.</p><p><strong><u>Round 2: </u></strong></p><p> On the basis of the submissions we receive, respective teams will be selected, purely based on the 1<sup>st</sup> round, for the final demonstration at IIT Bhubaneswar. A conformation mail will be sent to the selected teams, to take part in Colloquia Computer Science in Wissenaire\'15.</p><p><strong><u>Round 3:</u></strong></p><p>1 This round is a small quiz among top 5 teams that were selected in the round 2.</p><p>2 Questions will be related to all the domains that were mentioned earlier.</p><p>3 This quiz also has a small role to perform in selecting the winner.</p><p>4 No negative marking.</p>'],["Rules & Regulation",'<p><strong><u>Team Formation Rules:</u></strong></p><p>1 Maximum number of participants in the team should not exceed 3.</p><p>2 No participant can take part in more than one team.</p><p>3 Each participant should bring their respective college ID proof.</p><p>4 It is not obligatory that the participants forming a team should be from the same college.</p><p> 5 Any number of teams can come from same college, there\'s no restriction for it.</p><p><strong><u>Presentation Rules:</u></strong></p><p> 1 Presentation should not exceed 15 minutes.</p><p> 2 The maximum time allotted for single presentation is 12 minutes, followed by a queries section for 3 minutes.</p><p> 3 Presentation crossing the allotted time, damage the score.</p><p> 4 Plagiarism is not encouraged.</p><p> <strong><u>General Rules:</u></strong></p><p> 1 Violation of any rule results in rejection of paper.</p><p> 2 The presentation will be judged on the basis of their innovation, in depth knowledge of the field and presentation skills.</p><p> 3 In case of any discrepancy, decision made by the judge is final.</p>'],["Contacts",'<p> Siddhartha Vasireddy</p><p> Event coordinator, Wissenaire\'15</p><p> Phone no: - +91-9040893520</p><p> Email: - sv13@iitbbs.ac.in</p>'],["PDF", '<a href="PDF/colloquia computer science.pdf" target="_blank">Download</a>']];
	
	event_details[1][1] = [["Introduction",'<p> Are you passionate about your department? If the answer to that is yes, we have something really exciting for you. COLLOQUIA MECHANICAL provides a platform for students to present their passion in their specialized domain. WISSENAIRE offers an opportunity for students to prove their strength in theoretical as well as practical aspects. COLLOQUIA MECHANICAL tests your innovation, in depth knowledge regarding the domain and presentation skills.</p><p> "You can have brilliant ideas, but if you can&#8217;t get them across, your ideas won\'t get you anywhere."</p><p> -Lee Laccoca</p><p> Colloquia is a presentation event in which young talented minds prove themselves by presenting over the chosen domain for few minutes in presence of delegates. It attains experience, gains communication skills and forbid buck fever .</p><p> Colloquia Mechanical provides a great opportunity for the tech enthusiasts to exhibit their knowledge over a specific domain.</p><p> This time Colloquia Mechanical booms with its new domains covering almost all of your interests.</p><p> So, gear up your learning life and bring out the expert in you. Expertise in your interested domain and present your best to win over the rest.</p><p> Presentations are invited for research done under any of the domains mentioned above. <br/></p>'],["Domains",'<p><ul> <li>Micro-Electro-Mechanical Systems.</li><li> Advanced Materials and their Applications (Nano Materials, Bio Materials, Composite- Materials, Multifunctional Materials).</li><li> Unconventional manufacturing process.</li><li> Bio engineering and bio mechanics.</li><li> Automotive engineering.</li><li> Renewable and non- renewable energy systems or alternate energy systems.</li><li> Applied thermo fluids.</li><li> Computational fluid dynamics and heat transfer.</li><li> Dynamics and controls.</li><li> Mechanisms and robotics.</li><li> Linear and non-linear vibration, acoustics.</li><li> Micro scale and nano scale heat transfer.</li><li> Phase change materials and its applications.</li><li> Aerodynamics (vehicle, sport).</li></ul></p>'],["Event Format",'<p> <strong><u>Round 1: (Online)</u></strong></p><p> 1 Participants have to mail the .ppt files electing their topic of interest provided in the list of domains.</p><p> 2 Participants should submit their .ppt files to <a href="mailto:submissions@wissenaire.org">submissions@wissenaire.org</a> with subject of mail as Colloquia-Mechanical.</p><p> 3 Complete details of the all participants, taking part in the presentation, should be mentioned in the submissions.</p><p> 4 Specify topic of the presentation as the heading of the submission.</p><p> 5 Last date for submission is 10th January 2015.</p><p> <strong><u>Round 2: </u></strong></p><p> On the basis of the submissions we receive, respective teams will be selected, purely based on the 1<sup>st</sup> round, for the final demonstration at IIT Bhubaneswar. A conformation mail will be sent to the selected teams, to take part in Colloquia Mechanical in Wissenaire\'15.</p>'],["Rules",'<p> <strong><u>Team Formation Rules:</u></strong></p><p> 1 Maximum number of participants in the team should not exceed 3.</p><p> 2 No participant can take part in more than one team.</p><p> 3 Each participant should bring their respective college ID proof.</p><p> 4 It is not obligatory that the participants forming a team should be from the same college.</p><p> 5 Any number of teams can come from same college, thereâ€™s no restriction for it.</p><p> <strong><u>Presentation Rules:</u></strong></p><p> 1 Presentation should not exceed 15 minutes.</p><p> 2 The maximum time allotted for single presentation is 12 minutes, followed by a queries section for 3 minutes.</p><p> 3 Presentation crossing the allotted time, damage the score.</p><p> 4 Plagiarism is not encouraged.</p>'],["Contact Details",'<p> Praveen Kumar</p><p> Event coordinator, Wissenaireâ€™15</p><p> Phone no: - +91-7749994737</p><p> Email: - pk14@iitbbs.ac.in</p>'],["PDF", '<a href="PDF/COLLOQUIA MECHANICAL pdf.pdf" target="_blank">Download</a>']];
	
	event_details[1][2] = [["Introduction",'<p> â€œYou can have brilliant ideas, but if you canâ€™t get them across, your ideas wonâ€™t get you anywhere.â€</p><p> Lee Laccoca</p><p> Colloquia Electrical is a presentation event in which young talented minds prove themselves by presenting over the chosen domain for few minutes in presence of delegates. It attains experience, gains communication skills and forbid buck fever.</p><p> Colloquia Electrical provides a great opportunity for the tech enthusiasts around the globe to demonstrate skills and their knowledge over a specific domain.</p><p> This time colloquia booms with its spanking new domains covering almost all the hot topics and the most stimulating ones. So seize this chance and let the IIT Bhubaneswar hear the power of your speech. <br/></p>'],["Domains",'<p> <ul><li>Photonics\\EM\\quantum</li><li> signal prossesing</li><li> power system</li><li> Bio-EE</li><li> circuits and VLSI</li><li> Information Systems</li><li> Nano And Micro Electromechanical Systems</li><li> Solid State Electronics</li><li> Biometric authentication</li><li> Electrical Impedance Tomography or(ETI)</li><li> Robotics and control</li><li> Information systems</li></ul></p>'],["Event Format",'<p> Round 1: (Online)</p><p> 1 Participants have to mail the .ppt files electing their topic of interest provided in the list of domains.</p><p> 2 Participants should submit their .ppt files to submissions@wissenaire.org with subject of mail as Colloquia-Electrical</p><p> 3 Complete details of the all participants, taking part in the presentation, should be mentioned in the submissions.</p><p> 4 Specify topic of the presentation as the heading of the submission.</p><p> 5 Last date for submission is</p><p> <strong>Round 2: </strong></p><p> On the basis of the submissions we receive, respective teams will be selected, purely based on the 1st round, for the final demonstration at IIT Bhubaneswar. A conformation mail will be sent to the selected teams, to take part in Colloquia Electrical in Wissenaire\'15.</p><p> <strong>Round 3:</strong></p><p> 1 This round is a small quiz among top 5 teams that were selected in the round 2.</p><p> 2 Questions will be related to all the domains that were mentioned earlier.</p><p> 3 This quiz also has a small role to perform in selecting the winner.</p><p> No negative marking. <br/></p>'],["Rules",'<p> <strong><u>Team Formation Rules:</u></strong></p><p> 1 Maximum number of participants in the team should not exceed 3.</p><p> 2 No participant can take part in more than one team.</p><p> 3 Each participant should bring their respective college ID proof.</p><p> 4 It is not obligatory that the participants forming a team should be from the same college.</p><p> 5 Any number of teams can come from same college, thereâ€™s no restriction for it.</p><p> <strong><u>Presentation Rules:</u></strong></p><p> 1 Presentation should not exceed 15 minutes.</p><p> 2 The maximum time allotted for single presentation is 12 minutes, followed by a queries section for 3 minutes.</p><p> 3 Presentation crossing the allotted time, damage the score.</p><p> Plagiarism is not encouraged. <br/></p>'],["Contact Details",'<p> Pradeep kumar</p><p> Event coordinator, Wissenaireâ€™15</p><p> Phone: +91-7749995369</p><p> Email: <a href="mailto: pm17@iitbbs.ac.in"> pm17@iitbbs.ac.in</a></p>'],["PDF",'<a href="PDF/Colloquia Electrical Pdf.pdf" target="_blank">Download</a>']];
	
	event_details[1][3] = [["Introduction",'<p>â€œYou can have brilliant ideas, but if you canâ€™t get them across, your ideas wonâ€™t get you anywhere.â€</p><p> - Lee Laccoca</p><p>Colloquia is a presentation event in which young talented minds prove themselves by presenting over the chosen domain for few minutes in presence of delegates. It attains experience, gains communication skills and forbid buck fever.</p><p>Colloquia Civil provides a great opportunity for the tech enthusiasts around the globe to demonstrate their presentation skills and their knowledge over a specific domain.</p><p>Again this time colloquia Civil booms with its spanking new domains covering almost all the hot topics and the most stimulating ones. So seize this chance and let the IIT Bhubaneswar hear your power of speech.</p>'],["Domains",'<p> <ul> <li>Highway Geometric Design</li><li> Sight Distance in Roads</li><li> Road Construction Techniques</li><li> Self-Compacting Concrete</li><li> Corrosion of steel in Concrete</li><li> Engineering aspects of Reinforced Concrete</li><li> Seismic Behaviour of Isolated Bridges</li><li> Stress Ribbon Bridges</li><li> New Techniques of Waste Water Management</li><li> Interlinking of Indian Rivers -Challenges and Prospects</li><li> Effect of Seawater Intrusion and its control strategies</li><li> Effect of Oil Spills on Marine Environment</li><li> Evacuation Patterns in High Rise Buildings</li><li> Soil Stabilization</li><li> Oceans as a Non-conventional Source of Energy</li><li> Passive Solar Buildings</li><li> Flexible Pavement</li></ul></p>'],["Event Format",'<p> <strong>Round 1: (Online)</strong></p><p> 1 Participants have to mail the ppt files on their topic of interest provided in the list of domains.</p><p> 2 Participants should submit their ppt files to <a href="mailto:submissions@wissenaire.org">submissions@wissenaire.org</a> with subject as Colloquia-Civil.</p><p> 3 Complete details of the participants should be mentioned in the submissions.</p><p> 4 The topic of the presentation must be given as the heading of the submission.</p><p> <strong>Round 2: </strong></p><p> On the basis of these submissions, teams will be selected for the final demonstration at IIT Bhubaneswar. A conformation mail will be sent to the selected participants to perform in Colloquia Civil in Wissenaire\'15.</p>'],["Rules and Regulatons",'<p><strong><u>Team Formation Rules:</u></strong></p><p> 1 Maximum number of participants in the team should not exceed 3.</p><p> 2 No participant can take part in more than one team.</p><p> 3 Each participant should bring their respective college ID proof.</p><p> 4 It is not obligatory that the participants forming a team should be from the same college.</p><p> 5 Any number of teams can come from same college, there\'s no restriction for it.</p><p> <strong><u>Presentation Rules:</u></strong></p><p> 1 Presentation should not exceed 15 minutes.</p><p> 2 The maximum time allotted for single presentation is 12 minutes, followed by a queries section for 3 minutes.</p><p> 3 Presentation crossing the allotted time, damage the score.</p><p> 4 Plagiarism is not encouraged.</p><p><strong><u>General Rules:</u></strong></p><p><strong><u></u></strong></p><p> 1 Violation of any rule results in rejection of paper.</p><p> 2 The presentation will be judged on the basis of their innovation, in depth knowledge of the field and presentation skills.</p><p> 3 In case of any discrepancy, decision made by the judge is final.</p>'],["Contact details",'<p>Mohan Peddada</p><p> Event Co-ordinator, Wissenaire\'15</p><p>Ph.no:-+91-9985861000</p><p>Email: - mp11@iitbbs.ac.in</p>'],["PDF",'<a href="PDF/CIVIL COLLOQUIA PDF.pdf" target="_blank">Download</a>']];
	
	event_details[1][4] = [["Introduction",'<p> â€œYou can have brilliant ideas, but if you canâ€™t get them across, your ideas wonâ€™t get you anywhere.â€</p><p> -Lee Laccoca</p><p> Colloquia is a presentation event in which young talented minds prove themselves by presenting over the chosen domain for few minutes in presence of delegates. It attains experience, gains communication skills and forbid buck fever.</p><p> Colloquia Metallurgy provides a great opportunity for the tech enthusiasts around the globe to demonstrate their skills and knowledge over a specific domain.</p><p> This time colloquia Metallurgy booms with outstanding domains, covering almost all the trending topics. So seize this opportunity and let Bhubaneswar hear the power of your speech. <br/></p>'],["Domains",'<p> <ul><li>Energy storage materials</li><li> Materials for green technology</li><li> Chromite ore processing</li><li> Tailings disposable and effluence processing(zero waste technologies)</li><li> Bio-processing</li><li> Super conducting materials</li><li> Tribology(friction, wear and lubrication) of materials</li><li> Thermodynamics of materials</li><li> Metal failure analysis</li><li> Nuclear materials: processing, fabrication, use and disposal</li><li> Electronic, optical and magnetic materials</li><li> Stochastic process and MONTE-CARLO simulations</li><li> Nano composite materials</li><li> Micro Electro Mechanical Systems(MEMS) : Materials and micro fabrication techniques</li><li> Lithium air battery: materials perspectives</li><li> Digital memory materials: from MRAM to FE-RAM</li><li> Thermo electric materials</li><li> Energy harvesting from vibration using piezoelectric materials</li></ul></p>'],["Event Format",'<p> <strong><u>Round 1: (Online)</u></strong></p><p> 1 Participants have to mail the .ppt files electing their topic of interest provided in the list of domains.</p><p> 2 Participants should submit their .ppt files to <a href="mailto:submissions@wissenaire.org">submissions@wissenaire.org</a> with subject of mail as Colloquia-Metallurgy.</p><p> 3 Complete details of the all participants, taking part in the presentation, should be mentioned in the submissions.</p><p> 4 Specify topic of the presentation as the heading of the submission.</p><p> 5 Last date for submission is 5th January.</p><p> <strong><u>Round 2: </u></strong></p><p> On the basis of the submissions we receive, respective teams will be selected, purely based on the 1<sup>st</sup> round, for the final demonstration at IIT Bhubaneswar. A conformation mail will be sent to the selected teams, to take part in Colloquia Metallurgy in Wissenaire\'15. <br/></p>'],["Rules",'<p> <strong><u>Team Formation Rules:</u></strong></p><p> 1 Maximum number of participants in the team should not exceed 3.</p><p> 2 No participant can take part in more than one team.</p><p> 3 Each participant should bring their respective college ID proof.</p><p> 4 It is not obligatory that the participants forming a team should be from the same college.</p><p> 5 Any number of teams can come from same college, thereâ€™s no restriction for it.</p><p> <strong><u>Presentation Rules:</u></strong></p><p> 1 Presentation should not exceed 15 minutes.</p><p> 2 The maximum time allotted for single presentation is 12 minutes, followed by a queries section for 3 minutes.</p><p> 3 Presentation crossing the allotted time, damage the score.</p><p> 4 Plagiarism is not encouraged.</p><p> <strong><u>General Rules:</u></strong></p><p> 1 Violation of any rule results in rejection of paper.</p><p> 2 The presentation will be judged on the basis of their innovation, in depth knowledge of the field and presentation skills.</p><p> In case of any discrepancy, decision made by the judge is final. <br/></p>'],["Contact Details",'<p> Siddhartha Vasireddy</p><p> Event coordinator, Wissenaireâ€™15</p><p> Phone no: - +91-9040893520</p><p> Email: - sv13@iitbbs.ac.in</p>'],["PDF",'<a href="PDF/colloquia metallurgy pdf.pdf" target="_blank">Download</a>']];
	
	event_details[1][5] = [["Introduction",'<p> "You can have brilliant ideas, but if you can&#8217;t get them across, your ideas won\'t get you anywhere."</p><p> -Lee Laccoca</p><p> Colloquia is a presentation event in which young talented minds prove themselves by presenting over the chosen domain for few minutes in presence of delegates. It attains experience, gains communication skills and forbid buck fever.</p><p> Colloquia Economics provides a great opportunity for the management students around the globe to demonstrate their skills and knowledge over a specific domain.</p><p> This time Colloquia Economics booms with its spanking new domains covering almost all the hot topics and the most stimulating ones. So seize this chance and let the IIT Bhubaneswar hear the power of your speech. <br/></p>'],["Domains",'<p> <ul>Commercialization and Privatization of higher education</li><li> Efficient allocation of Natural Resources</li><li> Fall in value of Rupee</li><li> The Problem of Monopoly</li><li> Growth of Asian companies</li><li> Foreign direct investment is good or not for a country</li><li> Quantitative easing</li><li> real business cycle theory</li><li> Inflation and its consequences in developing and under developed countries.</li><li> International Trade</li></ul></p>'],["Event Format",'<p><strong><u>Round 1: (Online)</u></strong></p><p> 1 Participants have to mail the .ppt files electing their topic of interest provided in the list of domains.</p><p> 2 Participants should submit their .ppt files to <a href="mailto:submissions@wissenaire.org">submissions@wissenaire.org</a> with subject of mail as Colloquia-Economics.</p><p> 3 Complete details of the all participants, taking part in the presentation, should be mentioned in the submission.</p><p> 4 Specify topic of the presentation as the heading of the submission.</p><p> 5 Last date for submission is 5th January, 2015.</p><p> <strong><u>Round 2: </u></strong></p><p> On the basis of the submissions we receive, respective teams will be selected, purely based on the 1<sup>st</sup> round, for the final demonstration at IIT Bhubaneswar. A conformation mail will be sent to the selected teams, to take part in Colloquia Economics in Wissenaire\'15.</p>'],["Rules & Regulation",'<p> <strong><u>Team Formation Rules:</u></strong></p><p> 1 Maximum number of participants in the team should not exceed 3.</p><p> 2 No participant can take part in more than one team.</p><p> 3 Each participant should bring their respective college ID proof.</p><p> 4 It is not obligatory that the participants forming a team should be from the same college.</p><p> 5 Any number of teams can come from same college, there&#8217;s no restriction for it.</p><p> <strong><u>Presentation Rules:</u></strong></p><p> 1 Presentation should not exceed 15 minutes.</p><p> 2 The maximum time allotted for single presentation is 12 minutes, followed by a queries section for 3 minutes.</p><p> 3 Presentation crossing the allotted time, damage the score.</p><p> 4 Plagiarism is not encouraged.</p><p> <strong><u>General Rules:</u></strong></p><p> 1 Violation of any rule results in rejection of paper.</p><p> 2 The presentation will be judged on the basis of their innovation, in depth knowledge of the field and presentation skills.</p><p> 3 In case of any discrepancy, decision made by the judge is final.</p>'],["Contacts",'<p> Ramesh surabhi</p><p> Event coordinator, Wissenaire\'15</p><p> Phone no: - +91-7749994941</p><p> E-mail: - rs16@iitbbs.ac.in</p>'],["PDF", '<a href="PDF/colloquia economics pdf.pdf" target="_blank">Download</a>']];
	
	event_details[2][0] = [["Introduction",'<p> â€œYou have a tendency, Hastings, to prefer the least likely. That, no doubt, is from reading too many detective stories.â€</p><p> - Agatha Christie</p><p> Sherlock testâ€™s your story writing skills and your ability to generate suspense among the readers. Give it a try and know by yourself whether you are one of those, who make adrenaline rush out in the nerves of the bibliophiles, while flipping the pages. <br/></p>'],["Problem Statement",'<p> <strong><u>Plot:</u></strong></p><p> A retired journalist hasnâ€™t been home for a couple of weeks. His sister intolerably bothered about him, canâ€™t keep her nerve and contacted a dear ex-detective if he can help her in contacting him. The missing journalist is known to go invisible for many days from his home, but always returned. However detective come to know that this time it isnâ€™t the case. After a splendid research, he discovers that journalist is in some sort of trouble, which his sister hardly knows. The journalist is soon found brutally murdered. Detective discovers that journalist has been researching on death of one famous model, happened 5 years earlier as she fell from the 10<sup>th</sup> floor of her apartment. It was thought to be a suicide and the case was shut within 1 week. Detective realizes later, after a series of interviews with those who knew and were closest to model, that it was in fact a murder. In the circle of friends and family of the glamorous model, detective gets increasingly involved in the complicated path that is leading to her murderer and realizes that this killer is probably the worst he has ever dealt with.</p><p> Imagine that you are that detective, how are you going to solve the case and ensure righteousness for the murdered model. This plot should contain usage of sophisticated technology and betrayal. It must answer questions like, why journalist has been working even after his retirement. Why he had picked the case of that model, which was wrapped up 5 years ago? <br/></p>'],["Rules",'<p> <ul><li> The writing should not exceed 2000 words.</li><li> All have to submit it by mailing to <a href="mailto:submissions@wissenaire.org">submissions@wissenaire.org</a> with the subject of mail as Sherlock.</li><li> Last date for submitting is 10<sup>th</sup> January.</li></ul><p> Results will be declared momentarily after the fest concludes. <br/></p>'],["Contact Details",'<p> Siddhartha Vasireddy</p><p> Event coordinator, Wissenaireâ€™15</p><p> Phone no: - +91-9040893520</p><p> Email: - sv13@iitbbs.ac.in</p>'],["PDF",'<a href="PDF/SHERLOCK.pdf" target="_blank">Download</a>'],["",'']];
	
		event_details[2][1] = [["Introduction",'<p> The time has come to enter the battlefield and show your mettle in this virtual war, showing your skill, accuracy and speed. So zip up your armor and ready your guns and ammo as Wissenaire\'14 brings to you LANwar, the perfect platform to showcase your gaming talent. So all you gaming geeks out there, get ready to meet other game fanatics like you in a bid to find out who is the best. <br/> <br/> <label>LANwar</label> -A LAN tournament in <label>Call of duty: Modern Warfare</label> and <label>Counter Strike. Problem Statement for COD coming soon</label> <br/></p>'],["Tournament Format",'<div> Tournament Procedure:</div><div> &#61656; The tournament will be held over a single day and the date and time of which will be uploaded on the website.</div><div> &#61656; This tournament will be conducted in three rounds as mentioned below:</div><div> Round 1:</div><div> &#61656; Maximum 20 rounds will be held.</div><div> &#61656; 10 rounds as terrorists and remaining 10 rounds as a counter terrorist for each team.</div><div> &#61656; If any team scores 11, the match finishes and that team will be declared as winner.</div><div> Round 2:</div><div> &#61656; This is semi-final round.</div><div> &#61656; Similar to 1st round, 20 rounds will be held.</div><div> &#61656; 10 rounds as the terrorists and 10 rounds as the counter terrorists for each team, which was selected from 1st round.</div><div> &#61656; If any team have 11 rounds winning score, that team will be selected for final round.</div><div> WISSENAIRE&#8217;15</div><div> Knowledge runs free&#8230;</div><div> www.wissenaire.org Page 2</div><div> Round 3:</div><div> &#61656; This round is the final round.</div><div> &#61656; There will be maximum 30 rounds.</div><div> &#61656; 15 rounds as the terrorists and remaining 15 rounds as the counter terrorists for each team.</div><div> &#61656; If any team scores 16, the match will be ended immediately</div>'],["Rules",'<div> &#61656; Systems will be provided at the venue. But participants have to bring their own mouse and headphones (if at all required), no other hardware&#8217;s are allowed.</div><div> &#61656; Registration fees will be Rs. 500/- per team.</div><div> &#61656; Registrations will be done on the day of the event itself at the Registrations Desk, IIT Bhubaneswar, Samantapuri, Bhubaneswar.</div><div> &#61656; Competition Method: 5 Vs 5 (Team play, 5 players per team).</div><div> &#61656; Round time: 3 minutes.</div><div> &#61656; Sides: (Counter-Terrorist/Terrorist) will be decided by a preliminary knife match between teams. Sides for the knife match will be decided by a coin toss.</div><div> &#61656; Participant must not mishandle the computer system and console. Any damage caused, will be borne by the participant.</div><div> &#61656; Server will be cheat secure (Value secure server). Cheating will lead to team disqualification.</div><div> &#61656; Selection procedure will be decided by gaming committee and decision of the committee will be final.</div><div> &#61656; Use of any unfair means, whatsoever will lead to team disqualification.</div><div> WISSENAIRE&#8217;15</div><div> Knowledge runs free&#8230;</div><div> www.wissenaire.org Page 3</div><div> &#61656; Maps: maps will be randomly drawn from a pool of maps including the following maps.<br/>de_dust, de_inferno, de_nuke, de_train</div><div> &#61656; In the case of a tie after regulation, 6 extra rounds will be played. (3 rounds as terrorist and 3 rounds as counter- Terrorists per team).</div><div> &#61656; Team members can communicate verbally at all times.</div><div> &#61656; Spectators are not allowed in the tournament area.</div><div> &#61656; Any other unmentioned use of map or program bugs will result in a warning at the minimum or loss by default for the offending team decided by the referees at their sole discretion.</div><div> WISSENAIRE&#8217;15</div><div> Knowledge runs free&#8230;</div><div> www.wissenaire.org Page 4</div><div> &#61656; Any competitor or team attempting to use any exploits in a map shall be immediately disqualified and maybe removed from the event. If you have a question regarding a particular tactic, ask the tournament coordinators prior to the match.</div><div> &#61656; SERVER CRASHES:- If a server crashes before 2 complete rounds have been played, the game score will be reset to 0-0 and the affected leg of the match will be started once the server is available. If the server crashes from the 3rd round onwards, the server will be restarted, and game play will resume with the max rounds of the affected leg set to the outstanding rounds to be played.</div><div> &#61656; Start money may not be altered.</div><div> &#61656; Protest/disputes can only be filed by the team leader.</div><div> &#61656; The event coordinator(s) reserve(s) the right to take any decisions according to his/her discretion.</div><div> &#61656; Teams can be disqualified on grounds of misbehaviour.</div><div> &#61656; Minor changes can be done in rules which will be informed to all the participants prior to the tourname</div>'],["Contact Details",'<p> Vikas Kantiwal</p><p> Event coordinator, Wissenaireâ€™15</p><p> Phone no: - +91-8908230331</p><p> Email: - vicky.kantiwal742@gmail.com</p>'],["PDF",'<a href="PDF/counter strike.pdf" target="_blank">Download</a>'],["",'']];
	
	event_details[3][0] = [["Introduction",'<p> <strong>â€œThere\'s no luck in business. There\'s only drive, determination, and more drive.â€</strong> <strong></strong></p><p> Want to be a great entrepreneur? Then be ready to face a major obstacle -RECESSION!! This event provides you an opportunity to give your views and opinions regarding the cause of financial crisis like recession in a company(assume you are the owner of that company!). The participant also need to suggest a possible solution(s) to overcome such situations. FINANZA will test your analytical and investment skills to see if you can resist the recession storm.</p>'],["Event Format",'<p> The event consists of two rounds. The following is the format of each round:</p><p> <strong><u>Round-1</u></strong> <strong>:<u></u></strong></p><p><ul><li> This is an online round in which each team has to submit a detailed report describing Major factors for the cause of recession in a company/an asset <strong>.</strong></li><li> Report should not exceed maximum of 6 pages and should be in PDF format.</li><li> The cover page of the report should contain names of the team members, name of college and contact details.</li><li> Submissions should be in PDF format and mailed to <a href="mailto:submissions@wissenaire.org"><strong>submissions@wissenaire.org</strong></a> <strong> </strong>with subject \'FINANZA\', on or before 10<sup>th</sup> January.</li></ul></p><p> Based on the reports teams will be shortlisted for second round. The shortlisted teams will receive a confirmation email from us.<strong></strong></p><p> <strong>Note</strong> : The factors shouldnâ€™t be minor ones.<strong></strong></p><p> <strong><u>Round-2</u></strong> <strong>:</strong></p><p> In this round each team should present a speech/presentation with the following description in the presence of delegates at IIT Bhubaneswar during the fest:</p><p><ul> <li> At least one major factor for the cause of recession in a company/an asset.</li><li> The team\'s suitable solution(s) to overcome the recession caused by factor(s) that the team has chosen.</li><li> Duration of speech/presentation should be for 8-10 minutes.</li></ul> <br/></p>'],["Rules",'<p> <strong><u>Rules and regulations:</u></strong></p><p> Ã˜ Maximum number of participants in a team is two<a name="_GoBack"></a>.</p><p> Ã˜ The factors for recession mentioned should be <strong>Major</strong>. Minor causes will not be accepted.</p><p> Ã˜ All the participants should be registered.</p><p> Ã˜ Each participant should bring their respective college ID proof.</p><p> Ã˜ No person can be a part of more than one team.</p><p> Ã˜ Participants from different colleges can participate together.</p><p> Ã˜ Violation of any rule can result in elimination of team from the event.</p><p> <strong><u>Allotted time:</u></strong></p><p> Ã˜ The duration of speech/presentation in the second round should be for 8-10 minutes.</p><p> <strong><u></u></strong></p>'],["Judging Criteria",'<p>Participants will be judged based on thefollowing criteria:</p><p><ul><li> Communication skills</li><li> Confidence levels</li><li> Teamwork</li><li> Refutation</li><li> Creativity and Novelty</li><li> Ability to support your ideas </li></ul></p><p><strong><u>Note</u></strong>:Decisions taken by the judges are final. Any extension in the allotted timewill result in the loss of points.</p>'],["Contact Details",'<p>K. Praveen Kumar, </p><p>Event coordinator, Wissenaireâ€™15</p><p>Phone no: - +91-7749994737</p><p>Email: - pk14@iitbbs.ac.in</p>'],["PDF", '<a href="PDF/FINANZA pdf.pdf" target="_blank">Download</a>']];
	
	event_details[3][1] = [["Introduction",'<p>Creativity is critical to effectiveadvertising. What makes Brands? How do they survive in this world of cutthroatcompetition? What separates the lions from the sheep? â€˜Do you have it in you?â€™ After all, â€˜Darr ke aage Jeet haiâ€™! .Some of those well-known brand ads are VODAFONE with their zoo-zoo, GOOGLE, IDEA\'s Honey bunny. This Event allows an opportunity for the participants todemonstrate promotional knowledge and skills necessary for advertisingmanagement personnel.WISSENAIRE\'15 provides you a perfect platform to usecreativity to deliver powerful ad messages to the world.</p>'],["Event Format",'<p><strong>ROUND-1:</strong></p><p><ul><li>Participants have to register in our website and submit their outsketch ad concept through <a href="mailto:submissions@wissenaire.org">submissions@wissenaire.org</a>in PDF format through clear cut explanation.</li><li> Confirmationmail will be sent to the participants who are eligible for 2nd round at IITBhubaneswar.</li></ul></p><p><strong>ROUND-2:</strong></p><p><ul><li> Participants need to open up with their selective ad concept from the given domain.</li><li> Participants should also need to give explanation for the selection of the product and how that concept is apt for the product.</li><li> Theposter should include a tag line/slogan related. However, this should not beabusive or hurt the sentiments of any religion/community/groups etc.<li><li> The creativity in tag line.(This is based oncreativity and originality of the depicted idea, Interpretation and the clarityof the idea. This will be decided by the judges. )</li><li> Digital content (Google images, etc.) and editingof the images/content of the poster is allowed.<li><li> Useof trademarks, logos, copyright ad material is not allowed.</li><li>Participants have to come well prepared withtheir ad concept in sheets as they need to explain that to judges.</li></ul></p><p>If possible participants can bring a digital ad and Logo of their concept which would bemore effective.<br/></p>'],["Rules",'<p><strong><u>TEAMSIZE: </u></strong></p><p><ul><li> Eachteam can consist of maximum of at two participants.</li><li> Cross-collegeparticipants are allowed.</li><li> All the members of the team should get registered. </li><li> No person can be a part of more than one team.</li></ul></p><p><strong><u>Allottedtime: </u></strong></p><p>Duration of speech/presentation should befor 8-10 minutes.</p><p><strong><u>Note:</u></strong></p><p>Decisions taken by the judges are final. Any extension in the allotted time will result in the loss of points.<br/></p>'],["Contact Details",'<p>Mohan Peddada</p><p>Event Co-ordinator,Wissenaireâ€™15</p><p>Phone: +91-9985861000</p><p>Email: mp11@iitbbs.ac.in</p>'],["PDF",'<a href="PDF/Pitched Pdf.pdf" target="_blank">Download</a>'],["",'']];
	
	event_details[3][2] = [["introduction",'<p>â€œTo becomesuccessful, one must put themselves in the paths of giants!â€ <br/>? <a href="../../www.goodreads.com/author/show/568176.Lillian_Cauldwell.html"><strong>Lillian Cauldwell</strong></a></p><p>There are many young and dynamic minds among present generation which once stimulated, through the implementation of their ideas can produce business giants like Bill Gates, Steve Jobs, and Warren Buffet etc. Here, this is the event for those people, who think that their calibre and ideas would make them to reach great heights. Get equipped yourselves with creative ideas in business and entrepreneurship field and let a Bill Gates come out of you.<br/></p>'],["Event Format",'<p>This event consists of two rounds.</p><p><strong>Round1(online): </strong></p><p> 1 The participants have to submit an abstract of their business plan via mail(for details about the abstract see below). </p><p> 2 A confirmation mail will be sent to the participants eligible for the 2nd round. </p><p><strong>Round2:</strong></p><p> 1 Teams finalized for the 2nd round will have to give Verbal Business Plan Presentation.<strong></strong></p><p> 2 All type of media presentation toolscan be used for this round.</p><p> 3 The presentation time should not bemore than 15 minutes. </p>'],["Rules",'<p>1 Each team must comprise of two or three members.</p><p>2 Team members can be from different institutes.</p><p>3 There is no limit on the number of entries per university/college/organization.</p><p>4 A participant cannot be a part of twoor more teams. </p><p>5 The submission for online round is to be mailed to submissions@wissenaire.org with subject â€œPLAN DE NEGOCIOUSâ€.</p><p>6 Judgeâ€™s decision will be final.</p><p>7 Last date of abstract submission is 10-01-2015.</p>'],["Abstract",'<p><strong>Your abstract for the business plan should have the following points:</strong></p><p><strong>1 Business Summary:</strong></p><p> The business plan must summarize your idea, the potential market for your businessand its feasibility. It should give a brief idea about how you intend tofinance your plan and market it to customers and investors.<strong></strong></p><p><strong>2 Market Analysis:</strong></p><p>Ã˜ Analyzation of the potential market for your business plan. Give a study or research of the market showing why your plan will be well accepted. </p><p><strong>3 Company Description:</strong></p><p> It is Part 3 of the business plan. Without going into detail, this section should include a high level look at how all of the different elements of your business fit together.The company description section should include information about the nature ofyour business as well as list the primary factors that you believe will makeyour business a success.</p><p><strong>4 Organization & Management:</strong></p><p> In this section show about the organization of your company , different levels of hierarchy, and how the different parts of the work will be divided among the different teams . Also decide the qualification and experience you require from the people you recruit to make your organization effective.</p><p><strong>5 Marketing & sales Management:</strong></p><p> It is Part 5 of your business plan. Marketing is the process of creatingcustomers, and customers are the lifeblood of your business. In this section,the first thing you want to do is define your marketing strategy. There is nosingle way to approach a marketing strategy; your strategy should be part of anon-going business-evaluation process and unique to your company.www.wissenaire.org</p><p><strong>6 Service or Product Line:</strong></p><p> Describethe product or service that you are offering, in this section. Describe in detail the utility or usefulness of your product or service for the customers. Also tell why it will be preferred over similar products.</p><p><strong>7 Funding Request:</strong></p><p> TheFunding Request is Part 7 of your business plan. In this section, you will requestthe amount of funding you will need to start and then further expand yourbusiness. Describe in detail how the money funded will be allocated to varioussectors of your business.</p><p><strong>8 Financials:</strong></p><p>Ã˜ Financials is Part 8 of your business plan. The financials should be developed after you\'ve analyzed the market and set clear objectives. Show how the money earned will be utilized and how you will manage in case losses are incurred.</p><p><strong>9Appendix:</strong></p><p> TheAppendix is Part 9 of your business plan. This section should be provided toreaders on an as-needed basis. In other words, it should not be included withthe main body of your business plan. Your plan is your communication tool; as such, it will be seen by a lot of people. Some of the information in the business section you will not want everyone to see, but, specific individuals (Such as creditors) may want access to this information in order to make lending decisions.www.wissenaire.org </p><div><p><strong>In the end, yourbusiness plan should answer these.......</strong></p></div><p><ul><li> Isthe business opportunity you presented practical/realistic?</li><li> Isthe plan clear and well-written?</li><li> Whatis the estimated initial capital investment needed?</li><li> Anyreference to the past ventures of this kind that succeeded?</li><li> Whowill be the target customer(s)?</li><li> Howlong will it take from the current stage of development to bring the product to its market?</li><li>Doesthe team have a clear plan for spending the investment money it receives?</li><li> Whatis the expected time and amount of pay-off to investors?</li><li> Isthe plan sustainable to competition?</li><li> Canthis venture achieve an apex position in its market?</li><li> Whywill the business still be in demand after a few years?</li><li>Did you think of protecting your businessâ€™ Intellectual Property assets?</li></il></p><br/></pre>'],["Contact Details",'<p>Pavan Kumar</p><p>Phone: 07077103833</p><p>Email: pr13@iitbbs.ac.in</p>'],["PDF",'<a href="PDF/PLAN DE NEGOCIOUS PROBLEM STATMENT.pdf" target="_blank">Download</a>']];
	
	event_details[3][3] = [["Topics",'<p><ul><li> The Right to Fair Compensation andTransparency in Land Acquisition, Rehabilitation and Resettlement Act,2012. </li><li> Street Vendors (Protection ofLivelihood and Regulation of Street Vending) Act, 2012. </li><li> Indian companies act, 2013. </li><li> The national judicial appointmentcommission bill, 2014. </li><li> The National Institute of DesignBill, 2014. </li><li> The Andhra Pradesh Reorganization(Amendment) Bill, 2014. </li><li> The Telecom Regulatory Authority ofIndia Bill, 2014. </li><li> The Securities Laws (Amendment) Bill,2014.</li></ul></p><strong><u>Note</u></strong><strong>:</strong> The participants can either choose any bill of their will or one amongstthe list of bills given above.</p>'],["Rules",'<p><strong> <u>Team size</u>:</strong></p><p><ul><li>Each team should comprisemaximum of two members. </li><li>Participants from differentcolleges can form a team. </li><li>All the members of the teamshould get registered. </li><li>No person can be a part ofmore than one team. </li></ul></p>'],["Event Format",'<p><strong><u>Round1(online round):</u></strong></p><p><ul><li> The participants have tosubmit a detailed report on the chosen topic. </li><li>The report should belimited to a maximum of 1000 words and should be submitted in pdf format. </li><li>The cover page of thereport should contain names of the team members, name of college and contactdetails. </li><li>The submissions for thisround should to be mailed to submissions@wissenaire.org with subject â€˜ROSTRUMâ€™.</li><li>Based on the report, fewteams will be short listed for the next round.</li></ul></p><p>The shortlisted teams canparticipate in the Round 2 once they receive a confirmation email from us. </p><p><strong><u></u></strong></p><p><strong><u></u></strong></p><p><strong><u>Round 2:</u></strong></p><p><strong><u></u></strong></p><p><ul><li>Each team will be given 8minutes to present their speech regarding the topic they have chosen. </li><li>After each presentationthere will be a 5 minutes Q&A session for each team. </li><li>At the end of the round,questions will be open to the audience for discussion (5 minutes). </li></ul></p>'],["Judging Criteria",'<p>Participants will be judged based on the following criteria: </p><p><ul><li>Communication skills </li><li>Parliamentary skill </li><li>Confidence levels </li><li>Intelligent use of Points </li><li>Heckling (Infrequent buteffective ability to handle hecklers) </li><li>Refutation </li><li>Use of evidence </li><li>The decision of judge isfinal. Any extension in the allotted time will result in the loss of points</p>'],["Contact Details",'<p>Phanindra Attada</p><p>Event Co-ordinator, Wissenaireâ€™15</p><p>Phone: +91-7750894706</p><p>Email: <a href="mailto:pa11@iitbbs.ac.in">pa11@iitbbs.ac.in</a></p>'],["PDF",'<a href="PDF/ROSTRUM.pdf" target="_blank">Download</a>']];
	
	event_details[4][0] = [["Introduction",'<p> â€œComputer programming, right now, is the perfect embodiment of the human dreamsâ€</p><p> Â­Â­ -Partovi</p><p> We beckon you to join us in the quest for the competent Programmer. Set your goal and join the race. Prove yourself in the test not only of your skill, but also for your endurance and perseverance, as you make your way through a series of problems equipped with c and c++ as your tools.</p>'],["Event Format",'<p> <strong><u>PRELIMS</u></strong> : Online competition</p><p> It is an online round, held across the country at various centres. This round is open for both participants from India and outside India.</p><p><ul><li> It is an online coding competition held in various colleges.</li><li> Duration of test is 1hour.</li><li> Participants can register in our website.(No registration fee for this round date and time of exam will be up dated in our website .regestered candidates will be informed through mail).</li><li> Qualified participants are eligible to participate in next round.</li></ul></p><p> <strong><u>FINAL ROUND: </u></strong></p><p><ul><li> Final round will be held at IIT BHUBANESWAR samantapuri campus.</li><li> Participants will be provided a computer.</li><li> Event duration will be 3 hours.</li><li> Nature and Number of problems along with evaluation criteria will be provided with the problem statements at the venue</li></ul></p><p> <strong><u>NOTE:</u></strong></p><p> Interested candidates who could not attend for online test can directly come to our campus during the fest to take a written test.Candidates who cleared the written test can directly compete in final round.</p><p><ul><li> Programming languages should be either C or C++</li></ul></p>'],["Rules",'<p> <ul><li>You are allowed to take a reference book or any material (not exceeding 50 pages) during event.</li><li> Use of internet is not permitted; making use of any electronic gadgets like TABs, Mobiles, etc. may lead to disqualification.</li></ul></p>'],["Contact Details",'<p> Pradeep Kumar Manigilla</p><p> Event Coordinator, Wissenaireâ€™15</p><p> Phone: +91-7749995369</p><p> Email:</p><a href="mailto: pm17@iitbbs.ac.in"> pm17@iitbbs.ac.in</a>'],["PDF", '<a href="PDF/Codec.pdf" target="_blank">Download</a>'],["",'']];
	
	event_details[4][1] = [["Introduction",'<p> We have always been in some sort of battle of pride with the Mother Nature. Many say he just gets his inspiration from nature, but it seems more of a quest for brilliance for man, to show his upper hand over the Nature. But one thingâ€™s for sure, being the greatest creation of nature, we are all born designers!! Here, at â€œIntrigueâ€, we give you the prospect of competing with the nature. So get the designer cap on and groom up for the ultimate design competition right here, at Wissenaireâ€™15<a name="_GoBack"></a>!!</p>'],["Event Format",'<p> This event comprises of one round where you will be given a design prototype on the spot and you have to design it using the AUTOCAD SOFTWARE.</p>'],["Rules",'<p> Ã˜ Each team consists of only one person</p><p> Ã˜ Computers with auto cad software will be provided (but in limited).</p><p> Ã˜ In case of any discrepancy, decision made by the judge is final.</p><p> Every person should carry their college id card.</p>'],["Judging Criteria",'<p> Ã˜ Participants will be judged based on the following criteria:</p><p> Ã˜ The participant who completes the prototype given to them perfectly without any error in minimum time is declared as the winner</p>'],["Judging Criteria",'<p> Ramesh Surabhi</p><p> Event coordinator, Wissenaire\'15</p><p> Phone no: - +91-7749994941</p><p> E-mail: - rs16@iitbbs.ac.in</p>'],["PDF",'<a href="PDF/intrigue_problem statement.pdf" target="_blank">Download</a>']];
		
	event_details[4][2] = [["Introduction",'<p> <strong><em>â€œ</em></strong> <em>Everybody should learn to program a computer, because it teaches you </em></p><p> <em>how to thinkâ€</em> <em></em></p><p> <em> â€” Steve Jobs</em></p><p> And you, agree or not, when it comes to programming, C/CPP has always proved to be the basic language and pinnacle of any technical event. Here is the gateway to develop the logic, sophistication and the golden opportunity to prove your worth. So just in one line, have you got that zeal, that enthusiasm, that knowledge which would separate you from the rest of the crowd and crown you as the connoisseur of the mega-event in Wissenaireâ€™15.</p>'],["Event Format",'<p> <strong><u>ROUND 1:</u></strong> <strong> (Online)<u></u></strong></p><p> <u></u></p><p> Participants will be tested on their understanding of the program. Participants have to go through the problem Statement and should mail the solutions in pdf format to <strong>submissions@wissenaire.org</strong>with subject as Richtig. It will be used to shortlist teams for the competition. A Confirmation mail will be sent to the selected participants to perform in Richtig at Wissenaire\'15.</p><p> <strong>1: (ONLI</strong> <br/> <br/></p><p> <strong><u>ROUND 2: </u></strong> <strong>Codes will be given on paper</strong></p><p> Ã˜ MONITORS WILL BE OFF</p><p> Ã˜ This will be a pen and paper round.</p><p> Ã˜ Participants have to debug the programs with in the stipulated time.</p><p> Ã˜ 20 points will be given for every correct answer and these points will judge</p><p> the eligibility for further rounds.</p><p> Ã˜ There is no partial marking.</p><p> Ã˜ Only top 8 teams will get qualified for 3<sup>rd</sup>round.</p><p> <strong><u>ROUND 3:(</u></strong> <strong>Quiz)</strong></p><p> <strong>This round consists of questions based on the programming language C/CPP. </strong></p><p> Ã˜ Each team would be gambling with the points earned from previous rounds.</p><p> Ã˜ After a question is asked, all the teams will have to bet a minimum amount</p><p> of 20 points, maximum being their current points.</p><p> Ã˜ The team which bets the maximum points will get a chance to answer the</p><p> question. If answered wrong, the team will lose all the gambled points. This</p><p> will be carried on to the team with the next highest bet, and this will</p><p> continue until the question is answered or all the teams have had a chance.</p><p> All the teams except the team answering correctly will lose the bet amount.</p><p> Ã˜ The team with more points at the end will be the Winner.</p>'],["Rules",'<p> <strong><u>TEAM FORMATION RULES: </u></strong></p><p> <u></u></p><p> Ã˜ A team can have maximum of 2 participants.</p><p> Ã˜ No participant can be part of more than one team.</p><p> Ã˜ Each participant should bring their respective college ID proof.</p><p> Ã˜ It is not necessary that the participants forming a team should be from the</p><p> same college.</p><p> Ã˜ There is no restriction on the number of teams from the same college.</p><p> <strong><u>GENERAL RULES: </u></strong></p><p> <u></u></p><p> Ã˜ Complete details of the participants should be mentioned in the submissions.</p><p> Ã˜ Decision of the event coordinator shall be treated as final.</p><p> Ã˜ Last date for submission is 10<sup>th</sup>January.</p>'],["Contact",'<p> Praveen Kumar</p><p> Event Coordinator,Wissenaireâ€™15</p><p> Ph no: +91 7749994737,</p><p> Email: pk14@iitbbs.ac.in</p>'],["PDF",'<a href="" target="_blank">RICHTIG PROBLEM STATEMENT</a>'],["",'']];
	
	event_details[5][1] =  [["",'<p> <strong>BIZ QUIZ</strong></p><p> Are you that burgeon on the business section of the news every day? Here we are with an offer which you canâ€™t refuse. This year WISSENAIREâ€™15 is back with its outstanding event â€œBIZ QUIZâ€, which takes you to the exciting world of business and entrepreneurship with a combination of breath-taking questions, with exciting rounds.</p><p> Each team participating in the quiz should contain two members of same or different colleges.</p><p> <strong>VENUE: </strong> Institute Auditorium<a name="_GoBack"></a><strong></strong></p>'],["",'<p> <strong>BIZ QUIZ</strong></p><p> Are you that burgeon on the business section of the news every day? Here we are with an offer which you canâ€™t refuse. This year WISSENAIREâ€™15 is back with its outstanding event â€œBIZ QUIZâ€, which takes you to the exciting world of business and entrepreneurship with a combination of breath-taking questions, with exciting rounds.</p><p> Each team participating in the quiz should contain two members of same or different colleges.</p><p> <strong>VENUE: </strong> Institute Auditorium<a name="_GoBack"></a><strong></strong></p>'],["",'<p> <strong>BIZ QUIZ</strong></p><p> Are you that burgeon on the business section of the news every day? Here we are with an offer which you canâ€™t refuse. This year WISSENAIREâ€™15 is back with its outstanding event â€œBIZ QUIZâ€, which takes you to the exciting world of business and entrepreneurship with a combination of breath-taking questions, with exciting rounds.</p><p> Each team participating in the quiz should contain two members of same or different colleges.</p><p> <strong>VENUE: </strong> Institute Auditorium<a name="_GoBack"></a><strong></strong></p>'],["",'<p> <strong>BIZ QUIZ</strong></p><p> Are you that burgeon on the business section of the news every day? Here we are with an offer which you canâ€™t refuse. This year WISSENAIREâ€™15 is back with its outstanding event â€œBIZ QUIZâ€, which takes you to the exciting world of business and entrepreneurship with a combination of breath-taking questions, with exciting rounds.</p><p> Each team participating in the quiz should contain two members of same or different colleges.</p><p> <strong>VENUE: </strong> Institute Auditorium<a name="_GoBack"></a><strong></strong></p>'],["",'<p> <strong>BIZ QUIZ</strong></p><p> Are you that burgeon on the business section of the news every day? Here we are with an offer which you canâ€™t refuse. This year WISSENAIREâ€™15 is back with its outstanding event â€œBIZ QUIZâ€, which takes you to the exciting world of business and entrepreneurship with a combination of breath-taking questions, with exciting rounds.</p><p> Each team participating in the quiz should contain two members of same or different colleges.</p><p> <strong>VENUE: </strong> Institute Auditorium<a name="_GoBack"></a><strong></strong></p>'],["",'<p> <strong>BIZ QUIZ</strong></p><p> Are you that burgeon on the business section of the news every day? Here we are with an offer which you canâ€™t refuse. This year WISSENAIREâ€™15 is back with its outstanding event â€œBIZ QUIZâ€, which takes you to the exciting world of business and entrepreneurship with a combination of breath-taking questions, with exciting rounds.</p><p> Each team participating in the quiz should contain two members of same or different colleges.</p><p> <strong>VENUE: </strong> Institute Auditorium<a name="_GoBack"></a><strong></strong></p>']];
	
	event_details[5][0] = [["",'<p> <strong><u>TECH QUIZ</u></strong></p><p> â€˜Knowledge has to be improved, challenged, and increased constantly, or it vanishes.â€™</p><p> - <a href="../../www.brainyquote.com/quotes/authors/p/peter_drucker.html" title="view author">Peter Drucker</a></p><p> Are you fascinated by the scientific and technological advancements around the world? How much do you know about the technical stuff that goes on in this world?? Do you have what it takes to come on top when competing against top notch quizzers??? Then, WISSENAIREâ€™15 is the right place for you to step in and display your endowment. We invite you to take part in the ultimate brain-storming session and test your tech trivia, watch while teams battle it out on stage as questions and answers fly back and forth with equal amplitude.</p><p> Each Team participating for the quiz should contain two students and there is no need that they should belong to the same college.</p>'],["",'<p> <strong><u>TECH QUIZ</u></strong></p><p> â€˜ <a href="../../www.brainyquote.com/quotes/quotes/p/peterdruck154448.html" title="view quote"> Knowledge has to be improved, challenged, and increased constantly, or it vanishes. </a> â€™</p><p> - <a href="../../www.brainyquote.com/quotes/authors/p/peter_drucker.html" title="view author">Peter Drucker</a></p><p> Are you fascinated by the scientific and technological advancements around the world? How much do you know about the technical stuff that goes on in this world?? Do you have what it takes to come on top when competing against top notch quizzers??? Then, WISSENAIREâ€™15 is the right place for you to step in and display your endowment. We invite you to take part in the ultimate brain-storming session and test your tech trivia, watch while teams battle it out on stage as questions and answers fly back and forth with equal amplitude.</p><p> Each Team participating for the quiz should contain two students and there is no need that they should belong to the same college.</p>'],["",'<p> <strong><u>TECH QUIZ</u></strong></p><p> â€˜ <a href="../../www.brainyquote.com/quotes/quotes/p/peterdruck154448.html" title="view quote"> Knowledge has to be improved, challenged, and increased constantly, or it vanishes. </a> â€™</p><p> - <a href="../../www.brainyquote.com/quotes/authors/p/peter_drucker.html" title="view author">Peter Drucker</a></p><p> Are you fascinated by the scientific and technological advancements around the world? How much do you know about the technical stuff that goes on in this world?? Do you have what it takes to come on top when competing against top notch quizzers??? Then, WISSENAIREâ€™15 is the right place for you to step in and display your endowment. We invite you to take part in the ultimate brain-storming session and test your tech trivia, watch while teams battle it out on stage as questions and answers fly back and forth with equal amplitude.</p><p> Each Team participating for the quiz should contain two students and there is no need that they should belong to the same college.</p>'],["",'<p> <strong><u>TECH QUIZ</u></strong></p><p> â€˜ <a href="../../www.brainyquote.com/quotes/quotes/p/peterdruck154448.html" title="view quote"> Knowledge has to be improved, challenged, and increased constantly, or it vanishes. </a> â€™</p><p> - <a href="../../www.brainyquote.com/quotes/authors/p/peter_drucker.html" title="view author">Peter Drucker</a></p><p> Are you fascinated by the scientific and technological advancements around the world? How much do you know about the technical stuff that goes on in this world?? Do you have what it takes to come on top when competing against top notch quizzers??? Then, WISSENAIREâ€™15 is the right place for you to step in and display your endowment. We invite you to take part in the ultimate brain-storming session and test your tech trivia, watch while teams battle it out on stage as questions and answers fly back and forth with equal amplitude.</p><p> Each Team participating for the quiz should contain two students and there is no need that they should belong to the same college.</p>'],["",'<p> <strong><u>TECH QUIZ</u></strong></p><p> â€˜ <a href="../../www.brainyquote.com/quotes/quotes/p/peterdruck154448.html" title="view quote"> Knowledge has to be improved, challenged, and increased constantly, or it vanishes. </a> â€™</p><p> - <a href="../../www.brainyquote.com/quotes/authors/p/peter_drucker.html" title="view author">Peter Drucker</a></p><p> Are you fascinated by the scientific and technological advancements around the world? How much do you know about the technical stuff that goes on in this world?? Do you have what it takes to come on top when competing against top notch quizzers??? Then, WISSENAIREâ€™15 is the right place for you to step in and display your endowment. We invite you to take part in the ultimate brain-storming session and test your tech trivia, watch while teams battle it out on stage as questions and answers fly back and forth with equal amplitude.</p><p> Each Team participating for the quiz should contain two students and there is no need that they should belong to the same college.</p>'],["",'<p> <strong><u>TECH QUIZ</u></strong></p><p> â€˜ <a href="../../www.brainyquote.com/quotes/quotes/p/peterdruck154448.html" title="view quote"> Knowledge has to be improved, challenged, and increased constantly, or it vanishes. </a> â€™</p><p> - <a href="../../www.brainyquote.com/quotes/authors/p/peter_drucker.html" title="view author">Peter Drucker</a></p><p> Are you fascinated by the scientific and technological advancements around the world? How much do you know about the technical stuff that goes on in this world?? Do you have what it takes to come on top when competing against top notch quizzers??? Then, WISSENAIREâ€™15 is the right place for you to step in and display your endowment. We invite you to take part in the ultimate brain-storming session and test your tech trivia, watch while teams battle it out on stage as questions and answers fly back and forth with equal amplitude.</p><p> Each Team participating for the quiz should contain two students and there is no need that they should belong to the same college.</p>']];
	
	event_details[6][0] = [["Introduction",'<p> The best revenge is the massive success</p><p> <strong>-Frank Sinatra</strong></p><p> Robowars, a<a name="_GoBack"></a>n excellent opportunity for robotic enthusiasts to display and improve their skills in robotics as they sweat it out to win the war of the robots.Ideate, Innovate, participate and struggle to achieve it.It is a battle of life and death.If youâ€™re looking to see the best engineers battle it out for the ultimate prize,WISSENAIREâ€™15Robowars is the place to be. The detailed problem statements and intricate arena ensure that a very highlevel of skill and strategy are on display at the event, which is watched by an enormous crowd. Expect intense competition as teams fight it out and unleash their fury. Intense matches, Fierce competition, Destruction and Glory! So come and be part of one of the largest events of WISSENAIREâ€™15 and be amazed.</p>'],["Event Format",'<p> <strong><u>Qualifiers:</u></strong> <u></u></p><p> <strong></strong></p><p> Ã˜ The team will be divided into groups randomly.</p><p> Ã˜ Each team will play 2 matches in the group of 5 minutes duration.</p><p> Ã˜ Top 2 teams from each group will be selected, based on the number of matches won and gross points obtained by the teams.</p><p> <strong><u>Semifinals: </u></strong></p><p> Ã˜ The semifinal is a 10 minute match consisting of 2 rounds each of 5 minutes.</p><p> Ã˜ Two minutes break will be given between the rounds.</p><p> Ã˜ Finalist will be the one who either immobilize the other bot or score the highest points by the end of the 10 minuteduration.</p><p> <strong><u>Finals: </u></strong> <u></u></p><p> Ã˜ The final is a 20 minute match consisting of 4 rounds each of 5 minutes.<u></u></p><p> Ã˜ Two minutes break will be given between the rounds.</p><p> Ã˜ The ultimate winner will be the one who completes any one of the objectives given below:</p><ul> <li> Immobilize the opponent bot </li></ul><p> Â· Push the opponent bot into the central pit a maximum of 10 times.</p><p> if none of the objectives are completed, then the one who has the highest number of points will be declared as the winner</p>'],["Rules",'<p> Ã˜ The organizers reserve the right to change any or all the rules as they deem fit.</p><p> Ã˜ Violation of any rules will lead to disqualification.</p><p> Ã˜ Judges decision shall be treated as final and binding on all.</p><p> <strong>Judging Criteria: </strong></p><p> Ã˜ If a bot pushes the other bot out of the arena it will gain 200 points.</p><p> Ã˜ If a bot pushes the other bot into the central pit in the arena, it will gain 500 points.</p><p> Ã˜ A robot will be declared immobile if it cannot display linear motion of at least one inch in a timed period of 30 seconds. A bot which will be pushed out of arena or to pits is not considered immobile.</p><p> Ã˜ If a bot completely immobilizes the other bot it will be awarded 2500 points.</p><p> <strong>Note: </strong> The event coordinator can disqualify the bot if he feels that the bot is violating the rules or if it causing any damage.</p>'],["Specifications",'<p> <strong><u>Mobility: </u></strong> <u></u></p><p> All the robots must have easily visible and controlled mobility in order to compete.</p><p> Methods of mobility may include:</p><p> Ã˜ Rolling (wheels, tracks or the whole robot).</p><p> Ã˜ Jumping ,hoping and flying are not allowed.</p><p> <strong><u></u></strong></p><p> <strong>Dimension:</strong> <br/> 1. The machine should be fit in a box of dimension 40cm x 40cm x 50cm (l x b x h) during the starting of the match. The external device [remote] usedto control the machine is not included in the size constraint.(However there is no limitation on the dimension once the match starts).</p><p> <strong>2. </strong> The machine should not exceed 30 kg of weight of wireless robots and robots having on board power supply will be counted as 0.6 *Actual Weight [Weight of adaptors and the remote controller will not be counted].</p><p> <strong><u></u></strong></p><p> <strong><u>Robot Specification:</u></strong></p><p> <strong><u></u></strong></p><p> Ã˜ The machine can be controlled wirelessly or with wires. Off board power supplies are allowed.</p><p> Ã˜ If the machine is wired then the wire should remain slack under all circumstances during the competition. All the wires coming out of machine should be stacked as a single unit. The wires should be properly insulated. Teams are suggested to use only rated wires. Loose connections or improper wiring may lead to direct disqualification even before the event.</p><p> Ã˜ If the machine is controlled wirelessly the machine must at least have a four frequency remote control circuit or two dual control circuits which may be interchanged before the start of race to avoid frequency interference with opponent team. The case of any interference in the wireless systems will not be considered for the rematch or results</p><p> Ã˜ The robots are not allowed to cut the opponents control wire. Violation of this rule will lead to disqualification.</p><p> <strong><u></u></strong></p><p> <strong><u></u></strong></p><p> <strong><u></u></strong></p><p> <strong><u>Battery and Power: </u></strong> <u></u></p><p> Ã˜ The machine can be powered electrically only. Use of an IC engine, pneumatics in any form is not allowed. On board Batteries must be sealed, immobilized-electrolyte types (Such as gel cells, lithium, NiCad, NiMH, or dry cells).</p><p> Ã˜ The electric voltage between 2 points anywhere in the machine should not be more than 36V DC at any point of time. If a team is using AC voltage in any of its parts then the voltage should not exceed 36 V AC at any point of time as well.</p><p> Ã˜ The batteries should not have a Ampere hour rating not more than 21Ah.(AC outlets will not be provided)</p><p> Ã˜ All efforts must be made to protect battery terminals from a direct short and causing a battery fire, failure to do so will cause direct disqualification.</p><p> Ã˜ Use of damaged, non-leak proof batteries may lead to disqualification.</p><p> Ã˜ Change of batteries will not be allowed during the match.</p><p> <strong>Weapon Systems: </strong></p><p> Robots can have any kind of magnetic weapons, cutters, flippers, saws, lifting devices, spinning hammers etc. as the weapons with following.</p><p> <strong>Expectations and limitations: </strong></p><p> Ã˜ Liquid projectiles.</p><p> Ã˜ Any kind of inflammable liquid.</p><p> Ã˜ Flame-based weapons.</p><p> Ã˜ Any kind of explosive or intentionally ignited solid or potentially ignitable solid.</p><p> Ã˜ Nets, tape, glue, or any other entanglement device.</p><p> Ã˜ High powered magnets or electromagnets.</p><p> Ã˜ Tethered or un-tethered projectiles.</p><p> Ã˜ Radio jamming, tesla coils, or any other high voltage device.</p><p> Ã˜ In no case should the arena be damaged by any bot.</p><p> <strong>Team Specifications: </strong></p><p> Ã˜ Each team can consist of maximum five members.</p><p> Ã˜ Each team member should be a student of an Authorized college. Students from different colleges can also form a team.</p>'],["Contact",'<p> M Aakash</p><p> Event Coordinator, Wissenaireâ€™15</p><p> 8763690887</p><p> am14@iitbbs.ac.in</p><p> P Surya</p><p> Event Coordinator, Wissenaireâ€™15</p><p> 8093397337</p><p> ps14@iitbbs.ac.in</p>'],["PDF",'<a href="PDF/ROBOWARS_new.pdf" target="_blank">Download</a>']];
	
	event_details[6][1] = [["Introduction",'<p> The football fever is back again with Wissenaireâ€™15. Keen to let out your four wheeled Mara Dona to the sweltering soccer arena..? We give back to you Kick off, better than ever before. Itâ€™s survival of the fittest out here guys; so let your creativity outstrip the skyline and mark the kick-off to victory right here ,at kick off!!</p>'],["Event Format",'<p> The event consists of two rounds:</p><p> <strong>Round 1: Qualifiers </strong></p><p> Ã˜ In this round, each team will try to shoot goals from 5 fixed locations of the arena. Single attempt will be allowed from each location. The round lasts for 5 minutes.</p><p> Ã˜ The bots should not move more than 25cm from the shooting position after taking a shoot.</p><p> Ã˜ The objective of the round is to score maximum number of goals in minimum time.</p><p> Ã˜ The teams will be ranked according to the gross points and the <strong>best eight </strong>will</p><p> Ã˜ Move on to next round.</p><p> <strong>Round 2: Knock-out </strong></p><p> Ã˜ The teams will be fighting amongst each other in a knockout one on one match. The winners will move to semi-finals and then to finals.</p><p> Ã˜ Quarter and semi-finals: Two teams will face each other in a 6 minute match split into two halves of 3 minutes.</p><p> Ã˜ Final: 10 minute match split into 2 halves.</p><p> Ã˜ An interval of maximum 1 minute will be given between the 2 halves.</p><p> Ã˜ The objective is to score maximum number of goals.</p><p> <strong><u>Judging Criteria</u></strong> <u></u></p><p> <strong></strong></p><p> <strong>First round:</strong></p><p> Ã˜ Each goal scored will give 100 points. Each second saved from the limit of 5 minutes will give 1 point each. Gross point is calculated.</p><p> Ã˜ In case of tie in ranking, the team with maximum number of goals will be given priority.</p><p> <strong></strong></p><p> <strong>Second round:</strong></p><p> Ã˜ The team with maximum number of goals after full time will be declared winner.</p><p> In case of a tie in score, each team will be allowed to take 3 penalty shootouts. Team scoring maximum goals will be declared winner. After penalty shootouts, if tie status remains intact, one more round of penalty shootouts may be taken.</p>'],["Specifications",'<p> <strong>Team specifications: </strong></p><p> Ã˜ Each team can consist of maximum five members.</p><p> Ã˜ Each team member should be a student of an Authorised college. Students from different colleges can also form a team.</p><p> <strong></strong></p><p> <strong>Robot specifications:</strong></p><p> Ã˜ Dimension of Robot should be within the limit: 25cm x 25cm x 25cm.</p><p> Ã˜ The robot should be manually controlled and can be wired or wireless. In case of wireless bots, their operating frequency should be adjustable, so that no two robots in any case have same operating frequency. This matter should be checked and dealt with, prior to the match.</p><p> Ã˜ Potential between any two points on the robot should not exceed 12V.</p><p>Ã˜ No sticking or ball holding mechanism should be used by robots. Robots should not cover the ball from top or around, they can either <strong>push</strong> or <strong>shoot</strong>.</p><p> Ã˜ Dimension of arena: 120cm x 200cm.</p><p> Ã˜ Goal post: 40cm x 20cm.</p><p> Ã˜ Dimension of D: 60cm x 45cm</p><p> Ã˜ Ball used will be of regular tennis ball size. Max-weight: 100gm.</p>'],["Rules",'<p> Ã˜ Any failure in meeting the specifications can lead to disqualification of the team.</p><p> Ã˜ Each participant should bring college ID proof.</p><p> Ã˜ Any of the Robots should not be modified after any round or in between the rounds whatsoever.</p><p> Ã˜ In 2nd round, Warning will be given if intentional ramming (foul) is seen.</p><p> <a name="_GoBack"></a></p><p> Ã˜ On the <strong>second </strong>warning, robot found doing such malpractice will be disqualified.</p><p> Ã˜ In between 2 halves, an interval of maximum 1 minute can be taken.</p><p> Ã˜ Foul inside D can lead to penalty, where ball can be shot freely in obedience with first round rules of shooting with opponent standing in front of post. Penalty shall be taken from the border of D.</p><p> Ã˜ If ball goes out of the arena, a free kick is awarded to opponent. In this case, bot</p><p> Ã˜ Has to keep a minimum distance from the bot who is awarded free kick.</p><p> Ã˜ Decision of the <strong>Event coordinator</strong> is <strong>Final</strong>.</p><p> <strong><u>FAQâ€™s </u></strong> <u></u></p><p> Ã˜ <strong>What will happen if robot gets damaged during the match?</strong></p><p> Robots should be checked well before the match. If a robot is damaged during the match it will be considered teamâ€™s liability. However, an extra time of 2 minutes may only be given in case of accidental damage of solder joints, leading to circuit failure.</p><p> Ã˜ <strong>Can students from different college make a team?</strong></p><p> Yes, itâ€™s possible.</p>'],["Contact",'<p> M Aakash</p><p> Event Coordinator, Wissenaireâ€™15</p><p> 8763690887</p><p> am14@iitbbs.ac.in</p><p> P Surya</p><p> Event Coordinator, Wissenaireâ€™15</p><p> 8093397337</p><p> ps14@iitbbs.ac.in</p>'],["PDF",'<a href="PDF/KICK OFF.pdf" target="_blank">Download</a>']];
	
	event_details[6][2] = [["","Coming Soon"],["","Coming Soon"],["","Coming Soon"],["","Coming Soon"],["","Coming Soon"],["","Coming Soon"]];
	
	event_details[6][3] = [["","Coming Soon"],["","Coming Soon"],["","Coming Soon"],["","Coming Soon"],["","Coming Soon"],["","Coming Soon"]];
	
	event_details[6][4] = [["","Coming Soon"],["","Coming Soon"],["","Coming Soon"],["","Coming Soon"],["","Coming Soon"],["","Coming Soon"]];
	
	event_details[7][0] = [["Introduction",'<p> What would happen if the value of the Universal Gravitational Constant (G) was not what we assume it to be right now? Will the universe still be the same if the Planckâ€™s constant (h) had a different value? What if the value of the Fine Structure Constant (Î±) was changed to something else?</p>'],["Event Format",'<p> <strong><u>First round</u></strong> :</p><p> Ã˜ Will be a written round where you are supposed to investigate the laws of physics and their relevance under given constraints.</p><p> <strong><u>Second round</u></strong> :</p><p> Ã˜ Is based on analysing a situation which will change the conditions of our universe.</p><p> Participants are expected to come up with a presentation on the effects of such a change on our universe.</p>'],["Rules",'<p> Ã˜ Teams of two participants</p><p> Ã˜ The duration of this event is around 3 hours</p><p> Ã˜ Any malpractice would lead to straight disqualification</p><p> Ã˜ Students from different colleges can form a team.</p><p> Ã˜ The maximum time allotted for single presentation is 12 minutes, followed by a queries section for 3 minutes.</p><p> Ã˜ The decision of the judges will be final.</p>'],["Judging Criteria",'<p> Ã˜ Evaluation criteria will be based on clarity and correctness of solutions.</p><p> Ã˜ The presentation will be judged on the basis of their innovation, in depth knowledge of the field and presentation skills.</p>'],["Conatct",'<p> Phanindra Attada,</p><p> Event coordinator, wissenaireâ€™15,<strong></strong></p><p> Phone number: +91-7750894706,</p><p> E-mail id:pa11@iitbbs.ac.in</p>'],["PDF",'<a href="PDF/break the law_problem statement.pdf" target="_blank">Download</a>']];
	
	event_details[7][1] = [["Introduction",'<p> â€œYou can learn great things from mistakes when you arenâ€™t busy denying themâ€</p><p> -Harold J. Smith</p><p> Debugging is twice as hard as designing a circuit in the first place, so here we test you how you tackle the tough situations like those. <br/> Whenever we design a circuit we take priceless effort in avoiding bugs, errors that cause circuit work inappropriately. This event is a roller coaster ridefor tech fanatics out there, if they really do love in correcting the things. The event â€˜Smash-d-Bugâ€™ brings you the challenge to identify and <a name="_GoBack">eliminate the bugs in electrical circuits, in turn test your engineering skills</a>.</p>'],["Event Format",'<p> Each team should contain<a name="_GoBack"></a> two members<u></u></p><p> <strong><u>ROUND-1:</u></strong></p><p> Ã˜ This is individual round.</p><p> Ã˜ This is a pen and paper round.</p><p> Ã˜ This round consists of objective and subjective questions.</p><p> Ã˜ 5 teams will be selected and will be qualified to <strong>round -2.</strong></p><p> Ã˜ Scores of both the members in a team are added while selecting for round-2.</p><p> <strong><u>ROUND-2:</u></strong></p><p> Ã˜ Each team will be given a bugged circuit.</p><p> Ã˜ They have to identify the bugs and debug them.</p>'],["Rules",'<p> Ã˜ Maximum of 2 members can form a team.</p><p> Ã˜ Decision made by the event coordinator is final.</p><p> Ã˜ Participants should bring their college ID proof.</p><p> Ã˜ Each team member should a student of an authorized college.</p><p> Ã˜ There is no restriction on the number of teams from the same college.</p><p> Ã˜ It is not necessary that the part forming a team should be from the same college.</p><p> Ã˜ No participant can be part of more than one team.</p>'],["Judging Criteria",'<p> Marks in the round-3 will be based on</p><p> Ã˜ The number of bugs identified and their description provided.</p><p> Ã˜ The total time taken to debug the circuit.</p><p> Ã˜ The number of hints taken by the team.</p><p> Ã˜ Marking scheme of each round will be provided at the time of the event itself before the commencement of the given round.</p>'],["Contact",'<p> Sukesh Bondada</p><p> Event Co-ordinator</p><p> WISSENAIREâ€™15</p><p> Phone: +91-9668220073</p><p> Email ID: sb24@iitbbs.com</p>'],["PDF",'<a href="PDF/problemstatement-smashdbug.pdf" target="_blank">Download</a>']];
	
	event_details[7][2] = [["Introduction",'<p> <strong><em>â€œ</em></strong>One of the endlessly alluring aspects of mathematics is that its thorniest paradoxes have a way of blooming into beautiful theories <strong><em>â€™â€™</em></strong></p><p> <strong> -Philip.J.Davis</strong></p><p> We roll out the red carpet for you to the great voyage .Wissenaireâ€™15 proffer you the rostrum to traverse the prowess in mathematics, through this event .Crack the cluster of questions with your thought- bullets and explore your flair within.<u></u></p>'],["Event Format",'<p> Maths Olympiad is held in two rounds. <br/> Time lapse between Round 1 and Round 2 is 30-45minutes.</p><p> <strong><u>Round 1</u>: <u></u></strong></p><p><ul><li> This round will consist of objective type questions.</li><li> Duration of this round will be 30 to 45 minutes.</li><li> Questions will be asked to test participantâ€™s logical, reasoning and aptitude abilities.</li><li> A team of two participants will take the test.</li><li> Participants will be allowed to discuss and share their ideas with their partners.</li><li> In this round participants need to solve some riddles based on simple applications of mathematics. (You can download sample questions from the link below)</li><li> The top 10 teams will be selected and they will be promoted to participate in the second round.</li></ul><br>(Results of first round will be out within 30 minutes and selected candidates will be informed by us)</p><p> <strong><u>Round 2:</u></strong></p><p><ul><li> Selected teams in the first round will compete in this round.</li><li> This round consists of both objective and descriptive type questions.</li><li> Duration of test will be 90 minutes.</li><li> Number and nature of questions along with judging criteria will be revealed along with question paper at the venue.</li></ul></p>'],["Rules",'<p> <ul><li> Maximum team size is 2<strong>.</strong></li><li> Participants need to bring their respective college ID .Inter college teams are also allowed.</li><li> Participants need not to bring their own equipments. Pens, papers and required instruments will be provided.</li><li> Use of books or any printed material is not allowed.</li><li> Use of electronic gadgets is not permitted during the test and can also lead to disqualification.</li></ul></p>'],["Contact Details",'<p> Avula vamshikrishna,</p><p> Event Co-ordinator,</p><p> Contact no.: +91 720 559 5202,</p><p> Email ID:vamshikrishna01001@gmail.com</p>'],["PDF",'<a href="PDF/Maths Olympiad Problem statment.pdf" target="_blank">Download</a>'],["",'']];
	
	event_details[8][0] = [["",'Coming Soon'],["",'Coming Soon'],["",'Coming Soon'],["",'Coming Soon'],["",'Coming Soon'],["",'Coming Soon']];
	
	$(".events_content").mCustomScrollbar({
		keyboard:{ enable: true },
		advanced:{ updateOnSelectorChange: "p" }
		});
		
		
	var infocus = 5, trans = -1, infocus_elm = $(".events_thumbs"+infocus);
	var trans_values = [0,0,0,0,0,0,0,0,0,0];
	$(".events_thumbs"+infocus).css({transform: "scale(2.2,2.2)"});
	function moveleft(){
		//$(".events_thumbs"+infocus).removeClass("scale");
		if(infocus>=9){
			infocus=9;
			return
		}
		trans_values[infocus]-=80;
		$(".events_thumbs"+infocus).css({transform: "translate("+trans_values[infocus]+"px,0px) scale(1,1)"});
		$(".events_thumbs"+infocus+" div").css("background-color", "rgba(255,255,255,0.3)");
		$(".events_thumbs"+infocus+" div").css("color", "#000");
		infocus++;
		//$(".events_thumbs"+infocus).addClass("scale");
		//trans = (3-infocus)*80;
		trans_values[infocus]-=80;
		$(".events_thumbs"+infocus).css({transform: "translate("+trans_values[infocus]+"px,0px) scale(2.2,2.2)"});
		$(".events_thumbs"+infocus+" div").css("background-color", "rgba(0,20,50,0.9)");
		$(".events_thumbs"+infocus+" div").css("color", "#CCC");
		infocus_elm = $(".events_thumbs"+infocus);
	}
	function moveright(){
		if(infocus<=1){
			infocus=1;
			return
		}
		trans_values[infocus]+=80;
		$(".events_thumbs"+infocus).css({transform: "translate("+trans_values[infocus]+"px,0px) scale(1,1)"});
		$(".events_thumbs"+infocus+" div").css("background-color", "rgba(255,255,255,0.3)");
		$(".events_thumbs"+infocus+" div").css("color", "#000");
		infocus--;
		trans_values[infocus]+=80;	
		$(".events_thumbs"+infocus).css({transform: "translate("+trans_values[infocus]+"px,0px) scale(2.2,2.2)"});
		$(".events_thumbs"+infocus+" div").css("background-color", "rgba(0,20,50,0.9)");
		$(".events_thumbs"+infocus+" div").css("color", "#CCC");
		infocus_elm = $(".events_thumbs"+infocus);
	}
	
	$(".events_thumbs").on("mouseenter", function(){
		var to = $(this).attr("class").charAt(27);
		while(infocus<to)
		moveleft();
		while(infocus>to)
		moveright();
	});
	/*var leftmost = 0;
	function moveleft(){
		if(leftmost>2)
		return;
		for(var eq=leftmost; eq<leftmost+8; eq++){
			if(eq<0 || eq>7)
			continue;
			$(".events_thumbs").eq(eq).addClass("events_thumbs"+(eq-leftmost));
			$(".events_thumbs").eq(eq).removeClass("events_thumbs"+(eq-leftmost+1));
		}
		leftmost++;
	}
	function moveright(){
		if(leftmost<-2)
		return;
		for(var eq=leftmost+6; eq>=leftmost-1; eq--){
			if(eq<0 || eq>7)
			continue;
			$(".events_thumbs").eq(eq).addClass("events_thumbs"+(eq-leftmost+2));
			$(".events_thumbs").eq(eq).removeClass("events_thumbs"+(eq-leftmost+1));
		}
		leftmost--;
	}*/
	$(".events_leftarrow").on("click", moveright);
	$(".events_rightarrow").on("click", moveleft);
	/*$(document).on("keydown", function(e){
		if(e.keyCode==37)
		moveright();
		else if(e.keyCode==39)
		moveleft();
	})*/
	
	var super_eventi = 0, eventi = 0;
		
	$(".events_thumbs").on("click", function(){
		$(".events_content").css("display", "none");
		$(".tab").css("display", "none");
		super_eventi = $(this).index();
		quickmenu_anim(super_eventi+1);
		var event_names_html = "";
		for(var i=0; i<event_names[super_eventi].length;i++)
		event_names_html += "<div class='events_menu'><p>"+event_names[super_eventi][i]+"</p></div>";
		$(".events_menu_env").html(event_names_html);
		$(".events_thumbs").fadeOut(400);
		$(".events_thumbs_env").css({transform: "scale(4,4)"});
		$(".events_details").fadeIn(500,function(){
				$(".events_details").css({
			 transform: 'rotate('+deg+'deg) scale(1.2,1.2)',
			 WebkitTransform: 'rotate('+deg+'deg) scale(1.2,1.2)'
			})
			});	
			setTimeout(function(){
				$(".events_thumbs_env").css({transform: "scale(1,1)"});
				//$(".events_content").fadeIn(500);
				$("#pointer").fadeIn(500);
				$(".events_menu").each(function(index, element) {
					$(".events_menu").eq(index).css("transition-delay", index*0.3+"s");
					//$(".events_menu").eq(index).fadeIn(500);
					$(".events_menu").eq(index).css("opacity",1);
                    $(".events_menu").eq(index).css({transform: "translate(0px, "+index*50+"px)"});
					$(".events_quickmenu").fadeIn(300);
                });
				setTimeout(function(){
					$(".events_menu").css("transition-delay", "0s");
					}, 650);
			},650);
	});
	
	var event_details_deg = 0;
	$(".events_menu_env").on("click", "div.events_menu", function(){
		$(".events_menu").eq(eventi).css("background-color", "rgba(0,0,0,0.55)");
		eventi = $(this).index();
		$(".events_menu").eq(eventi).css("background-color", "rgba(0,0,0,0.85)");
		if($(".tab").css("display")==="none"){
			for(var i=0; i<6; i++){
						$(".tab"+i).html("<p>"+event_details[super_eventi][eventi][i][0]+"</p>");
					}
				//$(".tab").fadeIn(300);
		}
		else {
			$(".tab").fadeOut(300, function(){
				for(var i=0; i<6; i++){
						$(".tab"+i).html("<p>"+event_details[super_eventi][eventi][i][0]+"</p>");
					}
				//$(".tab").fadeIn(300);
				});
		}
		$("#pointer").fadeOut(300);
		$(".events_content").fadeOut(300, function(){
			//$(".events_content").html("");			
			var tab = 0;
			$("#mCSB_1_container").html("<p style='text-align:center;'><h2>"+event_names[super_eventi][eventi]+"</h2></p><br/>"+event_details[super_eventi][eventi][tab][1]);
			//$(".events_content").mCustomScrollbar("update");
			//alert(event_details[super_eventi][eventi][tab][1]);
			$(".tab").fadeIn(300);
			$(".events_content").fadeIn(300);
			$("#pointer").fadeIn(300);
			
			
			var deg_p = 330;
			var diff = Math.abs(deg-deg_p);
			while(diff>180){
				if(deg_p>deg)
				deg_p-=360;
				else
				deg_p+=360;
				diff = Math.abs(deg-deg_p);
			}
			deg=deg_p;
			event_details_deg = deg;
			$(".events_details").css({
				 transform: 'rotate('+deg+'deg) scale(1.2,1.2)',
				 WebkitTransform: 'rotate('+deg+'deg) scale(1.2,1.2)'
				});
			});
		});
		
	var deg = 0;
	var degrees = [330,270,210,150,90,30];
	$(".tab").on("click", function(){		
		var tab = $(this).index();
		$("#pointer").fadeOut(300);
		$(".events_content").fadeOut(300, function(){
				$("#mCSB_1_container").html("<h2  style='text-align:center;'>"+event_names[super_eventi][eventi]+"</h2><br/>"+event_details[super_eventi][eventi][tab][1]);
				$(".events_content").mCustomScrollbar("update");
				//alert(event_details[super_eventi][eventi][tab][1]);
				$(".events_content").fadeIn(300);
				$("#pointer").fadeIn(300);
		});
		var deg_p = degrees[$(this).index()];
		var diff = Math.abs(deg-deg_p);
		while(diff>180){
			if(deg_p>deg)
			deg_p-=360;
			else
			deg_p+=360;
			diff = Math.abs(deg-deg_p);
		}
		deg=deg_p;
		$(".events_details").css({
			 transform: 'rotate('+deg+'deg) scale(1.2,1.2)',
			 WebkitTransform: 'rotate('+deg+'deg) scale(1.2,1.2)'
			})
		});
		
	$(".events_quickmenu p").on("click", function(){
		//$(this).addClass("events_curcategory");
		var index = $(this).index();
		quickmenu_anim(index);
		gotocategory(index-1);
		});
	
	/*events*/
	
	/*gallery*/
	var images = ["pica1.png", "pica2.png", "pica3.png", "pica4.png", "pica5.png", "pica6.png", "pica2.png", "pica4.png", "pica6.png"];
	var gallery_prev = -1;
        $(".gallery_photo").on("click", function(){
			if(gallery_prev>-1){
				if($(".gallery_photo_"+gallery_prev).hasClass("gallery_display"))
				$(".gallery_photo_"+gallery_prev).removeClass("gallery_display");
			}
			$(this).addClass("gallery_display");
			gallery_prev = $(this).index()-1;
			$(".close").fadeIn(300);
		});
		$(".close").on("click", function(){
				if(gallery_prev>-1){
				if($(".gallery_photo_"+gallery_prev).hasClass("gallery_display"))
				$(".gallery_photo_"+gallery_prev).removeClass("gallery_display");
				$(".close").fadeOut(300);
			}
			gallery_prev=-1;
			});
		$(".gallery_back").on("click", function(){
				if(gallery_prev>-1){
				if($(".gallery_photo_"+gallery_prev).hasClass("gallery_display"))
				$(".gallery_photo_"+gallery_prev).removeClass("gallery_display");
				$(".close").fadeOut(300);
			}
			gallery_prev=-1;
			});
		$(document).on("keydown", function(e){
			var key = e.keyCode;
			var next = gallery_prev;
			if(key==39)
			next = gallery_prev+1;
			else if(key==37)
			next = gallery_prev-1;
			else
			return;
			
			next = (next+9)%9;
			
			if(gallery_prev>-1){
				if($(".gallery_photo_"+gallery_prev).hasClass("gallery_display"))
				$(".gallery_photo_"+gallery_prev).removeClass("gallery_display");
			}
			$(".gallery_photo_"+next).addClass("gallery_display");
			gallery_prev = next;
			$(".close").fadeIn(300);
		});
	/*gallery*/
	/*campus*/
	var ca_names = ["Aayushi Garg", "Abhay Kumar", "Abhinav Bajpai", "Abhinav Reddy", "Abhinay Bandaru", "Abhishek Kumar", "Abinas Behera", "Aditya Sharma", "Aishwarya Dhage", "Ajeet Singh", "Akash Kumar", "Akash Prabhakar", "Allola Nikhil", "Alok Kumar", "Aman", "Aman gupta" ,"Amit Kumar", "Anantha Padmanabha Sarma K", "Anchal Kumar Singh", "Ankit Raj", "Anshu Mishra", "Anshul Pratap Singh", "Arun JP", "Arunkumar K", "Ashish Kumar", "Avinash Kumar", "Avinash Reddy", "Badal Mishra", "Balaram Achuri", "Balla Naveen", "Bandaru Sai Kumar", "Bhavya Lade", "Bibhu Padhy", "Bishnu Gupta", "Biswajeet Panda", "Chaitanya Kumar", "Charan Akshay Mallemputi", "Chinmaya Swaroop", "Datta Sai Gonuguntla", "Deepak Chandel", "Deepak Sachan", "Deepak Singh", "Dheerendra Yadav", "Dinesh Bammidi", "Diptiman Chattopadhyay", "Durgaprasad Gollapalli", "Eniyan Shanmugavel", "Erigala Nagalakshmi Reddy", "Fayaz Shaik", "Gagan Sai", "Galla Chetan", "Gaurav Agrawal", "Gillella Shravan Kumar Reddy", "Goutham Veeramachaneni", "Harshit Gupta", "Harshvardhan Kumar", "Hemanth Bommena", "Hemanth Kumar Annupuram", "Hemanth Sabbella", "Himaja Kollipara", "Jagat Kiran", "Jithin Vijayan Nair", "Joy Pradeepthi", "Kalyan Sundar Das", "Kalyani", "Karthik", "Kavali Ramya", "Konchada Dinesh", "Krishna Teja", "Kumar Lav", "Lalit Krishna", "Laxmidhar Sahoo", "Mangesh Sharma", "Manish Kumar Agrawal", "Manoj Aravind S", "Manoj Kumar Reddy Tavva", "Merlin Mary Nelson", "Mohan Chand Davuluri", "Minisha Meher", "murali krishnam raju", "Naidu Sylendra Ruthwik", "Neha Routray", "Neha Yalala", "Nidhi Kumari Agarwal", "Nitesh Kumar", "P Durga Prasad", "Pandu Ranga Rao", "Payal Sinha", "Pooja", "Pothamsetty Amuktamalyada", "Pradeep Muppaneni", "Prakhar Pradhan", "Prashant Sharma", "Prateek Shrivastava", "Rahul Sai", "Rajasekar Reddy Lankireddy", "Rajesh Yadav", "Ravali", "Ravi Krishna Priya", "Ravi Kumar", "Ravi Shankar", "Ravi Shankar Kumar", "Rohit", "Rohit Nelakudita", "Roopsai Kondadasula", "Sachin Ganesh U", "Sai Kishore", "Sai Varun", "Saideshwar Kotha", "Saimeghanakuchana", "Sandeep Tadepalli", "Sankalp Upadhyay", "Saparapu Revathi", "Saravananbhaskar", "Satyendra Kumar", "Satyendra Yadav", "Saurav Kar", "Savi Bardwaj", "Sayantan Dutta", "Shashank Soma", "Shivali Jejurkar", "Shivam Rastogi", "Shivani Reddy Nalla", "Shubham Gill", "Siva Narkedimilli", "Sivani Pati", "Smruti Smarak Mohanty", "Soumya Ranjan Sahoo", "Sourav Bansal", "Srideep Behera", "Srimaan Nannapaneni", "Sriram Sreeja", "Srujan Kumar", "Srujan Rinku", "Sudharma Kellampalli", "Suhas Dhar", "Sujit Kumar", "Sumanthvaka", "Surya Deepak", "Sushain Kalsotra", "Sushma", "Swagatika Mohanta", "Tavish Garg", "Uma Deepthi", "Umang Agarwal", "VaraPrasad Rao", "Venkata Sai", "Vijay Singh", "Vikas Kumar Sahlot", "Vikaschowdary Reddy", "Vinay", "Vippili Sudheer Kumar", "Vishal Kumar", "Vittesh Vikram", "Vivek", "Yalla Sai Avinash"];
	
	var ca_colleges = ["indira gandhi delhi technical university", "NIT SRINAGAR", "IIT Madras", "arora institute of technology,hyderabad", "NIT SURAT", "giet, guunupur", "jaggnath institute for technology and management", "Christ University Faculty of Engineering", "VESIT, chembur", "ramjas college,DU,delhi", "baba saheb bhimrao ambedkar university", "ISM Dhanbad", "iit indore", "Raj Kumar Goel Institute Of Technology", "GLA UNIVERSITY, MATHURA", "shri ramswaroop college of engineering", "RPS", "SASTRA UNIVERSITY", "Nit Raipur", "apex institute of tech. and mngt.", "KOUSTUV INSTITUTE OF SELF DOMAIN", "Bundelkhand institute of engineering and technolog", "Amity University, Noida.", "PSG COLLEGE OF TECHNOLOGY", "nit rourkela", "GANDHI INSTITUTE OF TECHNOLOGY , BHUBANESWAR", "CMR institute of technology", "BJB college bhubaneswar", "VARDHAMAN COLLEGE OF ENGINEERING", "M.I.C", "iit delhi", "vnit", "SILICON INSTITUTE OF TECHNOLOGY", "institute of engineering and technology", "hyderabad institute of technology and management", "JBR Architecture College", "Amrita school of engineering Banglore", "University college of Engineering, JNTUK,Kakinada", "manipal university", "Dronacharya College of Engineering", "University Of technology and Management", "Hindustan College Of Science And Technology", "D.D.R.A (U.P)", "gitam university", "MATS University", "Lovely professional university", "SASTRA TANJORE", "National Institute of Technology Karnataka", "NIT WARANGAL", "IIT Kharagpur", "NIT TRICHY", "c.v.raman college of engineering", "Sreyas engineering college", "IIT, Hyderabad", "PSIT , Kanpur", "BIT MESRA,PATNA CAMPUS", "vit chennai", "jawaharlal nehru technological university,kakinada", "IIITDelhi", "Shri vishnu engineering college for women", "ISM Dhanbad", "karunya", "ANITS", "UNIVERSITY OF MUMBAI", "keshav memorial college of engineering", "iit guwahati", "osmania university", "KIIT School of Management", "nit kurukshetra", "United College Of Engineering And Research", "TKR College of Engineering and Technology", "National Institute of Science And Technology", "NIT Meghalaya", "NMIET BBSR", "VELTECH Dr.RR  Dr.SR Technical University", "vr siddhartha engineering clg", "Airocis College", "Vignan,Vizag", "ANDHRA UNIVERSITY COLLEGE OF ENGINEERING(A)", "SRKR Engineering college", "Guru Ghasidas Vidyalaya, Bilaspur, Chattisgarh", "abedkar institute of advance communication technology and research", "vignan\&#39;s institute of engineering for women", "Kalinga Institute of Industrial Technology", "JIS COLLEGE OF ENGINEERING", "andhra university college of engineerin", "NIT CALICUT", "KOUSTUV INSTITUTE OF SELF DOMAIN", "N.I.T Delhi", "spa bhopal", "M.A.N.I.T bhopal", "juet", "Thapar University", "MDI Gurgaon", "VNRVJIET", "NIT,Raipur", "g pulla reddy engineering college, kurnool", "chaitanya bharathi institute of technology", "Gayatri Vidya Parishad College of Engineering", "G.L BAJAJ INSTITUTE OF TECHNOLOGY AND MANAGEMENT", "BIET", "INDIRA COLLEGE OF ENGINEERING AND MANAGEMENT", "ipr", "Shiv Nadar University", "Vasavi College of Engineering", "PSG college of technology", "Gurunanak institution of technical campus", "BITS HYDERABAD", "SRM UNIVERSITY", "IIT BOMBAY", "iiit banglore", "babu banarasi das university", "Sree Dattha Institution Of Engineering And Science", "Kongu Engineering College", "rajiv gandhi institute of petrolium technology", "DAYALBAGH EDUCATIONAL INSTITUTE, DAYALBAGH", "KIIT UNIVERSITY", "International Institute of Information technology", "Government College of Engineering,Keonjhar", "Shivajirao S Jondhale College of Engineering", "sies graduate school of technology", "National Institute of Technology,UTTARAKHAND", "NIT SURATHKAL", "SRM UNIVERSITY", "Vishnu institute of technology", "Institute of Technical Education and Research", "iter", "IIIT BHUBANESWAR", "College of Engg and Technology, bbsr", "Institute of Technical Education and Research", "IIT PATNA", "GRIET,Hyderabad,Telangana", "gitam institute of technology,hyderabad", "BITS Pilani", "rvrjc", "Institute of Engineering and Technology, Indore", "BITS HYDERABAD", "vvit(JNTUK)", "shiv nadar university", "gmc jammu", "Mahatma Gandhi institution of techonology (MGIT)", "BIITM", "iit jodhpur", "visvesvaraya national institute of technology", "IIT Mandi", "G.Pullaiah Engineering College", "dmssvh hindu clg", "ait pune", "GAUTAM BUDDHA UNIVERSITY", "gitam university vizag", "national institute of technology,durgapur", "K L University", "G.L.BAJAJ INSTITUTE OF TECHNOLOGY AND MANAGEMENT", "RITS, Bhopal", "Kiit University", "JNTU KAKINADA"];
	
    var campus_content = "";
	
	var padding = function(num){
		var pnum = num.toString();
		if(pnum.length == 1)
		pnum = "00"+num;
		else if(pnum.length == 2)
		pnum = "0"+num;
		return pnum;
	}
	
	for(var i=0; i<ca_names.length; i++){
		campus_content += "<li><div style='position:relative; top:85px; left:0; height:60px; width:100%;'><p style='position:relative; top:0px; left:0; height:60px; width:25%;'>WS15CA"+padding(i+1)+"</p><p style='position:relative; top:-75px; left:30%; height:60px; width:25%;'>"+ca_names[i]+"</p><p style='position:relative; top:-155px; left:58%; height:60px; width:42%;'>"+ca_colleges[i].toUpperCase()+"</p></div></li>";		
	}
	$(".campus_content ul").html(campus_content);
/*campus*/

/*registration*/
$(".register_button").on("click", function(){
$(".registration").fadeIn(400);
});


var all_categories = ["Grand Arcanum", "Colloquia", "I-Box", "Ingenium", "Matricks", "Quizzaire", "Yanthrix", "Eclectic", ""];
var j=0;
var all_events = ["Contrivance", "Electronix", "Green Venture", "Replica", "Smart Frame", "Trebuchet", "Kreativ", "Colloquia CSE", "Colloquia Mechanical", "Colloquia Electrical", "Colloquia Civil", "Colloquia Metallurgy", "Colloquia Economics", "Sherlock", "LanWar", "Finanza", "Pitched", "Plan de Negocious", "Rostrum", "Codec", "Intrigue", "Richtig", "TechQuiz", "BizQuiz", "Robowars", "Kickoff", "Rescue Bot", "Pixelomania", "Navigator", "Break The Law", "Smash The Bug", "Maths Olympiad"];

var reg_events = '<br/><div style="position:relative; top:5px; left:10px; margin-right:15px; border-radius:10px; height:20px; width:160px; display:inline-block; cursor:pointer"><p style="position:relative; width:100%; height:100%; top:-20px; text-align:center; font-weight:800;">'+all_categories[j++]+'</p></div></div><br/>';
for(var i=0; i<all_events.length; i++){
	reg_events += '<div class="buttoon" style="position:relative; top:-5px; left:10px; margin-right:15px; border-radius:10px; height:20px; width:160px; border:solid #CCC 1px; display:inline-block; cursor:pointer"><p style="position:relative; width:100%; height:100%; top:-20px; text-align:center; font-weight:800;">'+all_events[i]+'</p></div></div>';
	if(i==6 || i==12 || i==14 || i==18 || i==21 || i==23 || i==28)
	reg_events += '<br/><div style="position:relative; top:-5px; left:10px; margin-right:15px; border-radius:10px; height:10px; width:160px; display:inline-block; cursor:pointer"><p style="position:relative; width:100%; height:100%; top:-20px; text-align:center; font-weight:800;">'+all_categories[j++]+'</p></div></div><br/>';
}

	$(".register_events").html(reg_events);
	
	$(".register_profile_button").on("click", function(){
		$(".register_profile").css("display","block");
		$(".register_events").css("display","none");
                $("#hint").css("display","none");
		});
	$(".register_events_button").on("click", function(){
		$(".register_profile").css("display","none");
		$(".register_events").css("display","block");
                $("#hint").css("display","block");
		});

$(".register_events").on("click", "div.buttoon", function(){
	 	var index = $(this).index(".buttoon");
		if(all_events_state[index]==0)
		all_events_state[index]=1;
		else
		all_events_state[index]=0;
		$(this).toggleClass("clicked_buttoon");
                $(".save_button p").html("Save");
                //console.log(all_events_state+", "+index);
	});

$("input").on('change keyup paste', function() {
$(".save_button p").html("Save");
});

$("#reg_close").on("click", function(){
	$(".registration").css("display", "none");
	});

$("input").css("padding-left", "10px");

var reg_save = function(){
        $(".register_hide").css("display", "block");
        $(".save_button").addClass("clicked_buttoon");
        $(".save_button p").html("Saving...");
	var name = $("input").eq(0).val();
	var email = $("input").eq(1).val();
	var gender = $("input").eq(2).is(':checked')?"Male":$("input").eq(3).is(':checked')?"Female":"";
	var branch = $("input").eq(4).val();
	var college = $("input").eq(5).val();
	var phone = $("input").eq(6).val();
	var address = $("input").eq(7).val();
	var city = $("input").eq(8).val();
	var state = $("input").eq(9).val();
	var accomodation = $("input").eq(10).is(':checked')?"1":"0";
	var ca = $("input").eq(11).is(':checked')?"1":"0";
	var events ="", events_code ="";
	for(var i=0; i<all_events.length;i++){
		events_code+=all_events_state[i].toString();
		if(all_events_state[i]==1)
		events += all_events[i]+", ";
	}

	$.post("reg_events.php",  {name:name, email:email, gender:gender, branch:branch, college:college, phone:phone, address:address, city:city, state:state, accomodation:accomodation, ca:ca, events: events, events_code: events_code}, function(){
        $(".register_hide").css("display", "none");
        $(".save_button").removeClass("clicked_buttoon");
        $(".save_button p").html("Saved");
});
}
$(".save_button").on("click", reg_save);
signed_in_callback = function(name,email){
        //console.log(name+"\n"+email);
        $("input").eq(1).val(email);
	$(".register_fng").css("display", "none");	
        $(".register_profile").css("display", "block");
        $(".register_profile_button").css("display", "block");
        $(".register_events_button").css("display", "block");
        $(".save_button").css("display", "block");
        $(".logout_button").css("display", "block");
        $.post("check.php",  {name:name, email:email}, function(data){
		var response = jQuery.parseJSON(data.trim());
                var code = response.events_code.trim();
                //console.log(code);
		for(var i=0; i<code.length; i++){
			if(code.charAt(i)=='1'){
				all_events_state[i]=1;
				$(".buttoon").eq(i).toggleClass("clicked_buttoon");
			}
		}
                $("input").eq(0).val(response.name);
	if(response.gender==="Male")
	$("input").eq(2).attr("checked",true);
        else if(response.gender==="Female")
        $("input").eq(3).attr("checked",true);
	$("input").eq(4).val(response.branch);
console.log(response);
	$("input").eq(5).val(response.college);
	$("input").eq(6).val(response.phone);
	$("input").eq(7).val(response.address);
	$("input").eq(8).val(response.city);
	$("input").eq(9).val(response.state);
        if(response.accommodation==="1"){
	$("input").eq(10).attr("checked",true);
}
	if(response.ca==="1")
	$("input").eq(11).attr("checked",true);
        $("input").eq(12).val(response.submitted);
	});
};

function disconnectUser() {
  var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
      access_token;

  // Perform an asynchronous GET request.
  $.ajax({
    type: 'GET',
    url: revokeUrl,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(nullResponse) {
      // Do something now that user is disconnected
      // The response is always undefined.
      location.reload();
    },
    error: function(e) {
      // Handle the error
      // console.log(e);
      // You could point users to manually disconnect if unsuccessful
      // https://plus.google.com/apps
      location.reload();
    }
  });
}
// Could trigger the disconnect on a button click
$('.logout_button').click(function(){
$(".register_hide").css("display", "block");
$(".logout_button").addClass("clicked_buttoon");
if(access_token!="")
disconnectUser();
});
/*registration*/
}); 
                            
                            
                            
                            
                            
                            
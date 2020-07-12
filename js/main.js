// display tentative schedule by reading JSON file
$(document).ready (function() {
	for (let i=1; i <= 3; i++) {
		let json_file = "json-files/schedule-day" + i + ".json";
		let day = "day" + i;
		let classes = "accordion";
		if(i==1) { classes += " active"; } 
		let html = '<div class="' + classes + '" id="' + day + '">';

		$.getJSON(json_file, function(data) {
			html += build_schedule(data, html) + '</div>';
			document.getElementById("schedule-content").innerHTML += html;
		});	
	}
});

// build tentative schedule table 
function build_schedule(data, html) {
	for (let i=0; i < data.length; i++) {
		let heading = "heading" + i;
		let data_target = "collapse" + i;

		html+='<div class="card"> <div class="card-header" id="' + heading + '">';
		html+='<table class="table" data-toggle="collapse" data-target="#' + data_target + '" aria-expanded="true">'
		html+='<tbody><tr class="' + data[i].Class + '">';
		html+='<th scope="row">' + data[i].Time + '<br><span>' + data[i].Category + '</span></th>';
		html+='<td colspan="2" class="event"><span>' + data[i].Title + '</span><br>';
		html+='<span class="loc">' + data[i].Location + '</span></td>';
		html+='<td class="check">√</td></tr></tbody></table></div>';
		html+='<div id="' + data_target +  '" class="collapse" aria-labelledby="' + heading + '" data-parent="#day1">';
		html+='<div class="card-body ' + data[i].Class + '">' + data[i].Description + '</div></div></div>';
	}
	return html;
}

// display FAQs section by reading JSON file
$(document).ready (function() {
	$.getJSON("json-files/faqs.json", function(data) {
		let left_data = data.FAQs_Left;		// array for FAQs in left column
		let right_data = data.FAQs_Right;	// array for FAQs in right column

		let html = build_faqs(left_data, "L") + build_faqs(right_data, "R");
		document.getElementById("faqs-content").innerHTML = html;
	});
});

// build FAQs section - data is json file, col is L (left col) or R (right col)
function build_faqs(data, col) {
	let data_parent = "faq-" + col + "cards";
	let html = '<div id="' + data_parent + '" class="col-md-6 col-sm-6 col-xs-6">';

	for (let i=0; i < data.length; i++) {
		let heading = "heading" + col + i;
		let data_target = "collapse" + col + i;

		html += '<div class="card text-left">';
		html += '<div class="card-header" id="' + 'heading' + '">';
		html += '<button class="btn" type="button" data-toggle="collapse" data-target="#' + data_target + '" aria-expanded="false">'
		html += data[i].Question + '<i class="fa fa-caret-down rotate-icon"></i></button></div>';
		html += '<div id="' + data_target + '" class="collapse" aria-labelledby="' + data_target + '" data-parent="#' + data_parent + '">';
		html += '<div class="card-body">' + data[i].Answer + '</div></div></div>';	
	}

	html += '</div>';
	return html;
}


// response to user clicking tab (day) name in tentative schedule
var btns = document.querySelectorAll(".day-btn");
for (var i=0; i<btns.length; i++) {
	btns[i].addEventListener("click", function(event) {
		// inactivates currently-active button and content
		let target = event.target;
		let active_elems = document.querySelectorAll(".day-btn.active, #schedule-content .active");
		for(let i=0; i<active_elems.length; i++)
			active_elems[i].classList.remove("active");

		// activates clicked button and its respective content
		target.className += " active";
		let btn_name = target.getAttribute("data-tab");
		document.getElementById(btn_name).className += " active";
	});
}
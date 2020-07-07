
function btn_response(event) {

	// inactivates currently-active button and content

	var target = event.target;

	if (target.classList.contains("user-btn"))
		var active_elems = document.querySelectorAll(".user-btn.active, #get-involved-content .active");
	else if (target.classList.contains("day-btn"))
		var active_elems = document.querySelectorAll(".day-btn.active, #schedule-content .active");

	for(var i=0; i<active_elems.length; i++) {
		active_elems[i].classList.remove("active");
	}

	// activates clicked button and its respective content
	target.className += " active";
	var btn_name = target.getAttribute("data-tab");
	document.getElementById(btn_name).className += " active";
}


// response to user clicking tab name (user type) in get-involved
var btns = document.querySelectorAll(".user-btn");
for (var i=0; i<btns.length; i++) {
	btns[i].addEventListener("click", btn_response);
}

// response to user clicking tab name (day) in schedule
var btns = document.querySelectorAll(".day-btn");
for (var i=0; i<btns.length; i++) {
	btns[i].addEventListener("click", btn_response);
}

$('.accordian-body').on('show.bs.collapse', function () {
    $(this).closest("table")
        .find(".collapse.in")
        .not(this)
        .collapse('toggle')
})

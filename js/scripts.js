var cursor = null;
var blinkingFunction;
function initialize()
{
	document.onkeypress = keyCapture;
	blinkCursor();
}
function blinkCursor()
{
	cursor = document.querySelector(".cursor");
	if(cursor!=null)
	{
		if(cursor.innerHTML.length>0)
			cursor.innerHTML = "";
		else
			cursor.innerHTML = " _"
		blinkingFunction = setTimeout("blinkCursor()",500);
	}
	else
	{
		//clear the timeout for the blinking function
		clearTimeout(blinkingFunction);
	}
}

function displayAlert()
{
	var progressAlert = document.querySelector("#progress");
	if(progressAlert.innerHTML.length==0)
	{
		progressAlert.innerHTML = "Under Construction..Try After months :P";
	}
	/*var progressAlert = document.querySelector("p1");
	progressAlert.innerHTML = progressAlert.innerHTML + "<br>" + "Hello";*/
	
}

function keyCapture(e)
{
	displayAlert();
}

var cursor = null;
function blinkCursor()
{
	if(cursor==null)
		cursor = document.querySelector(".cursor");
	if(cursor!=null)
	{
		if(cursor.innerHTML.length>0)
			cursor.innerHTML = "";
		else
			cursor.innerHTML = " _"
	}
	setTimeout("blinkCursor()",500);
}

function displayAlert()
{
	var progressAlert = document.querySelector("#progress");
	if(progressAlert.innerHTML.length==0)
	{
		progressAlert.innerHTML = "Under Construction..Try After months :P";
	}	
}

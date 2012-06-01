var cursor = null;
var blinkingFunction;
function setTextFocus()
{
	document.querySelector('#terminal-input.selected').focus();

}
function initialize()
{
	document.onkeypress = keyCapture;
	$('#terminal-input').live('keydown',processInput)
	setTextFocus();
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
	if(e.keyCode==13)
	{
//		displayAlert();		
	}
}

function processInput(e)
{
	var temp = document.querySelector('#terminal-display.selected');
	var currentTextBox = temp.childNodes[5]; 
	if(e.keyCode==13)
	{
		var newNode = "<p1 id=\"terminal-display\" class=\"selected\">"+temp.innerHTML+"</p1>";
		temp.setAttribute("class","unselected");
		currentTextBox.setAttribute('class','unselected');
		currentTextBox.setAttribute('value',currentTextBox.value);
		currentTextBox.setAttribute('readonly','true');
		document.querySelector('#main').innerHTML = document.querySelector('#main').innerHTML + "<br>" + newNode;
		setTextFocus();
	}
	else if(e.keyCode==9)
	{
		e.preventDefault();
		currentTextBox.value = "Auto Completion to be done..";
	}
}

var cursor = null;
function setTextFocus()
{
	document.querySelector('#terminal-input.selected').focus();

}
function initialize()
{
	$('#terminal-input').live('keydown',processInput)
	setTextFocus();
}
function displayAlert()
{
	var progressAlert = document.querySelector("#progress");
	if(progressAlert.innerHTML.length==0)
	{
		progressAlert.innerHTML = "Under Construction..Try After months :P";
	}
}


function clearScreen()
{
	var temp = document.querySelector('#terminal-display.selected');
	var container = document.createElement("p");
	var newNode = createNewNode();
	if(newNode!=null)
	{
		container.appendChild(newNode)
		document.querySelector('#main').innerHTML = newNode.innerHTML;
		setTextFocus();
	}
	else
	{
		alert("Some error happened!!");
	}
}

function createNewNode()
{
	var newnode = document.createElement("p");
	newnode.innerHTML = "<b>prashanth@mysystem:~$&nbsp;</b>";
	
	//creating new textbox and setting the properties
	var newTB = document.createElement("input");
	newTB.type = "text";
	newTB.className = "selected";
	newTB.id = 'terminal-input';
	newTB.name = "terminal-input";
	
	//creating new output-panel and setting the properties
	var newOP = document.createElement("span");
	newOP.id = "output";
	newOP.className = "selected";
	
	//unsetting the selected option of the previous selected nodes
	newnode.appendChild(newTB);
	newnode.appendChild(newOP);
	return newnode;
}
function unsetActiveElements()
{
	var activeTB = document.querySelector("#terminal-input.selected");
	var activeOP = document.querySelector("#output.selected")
	activeTB.value = activeTB.value;
	activeTB.setAttribute("readonly","true");
	activeTB.className = "";
	activeOP.className = "";	
}
function createNewNodeAndAppend()
{
	//Don forget to unset the active elements before apending the new active elements
	unsetActiveElements();
	var newnode = createNewNode();
	if(newnode!=null)
	{
		document.querySelector("#main").appendChild(newnode);
		setTextFocus();
		return;
	}
	alert("Something wrong happend!!");
}
function writeOutput(parentNode,childNode)
{
	//parentNode and childNode are both DOM nodes
	if(parentNode==null || childNode==null)
		return;
	parentNode.appendChild(childNode);
}
function processInput(e)
{
	var currentTextBox = document.querySelector("#terminal-input.selected");
	var command = currentTextBox.value;
	if(e.keyCode==13)
	{
		switch(command)
		{
			case "clear":
			{
				clearScreen();
				break;
			}
			case "help":
			{
				var commandList = commands;
				var outputBlockContainer = document.querySelector("#output.selected");
				var commandNode = document.createElement("table");
				commandNode.className = "table-output";
				for(var i=0;i<commandList.length;i++)
				{
					commandNode.innerHTML +="<tr><td>" + commandList[i].name + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + commandList[i].description + "</td></tr>";
				}
				outputBlockContainer.appendChild(commandNode);
				createNewNodeAndAppend();
				break;
			}
			case "exit": 
			{
				document.location = "thanks.html";
				break;	
			}
			default:
			{
				var outputBlockContainer = document.querySelector("#output.selected");
				var result = document.createElement("div");
				result.className = "output";
				result.innerHTML = "Unknown command. Type <i> help </i> for details.";
				writeOutput(outputBlockContainer,result);
				createNewNodeAndAppend(); 
			}
			
		}
	}
	else if(e.keyCode==9)
	{
		e.preventDefault();
		currentTextBox.value += "Auto Completion to be done..";
	}
}

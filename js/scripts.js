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
//	blinkCursor();
}
function displayAlert()
{
	var progressAlert = document.querySelector("#progress");
	if(progressAlert.innerHTML.length==0)
	{
		progressAlert.innerHTML = "Under Construction..Try After months :P";
	}
	/*var progressAlert = document.querySelector("p");
	progressAlert.innerHTML = progressAlert.innerHTML + "<br>" + "Hello";*/
	
}

function keyCapture(e)
{
	if(e.keyCode==13)
	{
//		displayAlert();		
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
	/*var newNode = "<p id=\"terminal-display\" class=\"selected\">"+temp.innerHTML+"</p>";
	temp.setAttribute("class","unselected");
	currentTextBox.setAttribute('class','unselected');
	currentTextBox.setAttribute('value',currentTextBox.value);
	currentTextBox.setAttribute('readonly','true');
	document.querySelector('#main').innerHTML = document.querySelector('#main').innerHTML + "<br>" + newNode;*/
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

function showUsage(command)
{
	var commandList = commands;
	var outputBlockContainer = document.querySelector("#output.selected");
	var commandNode = document.createElement("table");
	commandNode.className = "table-output";
	if(command=="")
	{
		//list all usages
		for(var i=0;i<commandList.length;i++)
		{
			commandNode.innerHTML +="<tr><td>" + commandList[i].name + "</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + commandList[i].description + "</td></tr>";
			if(commandList[i].usage!=undefined)
				commandNode.innerHTML +="<tr><td><i>Usage :</i> " + commandList[i].usage + "</td></tr>";
		} 
	}
	else
	{
		for(var i=0;i<commandList.length;i++)
		{
			if(commandList[i].name == command && commandList[i].usage!=undefined)
				commandNode.innerHTML +="<tr><td><i>Usage : </i>" + commandList[i].usage + "</td></tr>";
		}
	}
	outputBlockContainer.appendChild(commandNode);
	createNewNodeAndAppend();
}
function clearConsole()
{
	document.querySelector("#console").innerHTML = "Console Output : <span style='float:right;' onclick='clearConsole()'>Clear</a><br>";
	//once a click is made - the textbox focus will be out. So resetting it.
	setTextFocus();
}
function updateConsole(output)
{
	document.querySelector("#console").innerHTML += output + "<br>";
}
function imdb(movieName)
{
	updateConsole("Fetching Movie Review from IMDB..");
	$.ajax({
  	url: 'http://www.imdbapi.com/?i=&t='+movieName,
  	success: function(responseText) 
  	{
		// Parsed JSON data to MovieData
		var MovieData = eval("(" + responseText + ")");
		
		var MovieTitle=MovieData.Title;
		var Year=MovieData.Year;
		var Director=MovieData.Director;
		var Writer=MovieData.Writer;
		var Actors=MovieData.Actors;
		var Plot=MovieData.Plot;
		var Rating=MovieData.imdbRating;
	
		var commandNode=document.createElement("table");
		commandNode.className = "movie-output";
		var starttag="<tr><td>";var endtag="</td></tr>";
		
		commandNode.innerHTML +=starttag+" MovieTitle : "+MovieTitle+endtag;
		commandNode.innerHTML +=starttag+" Year : "+Year+endtag;
		commandNode.innerHTML +=starttag+" Director : "+Director+endtag;
		commandNode.innerHTML +=starttag+" Writer : "+Writer+endtag;
		commandNode.innerHTML +=starttag+" Actors : "+Actors+endtag;
		commandNode.innerHTML +=starttag+" Plot : "+Plot+endtag;
		commandNode.innerHTML +=starttag+" Rating : "+Rating+endtag;
		var outputBlockContainer = document.querySelector("#output.selected");
		outputBlockContainer.appendChild(commandNode);
		createNewNodeAndAppend();
  	}
	});
	

}
function processInput(e)
{
	var currentTextBox = document.querySelector("#terminal-input.selected");
	var input = currentTextBox.value;
	var parameters = input.split(" ");
	if(input.length==0)
		return;
	var command = parameters[0];
	if(e.keyCode==13)
	{
		//enter key is pressed
		switch(command)
		{
			case "clear":
			{
				clearScreen();
				break;
			}
			case "imdb":
			{
				// command syntax  : imdb <movie-name>
				var movieName = "";
				for(var i=1;i<parameters.length;i++)
					movieName +=parameters[i];
				if(movieName.length==0)
				{
					showUsage(command);
					break;
				}
				imdb(movieName);
				break;
			}
			case "help":
			{
				//empty parameter to showUsage will display all commands usages
				command = "";
				showUsage(command)
				break;
			}
			case "fuck":
			{
				var commandNode=document.createElement("table");
				commandNode.className="table-output";
				var outputBlockContainer = document.querySelector("#output.selected");
				commandNode.innerHTML+="<tr><td>"+"You should grow up buddy. "+command+ " in Windows !"+"</td></tr>";
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
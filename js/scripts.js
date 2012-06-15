var cursor = null;
var blinkingFunction;
var commandHistory = [];
var commandHistoryIndex = 0;
var previousPrefix = "";
var suggestions;
function setTextFocus()
{
	document.querySelector('#terminal-input.selected').focus();

}
function initialize()
{
	$('#terminal-input').live('keydown',processInput);
	//where ever you click - set the text focus to input
	document.onclick = setTextFocus;
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
function clearCommandHistory()
{
	this.commandHistory = [];
	commandHistoryIndex = 0;
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
		//var MovieData = eval("(" + responseText + ")");
		var MovieData = JSON.parse(responseText);
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

function printHistory()
{
	var newnode = document.createElement("span")
	newnode.innerHTML = "<br>"
	for(var i=0;i<commandHistory.length;i++)
	{
		newnode.innerHTML += commandHistory[i] + "<br>"; 
	}
	var outputBlockContainer = document.querySelector("#output.selected");
	outputBlockContainer.appendChild(newnode);
	createNewNodeAndAppend();
}

function isPalindrome(string) {
	for(var i=0; i<string.length; i++) {
		if(string.charAt(i) != string.charAt(string.length-parseInt(1)-i)) {
			return false;
		}
	return true;
	}
}

function populateCommands(prefix)
{
	var result = [];
	for(var i=0;i<commands.length;i++)
	{
		var command = commands[i].name;
		for(var j=0;j<prefix.length;j++)
		{
			if(prefix.charAt(j)!=command.charAt(j))
				break;
		}
		if(j==prefix.length)
			result.push(command);
	}
	return result;
}
function getGradeValue(grade){
	var S = 10, A = 9, B = 8, C = 7, D = 6, E = 5, U = 0;
	switch(grade){
		case 'S': return S;
		case 'A': return A;
		case 'B': return B;
		case 'C': return C;
		case 'D': return D;
		case 'E': return E;
		case 'U': return U;
		default: return 0;
	}
}
function calculateGPA(marks, credits)
{
	var totalCredits = 0, totalSum = 0;
	if(marks.length != credits.length){
		return false;
	}else {
		for(var i = 0; i<marks.length; i++){
			totalSum += getGradeValue(marks[i].toUpperCase())*credits[i];
			totalCredits += credits[i]; 
		}
		if(totalCredits != 0)
			return totalSum/totalCredits;
		else 
			return false;
	}
}
function processInput(e)
{
	var currentTextBox = document.querySelector("#terminal-input.selected");
	var input = currentTextBox.value;
	var parameters = input.split(" ");
	var validCommand = true;
	if(e.keyCode==13)
	{
		if(input.length==0)
			updateConsole("Type help for usage");
		var command = parameters[0];
		//enter key is pressed
		switch(command)
		{
			case "clear":
			{
				if(parameters.length==2 && parameters[1]=="history")
				{
					clearCommandHistory();
					createNewNodeAndAppend();
					validCommand = false;
				}					
				else
					clearScreen();
				break;
			}
			case "echo":
			{
				if(parameters.length>=1)
				{
					var commandNode=document.createElement("table");
					var message="";
					commandNode.className="table-output";
					var outputBlockContainer = document.querySelector("#output.selected");
					if(parameters.length == 1) {
						message = "empty";
					}
					for(var i=1; i<parameters.length; i++) {
						message += parameters[i]+" ";
					}
					message=message.replace(/["']{1}/gi,"")
					commandNode.innerHTML+="<tr><td>"+message+"</td></tr>";
					outputBlockContainer.appendChild(commandNode);
					createNewNodeAndAppend();
					break;
				}
				break;
			}
			case "calc":
			{
				var commandNode=document.createElement("table");
				var message="";
				commandNode.className="table-output";
				var outputBlockContainer = document.querySelector("#output.selected");
				if(parameters.length>1)
				{
					for(var i=1; i<parameters.length; i++) {
						message += parameters[i]+" ";
					}
					message=message.replace(/[^0-9\+\*\-\/ ]/g, '');
					message = eval(message);		
				} else {
					message = "Enter calculation values";
				}
				commandNode.innerHTML+="<tr><td>"+message+"</td></tr>";
				outputBlockContainer.appendChild(commandNode);
				createNewNodeAndAppend();
				break;
			}
			case "palin": case "palindrome":
			{
				var commandNode=document.createElement("table");
				var message="";
				commandNode.className="table-output";
				var outputBlockContainer = document.querySelector("#output.selected");
				if(parameters.length>1)
				{
					for(var i=1; i<parameters.length; i++) {
						message += parameters[i]+" ";
					}
					message=message.replace(/["' ]/g,'');
					if(isPalindrome(message)) {
						message = "It is a palindrome";
					} else {
						message = "It is not a palindrome";
					}
				}
				else {
					message = "Enter string to check";
				}
				commandNode.innerHTML+="<tr><td>"+message+"</td></tr>";
				outputBlockContainer.appendChild(commandNode);
				createNewNodeAndAppend();
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
					validCommand = false;
					break;
				}
				imdb(movieName);
				break;
			}
			case "gpa":
			{
				//command syntax : gpa subject grades <space> credits
				var commandNode=document.createElement("table");
				var message="";				
				if(parameters.length>1)
				{
					message = "";
					var credits = new Array();
					var grades = new Array();;
					for(var i=1; i<parameters.length; i++) {
						message += parameters[i]+" ";												
					}
					message=message.replace(/["' ]/g,'');					
					var len = message.length;
					var creditsCounter = 0, gradesCounter = 0;
					for(var i = 0;i<len;i++){
						if(i%2 == 0){
							credits[creditsCounter] = parseInt(message[i]);
							creditsCounter += 1;
						}else{
							grades[gradesCounter] = message[i];
							gradesCounter += 1;
						}
					}
					var result = calculateGPA(grades, credits);
					if(result != false){
						message = result;
					}else {
						message = "Invalid input use help for proper syntax";
					}
					commandNode.className="table-output";
					var outputBlockContainer = document.querySelector("#output.selected");					
					commandNode.innerHTML+="<tr><td>"+message+"</td></tr>";
					outputBlockContainer.appendChild(commandNode);
					createNewNodeAndAppend();
					break;
				}else {
					showUsage(command);
					validCommand = false;
					break;
				}
			}
			case "help":
			{
				//empty parameter to showUsage will display all commands usages
				empty = "";
				showUsage(empty)
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
			case 'history':
			{
				printHistory();
				validCommand = false;
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
				validCommand = false; 
			}
		}
		//only those where validcommand has not been set to false will be put to history list - to reduce size of history
		if(validCommand==true)
		{
			if(commandHistory.length==0 || commandHistory[commandHistory.length-1]!=input)
				commandHistory.push(input);
		}
	}
	else if(e.keyCode==38)
	{
		e.preventDefault();
		//Up arrow has been pressed. Go Backward
		if(commandHistory.length>0)
		{
			if(currentTextBox.value.length==0)
			{
				//Initial State. Make cursor to end element
				commandHistoryIndex = commandHistory.length-1;
			}
			else if(commandHistoryIndex!=0 && commandHistoryIndex==commandHistory.length-1)
			{
				//Currently at end already and end text is already there. So just skip it
				commandHistoryIndex--;
			}
			if(commandHistoryIndex>=0)
			{
				//valid cursor state
				currentTextBox.value = commandHistory[commandHistoryIndex];
				if(commandHistoryIndex>0)
					commandHistoryIndex--;	
			}
		}
		
	}
	else if(e.keyCode==40)
	{
		e.preventDefault();
		//down has been pressed. Go forward
		if(commandHistory.length>0)
		{
			if(currentTextBox.value.length==0)
			{
				//Initial State. Set cursor to beginning
				commandHistoryIndex = 0;
			}
			else if(commandHistoryIndex!=commandHistory.length-1 && commandHistoryIndex==0)
			{
				commandHistoryIndex++;
			}
			if(commandHistoryIndex<commandHistory.length)
			{
				//valid cursor state
				currentTextBox.value = commandHistory[commandHistoryIndex];
				if(commandHistoryIndex<commandHistory.length-1)
					commandHistoryIndex++;
			}
		}
		
	}
	else if(e.keyCode==9)
	{
		e.preventDefault();
		//Auto Completion
		var prefix = currentTextBox.value;
		if(previousPrefix!=prefix)
		{
			suggestions = populateCommands(prefix);
			previousPrefix = prefix
		}
		//Previously Computed Prefix
		if(suggestions.length==1)
		{
			currentTextBox.value = suggestions[0];
		}			
		else if(suggestions.length>1)
		{
			printSuggestions();
		}
	}
}

function printSpaces(count)
{
	var result = "";
	for(var i=0;i<count;i++)
		result+="&nbsp;";
	return result;
}
function printSuggestions()
{
	var outputBlockContainer = document.querySelector("#output.selected");
	var newnode = document.createElement("table");
	newnode.className = "table-output";
	var count = suggestions.length;
	//suggestions will be displayed in pairs
	if(suggestions.length%2==1)
		count = suggestions.length-1;
	//count is ensure to be even always
	for(var i=0;i<count;i+=2)
	{
		newnode.innerHTML += "<tr><td>" + suggestions[i] + "</td><td>" + printSpaces(5) + suggestions[i+1] + "</td></tr>"; 
	}
	if(count == suggestions.length-1)
	{
		//odd count. add the remaining one element
		newnode.innerHTML += "<tr><td>"+suggestions[i]+"</td></tr>";
	}
	outputBlockContainer.appendChild(newnode);
	createNewNodeAndAppend();
}

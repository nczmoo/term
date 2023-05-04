/*
TODO
 be able to run multiple flags if necessary fw -o 24 -c 100

*/
class Game{
	fake = new FakeFile();
	firewall = new Firewall();
	helpClass = new Help();
	nmapClass = new NMap();
	npc = new NPC();
	portClass = new Port();
	pwnClass = new Pwn();
	rootClass = new Root();
	
	files = ['root.file'];
	hash = 0;
	cryptoGoal = 10000000;
	health = [];
	cmdHistory = [];
	cmdHistoryPtr = null;
	maxHealth = [];
	ports = [];
	protocol = [];
	numOfPorts = 2048;
	defaultHealth = 100;
	defaultMaxHealth = 100;
	defaultPortState = 1;
	defaultPortProtocol = 'TCP';
	programs = ['free', 'fw', 'help', 'ls', 'nmap', 'port', 'pwn', 'root', 'run'  ];		
	//vim, ssh, exit, mv, 
	pwd = null;
	rootFile = 'root.file';
	runningProgram = null;
	system = 4096;
	maxSystem = 4096;
  constructor(){
    for (let i = 1; i <= this.numOfPorts ; i ++){		
		this.ports[i] = this.defaultPortState;				
		this.health[i] = this.defaultHealth;
		this.maxHealth[i] = this.defaultHealth;
		this.protocol[i] = this.defaultPortProtocol;
	}
	
  }
  badCommand(whichProgram){
	  if (whichProgram != null){
		  ui.status("<div>" + whichProgram 
			+ " is a valid program but was sent invalid arguments. See 'help " 
			+ whichProgram + "' for details</div>");
		return;
	  }
	  ui.status ("<div> Command not found! Try 'help' to see what commands are available.</div>");
  }
  command (inputPrompt){
	  this.cmdHistory.push(inputPrompt);
	  let prompts = inputPrompt.split(' ');
	  let program = inputPrompt.split(' ')[0];
	  ui.status("<div class='mb-2'>&nbsp;</div>");
	  if (this.programs.includes(program)){
		  this[program](prompts)
	  } else {
			this.badCommand(null);
	  }
	  
  }
    
	free(prompts){
		if (prompts.length == 1){
			ui.status("<div>" + ui.fetchSystemStatus() + "</div>");
			return;
		}
		badCommand('free');
		
	}

  fw(prompts){	 
	this.firewall.go(prompts);
  }

	help(prompts){
		this.helpClass.go(prompts);
	}
  
  ls (prompts){
	  let txt = '<div>';
	  if (prompts.length > 1){
		  this.badCommand('ls');
	  }
	  
	  for (let file of this.files){
		  txt += " " + file + " ";
	  }
	  txt += "</div>";
	  ui.status(txt);
  }
  nmap(prompts){
	  this.nmapClass.go(prompts);
  }
  port(prompts){
	this.portClass.go(prompts);
  }
  
  pwn(prompts){
	this.pwnClass.go(prompts);  
  }

  root(prompts){
	rootClass.go(prompts);
  }

	run (prompts){
		if (this.programs.includes(prompts[1])){
			prompts.splice(0, 1)
			this.off(prompts)
			this.runningProgram = setInterval(function (){
				
				game.off(prompts)
			}, 1000);
			return;
		}
		this.badCommand('run');
	}

	
	off(prompts)
	{
		ui.status("<div class='mb-2'>&nbsp;</div>");
		game[prompts[0]](prompts);
		$("#commandPrompt").addClass('d-none');
		$("#stop").removeClass('d-none');
		//$("#commandPrompt").prop('disabled', true);
	}
	
	on(){
		$("#commandPrompt").removeClass('d-none');
		$("#stop").addClass('d-none');
		clearInterval(this.runningProgram);
		this.runningProgram = null;
	}
}

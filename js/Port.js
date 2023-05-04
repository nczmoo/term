class Port{

  constructor(){
    
  }
	go(prompts){
		let portCaption = ['closed', 'open', 'being monitored'];
		let validProtocols = ['TCP', 'UDP'];
	  if (prompts.length < 3){
		  let portNum = Number(prompts[1]);		  
		  
		  ui.status("<div>Port #" + portNum + " is " 
			+ portCaption[game.ports[portNum]] + ", at " 
			+ (game.health[portNum] / game.maxHealth[portNum] * 100)
			+ "%. and running " + game.protocol[portNum] + "</div>");
		
		  return;
	  }
	  if (prompts[1] == '-c' && prompts.length == 4){
		  let portNum = Number(prompts[3]);		  
		  if (!validProtocols.includes(prompts[2])){
			  game.badCommand('port');
			  return;
		  }
		  ui.status ("<div> You changed port #" + portNum + " to "  + prompts[2] + "</div>");
		  game.protocol[portNum] = prompts[2];
		  return;
	  }
   	  if (prompts[1] == '-r' && prompts.length == 3){
		  this.repair(prompts[2]);
		  return;
	  }

	   game.badCommand('port');
	}
	
	repair(portNum){
		if (game.health[portNum] == game.maxHealth[portNum]){
			ui.status("<div>Port #" + portNum + " is already at 100%</div>");
			return;
		}
		//check for invalid port num
		
		game.health[portNum] += game.system;
		if (game.health[portNum] > game.maxHealth[portNum]){
			game.health[portNum] = game.maxHealth[portNum];
		}
		ui.status("<div>Port #" + portNum + " is now at " + (game.health / game.maxHealth * 100) + "%</div>");
	}
}

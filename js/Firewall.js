class Firewall{

  constructor(){
    
  }
  display(prompts){
	  
	if (prompts.length == 1){
		ui.status("<div>Your current firewall status is:</div>" + this.fetchStatus());
    } else if (prompts[1] == '-o'){
		this.setRange(1, 1, game.numOfPorts);
		ui.status("<div>You've opened all " + game.numOfPorts + " ports. " + this.integrityCheck() + "</div>");
		
	} else if (prompts[1] == '-c'){		
		this.setRange(0, 1, game.numOfPorts);
		ui.status("<div>You've closed all " + game.numOfPorts + " ports. " + this.integrityCheck() + "</div>");
		
	} else if (prompts[1] == '-m'){
		this.setRange(2, 1, game.numOfPorts);
		ui.status("<div>You're monitoring all " + game.numOfPorts + " ports. " + this.integrityCheck() + "</div>");
		
	}
  }
  
  go(prompts){
	 if (prompts.length < 3){
		 
		this.display(prompts);
		return;
	}	
	if (prompts[1] == '-o'){
		status = this.set(1, prompts);
	} else if (prompts[1] == '-c'){
		status = this.set(0, prompts);
	} else if (prompts[1] == '-m'){
		status = this.set(2, prompts);
	}
	ui.status ("<div>" + status + this.integrityCheck() + "</div>"); 

  }
  
    fetchStatus(){
	  let caption = [ 'closed', 'open', 'monitored' ];
	  let currently = null;
	  let firsts = [];
	  let lasts = [];
	  let count = [0, 0, 0];
	  let txt = "<div class='ms-3'>";
	  for (let init = 0; init < 3; init ++){
		  
		  firsts.push([]);
		  lasts.push([]);
	  }
	  for (let i in game.ports){
		  count[game.ports[i]]++;

		  if (currently == null || currently != game.ports[i]){
			  if (currently != null){
				 lasts[currently].push(i-1);
				//lasts[game.ports[i]].push(i);
			  }
			  firsts[game.ports[i]].push(i);
			  currently = game.ports[i];
		  }
		  
	  }
	  lasts[currently].push(game.ports.length - 1);
	  for (let i in count){
		  if (i == count.length - 1){
			  txt += " and ";
		  }
		  txt += count[i] + " " + caption[i] + " ports (";
		  for (let n in firsts[i]){
			  if (firsts[i][n] == lasts[i][n]){
				  txt += firsts[i][n];				  				  
			  } else {
				  txt += firsts[i][n] + "-" + lasts[i][n] ;
			  }
			  if (n < firsts[i].length - 1){
				  txt += ", ";
			  }
		  }
		  txt += ")";
		  if (i < count.length - 1){
			  txt += ", ";
		  }
	  }
	  txt += "</div>";
	  return txt;
  }
  
	integrityCheck(){
		console.log('integrity');
		let closedPorts = 0, monitoredPorts = 0;
		for (let port of game.ports){
			if (port == 0){
				closedPorts++;
			} else if (port == 2){
				monitoredPorts++;
			}
		}
		game.system = closedPorts * 2 + monitoredPorts;
		return ui.fetchSystemStatus();
	}	
  
    set(statusSetTo, prompts){
		let caption = ['closed', 'opened', 'are monitoring'];
		let txt = "You  " + caption[statusSetTo] + " the following ports: ";
		for (let i = 2; i < prompts.length; i++){
			if (prompts[i].includes(',')){
				prompts[i] = prompts[i].replace(',', '');
			}
			txt += prompts[i];
			if (i < prompts.length - 1){
				txt += ", ";
			}
			if (prompts[i].includes('-')){
				this.setRange(statusSetTo, prompts[i].split('-')[0], prompts[i].split('-')[1]);
				continue;
			}
			game.ports[prompts[i]] = statusSetTo

		}
		return txt;
	}
	setRange(statusSetTo, min, max){				
		for (let i = min; i <= max; i++){
			game.ports[i] = statusSetTo;
		}
	}
	
}

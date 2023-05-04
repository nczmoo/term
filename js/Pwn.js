/*
needs a more compelling attack msg

*/

class Pwn{	
	constructor(){
		
	}
	go (prompts){
		//check if port is actually open
		//check if hostname is valid
		
		if (prompts[1] == '-t' && prompts.length == 4){
			this.tcp(prompts[2], prompts[3]);
			return;
		} else if (prompts[1] == '-u' && prompts.length == 4){
			this.udp(prompts[2], prompts[3]);
			return;
		}
		game.badCommand('pwn');
	}
	attack (port, hostname, protocol){
		port = Number(port);
		let boxID = game.npc.search(hostname);
		let box = game.npc.boxes[boxID];
		let dmg = 1;
		let portID = box.openPorts.indexOf(port);
		let txt = "<div>A hostile " + protocol + " packet was sent to port #" + port + " of " + hostname + ". ";

		if (protocol == box.protocol[portID]){
			dmg = randNum(1, 10);
		}		
		game.npc.boxes[boxID].health[portID] -= dmg;
		if (game.npc.boxes[boxID].health[portID] <= 0){
			txt += hostname + " is now open for access.";
		} else {
			
			txt += "(" + (box.health[portID] / 100 * 100) + "%)";
		}
		txt += "</div>";
		ui.status(txt);
	}
	tcp(port, hostname){
		this.attack(port, hostname, 'TCP');
	}
	
	udp(port, hostname){
		this.attack(port, hostname, 'UDP');
	}
}
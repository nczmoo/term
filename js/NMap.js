

class NMap{
	constructor(){
		
	}
	go (prompts){
		if (prompts.length == 1){
			this.netscan();
			return;
		} else if (prompts[1] == '-p' && prompts.length == 4){
			this.portscan(Number(prompts[2]), prompts[3]);
			return;
		} else if (prompts[1] == '-h' && prompts.length == 3){
			this.hostscan(prompts[2]);
			return;
		}
		game.badCommand('nmap');
	}
	hostscan(hostname){
		let boxID = game.npc.names.indexOf(hostname);
		let box = game.npc.boxes[boxID];
		let found = [];
		let txt = "<div>You scanned " + hostname + " and found ";
		for (let i of box.openPorts){
			if (randNum(1,3) == 1){
				found.push(i);
			}
		}
		txt += found.length  + ' ports open. ('
		for (let i in found){
			txt += "<a href='#' id='portscan-" + found[i] + "-" 
				+ game.npc.search(hostname) + "' class='portscan'>" + found[i] + "</a>";
			if (i != found.length - 1){
				txt += ', ';
			}
		}
		txt += ')</div>';
		ui.status(txt);
	}
	netscan(){
		let scanned = [], txt = '';
		for (let boxID in game.npc.boxes){
			let box = game.npc.boxes[boxID];
			let cent = Math.round(box.openPorts.length / game.numOfPorts * 100 * 10) / 10;
			let didTheyScan = Math.round(cent) >= randNum (1, 2048);
			if (didTheyScan){
				scanned.push(box.name);
				
			}
		}
		txt += "<div>nmap found " + scanned.length + " host(s). ("
		for (let i of scanned){
			txt += "<a href='#' id='netscan-" + game.npc.search(i) + "' class='netscan'>" + i + "</a>";
			if (scanned.indexOf(i) != scanned.length - 1){
				txt += ", ";
			}
		}
		txt += ")</div>";
		ui.status(txt);
	}
	portscan(portNum, hostname){
		portNum = Number(portNum);
		let boxID = game.npc.names.indexOf(hostname);
		let box = game.npc.boxes[boxID];
		ui.status("<div>You scanned port #" + portNum + " of " + hostname 
			+ ". It's " + box.protocol[box.openPorts.indexOf(portNum)] + ".</div>");
	}
	
}
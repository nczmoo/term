class Help{
	defaultHelp = [
		"Welcome to Terminal!",
		"Here's a list of commands:",
		"fw - firewall program to open, close or set ports to be monitored. (This takes system resources)",
		"ls - shows you what files you have",
		"nmap - scans the net for other boxes to pwn",
		"port - displays status of a port, repairs a port, or changes protocol the port communicates with",
		"pwn - attacks another box UDP or TCP ports",
		"root - add pwd to rootfile, shows root file, change root file to another file (this is where your wallet is stored)",
		"I'm trying to finish this quickly so I'll come back later",
	]
	list = ['fw', 'ls', 'nmap', 'port', 'pwn', 'root'];
	

  constructor(){
    
  }

  go (prompts){
		
		if (prompts.length == 1){
			for (let i = this.defaultHelp.length - 1; i >= 0; i--){
				ui.status('<div>' + this.defaultHelp[i] + "</div>");
			}
			return;
		} else if (prompts.length == 2 && this.list.includes(prompts[1])){
			this[prompts[1]]()
			return;
		}
		game.badCommand('help');
		
	}

	fw(){
		
	}

}

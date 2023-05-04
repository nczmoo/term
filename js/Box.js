class Box {
	openPorts = [];
	name = null;
	health = [];
	maxNumberOfOpenPorts = 1840
	protocol = [];
	constructor(){
		let possProtocol = [ 'UDP', 'TCP' ];
		this.name = this.randStr(randNum (5, 8));
		for (let i = 0; i < randNum (1, this.maxNumberOfOpenPorts); i++){
			this.protocol.push(possProtocol[randNum(0, 1)]);
			this.health.push(randNum(10, 100));
			
			let picking = true;
			while(picking){
				let randPort = randNum(1, 2048);
				if (!this.openPorts.includes(randPort)){
					this.openPorts.push(randPort);
					picking = false;
				}
			}
			
		
		}
		
	}
	
	randStr(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
}
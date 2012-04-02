self.onmessage = function(event) {
	importScripts('bf.js'); // edit me to match the real path of the bf.js file !
	var brainFuck = new BF(event.data.opcode, event.data.input);
	var ret = brainFuck.run();
	postMessage(ret);
}

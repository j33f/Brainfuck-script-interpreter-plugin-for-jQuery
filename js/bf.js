/*
            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2012 Jean-François VIAL <http://about.me/Jeff_>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.
*/
/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

var BF = function (bf,_input){
	var opcode;
	var input;
	var output;
	var openBrackets;
	var closeBrackets;

	this.check = function() {
		this.openBrackets = [];
		this.closeBrackets = [];
		for (var i = 0; i < this.opcode.length; i++) {
			if (this.opcode.charAt(i) == '[') {
				this.openBrackets.push(i);
			} else if (this.opcode.charAt(i) == ']') {
				this.closeBrackets.unshift(i);
			}
		}
		if (this.openBrackets.length != this.closeBrackets.length) {
			throw "Open brackets must be closed";
			return false;
		}
		return true;
	};

	this.run = function() {
		if (this.check()) {
			var javascriptCode;
			var output = [];

			javascriptCode = "var array = [];";
			javascriptCode += "for(var j = 0;j < 30000;j++){array[j]=0;}";
			javascriptCode += "var p = 0;";

			var commands = {
				'>' : "++p;",
				'<' : "--p;",
				'+' : "array[p]++;",
				'-' : "array[p]--;",
				'.' : "output.push(array[p]);",
				',' : "array[p] = __input.pop();",
				'[' : "while (array[p]) {",
				']' : "}"
			}
			var __input = [];
			for (var i = 0; i < this.input.length; i++) {
				__input.push(String.fromCharCode(this.input.charAt(i)));
			}
			__input.reverse();

			for (var i = 0; i < this.opcode.length; i++) {
				if (commands[this.opcode.charAt(i)]) {
					javascriptCode += commands[this.opcode.charAt(i)];
				}
			}
			eval(javascriptCode);
			for(var i = 0; i < output.length; i++){
				this.output += String.fromCharCode(output[i]);
			}
			this.output = this.stripslashes(this.output);
			return this.output;
		}
		return '';
	};
	this.stripslashes = function(str) {
		return (str + '').replace(/\\(.?)/g, function (s, n1) {
		    switch (n1) {
				case '\\':
				    return '\\';
				case '0':
			        return '\u0000';
				case '':
				    return '';
				default:
				    return n1;
				}
		});
	};

	this.opcode = bf;
	this.input = _input;
	this.output = '';
	this.openBrackets = [];
	this.closeBrackets = [];
};

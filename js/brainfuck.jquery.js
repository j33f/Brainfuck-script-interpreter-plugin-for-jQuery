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
/*
	Brainfuck interpreter for jQuery
	You must include the bf.js file before this file.
*/
(function($){
	$.fn.brainFuck = function() {
		var $$ = $(this);
		if (window.Worker) {
			var bfWorker = new Worker('js/bf_worker.js'); // edit this to match the real bf_worker.js file !
			bfWorker.onmessage = function(event) {
				$$.after(event.data);
				bfWorker.terminate();
			}
			bfWorker.postMessage({
				opcode: $$.html(),
				input: ($$.data('input') != undefined) ? $$.data('input') : ''
			});
		} else {
			var brainFuck = new BF($$.html(), ($$.data('input') != undefined) ? $$.data('input') : '');
			$$.after(brainFuck.run());
		}
		return this;
	}
	$('script[language="brainfuck"]').brainFuck();
})(jQuery);

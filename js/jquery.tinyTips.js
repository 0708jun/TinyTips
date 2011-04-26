/***********************************************************/
/*                    tinyTips Plugin                      */
/*                      Version: 1.2 (beta)                */
/*                      Mike Merritt                       */
/*                Updated: Jan 12th, 2011                  */
/***********************************************************/

(function($){  
	$.fn.tinyTips = function (supCont, tipPrefix, animSpeed, delay) {
		
		// Default config options
		var config = {
			prefix: 'light',
			content: 'title',
			aSpeed: 300,
			delay: 300
		};
		
		// Global tinyTip variables and checks
		var $this;
		var tText;
		var tinyTip;
		var tipCont;
		if (tipPrefix != undefined) { config.prefix = tipPrefix; } 
		if (supCont != undefined) { config.content = supCont; }
		if (animSpeed != undefined) { config.aSpeed = animSpeed; }
		if (delay != undefined) {config.delay = delay; }
		var tipName = config.prefix + 'Tip';
		var tipFrame = '<div class="' + tipName + '"><div class="content"></div><div class="notch">&nbsp;</div></div>';
		
		// When we hover over the element that we want the tooltip applied to
		$(this).hover(function() {
			
			// Cache to make this quicker.
			$this = $(this);
			
			// Determine what the tooltip should show, set both tipCont and tText to the default title if that is what is supplied, 
			// and remove it so the default browser tooltip doesn't appear. 
			// If it's not the default title, set only tipCont to the supplied tooltip content.
			if (config.content === 'title') {
				tipCont = tText = $this.attr('title');
				$this.attr('title', '');
			} else if (config.content !== 'title') {
				tipCont = config.content;
			}
			
			// Set a timeout so the tooltip doesn't instantly pop up (causes quirky functionality if this is not set.)
			hoverDelay = setTimeout(createTooltip, 300)
			
		}, function() {
			
			// If the mouse leaves the element before the timeout is complete, cancel the timeout that creates the tooltip.
			clearTimeout(hoverDelay);
			
			// Destroy the active tooltip.
			destroyTooltip();
			
		});
		
		// Creates the tooltip
		function createTooltip() {
			// Inject the markup for the tooltip into the page and
			// set the tooltip global to the current markup and then hide it.
			$('body').append(tipFrame);
			var divTip = 'div.'+tipName;
			tinyTip = $(divTip);
			tinyTip.hide();
			
			$(divTip + ' .content').html(tipCont);
			
			// Set the "notch" to the center of the tooltip
			var tipHeight = tinyTip.outerHeight();
			var tipWidth = tinyTip.outerWidth();
			var notch = tinyTip.find('.notch');
			var notchPosX = ((tipWidth/2)-10)+'px';
			var notchPosY = tipHeight+'px';
			notch.css('left', notchPosX);
			notch.css('top', notchPosY);
			
			// Offsets so that the tooltip is centered over the element it is being applied to but
			// raise it up above the element so it isn't covering it.
			var yOffset = tipHeight + 15;
			var xOffset = (tipWidth / 2) - ($this.width() / 2);
			
			// Grab the coordinates for the element with the tooltip and make a new copy
			// so that we can keep the original un-touched.
			var pos = $this.offset();
			var nPos = pos;
			
			// Add the offsets to the tooltip position
			nPos.top = pos.top - yOffset;
			nPos.left = pos.left - xOffset;
			
			// Make sure that the tooltip has absolute positioning and a high z-index, 
			// then place it at the correct spot and fade it in.
			tinyTip.css('position', 'absolute').css('z-index', '500');
			tinyTip.css(nPos).fadeIn(config.aSpeed);
		}
		
		// Destroys the tooltip
		function destroyTooltip() {
			
			$this.attr('title', tText);
		
			// Fade the tooltip out once the mouse moves away and then remove it from the DOM.
			tinyTip.fadeOut(config.aSpeed, function() {
				$(this).remove();
			});
			
		}
		
	}

})(jQuery);
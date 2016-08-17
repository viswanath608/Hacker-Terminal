$(function() {
	$(document).keydown(function(a) {
		Hack.addText(a)
	})
});
var Hack = {
	text: null,
	accessCountimer: null,
	index: 0,
	speed: 3,
	file: "",
	accessCount: 0,
	deniedCount: 0,
	init: function() {
		accessCountimer = setInterval(function() {
			Hack.updLstChr()
		}, 500);
		$.get(Hack.file, function(a) {
			Hack.text = a
		})
	},
	content: function() {
		return $("#console").html()
	},
	write: function(a) {
		$("#console").append(a);
		return false
	},
	makeAccess: function() {
		Hack.hidepop();
		Hack.accessCount = 0;
		var a = $("<div id='access'>").html("");
		a.addClass("access");
		a.html("<h1>ACCESS GRANTED</h1>");
		$(document.body).prepend(a);
		return false
	},
	makeDenied: function() {
		Hack.hidepop();
		Hack.deniedCount = 0;
		var a = $("<div id='access'>").html("");
		a.addClass("access");
		a.html("<h1>ACCESS DENIED</h1>").css("color", "#ff0000");
		$(document.body).prepend(a);
		return false
	},
	hidepop: function() {
		$("#access").remove();
		$("#access").remove()
	},
	addText: function(d) {
		if (d.keyCode == 17) {
			Hack.accessCount++;
			if (Hack.accessCount >= 1) {
				Hack.makeAccess()
			}
		} else {
			if (d.keyCode == 18) {
				Hack.deniedCount++;
				if (Hack.deniedCount >= 1) {
					Hack.makeDenied()
				}
			} else {
				if (d.keyCode == 27) {
					Hack.hidepop()
				} else {
					if (Hack.text) {
						var b = Hack.content();
						if (b.substring(b.length - 1, b.length) == "|") {
							$("#console").html($("#console").html().substring(0, b.length - 1))
						}
						if (d.keyCode != 8) {
							Hack.index += Hack.speed
						} else {
							if (Hack.index > 0) {
								Hack.index -= Hack.speed
							}
						}
						var f = $("<div/>").text(Hack.text.substring(0, Hack.index)).html();
						var e = new RegExp("\n", "g");
						var c = new RegExp("\\s", "g");
						var a = new RegExp("\\t", "g");
						$("#console").html(f.replace(e, "<br/>").replace(a, "    ").replace(c,
							" "));
						window.scrollBy(0, 50)
					}
				}
			}
		} if (d.preventDefault && d.keyCode != 122) {
			d.preventDefault()
		}
		if (d.keyCode != 122) {
			d.returnValue = false
		}
	},
	updLstChr: function() {
		var a = this.content();
		if (a.substring(a.length - 1, a.length) == "|") {
			$("#console").html($("#console").html().substring(0, a.length - 1))
		} else {
			this.write("|")
		}
	}
};
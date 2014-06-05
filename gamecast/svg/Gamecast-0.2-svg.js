/** GENERATED: Thu May 22 02:17:19 PDT 2014 **/
(function() {
	/* 
	 *
	 *	Soccernet Gamecast
	 *	@version 1.0
	 *	@author Nihar Kabinittal, nihar.kabinittal@espn.com
	 *
	 */
	"use strict";
	/*
	 *	@constructor
	 */

	function Gamecast(options) {

		// confirm if the function is called as a constructor
		if (!(this instanceof Gamecast)) {
			return new Gamecast(options);
		}

		var modules = options.modules || '*',
			callback = options.callback,
			module, i, len, sport = options.sport,
			lang = options.language || 'en';

		this.config = options.config || Gamecast.config;

		// Add modules to the core
		if (!modules || (modules && modules.length == 0) || modules == '*') {
			modules = [];
			for (i in Gamecast.Modules[sport]) {
				if (Gamecast.Modules[sport].hasOwnProperty(i)) {
					modules.push(i);
				}
			}
		}

		//Initialize required modules
		for (i = 0, len = modules.length; i < len; i++) {
			module = modules[i];
			Gamecast.Modules[sport][module](this);
		}

		this['sport'] = sport;

		this['language'] = lang;

		if (typeof callback == 'function') {
			callback(this);
		}

	}

	Gamecast.Modules = {};

	Gamecast.Modules.Soccer = {};

	var daddyUrl = '/assets/img/gamecast/';

	if (/^http:\/\/(qa|www|).?espnfc.(com|us|co.uk)/.test(window.location.href)) {
		var daddyUrl = '/i/gamecast/';
	}

	//localdev
	if (window.location.href.indexOf('http://gc.espn.go.com') != -1 || window.location.href.indexOf('tarvalon') != -1) {
		var daddyUrl = './images/';
	}
	
	var daddyUrl = "http://www.espnfc.com/i/gamecast/";

	Gamecast.Modules.Soccer.Field = function(game) {

		var baseConfig = {
			wrapper: 'soccerGameCast',
			canvas: 'gcField',
			width: 585,
			height: 374,
			leftGutter: 34,
			topMargin: 19,
			url: "./data/gamecast_2.xml",
			logoUrl: 'http://soccernet-akamai.espn.go.com/design05/i/clubhouse/badges/',
			logo: {
				path: daddyUrl + 'espn-logo.png',
				width: 171,
				height: 43,
				opacity: 0.15
			},
			fieldImage: daddyUrl + 'field.jpg',
			player: {
				colors: {
					shadow: '#434343',
					fill: 'transparent',
					number: '#fff'
				}
			},
			ball: {
				colors: {
					color: '#333',
					stroke: '#fff'
				}
			},
			fonts: {
				jersey: '11px Arial'
			},
			colors: {
				heatMap: {
					start: 'FFFF11',
					end: 'CC1100'
				},
				penalties: {
					noshot: "#fff"
				}
			},
			images: {
				ball: daddyUrl + 'ball.png',
				ballMiss: daddyUrl + 'ball_miss.png',
				ballIcon: daddyUrl + 'ball_ico.png'
			},
			goalsRadius: 8,
			shotsRadius: 7,
			playerRadius: 7,
			fauxRadius: 5,
			ballRadius: 6,
			roundLabelWidth: 19,
			roundLabelHeight: 19,
			roundLabelRadius: 1,
			classNames: {
				popup: 'viewportPopup',
				fieldClone: 'fieldClone',
				ball_front: 'ball_front',
				perspective_container: 'goalAnimation',
				anim_2: 'anim-2',
				anim_1: 'anim-1'
			}
		},
		_match, overlayIsSet = false, lastVideoPlayed,
		fieldPaper = Raphael("gcFieldVector", 585, 374),
		shotsHolder = fieldPaper.set(),
		fieldBg;

		Gamecast._isPlaying = false;
		Gamecast._queue = [];
		Gamecast._playedAnim = {};

		/* Custom Attrs */

		fieldPaper.customAttributes.info = function(txt) {
			return txt
		};

		fieldPaper.customAttributes.color = function(txt) {
			return txt
		};

		function init(callback) {
			var canvas = baseConfig.canvas,
				config = game.config && game.config.Field || {},
				stage, background, container, field, logo = config.logo.path || baseConfig.logo.path,
				enableLogo = config.enableLogo || false,
				logoWidth = config.logo.width || baseConfig.logo.width,
				logoHeight = config.logo.height || baseConfig.logo.height,
				logoOpacity = config.logo.opacity || baseConfig.logo.opacity,
				url = config.url || baseConfig.url,
				lang = game.config.language || 'en';

			fieldBg = fieldPaper.image(baseConfig.fieldImage,0,0,585,374);

			if (enableLogo) {
				// logo = new Bitmap(logo);

				// logo.x = baseConfig.width / 2 - logoWidth / 2;

				// logo.y = baseConfig.height / 2 - logoHeight / 2;

				// logo.alpha = logoOpacity;

				// container.addChild(logo);
			}

			$('body').append('<div class="widthTester" style="position:absolute;display:none;font-size:10px;font-family: Arial;font-weight:bold;"></div><div class="preWidthTester" style="position:absolute;display:none;font-size:25px;font-family: Arial;font-weight:bold;"></div>');

			fetch(url, function(match) {

				_match = match;

				Gamecast._match = _match;

				if (Gamecast.langId == "es") {
					$('.gamecastKey').html($('.gamecastKey').html().replace('Shot', 'Disparo').replace('Goal', 'Gol'));
				}

				if (window.country == 'united states') {
					
					$('.videoIcon').css('display', 'inline');

					$('.tabs.rounded li:first a').click(function(){
						$('.closeWatch').trigger('click');
					});

					$('.tabs.rounded li:last a').click(function(){
						if(!Gamecast._playedAd){

							if(Gamecast._videoInit){
								insertAdCode();
							}else{
								espn.video.subscribe('espn.video.init', function() {
									insertAdCode();
								});
							}
						}
					});

					espn.video.subscribe('espn.video.init', function() {
						Gamecast._videoInit = true;
					});

					espn.video.subscribe('espn.video.complete', function() {
						if ($('.videoplayer').height() == 374) {
							$('.closeWatch').trigger('click');
						}
					});

				}

				var filtered = game.extendDeep(match);
				var penalties = filterSection(match.set, function(play) {
					if (play.shootout == 't') {
						return true;
					}
				});
				if (penalties.length) {
					Gamecast.Field.renderPenalties();
				} else if (!penalties.length && Gamecast._match.gameStatus == "SHOOTOUT") {
					renderPenalties(1);
				} else {
					filtered.set = filterSection(match.set, function(play) {
						if (play.shootout == 'f') {
							return true;
						}
					});
					renderViewport(filtered);
				}

				if (typeof callback == 'function') {
					callback(match, stage);
				}

				buildNavs(penalties.length);

			}, config.xdomain);

		}

		function insertAdCode(){
			$('.videoplayer').css({'height':'374px','zIndex':10});
			var adParams = {
			 'adUnit': "Pre-Roll",
			 'maxDuration': 60,
			 'midSequence': 0,
			 'minDuration': 60,
			 'siteSection': "espnfc:gamecast:soccer",
			 'videoID': "espnfc:gamecast:soccer"
			};

			espn.video.insertAd(adParams);

			$('.closeWatch').show();
			Gamecast._playedAd = true;
		}

		function fetch(url, callback, xdomain) {
			game.get(url, function(data) {
				if (xdomain) {
					//Get the results from YQL
					// data = data.firstChild || data;
				}
				buildDataSet(data, callback);
			}, xdomain)
		}

		function buildDataSet(data, callback) {

			var plays = $('play', data),
				play, i, len, j, length, parts, part, obj, partObj, array, set = [],
				home, away, match = {},
				entry, temp, cur, grid, player, gridMax, optionsNode, options = [],
				option, max, subNav, subNavOpts, homeColor, awayColor;

			homeColor = /*game.rgb2hex($('.country h2:first').css('color')) ||*/ $('home',data).attr('color');
			
			awayColor = /*game.rgb2hex($('.country h2:last').css('color')) ||*/ $('away',data).attr('color');	

			home = {
				id: $('home', data).attr('id'),
				name: $('home', data).text(),
				color: /*'2b579e'*/ homeColor
			};

			match.home = home;

			away = {
				id: $('away', data).attr('id'),
				name: $('away', data).text(),
				color: /*'da2932'*/ awayColor
			};

			match.away = away;

			match.homeScore = $('homeScore', data).text();

			match.awayScore = $('awayScore', data).text();

			match.clock = $('clock', data).text();

			match.period = $('period', data).text();

			match.gameStatus = $('gameStatus', data).text();

			match.gameStatusText = $('gameStatusText', data).text();

			match.pregameWhen = $('pregameWhen', data).text();

			optionsNode = $('option', data);

			for (i = 0, len = optionsNode.length; i < len; i++) {
				option = $(optionsNode[i]);
				subNav = $('subNav', option).children();
				subNavOpts = [];
				for (j = 0, max = subNav.length; j < max; j++) {
					temp = {};
					temp[subNav[j].nodeName] = $(subNav[j]).text();
					subNavOpts.push(temp);
				}
				options.push({
					id: option.attr('id'),
					label: $('>label', option).text(),
					subNav: subNavOpts
				});
			}

			match.options = options;

			for (i = 0, len = plays.length; i < len; i++) {

				play = $(plays[i]);

				obj = {
					id: play.attr('id'),
					clock: play.attr('clock'),
					addedTime: play.attr('addedTime'),
					period: play.attr('period'),
					startX: play.attr('startX'),
					startY: play.attr('startY'),
					teamId: play.attr('teamId'),
					goal: play.attr('goal'),
					ownGoal: play.attr('ownGoal'),
					videoId: play.attr('videoId'),
					shootout: play.attr('shootout'),
					player: $('>player', play).text(),
					result: $('>result', play).text(),
					shotbytext: $('shotbytext', play).text(),
					topscoretext: $('topscoretext', play).text()
				};

				parts = $('part', play);

				array = [];

				for (j = 0, length = parts.length; j < length; j++) {
					part = $(parts[j]);

					partObj = {
						pId: part.attr('pId'),
						jersey: part.attr('jersey'),
						startX: part.attr('startX'),
						startY: part.attr('startY'),
						endX: part.attr('endX'),
						endY: part.attr('endY'),
						endZ: part.attr('endZ'),
						player: $('player', part).text(),
						result: $('result', part).text(),
						resulttext: part.children('resulttext').text()
					}
					array.push(partObj)
				}
				obj.parts = array;
				set.push(obj);
				match.set = set;
			}

			match.set = match.set || [];

			entry = $('entry', data);

			array = [];
			
			var gridsVailable = false;
			var tactAvailable = false;
			match.heatMapEnabled = false;
			match.tacticalEnabled = false;

			for (i = 0, len = entry.length; i < len; i++) {
				cur = $(entry[i]);
				grid = $('grid', cur).text();
				gridMax = $('grid', cur).attr('max')
				cur.children().remove();
				player = cur.text();

				temp = {
					player: player,
					grid: grid,
					gridMax: gridMax,
					jersey: cur.attr('jersey'),
					avgX: cur.attr('avgX'),
					avgY: cur.attr('avgY'),
					posX: cur.attr('posX'),
					posY: cur.attr('posY'),
					left: cur.attr('left'),
					middle: cur.attr('middle'),
					right: cur.attr('right'),
					playerId: cur.attr('playerId'),
					teamId: cur.attr('teamId'),
					position: cur.attr('position')
				}
				array.push(temp);
				
				if(grid.length){
					gridsVailable = true;
				}
				
				if(parseFloat(temp.posX) > 0 && parseFloat(temp.posY) > 0){
					tactAvailable = true;
				}
			}
			
			if(gridsVailable){
				match.heatMapEnabled = true;
			}

			if(tactAvailable){
				match.tacticalEnabled = true;
			}

			match.attack = array;

			if (typeof callback == 'function') {
				callback(match);
			}
		}

		function getLocalizedLabel(label) {
			for (var i = 0, max = _match.options.length; i < max; i++) {
				var option = _match.options[i];
				if (option.id == label) {
					return option.label;
				}
				for (var j = 0, len = option.subNav.length; j < len; j++) {
					if (option.subNav[j][label]) {
						return option.subNav[j][label]
					}
				}
			}
		}

		function buildNavs(pens) {

			$('li[data-div=filterShots]').text(getLocalizedLabel('shots'));

			$('li[data-div=filterGoals]').text(getLocalizedLabel('goals'));

			$('li[data-div=showTacticalInformation]').text(getLocalizedLabel('tactical'));
			
			if(!_match.tacticalEnabled){
				$('li[data-div=showTacticalInformation]').hide();				
			}

			$('li[data-div=showHeatMaps]').text(getLocalizedLabel('heatMap'));
			
			if(!_match.heatMapEnabled){
				$('li[data-div=showHeatMaps]').hide();
			}

			$('li[class^=reset]').text(getLocalizedLabel('total'));

			$('li[class^=firstHalf]').text(getLocalizedLabel('firstHalf'));

			$('li[class^=secondHalf]').text(getLocalizedLabel('secondHalf'));

			$('li[class^=extra]').text(getLocalizedLabel('extra'));

			$('li[class^=showPenalties]').text(getLocalizedLabel('penalty'));

			if (pens) {
				$('li[class^=showPenalties]').addClass('appliedFilter');
			} else {
				$('.filterShots li:first-child').addClass('appliedFilter')
			}

			$('td:contains("Start Position")').text(getLocalizedLabel("startFormation"));

			$('td:contains("Average Position")').text(getLocalizedLabel("avgFormation"));

			$('td:contains("COMPLETE TEAM")').text(game.getLocalizedText(game.language, 'COMPLETE TEAM'))
		}

		function updateHeatMap(attack, x, y) {
			var emptyGrid = "0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~";
			var grid;

			//Heatmap cal;
			if (!attack.grid) {
				grid = emptyGrid;
			} else {
				grid = attack.grid;
			}
			var pos = getUpdatePosition(x, y);

			if (pos >= 0 && pos <= 704) {
				var gridArray = grid.split('~');
				var updateNode = parseInt(gridArray[pos]);

				updateNode = parseInt(updateNode) + 1;

				gridArray[pos] = updateNode;

				//TODO: update team map;
				attack.gridMax = maxInArray(gridArray);

				if (_match.attack[0].teamId == attack.teamId) {
					updateCompleteTeam(_match.attack[0], pos)
				} else {
					updateCompleteTeam(_match.attack[1], pos)
				}

				attack.grid = gridArray.join('~');

				addAttack(attack);

				return true;
			}

		}

		function updateCompleteTeam(attack, pos) {
			var emptyGrid = "0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~";
			var grid;
			var gridArray;

			if (!attack.grid) {
				grid = emptyGrid;
			} else {
				grid = attack.grid;
			}

			gridArray = grid.split('~');

			var updateNode = gridArray[pos];

			attack.gridMax = maxInArray(gridArray);

			updateNode = parseInt(updateNode) + 1;

			gridArray[pos] = updateNode;

			attack.grid = gridArray.join('~');

			addAttack(attack, 1);

			return true;
		}

		function maxInArray(arr) {
			var max = 0;
			for (var i = 0, len = arr.length; i < len; i++) {
				if (parseInt(arr[i]) > max) {
					max = arr[i];
				}
			}
			return max;
		}

		function getUpdatePosition(x, y) {
			x = x || 1;
			y = y || 1;

			var height = (374 - 19);
			var blockHeight = (374 - (19 * 2)) / 22;
			var t = y * (374 - (19 * 2)) + 19;

			var width = (585 - 34);
			var blockWidth = (585 - (34 * 2)) / 32;
			var left = x * (585 - (34 * 2)) + 34;

			var xPos, yPos;

			for (var i = 1; i <= 32; i++) {
				var prev = (i - 1 < 0) ? 0 : i - 1;
				if ((blockWidth * i) + 34 >= left && (blockWidth * prev) + 34 <= left) {
					xPos = i;
					break;
				}
			}

			if (x <= 0) {
				xPos = 1;
			}

			for (var i = 1; i <= 22; i++) {
				var prev = (i - 1 < 0) ? 0 : i - 1;
				if ((blockHeight * i) + 19 >= t && (blockHeight * prev) + 19 <= t) {
					yPos = i;
					break;
				}
			}

			if (y <= 0) {
				yPos = 1
			}

			var endPos = ((22 - yPos) * 32) + xPos;

			return endPos;
		}

		function addPlay(play, sNode) {
			var set = _match.set;
			for (var i = 0, len = set.length; i < len; i++) {
				var cur = set[i];
				if (parseInt(cur.id) == parseInt(play.id)) {
					//has updated passes already, skip
					if (sNode && cur.parts.length && cur.videoId) {
						return false;
					}
					set[i] = play;
					var videoId = cur.videoId;
					if (videoId) {
						set[i].videoId = videoId;
					}
					return false;
				}
			}
			return _match.set.push(play);
		}

		function removePlay(id) {
			var set = _match.set;
			for (var i = 0, len = set.length; i < len; i++) {
				var cur = set[i];
				if (parseInt(cur.id) == parseInt(id)) {
					var arr = game.removeElementFromArray(set, cur);
					_match.set = arr;
					//check this
					return true;
				}
			}
			return false;
		}

		function addAttack(obj, team) {
			var attack = _match.attack;
			for (var i = 0, len = attack.length; i < len; i++) {
				var cur = attack[i];
				if (team) {
					if (parseInt(cur.teamId) == parseInt(obj.teamId)) {
						attack[i] = obj;
						return false;
					}
				} else {
					if (parseInt(cur.playerId) == parseInt(obj.playerId)) {
						attack[i] = obj;
						return false;
					}
				}
			}
			_match.attack.push(attack);
		}

		function updateScores(homeScore, awayScore) {
			_match.homeScore = homeScore;
			_match.awayScore = awayScore;
		}

		function updateClock(clock) {
			_match.clock = clock;
		}

		function updateGameStatus(gameStatus) {
			_match.gameStatus = gameStatus;
		}

		function updateGameStatusText(gameStatusText) {
			_match.gameStatusText = gameStatusText;
		}

		function clearViewport() {
			// Clear container, only retain the background - child at 0 is background image
			shotsHolder.remove();
		}

		/*
		 *	@param {object} grid
		 *	@return void
		 */

		function renderHeatMap(gridMap) {

			var i, len, cur, row, col, player, x, y, width, height,
				color, value;

			stopAnimation();

			clearViewport();

			Gamecast._isPlaying = false;

			$('.' + baseConfig.classNames.perspective_container).hide();

			width = (baseConfig.width - (baseConfig.leftGutter * 2)) / 32;
			height = (baseConfig.height - (baseConfig.topMargin * 2)) / 22;

			for (i = 0, len = gridMap.length; i < len; i++) {
				value = gridMap[i];
				color = ((value * 40) <= 100) ? value * 40 : 100;
				color = game.getColorPercent(baseConfig.colors.heatMap.start, baseConfig.colors.heatMap.end, color);
				if (value > 0) {
					cur = i + 1;
					row = Math.ceil(cur / 32);
					col = cur - (Math.floor(cur / 32) * 32) || 32
					x = (col * width) - width + baseConfig.leftGutter;
					y = baseConfig.height - (height * row) - baseConfig.topMargin;

					var circle = fieldPaper.rect(x,y,width+1,height+1,8).attr({fill:color,"stroke-opacity":0,opacity:0.7});

					shotsHolder.push(circle);
				}
			}
		}

		function getGrid(attacks, id, isTeam) {
			var i, len, attack;

			for (i = 0, len = attacks.length; i < len; i++) {
				attack = attacks[i];
				if ((isTeam && (attack.teamId == id)) || attack.playerId == id) {
					return attack.grid.split('~');
				}
			}
			return null;
		}

		/*
		 * @param {array} attacks
		 * @param {function} filter
		 */

		function getPlayers(attacks, filter) {
			var i, len, attack, players = {},
				filter = filter ||
			function() {
				return true
			};

			for (i = 0, len = attacks.length; i < len; i++) {
				attack = attacks[i];
				if (typeof players[attack.teamId] != 'object') {
					players[attack.teamId] = [];
				}
				//Filter complete teams
				if (attack.playerId != -1 && (filter && filter(attack))) {
					players[attack.teamId].push({
						id: attack.playerId,
						name: attack.player,
						position: attack.position
					});
				}
			}

			return players;
		}

		function renderTacticalInformation(teamId, position) {

			var attack, posX, posY, left, top, player, text, match = _match,
				color;

			stopAnimation();

			Gamecast._isPlaying = false;

			$('.' + baseConfig.classNames.perspective_container).hide();

			for (var i = 0, len = match.attack.length; i < len; i++) {
				attack = match.attack[i];
				posX = attack.posX;
				posY = attack.posY;
				color = (match.home.id == attack.teamId) ? '#' + match.home.color : '#' + match.away.color;

				if (position == 'average') {
					posX = attack.avgX;
					posY = attack.avgY;
				}

				if (!(posX == 0 && posY == 0) && attack.jersey) {

					if (teamId && attack.teamId == teamId) {
						left = posX * baseConfig.width;

						//Move players inside the canvas to prevent them getting clipped
						if (posX == 1) {
							left = baseConfig.width - 10 - baseConfig.leftGutter;
						} else if (posX == 0) {
							left = 10 + baseConfig.leftGutter;
						}

						top = posY * baseConfig.height;

						if (posY == 0) {
							top = 10;
						} else if (posY == 1) {
							top = baseConfi.height - 10;
						}

						var circle = fieldPaper.rect(left-9,top-9,baseConfig.roundLabelWidth,baseConfig.roundLabelHeight,baseConfig.roundLabelRadius).attr({fill:color,"stroke-opacity":0,cursor:"pointer",info: "<b>" + attack.player + "</b><br>" + attack.position, color: color});

						var circleShadow = circle.glow({ width:1, opacity:0.13, offsetx: 2, offsety: 2, fill: true, color : "#333"});

						var text = fieldPaper.text(left+1,top+2,attack.jersey).attr({fill:"#fff",cursor:"pointer"});

						circle.hover(showLabel,hideLabel);

						text.hover(showLabel,hideLabel);

						shotsHolder.push(circle,circleShadow,text);
					}
				}
			}
		}

		function renderViewport(match) {

			var match = match || _match,
				parts, part, i, len, left, top, id, obj = match.set,
				color,
				isGoal, player, status, logo, bg, playerBg, coords, playArrow;

			if (match.gameStatus == "SCHEDULED" && match.pregameWhen) {

				var localTime = $.trim($(".game-status").contents().filter(function(){return(this.nodeType==3);}).text()) || $.trim($('.match-details span').contents().filter(function(){ return(this.nodeType == 3); }).text().replace('*',''));
				var localTimeArray = localTime && localTime.split(' ');
				var localTimeString;

				if (localTimeArray.length == 2) {
					localTimeString = 'Game starts on ' + localTimeArray[0] + ' at ' + localTimeArray[1];
					if (Gamecast.langId == "es") {
						localTimeString = 'El partido inicia en ' + localTimeArray[0] + ' a las ' + localTimeArray[1];
					}
				} else {
					localTimeString = match.pregameWhen
				}

				var _matchStatus = fieldPaper.text(-100,-65,localTimeString).attr({"font-size":"25px",stroke:"#fff",fill:"#fff",
				"font-family": "Arial, Helvetica, sans-serif","text-anchor":"start"});

				var homeTeam = fieldPaper.text(50,330,match.home.name.toUpperCase()).attr({"text-anchor":"start",fill:"#fff","font-size":"13px"});

				var awayTeam = fieldPaper.text(535,330,match.away.name.toUpperCase()).attr({"text-anchor":"end",fill:"#fff","font-size":"13px"});

				// var _w = (_matchStatus[0].offsetWidth > _matchStatus.getBBox().width ) ? _matchStatus[0].offsetWidth : _matchStatus.getBBox().width ;

				var _w = $('.preWidthTester').text(localTimeString).outerWidth();

				var statusBg = fieldPaper.rect((baseConfig.width / 2 - _w / 2 - 10), 43, _w + 22, 40, 4).attr({opacity:0.7,fill:"#111","stroke-opacity":0});
				
				var matchStatus = fieldPaper.text((baseConfig.width / 2),65,localTimeString).attr({"font-size":"25px",stroke:"#fff",fill:"#fff"}).toFront();
				
				shotsHolder.push(matchStatus,homeTeam,awayTeam,statusBg);

				Gamecast.started = false;
			} else {

				Gamecast.started = true;

				// activateFilters();
				clearViewport();

				stopAnimation();

				renderViewport.cache = {};

				$('.' + baseConfig.classNames.perspective_container).hide();

				for (i = 0, len = obj && obj.length; i < len; i++) {

					parts = obj[i].parts;

					color = (match.home.id == obj[i].teamId) ? '#' + match.home.color : '#' + match.away.color;

					isGoal = (obj[i].goal == 't');

					if (parts.length > 0) {

						//Last Player position
						part = parts[parts.length - 1];
						id = obj[i].id;

						left = part.startX * (baseConfig.width - (baseConfig.leftGutter * 2)) + baseConfig.leftGutter;
						top = part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin;

						coords = left + '|' + top;

						if (!renderViewport.cache[coords]) {
							renderViewport.cache[coords] = 0;
							renderViewport.cache[coords]++;
						} else {
							renderViewport.cache[coords]++;
						}

						if (renderViewport.cache[coords] > 1) {
							left = left + (renderViewport.cache[coords] - 1) * 3;
							top = top + (renderViewport.cache[coords] - 1) * 3;
						}

						var attr = {stroke:color,"stroke-width":2,"cursor": "pointer", "info" : obj[i].result,"color": color};

						if(isGoal) attr.fill = color;

						var circle = fieldPaper.circle(left,top,isGoal ? baseConfig.goalsRadius : baseConfig.shotsRadius).attr(attr);

						var circleShadow = circle.glow({ width:1, opacity:0.13, offsetx: 2, offsety: 2, fill: true, color : color, "info" : obj[i].result, "cursor": "pointer"});

						circle.hover(showLabel,hideLabel);

						circleShadow.hover(showLabel,hideLabel);

						shotsHolder.push(circle,circleShadow);

						if (obj[i].videoId && window.country == 'united states') {

							var playArrow = fieldPaper.triangle(left - 1.5, top-1.5, 5).toFront().attr({
								fill: "#fff",
								"stroke-opacity": 0,
								"cursor" : "pointer",
								"info" : obj[i].result,
								"color" : color
							}).rotate(90);

							playArrow.hover(showLabel,hideLabel);

							shotsHolder.push(playArrow);

							(function(videoId) {
								//TODO : add video function
								playArrow.click(function() {
									playWatch(videoId);
								});

								circle.click(function() {
									playWatch(videoId);
								});

								circleShadow.click(function() {
									playWatch(videoId);
								});

							})(obj[i].videoId)

						}else{

							(function(id){
								circle.click(function(){
									var play = filterPlay(obj, parseInt(id));
									if (play) {
										renderPlay(play);
									}
								});

								circleShadow.click(function(){
									var play = filterPlay(obj, parseInt(id));
									if (play) {
										renderPlay(play);
									}
								});	
							})(id);
						}
					}
				}
			}
		}

		function showLabel(){
			var offset = $('#gcFieldVector').position(),
				popup = $('.' + baseConfig.classNames.popup);

			popup.html(this.attrs.info);
			popup.css({
				left: (this.attrs.cx || this.attrs.x) + offset.left - (popup.outerWidth() / 2),
				top: (this.attrs.cy || this.attrs.y) + offset.top - popup.outerHeight() - 10
			}).fadeIn('fast');
			if (this.attrs.color) {
				$('b', popup).css('color', this.attrs.color);
			}
			window.setTimeout(function(){
				if(popup.is(":visible")){
					popup.hide();
				}
			},4000)
		}

		function hideLabel(){
			var popup = $('.' + baseConfig.classNames.popup);
			popup.hide();
		}

		function playWatch(id, playId) {
			//TODO : update test case
			var id = parseInt(id) || '100494'
			var canvas = $('#gcFieldVector');
			$('.videoplayer').height('374px').css('zIndex',10);

			stopAnimation();

			$('.playerList, .tactList').slideUp();

			$('.selectedPlayerMap').hide();

			$('.' + baseConfig.classNames.perspective_container).hide();

			if (!playWatch.embeded) {
				var position = canvas.position();
				$('.videoplayer').css({
					top: position.top,
					left: position.left
				});
				playWatch.embeded = true;
			}

			var opts = {'endCard': "false", 'cms': 'intl'};

			if(Gamecast.sessionId == 'uefa.euro-gp10' && Gamecast.season == "2012"){
				//videos for euros come from ESPN cms
				opts.cms = 'espn';
			}

			espn.video.play(id,opts);

			// Hotfix to switch videos (Needs to be fixed in the video lib)
			document.getElementById("videoPlayer").setEmbedCode(document.getElementById("videoPlayer").getEmbedCode());
			
			if(playId){
				lastVideoPlayed = parseInt(playId);
			}

			canvas.css('visibility', 'hidden');
			Gamecast.Field.clearViewport();
			$('.closeWatch').show();
		}

		function activateFilters() {
			var filters = $('.gamecastFilters');
			if (!filters.hasClass('activeGame') || filters.hasClass('inactiveGame')) {
				filters.addClass('activeGame');
				filters.removeClass('inactiveGame');
			}
			return true;
		}

		function renderPenalties(start, playLast, playedId, update) {

			var match = _match,
				filtered = {},
				parts, part, i, len, id, obj, color,
				isGoal, player, isHome, homeCount = 0,
				awayCount = 0,
				max, playerBg;

			stopAnimation();

			if (!update) {

				clearViewport();
			}

			var goalBg = fieldPaper.image(daddyUrl + 'goal-bg7b.jpg',0,0,584,374);

			shotsHolder.push(goalBg).toFront();			

			filtered.set = filterSection(match.set, function(play) {
				if (play.shootout == 't') {
					return true;
				}
			});

			obj = filtered.set;

			var fontAttr = {"text-anchor":"end",stroke:"#fff","font-family":'bold 12px Arial',"font-size":"12px"};

			var awayName = fieldPaper.text((baseConfig.width + 5 - baseConfig.leftGutter) - (awayCount * 20),baseConfig.height - 75,match.away.name.toUpperCase()).attr(fontAttr);

			fontAttr["text-anchor"] = "start";

			var homeName = fieldPaper.text((homeCount * 20) - 8 + baseConfig.leftGutter,baseConfig.height - 75,match.home.name.toUpperCase()).attr(fontAttr);

			shotsHolder.push(awayName,homeName);

			for (i = 0, len = obj && obj.length; i < len; i++) {

				isHome = (match.home.id == obj[i].teamId);

				parts = obj[i].parts;

				color = isHome ? '#' + match.home.color : '#' + match.away.color;

				isGoal = (obj[i].goal == 't');

				if (isHome) {
					homeCount++
					var row = (homeCount > 13) ? 2 : 1;
					var count = (homeCount > 13) ? homeCount - 13 : homeCount;
				} else {
					awayCount++
					var row = (awayCount > 13) ? 2 : 1;
					var count = (awayCount > 13) ? awayCount - 13 : awayCount;
				}

				if (parts.length > 0) {

					//Last Player position
					part = parts[parts.length - 1];
					id = obj[i].id;

					var attr = {stroke:color,"stroke-width":2,fill:"transparent","cursor": "pointer","info" : obj[i].result, "color" : color};

					if(isGoal) attr.fill = color;

					var circle = fieldPaper.circle(isHome ? (count * 20) - 20 + baseConfig.leftGutter : (baseConfig.width + 20 - baseConfig.leftGutter) - (count * 20),baseConfig.height - (55 * ((row == 2) ? 0.5 : row)),isGoal ? baseConfig.goalsRadius : baseConfig.shotsRadius).attr(attr);

					var circleShadow = circle.glow({ width:1, opacity:0.13, offsetx: 2, offsety: 2, fill: true, color : "#333"});

					circle.hover(showLabel,hideLabel);

					shotsHolder.push(circle,circleShadow);					

					(function(i) {

						if (obj[i].videoId && window.country == 'united states') {
							var videoId = obj[i].videoId;

							var playArrow = fieldPaper.triangle(isHome ? (count * 20) - 20 + baseConfig.leftGutter : (baseConfig.width + 20 - baseConfig.leftGutter) - (count * 20) - 1, baseConfig.height - (55 * ((row == 2) ? 0.5 : row)) -2, 5).toFront().attr({
								fill: "#fff",
								"stroke-opacity": 0,
								"cursor" : "pointer",
								"info" : obj[i].result,
								"color" : color
							}).rotate(90);

							playArrow.hover(showLabel,hideLabel);

							shotsHolder.push(playArrow);

							if (videoId) {

								playArrow.click(function(){
									playWatch(obj[i].videoId, obj[i].id);
								});

								circle.click(function(){
									playWatch(obj[i].videoId, obj[i].id);
								});

							}
						}else{
							circle.click(function(){
								renderPlay(String(obj[i].id), true);
							})
						}

					})(i)


					if (update) {
						playedId = renderPenalties.lastShot;
					}

					if ((playedId == parseInt(id) && !lastVideoPlayed) || (lastVideoPlayed == parseInt(id)) || (!renderPenalties.lastShot && i + 1 == len && !update)) {

						var circle = fieldPaper.circle(isHome ? (count * 20) - 20 + baseConfig.leftGutter : (baseConfig.width + 20 - baseConfig.leftGutter) - (count * 20),baseConfig.height - (55 * ((row == 2) ? 0.5 : row)),11).attr({ "stroke-width" : "1px", stroke: color});

						shotsHolder.push(circle);

						if (playLast) {
							renderPlay(String(id), true);
						}
						renderPenalties.lastShot = id;
						lastVideoPlayed = null;
					}
				}
			}

			var penalties = filterSection(_match.set, function(play) {
				if (play.shootout == 't') {
					return true;
				}
			});

			if (start && !penalties.length) {
				renderEmptyPenaltyMarker({
					count: 0,
					home: true
				});
				renderEmptyPenaltyMarker({
					count: 0,
					home: false
				});
			}

			renderEmptyPenaltyMarker({
				count: homeCount,
				home: true
			});
			renderEmptyPenaltyMarker({
				count: awayCount,
				home: false
			});
		}

		function renderEmptyPenaltyMarker(options) {

			var home = options.home,
				color = home ? '#' + _match.home.color : '#' + _match.away.color,
				// color = baseConfig.colors.penalties.noshot,
				count = options.count,
				player, i, max;
			for (i = 0, max = (5 - count); i < max; i++) {

				var row = Math.ceil((i + 1 + options.count) / 13) || 1;

				var circle = fieldPaper.circle(home ? (++count * 20) - 20 + baseConfig.leftGutter : (baseConfig.width + 20 - baseConfig.leftGutter) - (++count * 20),baseConfig.height - (55 * ((row == 2) ? 0.5 : row)),10).attr({ "stroke-opacity" : 0, fill: color,opacity:0.3});

				if (count == 13) {
					// reset row
					count = 0;
				}

				shotsHolder.push(circle);
			}
			return true;
		}

		function filterGoals(obj) {

			var i, len, play, set = [];

			for (i = 0, len = obj && obj.length; i < len; i++) {
				play = obj[i];
				if (play.goal == 't') {
					set.push(play);
				}
			}
			return set;
		}

		function getGoals(side) {

			var i, len, set, goals = {},
				teamId, team, isHome, match = _match,
				temp, key;

			set = filterGoals(match.set);

			for (i = 0, len = set.length; i < len; i++) {
				teamId = set[i].teamId;
				isHome = (match.home.id == teamId) ? 'home' : 'away';
				team = isHome ? match.home.name : match.away.name;
				key = side ? isHome : team;
				if (!goals[key]) {
					goals[key] = [];
				}
				goals[key].push({
					player: set[i].player,
					clock: set[i].clock,
					shootout: set[i].shootout
				})
			}

			return goals;
		}

		function getTeams() {
			return {
				home: {
					id: _match.home.id,
					name: _match.home.name,
					color: '#' + _match.home.color
				},
				away: {
					id: _match.away.id,
					name: _match.away.name,
					color: '#' + _match.away.color
				}
			}
		}

		function filterSection(obj, filter) {
			var i, len, play, set = [],
				filter = filter ||
			function() {
				return true;
			};

			for (i = 0, len = obj && obj.length; i < len; i++) {
				play = obj[i];
				if (filter && filter(play)) {
					set.push(play);
				}
			}
			return set;
		}

		function filterPlay(obj, id) {

			var i, len, play;

			for (i = 0, len = obj.length; i < len; i++) {
				play = obj[i];
				if (play.id == id) {
					return play;
				}
			}
			return null;
		}

		Gamecast.Modules.Soccer.Field.renderPlay = renderPlay;

		function animate(part, isHome) {

			var txt = part.resulttext,
				player = part.player,
				bottom = (part.endZ * 154) + 130,
				bottom = (bottom > 350) ? 350 : bottom,
				//bring inside the viewport
				endY = part.endY,
				y, left, prevLeft, prevY, me = $('.' + baseConfig.classNames.fieldClone);
			Gamecast._isPlaying = true;

			// if(!overlayIsSet){
			// overlap the anim on canvas
			var animTop = $('#gcFieldVector').position().top;
			var animLeft = $('#gcFieldVector').position().left;
			$('.goalAnimation').css({'left': animLeft,'top': animTop + 'px', zIndex: 10, height: 374});
			overlayIsSet = true;
			// }

			// $('#gcFieldVector').css('visibility','hidden');

			if (isHome) {
				y = endY;
				prevY = part.y;
			} else {
				y = (374 - endY);
				prevY = (374 - part.y);
			}

			left = y - 187; //187 = 374/2
			prevLeft = prevY - 187;
			left = left * 10.10; //10.10 = scale
			prevLeft = prevLeft * 10.10;
			left = left + 292.5 - 52; //292 = 585/2, (zoom goal center line), 51 is dist between edge of image and goal post
			prevLeft = prevLeft + 292.5 - 52;

			$('.' + baseConfig.classNames.ball_front).css({
				bottom: '-70px',
				left: prevLeft || '275px',
				height: '52px',
				width: '52px'
			}).attr('src', baseConfig.images.ball);

			// txt = (part.goal == "t") ? txt += '!!!' : txt;
			$('.' + baseConfig.classNames.perspective_container).fadeIn('fast');

			$('.' + baseConfig.classNames.anim_1 + ', .' + baseConfig.classNames.anim_2).hide();

			setTimeout(function() {
				$('.' + baseConfig.classNames.anim_1).fadeIn('fast');
			}, 350);

			setTimeout(function() {
				$('.' + baseConfig.classNames.anim_2).fadeIn('slow').children().html((Gamecast.langId == "es" ? 'Disparo de ' : 'Shot by ') + player);
			}, 1500);

			setTimeout(function() {
				$('.' + baseConfig.classNames.ball_front).css({
					bottom: bottom,
					left: left,
					height: '26px',
					width: '26px'
				});
			}, 2700);

			setTimeout(function() {
				if (part.goal != "t") {
					$('.' + baseConfig.classNames.ball_front).attr('src', baseConfig.images.ballMiss);
				}
			}, 3400);

			setTimeout(function() {
				$('.' + baseConfig.classNames.anim_2).children().append("<br><br><br><div style='display:none'></div><b class='js-playResult' style='display:none'>" + txt + "</b>");
				$('.' + baseConfig.classNames.anim_2 + ' div').show().css('height', $('.anim-2 b').height());
				$('.' + baseConfig.classNames.anim_2 + ' b.js-playResult').fadeIn('slow');
			}, 3800);
			// return 0;
			setTimeout(function() {
				// $('.' + baseConfig.classNames.perspective_container).fadeOut('slow');
				Gamecast._isPlaying = false;

				if (part.shootout == "t") {
					renderPenalties(null, null, part.id);
					$('.appliedFilter').removeClass('appliedFilter');
					$('.showPenalties').addClass('appliedFilter');
					$('.' + baseConfig.classNames.perspective_container).css({
						overflow: 'hidden',
						height: '280px'
					});
				} else {
					$('.' + baseConfig.classNames.perspective_container).fadeOut('slow');
					$('li.appliedFilter').trigger('click');
					$('.' + baseConfig.classNames.perspective_container).css({
						overflow: 'auto',
						height: '374px'
					});
					// $('li[data-div=filterShots]').trigger('click');
				}

				if (Gamecast._queue.length) {
					for (var play; Gamecast._queue.length && (play = Gamecast._queue.shift());) {
						var id = play.id;
						var isShootout = play.isShootout;
						var shootoutInProgress = (Gamecast._match.gameStatus.toLowerCase().indexOf('shootout') != -1);
						var playShot = true;

						if (shootoutInProgress && !isShootout) {
							playShot = false;
						}

						if (!Gamecast._playedAnim[id]) {
							Gamecast._playedAnim[id] = 0;
						}

						if (Gamecast._playedAnim[id] < 1 && playShot) {
							renderPlay(String(id), isShootout);
							Gamecast._playedAnim[id] = Gamecast._playedAnim[id] + 1;
							return false;
						}
					}
				}
				// $('#gcFieldVector').css('visibility','visible');
			}, 6100);

		}

		/*
		 *	@param {Object} match
		 *	@param {array} play
		 */

		function renderPlay(play, anim) {

			play = (typeof play == 'string') ? filterPlay(_match.set, play) : play;
			var isHome = (_match.home.id == play.teamId) ? true : false;
			var match = _match,
				parts = play && play.parts,
				part, i, len, left, top, id = play && play.id,
				coords = [],
				color, player, ball;

			color = isHome ? '#' + _match.home.color : '#' + _match.away.color;

			$('.' + baseConfig.classNames.popup).hide();

			$('.' + baseConfig.classNames.perspective_container).hide();

			
			if(!anim){
				clearViewport();
			}

			for (i = 0, len = parts.length; i < len; i++) {
				part = parts[i];

				left = part.startX * (baseConfig.width - (baseConfig.leftGutter * 2)) + baseConfig.leftGutter;

				top = part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin;

				coords.push({
					id: play.id,
					videoId: play.videoId,
					shootout: play.shootout,
					goal: play.goal,
					player: part.player,
					resulttext: part.resulttext,
					result: part.result,
					x: part.startX * (baseConfig.width - (baseConfig.leftGutter * 2)) + baseConfig.leftGutter,
					y: part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin,
					endX: part.endX * (baseConfig.width - (baseConfig.leftGutter * 2)) + baseConfig.leftGutter,
					endY: part.endY * baseConfig.height,
					endZ: part.endZ
				});

				//Skip the player pointer if the next has same coords
				if (!((parseFloat(part.startX) == parseFloat(parts[i - 1] && parts[i - 1].startX)) && (parseFloat(parts[i - 1] && parts[i - 1].startY) == parseFloat(part.startY)))) {

					if(!anim){
						var circle = fieldPaper.circle(left,top,baseConfig.playerRadius).attr({fill:color,"stroke-opacity":0});

						shotsHolder.push(circle);						
					}
				}

				//Add ball and an event handler
				if (i == 0) {

					//Push the starting point
					coords.unshift({
						x: left,
						y: top,
						endX: part.endX * (baseConfig.width - (baseConfig.leftGutter * 2)) + baseConfig.leftGutter,
						endY: part.endY * baseConfig.height
					});

					if(!anim){
						var ballCircle = fieldPaper.circle(part.startX * (baseConfig.width - (baseConfig.leftGutter * 2)) + baseConfig.leftGutter,part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin,baseConfig.ballRadius).attr({fill:color,"stroke-width":2,"stroke":baseConfig.ball.colors.stroke});;

						shotsHolder.push(ballCircle);
					}
				}
			}

			if (anim) {
				animate(coords[1], isHome);

				return 0;
			} else {

				playParts(ballCircle, coords, play);
			}

		}

		/*
		 *	@return {Boolean} True if the animation was stopped
		 */

		function stopAnimation() {
			if (playParts._ball) {
				playParts._ball.stop();
				$('.' + baseConfig.classNames.popup).fadeOut('fast');
				return true;
			}
			return false;
		}

		function addCloseLink() {

			var closeBg = fieldPaper.rect((baseConfig.width / 2 - 28) + 2, 335, 60, 15, 4).attr({opacity:0.7, fill:"#111", "stroke-opacity": 0});

			var closeText = fieldPaper.text((baseConfig.width / 2 - 28) + 32,343,"CLOSE X").attr({stroke:"#fff","font-family" : "Arial", "font-size" : "9px", cursor: "pointer"});

			function onCloseClick(){
				stopAnimation();
				Gamecast._isPlaying = false;
				if ($('.showPenalties').hasClass('appliedFilter')) {
					renderPenalties();
				} else {
					$('li.appliedFilter').trigger('click');
					// $('li[data-div=filterShots]').trigger('click');
				}
			}

			closeText.click(onCloseClick);

			closeBg.click(onCloseClick);

			shotsHolder.push(closeText,closeBg);
		}

		/*
		 *	@param {object} match
		 *	@param {object} ball
		 *	@param {array} parts
		 *	@param {object} stage
		 *	@param {object} container
		 *	@return {object}
		 */

		function playParts(circle, parts, obj) {

			var i, len, pos, posEnd, part, path,
				ballTween, color, label, isHome;

			addCloseLink();

			isHome = (_match.home.id == obj.teamId);

			color = isHome ? '#' + _match.home.color : '#' + _match.away.color;

			playParts._ball = circle;

			stopAnimation();

			$('.' + baseConfig.classNames.fieldClone).hide();

			$('.playerList, .tactList').slideUp();

			$('.selectedPlayerMap').hide();

			Gamecast._isPlaying = true;

			var lastSegment = parts[parts.length-1];

			parts.shift();

			var shotPath = "M "+ parts[0].x + "," + parts[0].y + " ";

			(function baz(parts,end){

				var point = parts.shift();
				if(point){

					var px = point.x;
					var py = point.y;

					if(end){
						px = (!isNaN(point.endX)) ? point.endX : point.x; //point.endX;
						py = (!isNaN(point.endY)) ? point.endY : point.y;//point.endY;
					}

					circle.toFront().animate({cx:px, cy:py},(end ? 250 : 900),'linear',function(){ 

					if(!end){

						var offset = $('#gcFieldVector').position(),
							popup = $('.' + baseConfig.classNames.popup);

						popup.html(point.result);

						popup.css({
							left: px + offset.left - (popup.outerWidth() / 2),
							top: py + offset.top - popup.outerHeight() - 15
						}).fadeIn('fast');
						if (color) {
							$('b', popup).css('color', color);
						}
					}

					shotPath += "L" + px + "," + py;

					shotsHolder.push(fieldPaper.path(shotPath).attr({stroke:color,"stroke-width" :"2px"}));

						setTimeout(function(){
							if(parts.length){
								baz(parts);	
							}else{
								if(lastSegment){
									baz([lastSegment],true);
									lastSegment = null;
								}
							}
							if(end){
								animate(point, isHome);
							}
							$('.' + baseConfig.classNames.popup).fadeOut();
						},700);
					});	
				}
			}(parts));

			return {
				ballTween: ballTween
			}
		}

		function getPlayersSide(name) {
			var attack = _match && _match.attack;
			for (var i = 0, len = attack.length; i < len; i++) {
				if (attack[i].player.toLowerCase() == name.toLowerCase()) {
					return (parseInt(_match.home.id) == parseInt(attack[i].teamId)) ? 'home' : 'away';
				}
			}
			return null;
		}

		function getPlayerAttack(id) {
			var attack = _match && _match.attack;
			for (var i = 0, len = attack.length; i < len; i++) {
				if (parseInt(attack[i].playerId) == parseInt(id)) {
					return attack[i];
				}
			}
			return null;
		}

		/*
		 *	APIs
		 */
		game.Field = {
			init: init,
			filterPlay: filterPlay,
			renderPlay: renderPlay,
			renderTacticalInformation: renderTacticalInformation,
			filterSection: filterSection,
			renderViewport: renderViewport,
			renderPenalties: renderPenalties,
			filterGoals: filterGoals,
			getGoals: getGoals,
			getGrid: getGrid,
			getPlayers: getPlayers,
			getPlayersSide: getPlayersSide,
			getPlayerAttack: getPlayerAttack,
			updateHeatMap: updateHeatMap,
			renderHeatMap: renderHeatMap,
			stopAnimation: stopAnimation,
			getTeams: getTeams,
			addAttack: addAttack,
			addPlay: addPlay,
			removePlay: removePlay,
			updateScores: updateScores,
			updateClock: updateClock,
			updateGameStatusText: updateGameStatusText,
			updateGameStatus: updateGameStatus,
			clearViewport: clearViewport,
			playWatch: playWatch
		}
	}

	Gamecast.Modules.Soccer.Timeline = function(game) {

		var baseConfig = {
			canvas: 'gcTimelineCanvas',
			paper: 'gcTimelineVector',
			height: 100,
			width: 930,
			url: './data/timeline_2.xml',
			timebar: {
				height: 19,
				width: 900,
				leftPadding: 15
			},
			teams: {
				home: {
					topPadding: 17
				},
				away: {
					topPadding: 65
				}
			},
			popupPadding: 25,
			classNames: {
				timeline: 'gcTimeline',
				popup: 'timelinePopup',
				timebar: 'timebar'
			},
			colors: {
				controls: '#fff',
				background: '#fff',
				halfTime: {
					stroke: '#dbdbdb',
					shadow: '#555',
					background: '#dbdbdb',
					color: '#666'
				},
				fullTime: {
					stroke: '#111',
					background: '#333',
					color: '#fff'
				},
				eventShadow: '#555'
			},
			fonts: {
				fullTime: '10px Arial',
				teams: '15px Arial',
				axis: "12px Arial"
			},
			images: {
				axis: daddyUrl + 'timebar.jpg'
			}
		},
			_timelineData, _leftOffset = 0,
			timelinePaper = Raphael("gcTimelineVector", 970, 100),
			timelineAxis = timelinePaper.set(),
			axisSet = timelinePaper.set(),
			fullTime, fullTimeBg, fullTimeMarker, axisImage, leftArrow, rightArrow;

		/* Custom Attrs */

		timelinePaper.customAttributes.info = function(txt) {
			return txt
		};

		timelinePaper.customAttributes.side = function(txt) {
			return txt
		};

		timelinePaper.customAttributes.clock = function(txt) {
			return txt
		};

		timelinePaper.customAttributes.color = function(txt) {
			return txt
		};

		/*
		 *
		 */

		function init(callback) {

			var background, config = game.config && game.config.Timeline || {},
				url = config.url || baseConfig.url,
				label;


			fetch(url, function(data) {

				var data = buildDataSet(data),
					clock = parseInt(data.clock);

				_timelineData = data;

				Gamecast._timelineData = _timelineData;

				buildAxis(clock);

				renderTimeline();

				renderEvents(data.events, {
					home: "#" + data.home.color,
					away: "#" + data.away.color
				});

				setClockMarker({
					clock: clock,
					gameStatusText: data.gameStatusText,
					gameStatus: data.gameStatus
				});

			}, config.xdomain);

			if (typeof callback == 'function') {
				callback()
			}

		}

		function buildAxis(clock) {

			var i, len, background;

			for (i = 0, len = (clock < 90) ? 90 : clock; i < len; i = i + 5) {
				if (i > 0) {
					axisSet.push(timelinePaper.text((10 * i) + baseConfig.timebar.leftPadding, 56 - 3.5, i)).attr({
						// font: baseConfig.fonts.axis,
						"font-size": 12,
						"text-anchor": 'right',
						"font-weight": 'bold',
						"font-family": "Arial, Helvetica, sans-serif"
					})
				}
			}
			timelineAxis.push(axisSet);
		}

		function fetch(url, callback, xdomain) {
			game.get(url, function(data) {
				if (typeof callback == 'function') {
					callback(data);
				}
			}, xdomain)
		}

		function buildDataSet(data) {

			var home, away, events = [],
				clock, video, gameStatus, gameStatusText, obj, i, len, eventNode, eventNodes, eventObj, homeColor, awayColor;

			homeColor = /*game.rgb2hex($('.country h2:first').css('color')) ||*/ $('home',data).attr('color');

			awayColor = /*game.rgb2hex($('.country h2:last').css('color')) ||*/ $('away',data).attr('color');				

			home = {
				name: $('home', data).text(),
				color: /*'2b579e'*/ homeColor
			};
			away = {
				name: $('away', data).text(),
				color: /*'da2932'*/ awayColor
			};
			gameStatus = $('gameStatus', data).text();
			gameStatusText = $('gameStatusText', data).text();
			clock = $(data).attr('clock') || $('timeline', data).attr('clock');
			video = $(data).attr('videoEnabled') || $('timeline', data).attr('videoEnabled');
			eventNodes = $('event', data);

			for (i = 0, len = eventNodes.length; i < len; i++) {
				eventNode = $(eventNodes[i]);
				eventObj = {
					id: eventNode.attr('id'),
					clock: eventNode.attr('clock'),
					side: eventNode.attr('side'),
					type: eventNode.attr('type'),
					addedTime: eventNode.attr('addedTime'),
					videoId: eventNode.attr('videoId'),
					result: $('result', eventNode).text()
				}
				events.push(eventObj);
			}

			obj = {
				home: home,
				away: away,
				gameStatus: gameStatus,
				gameStatusText: gameStatusText,
				clock: clock,
				video: video,
				events: events
			};

			return obj;
		}

		function renderTimeline() {

			var data = _timelineData,
				halftimeLabel, halfTimeBg, fullTime, fullTimeBg, path;

			timelinePaper.rect(0,17,10,15).attr({fill:'#' + data.home.color,"stroke-opacity":0});

			timelinePaper.text(15, 25, $('<div>' + (data.home.name).toUpperCase() + '</div>').text()).attr({
				font: baseConfig.fonts.teams,
				fill:'#666',// '#' + data.home.color,
				"text-anchor": 'start',
				'font-weight':'bold',
				"font-family": "Arial, Helvetica, sans-serif"
			}).toBack();

			timelinePaper.rect(0,72,10,15).attr({fill:'#' + data.away.color,"stroke-opacity":0});

			timelinePaper.text(15, 80, $('<div>' + (data.away.name).toUpperCase() + '</div>').text()).attr({
				font: baseConfig.fonts.teams,
				fill: '#666',//'#' + data.away.color,
				"text-anchor": 'start',
				'font-weight':'bold',
				"font-family": "Arial, Helvetica, sans-serif"
			}).toBack();

			path = timelinePaper.path("M" + (baseConfig.width / 2 + 1) + " 0L" + (baseConfig.width / 2 + 1) + " 100").attr({
				stroke: baseConfig.colors.halfTime.stroke,
				"stroke-width": "1px"
			}).toBack();
			// ("M" + ((45 * 10) + baseConfig.timebar.leftPadding + 1) + " 0L" + ((45 * 10) + baseConfig.timebar.leftPadding + 1) + " 100")
			timelineAxis.push(path);

			halftimeLabel = timelinePaper.text(-10, -20, "HALFTIME").attr({
				font: '9px Arial',
				fill: baseConfig.colors.halfTime.color,
				"text-anchor": 'start'
			}).toBack();

			halfTimeBg = timelinePaper.rect((45 * 10) - (43 / 2) + 7.5, 85, 15 + (43), 18, 3).attr({
				fill: baseConfig.colors.halfTime.background,
				"stroke-opacity": 0
			}).toBack();

			halftimeLabel = timelinePaper.text((baseConfig.width / 2 - 30) + 9, 94, "HALFTIME").attr({
				font: '9px Arial',
				fill: baseConfig.colors.halfTime.color,
				"text-anchor": 'start'
			});

			timelineAxis.push(halfTimeBg, halftimeLabel);

		}

		function flushAxisNumbers(){
			axisSet.remove();
			axisSet = timelinePaper.set();
		}

		function flushOldMarker() {

			if (fullTime) fullTime.remove();

			if (fullTimeBg) fullTimeBg.remove();

			if (fullTimeMarker) fullTimeMarker.remove();

			if (axisImage) axisImage.remove();

			if (leftArrow) leftArrow.remove();

			if (rightArrow) rightArrow.remove();
		}

		function removeChildObject(parent, childName) {
			for (var i = 0, max = parent.children.length; i < max; i++) {
				if (parent.children[i] && parent.children[i].name == childName) {
					parent.removeChildAt(i);
					return 1;
				}
			}
		}		

		function setClockMarker(marker) {

			var timeBar, background, clock = marker.clock,
				gameStatusText = marker.gameStatusText || _timelineData.gameStatusText,
				gameStatus = marker.gameStatus || _timelineData.gameStatus;

			flushOldMarker();

			timelineAxis.transform("t0,0");

			axisImage = timelinePaper.image(baseConfig.images.axis, ((clock * 10) - baseConfig.timebar.width + baseConfig.timebar.leftPadding) - 600, 42, 2450, 19).toBack();

			timelineAxis.push(axisImage);

			var label = timelinePaper.text(-10, -15, (gameStatus && gameStatus.indexOf("FINAL") != -1 || gameStatus && gameStatus == "HT") ? gameStatusText : clock + "'");

			fullTimeMarker = timelinePaper.path("M" + ((clock * 10) + baseConfig.timebar.leftPadding + 1) + " 0L" + ((clock * 10) + baseConfig.timebar.leftPadding + 1) + " 100").attr({
				stroke: baseConfig.colors.fullTime.stroke,
				"stroke-width": "1px"
			}).toFront();

			var _w = $('.widthTester').text((gameStatus && gameStatus.indexOf("FINAL") != -1 || gameStatus && gameStatus == "HT") ? gameStatusText : clock + "'").outerWidth();

			// var _w = (label[0].offsetWidth > label.getBBox().width ) ? label[0].offsetWidth : label.getBBox().width ;

			fullTimeBg = timelinePaper.rect((clock * 10) - (_w/2) - 2 + baseConfig.timebar.leftPadding, 2, (_w + 7), 18, 3).attr({
				fill: baseConfig.colors.fullTime.background,
				"stroke-opacity": 0
			});

			fullTime = timelinePaper.text((clock * 10) - (_w/2 ) + 2 + baseConfig.timebar.leftPadding, 12, (gameStatus && gameStatus.indexOf("FINAL") != -1 || gameStatus && gameStatus == "HT") ? gameStatusText : clock + "'").attr({
				fill: '#fff',
				"text-anchor": "start",
				"font-weight" : "bold"
			}).toFront();

			timelineAxis.push(fullTimeMarker, fullTime, fullTimeBg);

			function moveRight() {
				var leftOffset = -((clock * 10) - baseConfig.timebar.width)
				timelineAxis.animate({
					transform: "t" + leftOffset + ",0"
				}, '750', 'linear');
				leftArrow.attr({
					"fill-opacity": 0.9
				});
				rightArrow.attr({
					"fill-opacity": 0
				});
				_leftOffset = leftOffset;
			}

			function moveLeft() {
				timelineAxis.animate({
					transform: "t0,0"
				}, '750', 'linear')
				leftArrow.attr({
					"fill-opacity": 0
				});
				rightArrow.attr({
					"fill-opacity": 0.9
				});
				_leftOffset = 0;
			}

			if (clock > 90) {

				leftArrow = timelinePaper.triangle(40, 46, 11).attr({
					fill: "#fff",
					"fill-opacity": 0,
					"stroke-opacity": 0
				}).rotate(-90).click(moveLeft);

				rightArrow = timelinePaper.triangle(930, 46, 11).attr({
					fill: "#fff",
					"fill-opacity": 0.9,
					"stroke-opacity": 0
				}).rotate(90).click(moveRight);

				moveRight();
			}
		}

		function addEvent(eventObject) {
			_timelineData.events.push(eventObject);
		}

		function updateClock(clock) {
			_timelineData.clock = clock;
		}

		function updateGameStatusText(gameStatusText) {
			_timelineData.gameStatusText = gameStatusText;
		}

		function updateGameStatus(gameStatus) {
			_timelineData.gameStatus = gameStatus;
		}

		function renderEvents(events, colors) {

			var i, len, eventNode, y, x, type, color, isHome, events = events || _timelineData.events,
				colors = colors || {
					home: "#" + _timelineData.home.color,
					away: "#" + _timelineData.away.color
				};

			//flush cache
			Gamecast.Modules.Soccer.Timeline.renderedEvent['home'] = null;
			Gamecast.Modules.Soccer.Timeline.renderedEvent['away'] = null;

			for (i = 0, len = events.length; i < len; i++) {
				eventNode = events[i];
				isHome = (eventNode.side == 'home') ? true : false;
				y = isHome ? baseConfig.teams.home.topPadding : baseConfig.teams.away.topPadding;
				x = parseInt(eventNode.clock) * 10 + baseConfig.timebar.leftPadding - 7;
				type = eventNode.type;
				color = isHome ? colors.home : colors.away;
				eventNode.x = x;
				eventNode.y = y;
				eventNode.color = color;
				renderEvent(eventNode)
			}

		}

		/*
		 *	@param {object} eventNode
		 */

		function renderEvent(eventNode) {

			var text = eventNode.result,
				x = eventNode.x,
				y = eventNode.y,
				id = eventNode.id,
				type = eventNode.type,
				clock = eventNode.clock,
				count, image, renderedEvent, eventImg, pointer, pointerY, isAway = (eventNode.side == 'away') ? true : false,
				color = (isAway) ? _timelineData.away.color : _timelineData.home.color,
				lang = game.language || 'en';

			switch (type) {
			case 'goal':
				image = daddyUrl + 'goal.png';
				break;
			case 'substitution':
				image = daddyUrl + 'substitution_s.png';
				break;
			case 'yellowCard':
				image = daddyUrl + 'yellowCard_s.png';
				break;
			case 'redCard':
				image = daddyUrl + 'redCard_s.png';
				break;
			default:
				break;
			}

			renderedEvent = Gamecast.Modules.Soccer.Timeline.renderedEvent;

			if (!renderedEvent[eventNode.side]) {
				renderedEvent[eventNode.side] = {};
			}

			if (!renderedEvent[eventNode.side][clock]) {
				renderedEvent[eventNode.side][clock] = [];
			}

			renderedEvent[eventNode.side][clock].push(id);

			count = renderedEvent[eventNode.side][clock].length;

			x = x + (count * 5);

			y = isAway ? y + (count * 5) - 5 : y - (count * 5) + 5;

			if (count == 1) {
				pointerY = (isAway) ? y - 5 : y + 20;
				var attr = {
					fill: "#" + color,
					stroke: "#" + color,
					"stroke-opacity" : 0
				};
				var clockPointer;//timelinePaper.path("M" + (x+3-3) + "," + pointerY + "L"  + (x+3) + "," + (pointerY - 5) + ",L" + (x+3+3) + "," + pointerY + ",L" + (x+3-3) + "," + pointerY ).attr({fill:"#000"});

				if(!isAway){
					clockPointer = timelinePaper.path("M" + (x+3-3.5) + "," + pointerY + "L"  + (x+3) + "," + (pointerY + 7) + ",L" + (x+3+3.5) + "," + pointerY + ",L" + (x+3-3.5) + "," + pointerY ).attr({fill:"#" + color,"stroke-opacity" : 0});
				}else{
					clockPointer = timelinePaper.triangle(x + 3, pointerY, 7).attr(attr);
				}

				timelineAxis.push(clockPointer);
			}

			if (eventNode.videoId && window.country == 'united states') {

				var playX = x + 3 - 8 + 2;
				var playY = y + 5 - 16

				if (isAway) {
					playX = x - 1.5;
					playY = y + 17 + 4;
				}

				var playIcon = timelinePaper.image(daddyUrl + 'play_icon.png', playX, playY, 10, 10).attr({
					cursor: "pointer"
				});

				timelineAxis.push(playIcon);
			}

			if (isAway) {
				x = x + 1;
				y = y + 2;
			}

			var ev = timelinePaper.image(image, x - 5, y + 2, 16, 16).attr({
				color: "#" + color,
				info: text,
				clock: clock,
				side: eventNode.side
			}).hover(function() {
				var offset = $('#gcTimelineVector').position(),
					popup = $('.' + baseConfig.classNames.popup);
				popup.html(this.attrs.info).css({
					left: this.attrs.x + offset.left - (popup.outerWidth() / 2) + _leftOffset,
					top: this.attrs.y + offset.top - popup.outerHeight() - 10
				}).fadeIn('fast');
				if (this.attrs.color) {
					$('b', popup).css('color', this.attrs.color);
				}
			}, function() {
				var popup = $('.' + baseConfig.classNames.popup);
				popup.hide();
			});

			//TODO : add watch function
			if (playIcon) {

				ev.click(function() {
					if (!Gamecast._isPlaying) {
						Gamecast.Field.playWatch(eventNode.videoId);
					}
				})

				playIcon.click(function() {
					if (!Gamecast._isPlaying) {
						Gamecast.Field.playWatch(eventNode.videoId);
					}
				})
			}else{

				if (type == 'goal') {
					ev.click(function() {
						if (!Gamecast._isPlaying && ($('.videoplayer').height() == 0)) {
							$('li[data-div="filterGoals"]').trigger('click');
							Gamecast.Modules.Soccer.Field.renderPlay(eventNode.id);
						}
					}).attr({
						cursor: "pointer"
					})

				}

			}

			timelineAxis.push(ev);
		}

		function removeEvent(id) {
			var events = _timelineData.events;
			for (var i = 0, len = events.length; i < len; i++) {
				var ev = events[i];
				if (parseInt(id) == parseInt(ev.id)) {
					var newEvents = game.removeElementFromArray(events, ev);
					_timelineData.events = newEvents;
				}
			}
		}

		/*
		 *	APIs
		 */
		game.Timeline = {
			init: init,
			renderEvent: renderEvent,
			renderEvents: renderEvents,
			addEvent: addEvent,
			buildAxis: buildAxis,
			flushAxisNumbers: flushAxisNumbers,
			updateClock: updateClock,
			updateGameStatus: updateGameStatus,
			updateGameStatusText: updateGameStatusText,
			removeChildObject : removeChildObject,
			setClockMarker: setClockMarker,
			removeEvent: removeEvent
		};

		Gamecast.Modules.Soccer.Timeline.renderedEvent = {};
	};

	Gamecast.prototype = {
		init: function() {
			// console.log('1377')
		},
		getColorPercent: function(start, end, percent) {
			function hex2dec(hex) {
				return (parseInt(hex, 16));
			}

			function dec2hex(dec) {
				return (dec < 16 ? "0" : "") + dec.toString(16);
			}
			var r1 = hex2dec(start.slice(0, 2)),
				g1 = hex2dec(start.slice(2, 4)),
				b1 = hex2dec(start.slice(4, 6));
			var r2 = hex2dec(end.slice(0, 2)),
				g2 = hex2dec(end.slice(2, 4)),
				b2 = hex2dec(end.slice(4, 6));
			var pc = percent / 100;
			var r = Math.floor(r1 + (pc * (r2 - r1)) + .5),
				g = Math.floor(g1 + (pc * (g2 - g1)) + .5),
				b = Math.floor(b1 + (pc * (b2 - b1)) + .5);
			return ("#" + dec2hex(r) + dec2hex(g) + dec2hex(b));
		},
		toTitleCase: function(str) {
			return str.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		},
		getLocalizedText: function(language, text) {

			// text = $.trim(text.toLowerCase());
			var languageMap = {
				"COMPLETE TEAM": {
					"es": "PLANTEL COMPLETO"
				}
			};

			return languageMap[text] && languageMap[text][language] && this.toTitleCase(languageMap[text][language]) || text;
		},
		wait: (function() {
			var timer = 0;
			return function(callback, ms) {
				clearTimeout(timer);
				timer = setTimeout(callback, ms);
			};
		})(),
		sortArray: function(array, index) {
			var x = [];
			for (var i = 0, len = array.length; i < len; i++) {
				if (i !== index) {
					x.push(array[i])
				}
			}
			x.push(array[index]);
			return x;
		},
		get: function(url, callback, xdomain) {
			if (xdomain) {
				if ((navigator.userAgent.toLowerCase().indexOf('msie') != -1) && window.XDomainRequest) {
					// Use Microsoft XDR
					var xdr = new XDomainRequest();
					xdr.open("get", 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"'));
					xdr.onload = function() {
						callback($.parseXML(xdr.responseText));
					};
					xdr.send();
					return 1;
				}
				return $.get('http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"'), callback);
			} else {
				return $.get(url, callback);
			}
		},
		removeElementFromArray: function(arr, child) {
			var x = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				if (arr[i] != child) {
					x.push(arr[i])
				}
			}
			return x;
		},
		rgb2hex: function(rgb) {
			if(!rgb){
				return null;
			}
		    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		    function hex(x) {
		        return ("0" + parseInt(x).toString(16)).slice(-2);
		    }
		    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		},
		extendDeep: function(parent, child) {
			var i, toStr = Object.prototype.toString,
				astr = "[object Array]",
				child = child || {};

			for (i in parent) {
				if (parent.hasOwnProperty(i)) {
					if (typeof parent[i] === "object") {
						child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
						this.extendDeep(parent[i], child[i]);
					} else {
						child[i] = parent[i];
					}
				}
			}
			return child;
		},
		name: 'Gamecast',
		version: '1.0',
		getName: function() {
			return this.sport + ' ' + this.name;
		},
		copyrights: "Â© ESPN International",
		author: 'Nihar.Kabinittal@espn.com'
	}
	window.Gamecast = Gamecast;

	// Make a triangle
	Raphael.fn.triangle = function(x, y, size) {
		var path = ["M", x, y];
		path = path.concat(["L", (x + size / 2), (y + size)]);
		path = path.concat(["L", (x - size / 2), (y + size)]);
		return this.path(path.concat(["z"]).join(" "));
	};

}());
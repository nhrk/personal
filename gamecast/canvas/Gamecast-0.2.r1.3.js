/** GENERATED: Thu May 22 02:08:08 PDT 2014 **/
(function(){
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
	function Gamecast(options){

		// confirm if the function is called as a constructor
		if( !(this instanceof Gamecast) ){
			return new Gamecast(options);
		}

		var modules = options.modules || '*',
		callback = options.callback,
		module,
		i,
		len,
		sport = options.sport,
		lang = options.language || 'en';

		this.config = options.config || Gamecast.config;

		// Add modules to the core
		if( !modules || (modules && modules.length == 0) || modules == '*' ){
			modules = [];	
			for(i in Gamecast.Modules[sport]){
				if(Gamecast.Modules[sport].hasOwnProperty(i)){
					modules.push(i);
				}
			}
		}

		//Initialize required modules
		for( i = 0, len = modules.length; i < len; i++ ){
			module = modules[i];
			Gamecast.Modules[sport][module](this);
		}
		
		this['sport'] = sport;
		
		this['language'] = lang;

		if( typeof callback == 'function' ){
			callback(this);
		}

	}

	Gamecast.Modules = {};
	
	Gamecast.Modules.Soccer = {};
	
	var daddyUrl = '/assets/img/gamecast/';
	
	if(/^http:\/\/(qa|www|).?espnfc.(com|us|co.uk)/.test(window.location.href)){
		var daddyUrl = '/i/gamecast/';
	}
	
	//localdev
	if( window.location.href.indexOf('http://gc.espn.go.com') != -1 ){
		var daddyUrl = './images/';
	}

	Gamecast.Modules.Soccer.Watch = function(game){
		function init(){
			
			return false;
			
			var config = game.config && game.config.Watch || {},
			url = config.url;
			
			fetch(url,function(data){
				
				updateMatchData(data);
				updateTimelineData(data);
				
				var justShots = function(play){ if( play.shootout == 'f'){ return true; } };
				var filtered = {};
				filtered.set = Gamecast.Field.filterSection(Gamecast._match.set,justShots)
				filtered.home = Gamecast._match.home;
				filtered.away = Gamecast._match.away;
				
				//Update Views
				Gamecast.Field.renderViewport(filtered);
				Gamecast.Timeline.renderEvents();
				
			},config.xdomain)
		}
		
		function updateTimelineData(data){
			var events = Gamecast && Gamecast._timelineData && Gamecast._timelineData.events,
			ev,
			hasPlay;
			
			for( var i=0, len = events.length; i < len; i++ ){
				ev = events[i];
				hasPlay = playHasVideo(data,ev.id);
				if(hasPlay){
					//TODO: update if Id has video;
					ev.watch = hasPlay;
				}
			}
		}
		
		function updateMatchData(data){
			var sets = Gamecast._match.set,
			set,
			hasPlay;
			for( var i=0, len = sets.length; i < len; i++ ){
				set = sets[i];
				hasPlay = playHasVideo(data,set.id);
				if(hasPlay){
					//TODO: update if Id has video;
					set.watch = hasPlay;
				}
			}
		}
		
		function playHasVideo(plays,videoId){
			var play;
			
			for( var i=0, len = plays.length; i < len; i++ ){
				play = plays[i];
				//TODO to change from not eq to eq
				if( parseInt(play.id) == parseInt(videoId)){
					return play;
				}
			}
			return false;
		}
		
		function fetch(url,callback,xdomain){
			game.get(url,function(data){
				if(xdomain){
					// data = data.firstChild || data;
				}
				buildDataSet(data,callback);
			},xdomain)
		}
		
		function buildDataSet(data,callback){
			var markers = $('marker',data);
			
			var watchData = [];
			
			for( var i=0, len = markers.length; i < len; i++ ){
				var marker = markers[i];
				marker = $(marker);
				var id = marker.attr('id');
				var playId = marker.attr("playId");
				var color = marker.attr("color");
				var playText = $('>playText',marker).text();
				var thumbnailURL = $('>thumbnailURL',marker).text();
				
				var temp = {
					id : id,
					playId : playId,
					color : color,
					playText : playText,
					thumbnailURL : thumbnailURL
				};
				
				var playbackScenarios = $('playbackScenario',marker);
				var playback = [];
				
				for( var j=0, length = playbackScenarios.length; j < length; j ++){
					var playbackScenario = playbackScenarios[j];
					playbackScenario = $(playbackScenario)
					var id  = playbackScenario.attr('id');
					var name = playbackScenario.attr('name');
					var url = playbackScenario.attr('url');
					playback.push( { id : id, name : name, url : url } )
				}
				
				temp.playbackScenarios = playback;
				watchData.push(temp);
			}
			
			if(typeof callback == 'function'){
				callback(watchData);
			}
		}
		
		/*
		*	APIs
		*/
		
		game.Watch = {
			init : init
		}
	}
	
	Gamecast.Modules.Soccer.Field = function(game){
		
		var baseConfig = {
			wrapper : 'soccerGameCast',
			canvas : 'gcField',
			width : 585,
			height : 374,
			leftGutter : 34, 
			topMargin : 19,
			url : "./data/gamecast_2.xml",
			logoUrl : 'http://soccernet-akamai.espn.go.com/design05/i/clubhouse/badges/',
			logo:{
				path : daddyUrl + 'espn-logo.png',
				width : 171,
				height : 43,
				opacity : 0.15 
			},
			fieldImage : daddyUrl + 'field.jpg',
			player : {
				colors : {
					shadow : '#434343',
					fill : 'transparent',
					number : '#fff'
				}
			},
			ball : {
				colors : {
					color : '#333',
					stroke : '#fff'
				}
			},
			fonts : {
				jersey : '11px Arial'
			},
			colors : {
				heatMap : {
					start : 'FFFF11',
					end : 'CC1100'
				},
				penalties : {
					noshot : "#fff"
				}
			},
			images : {
				ball : daddyUrl + 'ball.png',
				ballMiss : daddyUrl + 'ball_miss.png',
				ballIcon : daddyUrl + 'ball_ico.png'
			},
			goalsRadius : 8,
			shotsRadius : 7,
			playerRadius : 7,
			fauxRadius : 5,
			ballRadius : 6,
			roundLabelWidth : 19,
			roundLabelHeight : 19,
			roundLabelRadius : 1,
			classNames : {
				popup : 'viewportPopup',
				fieldClone : 'fieldClone',
				ball_front : 'ball_front',
				perspective_container : 'goalAnimation',
				anim_2 : 'anim-2',
				anim_1 : 'anim-1'
			}
		},
		_stage,
		_match,
		_container,
		overlayIsSet = false,
		lastVideoPlayed;
		
		Gamecast._isPlaying = false;
		Gamecast._queue = [];
		Gamecast._playedAnim = {};
		
		function init(callback){
			var canvas = baseConfig.canvas,
			config = game.config && game.config.Field || {},
			stage,
			background,
			container,
			field,
			logo = config.logo.path || baseConfig.logo.path,
			enableLogo = config.enableLogo || false,
			logoWidth = config.logo.width || baseConfig.logo.width,
			logoHeight = config.logo.height || baseConfig.logo.height,
			logoOpacity = config.logo.opacity || baseConfig.logo.opacity,
			url = config.url || baseConfig.url,
			lang = game.config.language || 'en';
			
			stage = new Stage(baseConfig.canvas);
			
			_stage = stage;
			
			Gamecast._stage = _stage;
			
			stage.mouseEventsEnabled = true;
			
			stage.onMouseMove = function(e){
				showLabels(e,stage)
			};
			
			stage.autoClear = true;
			
			Ticker.setFPS(60);
			
			Ticker.addListener(stage);
			
			container = new Container();
			
			_container = container;

			field = new Bitmap(baseConfig.fieldImage);
			
			container.addChild(field);
			
			if(enableLogo){
				logo = new Bitmap(logo);

				logo.x = baseConfig.width/2 - logoWidth/2;

				logo.y = baseConfig.height/2 - logoHeight/2;

				logo.alpha = logoOpacity;

				container.addChild(logo);
			}
			
			stage.addChild(container);
					
			fetch(url,function(match){
				
				_match = match;
				
				Gamecast._match = _match;
				
				if(Gamecast.langId == "es"){
					$('.gamecastKey').html($('.gamecastKey').html().replace('Shot','Disparo').replace('Goal','Gol'));
				}
				
				if(window.country == 'united states'){

					$('.videoIcon').css('display','inline');

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

					espn.video.subscribe('espn.video.complete', function(){
						if($('.videoplayer').height() == 374){
							$('.closeWatch').trigger('click');
						}
					});

				}
				
				var filtered = game.extendDeep(match);
				var penalties = filterSection(match.set,function(play){ if( play.shootout == 't'){ return true; } });
				if(penalties.length){
					Gamecast.Field.renderPenalties();
				}else if(!penalties.length && Gamecast._match.gameStatus == "SHOOTOUT"){
					renderPenalties(1);
				}else{
					filtered.set = filterSection(match.set,function(play){ if( play.shootout == 'f'){ return true; } });
					renderViewport(filtered);					
				}
				
				if(typeof callback == 'function'){
					callback(match,stage);
				}
				
				buildNavs(penalties.length);
				
			},config.xdomain);
			
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
		
		function showLabels(e,stage){
			var offset = $('#' + baseConfig.canvas).position(),
			allPlayers = stage.getObjectsUnderPoint(e.stageX,e.stageY),
			player = allPlayers[0],
			popup = $('.' + baseConfig.classNames.popup),
			disableSort = (player && typeof player.disableSort == 'undefined') ? false : true,
			left;

			if(player && player.player || player && player.info){
				left = (player.x || player.x_);
				if(left == 34 || left == 54){
					left = 77;
				}
				popup.html(player.result || player.info).css({ left: left + offset.left - (popup.outerWidth()/2), top: (player.y || player.y_) + offset.top - popup.outerHeight() - 10 }).fadeIn('fast');
				$('#' + baseConfig.canvas).css('cursor','pointer');
				if(player.color){
					$('b',popup).css('color',player.teamColor || player.color);
				}

			}else{
				$('#' + baseConfig.canvas).css('cursor','default');
				popup.fadeOut();
			}
		}
		
		function fetch(url,callback,xdomain){
			game.get(url,function(data){
				if(xdomain){
					//Get the results from YQL
					// data = data.firstChild || data;
				}
				buildDataSet(data,callback);
			},xdomain)
		}
		
		function buildDataSet(data,callback){
			
			var plays = $('play',data), play, i, len, j, length, parts, part, obj, partObj, array, set = [], home, away, match = {}, entry,
			temp, cur, grid, player, gridMax, optionsNode, options = [], option, max, subNav, subNavOpts, homeColor, awayColor;

			homeColor = /*game.rgb2hex($('.country h2:first').css('color')) ||*/ $('home',data).attr('color');

			awayColor = /*game.rgb2hex($('.country h2:last').css('color')) ||*/ $('away',data).attr('color');
			
			home = { id: $('home',data).attr('id'), name : $('home',data).text(), color : /*'2b579e'*/ homeColor};
			
			match.home = home;
			
			away = { id: $('away',data).attr('id'), name : $('away',data).text(), color : /*'da2932'*/ awayColor};
			
			match.away = away;
			
			match.homeScore = $('homeScore',data).text();
			
			match.awayScore = $('awayScore',data).text();
			
			match.clock = $('clock',data).text();
			
			match.period = $('period',data).text();
			
			match.gameStatus = $('gameStatus',data).text();
			
			match.gameStatusText = $('gameStatusText',data).text();
			
			match.pregameWhen = $('pregameWhen',data).text();
			
			optionsNode = $('option',data);
			
			for( i = 0, len = optionsNode.length; i < len; i++ ){
				option = $(optionsNode[i]);
				subNav = $('subNav',option).children();
				subNavOpts = [];
				for( j=0, max = subNav.length; j < max; j++ ){
					temp = {};
					temp[subNav[j].nodeName] = $(subNav[j]).text();
					subNavOpts.push(temp);
				}
				options.push({ id : option.attr('id'), label : $('>label',option).text(), subNav : subNavOpts });
			}
			
			match.options = options;
			
			for( i = 0, len = plays.length; i < len; i++ ){
				
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
					player : $('>player',play).text(),
					result : $('>result',play).text(),
					shotbytext : $('shotbytext',play).text(),
					topscoretext : $('topscoretext',play).text()
				};
				
				parts = $('part',play);
				
				array = [];
				
				for( j = 0, length = parts.length; j < length; j ++ ){
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
			
			entry = $('entry',data);
			
			array = [];
			
			var gridsVailable = false;
			var tactAvailable = false;
			match.heatMapEnabled = false;
			match.tacticalEnabled = false;
			
			for( i = 0, len = entry.length; i < len; i++ ){
				cur = $(entry[i]);
				grid = $('grid',cur).text();
				gridMax = $('grid',cur).attr('max')
				cur.children().remove();
				player = cur.text();
				
				temp = {
					player : player,
					grid : grid,
					gridMax : gridMax,
					jersey : cur.attr('jersey'),
					avgX : cur.attr('avgX'),
					avgY : cur.attr('avgY'),
					posX : cur.attr('posX'), 
					posY : cur.attr('posY'),
					left : cur.attr('left'),
					middle : cur.attr('middle'),
					right : cur.attr('right'),
					playerId : cur.attr('playerId'),
					teamId : cur.attr('teamId'),
					position : cur.attr('position') 
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
			
			if(typeof callback == 'function'){
				callback(match);
			}
		}
		
		function getLocalizedLabel(label){
			for( var i =0, max = _match.options.length; i < max; i ++ ){
				var option  = _match.options[i];
				if(option.id == label){					
					return option.label;
				}
				for ( var j =0, len = option.subNav.length; j < len; j ++ ){
					if(option.subNav[j][label]){					
						return option.subNav[j][label]
					}
				}
			}
		}
		
		function buildNavs(pens){
			
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
			
			if(pens){
				$('li[class^=showPenalties]').addClass('appliedFilter');
			}else{
				$('.filterShots li:first-child').addClass('appliedFilter')
			}
			
			$('td:contains("Start Position")').text(getLocalizedLabel("startFormation"));
			
			$('td:contains("Average Position")').text(getLocalizedLabel("avgFormation"));
			
			$('td:contains("COMPLETE TEAM")').text(game.getLocalizedText(game.language,'COMPLETE TEAM'))
		}
		
		function updateHeatMap(attack,x,y){
			var emptyGrid = "0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~";
			var grid;
			
			//Heatmap cal;
			if(!attack.grid){
				grid = emptyGrid;
			}else{
				grid = attack.grid;
			}
			var pos = getUpdatePosition(x,y);
			
			if(pos >=0 && pos <=704){
				var gridArray = grid.split('~');
				var updateNode = parseInt(gridArray[pos]);
				
				updateNode = parseInt(updateNode) + 1;

				gridArray[pos] = updateNode;

				//TODO: update team map;
				
				attack.gridMax = maxInArray(gridArray);
				
				if(_match.attack[0].teamId == attack.teamId){
					updateCompleteTeam(_match.attack[0],pos)
				}else{
					updateCompleteTeam(_match.attack[1],pos)
				}

				attack.grid = gridArray.join('~');
				
				addAttack(attack);
				
				return true;				
			}
		
		}
		
		function updateCompleteTeam(attack,pos){
			var emptyGrid = "0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~";
			var grid;
			var gridArray;
			
			if(!attack.grid){
				grid = emptyGrid;
			}else{
				grid = attack.grid;
			}
			
			gridArray = grid.split('~');
			
			var updateNode = gridArray[pos];
			
			attack.gridMax = maxInArray(gridArray);
			
			updateNode = parseInt(updateNode) + 1;
			
			gridArray[pos] = updateNode;
			
			attack.grid = gridArray.join('~');
			
			addAttack(attack,1);
			
			return true;
		}
		
		function maxInArray(arr){
			var max = 0;
			for( var i=0, len = arr.length; i < len; i ++){
				if(parseInt(arr[i]) > max){
					max = arr[i];
				}
			}
			return max;
		}
		
		function getUpdatePosition(x,y){
			x = x || 1;
			y = y || 1;
			
			var height = (374 - 19);
			var blockHeight = (374 - (19 * 2))/22;
			var t = y * ( 374 - (19 * 2) ) + 19;
			
			var width = (585 - 34);
			var blockWidth = (585 - (34 * 2) )/32;
			var left = x * ( 585 - (34 * 2) ) + 34;
			
			var xPos, yPos;
			
			for( var i=1; i <= 32; i++ ){
				var prev = (i-1 < 0) ? 0 : i-1;
				if( (blockWidth * i) + 34 >= left && (blockWidth * prev) + 34 <= left){
					xPos = i;
					break;
				}
			}
			
			if(x <= 0){
				xPos = 1;
			}
			
			for( var i=1; i <= 22; i++ ){
				var prev = (i-1 < 0) ? 0 : i-1;
				if( (blockHeight * i) + 19 >= t && (blockHeight * prev) + 19 <= t){
					yPos = i;
					break;
				}
			}
			
			if(y <= 0){
				yPos = 1
			}
			
			var endPos = ((22 - yPos) * 32) + xPos;
			
			return endPos;
		}
		
		function addPlay(play,sNode){
			var set = _match.set;
			for(var i=0, len = set.length; i < len; i ++){
				var cur = set[i];
				if(parseInt(cur.id) == parseInt(play.id)){
					//has updated passes already, skip
					if(sNode && cur.parts.length && cur.videoId){
						return false;
					}
					set[i] = play;
					var videoId = cur.videoId;
					if(videoId){
						set[i].videoId = videoId;
					}
					return false;
				}
			}
			return _match.set.push(play);
		}
		
		function removePlay(id){
			var set = _match.set;
			for(var i=0, len = set.length; i < len; i ++){
				var cur = set[i];
				if(parseInt(cur.id) == parseInt(id)){
					var arr = game.removeElementFromArray(set,cur);
					_match.set = arr;
					//check this
					return true;
				}
			}
			return false;
		}
		
		function addAttack(obj,team){
			var attack = _match.attack;
			for(var i=0, len = attack.length; i < len; i ++){
				var cur = attack[i];
				if(team){
					if(parseInt(cur.teamId) == parseInt(obj.teamId)){
						attack[i] = obj;
						return false;
					}
				}else{
					if(parseInt(cur.playerId) == parseInt(obj.playerId)){
						attack[i] = obj;
						return false;
					}					
				}
			}
			_match.attack.push(attack);
		}
		
		function updateScores(homeScore,awayScore){
			_match.homeScore = homeScore;
			_match.awayScore = awayScore;
		}
		
		function updateClock(clock){
			_match.clock = clock;
		}
		
		function updateGameStatus(gameStatus){
			_match.gameStatus = gameStatus;
		}
		
		function updateGameStatusText(gameStatusText){
			_match.gameStatusText = gameStatusText;
		}
		
		function clearViewport(){
			// Clear container, only retain the background - child at 0 is background image
			_stage.children = [_stage.children[0]];
		}
		
		/*
		*	@param {object} grid
		*	@return void
		*/
		
		function renderHeatMap(gridMap){
			
			var i, len, cur, row, col, player, x, y, width, height, container = new Container(), color, value;
			
			stopAnimation();
			
			clearViewport();
			
			Gamecast._isPlaying = false;
			
			if(_container.children.length > 1){
				_container.children = [_container.children[0]];
			}
			
			$('.' + baseConfig.classNames.perspective_container).hide();
			
			width = ( baseConfig.width - (baseConfig.leftGutter * 2) )/32;
			height = ( baseConfig.height - (baseConfig.topMargin * 2) )/22;
			
			for ( i = 0, len = gridMap.length; i < len; i ++){
				value = gridMap[i];
				color = ((value * 40) <= 100) ? value * 40 : 100;
				color = game.getColorPercent(baseConfig.colors.heatMap.start,baseConfig.colors.heatMap.end,color);
				if(value > 0){
					cur = i+1;
					row = Math.ceil(cur/32);
					col = cur - (Math.floor(cur/32) * 32) || 32
					player = new Shape();
					player.graphics.beginFill(color);
					player.graphics.beginStroke(color);
					player.graphics.setStrokeStyle(1);
					player.alpha = 0.7;
					// player.shadow = new Shadow ( color , 1 , 1 , 2 );
					x = (col * width) - width + baseConfig.leftGutter;
					y = baseConfig.height - (height * row) - baseConfig.topMargin;
					
					player.graphics.drawRoundRect( x, y , width, height, 7);
					container.addChild(player);
				}
			}
			_stage.addChild(container);
		}
		
		function getGrid(attacks,id,isTeam){
			var i, len, attack;
			
			for( i=0, len = attacks.length; i < len; i ++){
				attack = attacks[i];
				if( (isTeam && (attack.teamId == id)) || attack.playerId == id ){
					return attack.grid.split('~');
				}
			}
			return null;
		}
		
		/*
		* @param {array} attacks
		* @param {function} filter
		*/
		
		function getPlayers(attacks,filter){
			var i, len, attack, players = {}, filter = filter || function(){ return true };
			
			for( i=0, len = attacks.length; i < len; i++ ){
				attack = attacks[i];
				if(typeof players[attack.teamId] != 'object'){
					players[attack.teamId] = [];
				}
				//Filter complete teams
				if(attack.playerId != -1 && (filter && filter(attack)) ){
					players[attack.teamId].push({ id: attack.playerId, name : attack.player, position: attack.position });
				}
			}
			
			return players;
		}
		
		function renderTacticalInformation(teamId,position){
			
			var container = new Container(), attack, posX, posY, left, top, player, text, match = _match, color;
			
			stopAnimation();
			
			_stage.children = [_stage.getChildAt(0)];
			
			Gamecast._isPlaying = false;
			
			$('.' + baseConfig.classNames.perspective_container).hide();
			
			if(_container.children.length > 1){
				_container.children = [_container.children[0]];
			}
			
			for( var i=0, len = match.attack.length; i < len; i++ ){
				attack = match.attack[i];
				posX = attack.posX;
				posY = attack.posY;
				color = (match.home.id == attack.teamId) ? '#' + match.home.color : '#' + match.away.color;
				
				if(position == 'average'){
					posX = attack.avgX;
					posY = attack.avgY;
				}
				
				if(!( posX == 0 && posY == 0 ) && attack.jersey){
					
					if(teamId && attack.teamId == teamId){
						left = posX * baseConfig.width;
						
						//Move players inside the canvas to prevent them getting clipped
						if(posX == 1){
							left = baseConfig.width - 10 - baseConfig.leftGutter;
						}else if(posX == 0){
							left = 10 + baseConfig.leftGutter;
						}
						
						top = posY * baseConfig.height;
						
						if(posY == 0){
							top = 10;
						}else if( posY == 1 ){
							top = baseConfi.height - 10;
						}

						player = new Shape();
						player.graphics.beginFill(color);
						player.graphics.drawRoundRect(left-9, top-9, baseConfig.roundLabelWidth, baseConfig.roundLabelHeight, baseConfig.roundLabelRadius);
						player.shadow = new Shadow ( baseConfig.player.colors.shadow , 1 , 1 , 2 );
						player.info = '<b>' + attack.player + '</b><br/>' + attack.position;
						player.x_ = left;
						player.y_ = top;
						player.disableSort = true;
						player.color = color;

						text = new Text(attack.jersey);
						text.x = left;
						text.y = top + 4.5;
						text.info = '<b>' + attack.player + '</b><br/>' + attack.position;
						text.font = baseConfig.fonts.jersey;
						text.textAlign = 'center';
						text.color = baseConfig.player.colors.number;
						text.teamColor = color;
						
						container.addChild(player,text);
					}
				}
			}
			_stage.addChild(container);
			
			_stage.update();
		}
		
		function renderViewport(match){
			
			var match = match || _match, parts, part, i, len, left, top, id, obj = match.set, color, container = new Container(), isGoal, player, status, logo, bg, playerBg, coords, playArrow;
			
			if(match.gameStatus == "SCHEDULED" && match.pregameWhen){
				
				var localTime = $('.game-status').contents().filter(function(){ return(this.nodeType == 3); }).text().trim() || $('.match-details span').contents().filter(function(){ return(this.nodeType == 3); }).text().replace('*','').trim();
				var localTimeArray = localTime && localTime.split(' ');
				var localTimeString;
				
				if(localTimeArray.length == 2){
					localTimeString = 'Game starts on ' + localTimeArray[0] + ' at ' + localTimeArray[1];
					if(Gamecast.langId == "es"){
						localTimeString = 'El partido inicia en ' + localTimeArray[0] + ' a las ' + localTimeArray[1];
					}
				}else{
					localTimeString = match.pregameWhen
				}
				
				status = new Text(localTimeString);
				status.x = (baseConfig.width/2);
				status.y = 65;
				status.color = "#fff";
				status.shadow = new Shadow ('#333' , 1 , 1 , 2 );
				status.font = '25px Arial';
				status.textAlign = 'center';
				
				bg = new Shape();
				bg.graphics.beginFill('#111');
				bg.graphics.drawRoundRect((baseConfig.width/2 - status.getMeasuredWidth()/2 -10 ), 35, status.getMeasuredWidth() + 22, 40,4);
				bg.alpha = 0.7;
				_stage.addChild(bg);
				
				_stage.addChild(status);
				
				status = new Text(match.home.name.toUpperCase());
				status.x = 50;
				status.y = 330;
				status.color = "#fff";
				status.shadow = new Shadow ('#333' , 1 , 1 , 2 );
				status.font = '15px Arial';
				status.textAlign = 'left';
				_stage.addChild(status);
				
				// logo = new Bitmap( baseConfig.logoUrl + match.home.id + '.gif');
				// logo.x = (status.getMeasuredWidth()/2)  + 50 - 27.5; //1.5 logo width
				// logo.y = 250;
				// _stage.addChild(logo);
				
				status = new Text(match.away.name.toUpperCase());
				status.x = 535;
				status.y = 330;
				status.color = "#fff";
				status.shadow = new Shadow ('#333' , 1 , 1 , 2 );
				status.font = '15px Arial';
				status.textAlign = 'right';
				_stage.addChild(status);
				
				logo = new Bitmap( baseConfig.logoUrl + match.away.id + '.gif');
				logo.x = 535 - (status.getMeasuredWidth()/2) - 27.5;
				logo.y = 250;
				// _stage.addChild(logo);
				
				Gamecast.started = false;
				
			}else{
				
				Gamecast.started = true;
				
				// activateFilters();
				
				clearViewport();
				
				stopAnimation();
				
				renderViewport.cache = {};
				
				if(_container.children.length > 1){
					_container.children = [_container.children[0]];
				}
				
				$('.' + baseConfig.classNames.perspective_container).hide();
				
				for (i = 0, len = obj && obj.length; i < len; i++) {
						
					parts = obj[i].parts;

					color = (match.home.id == obj[i].teamId) ? '#' + match.home.color : '#' + match.away.color;

					isGoal = (obj[i].goal == 't');

					if( parts.length > 0 ){

						//Last Player position
					    part = parts[ parts.length - 1 ];
						id = obj[i].id;

					    left = part.startX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter;
					    top = part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin;
					
						coords = left + '|' + top;
					
						if(!renderViewport.cache[coords]){
							renderViewport.cache[coords] = 0;
							renderViewport.cache[coords]++;
						}else{
							renderViewport.cache[coords]++; 
						}
						
						if(renderViewport.cache[coords] > 1){
							left = left + (renderViewport.cache[coords] - 1) * 3;
							top = top + (renderViewport.cache[coords] - 1) * 3;
						}
						
						playerBg = new Shape();
						playerBg.graphics.beginFill('#000');
						playerBg.alpha = 0.07;						
						playerBg.graphics.drawCircle(0, 0,baseConfig.fauxRadius);
						playerBg.x = left;
						playerBg.y = top;
						playerBg.playId = parseInt(id);
						playerBg.player = part.player;
						playerBg.result = obj[i].result;
						playerBg.color = color;

						player = new Shape();
						player.graphics.beginFill(isGoal ? color : baseConfig.player.colors.fill);
						if(!isGoal){
							player.graphics.beginStroke(color);
							player.graphics.setStrokeStyle(2);	
							container.addChild(playerBg);
						}
						player.graphics.drawCircle(0, 0, isGoal ? baseConfig.goalsRadius : baseConfig.shotsRadius);
						player.x = left;
						player.y = top;
						player.shadow = new Shadow ( baseConfig.player.colors.shadow , 2 , 2 , 2 );

						//Add custom property
						player.playId = parseInt(id);
						player.player = part.player;
						player.result = obj[i].result;
						player.color = color;

						player.onPress = playerBg.onPress = function(){
							var play = filterPlay(obj,this.playId);
							if(play){
								renderPlay(play);
							}
						}
						
						container.addChild(player);
						
						if(obj[i].videoId && window.country == 'united states'){
							playArrow = new Shape();
							playArrow.graphics.beginFill('#fff');
							playArrow.graphics.drawPolyStar( left + 0.5, top, 3.5, 3, 0.5, 0 );
							playArrow.playId = parseInt(id);
							playArrow.player = part.player;
							playArrow.result = obj[i].result;
							playArrow.color = color;
							var videoId = obj[i].videoId;
							
							(function(videoId){
								//TODO : add video function
								playArrow.onPress = function(){
									playWatch(videoId);
								};
							})(videoId)

							container.addChild(playArrow);
							player.onPress = playerBg.onPress = playArrow.onPress;							
						}
					}
				}
				
				_stage.addChild(container);
			}
		}
		
		function playWatch(id,playId){
			//TODO : update test case
			var id = parseInt(id) || '100494'
			var canvas = $('#' + baseConfig.canvas);
			$('.videoplayer').height('374px');
			
			stopAnimation();
			
			$('.playerList, .tactList').slideUp();
			
			$('.selectedPlayerMap').hide();
			
			$('.' + baseConfig.classNames.perspective_container).hide();
			
			if(!playWatch.embeded){
				var position = canvas.position();
				$('.videoplayer').css({ top: position.top, left : position.left });
				playWatch.embeded = true;
			}
			
			var opts = {'endCard': "false", 'cms': 'intl'};

			if(Gamecast.sessionId == 'uefa.euro-gp10' && Gamecast.season == "2012"){
				//videos for euros come from ESPN cms
				opts.cms = 'espn';
			}

			espn.video.play(id,opts);

			if(playId){
				lastVideoPlayed = parseInt(playId);
			}
			
			canvas.css('visibility','hidden');
			Gamecast.Field.clearViewport();
			$('.closeWatch').show();
		}
		
		function activateFilters(){
			var filters = $('.gamecastFilters');
			if(!filters.hasClass('activeGame') || filters.hasClass('inactiveGame')){
				filters.addClass('activeGame');
				filters.removeClass('inactiveGame');
			}
			return true;
		}
		
		function renderPenalties(start,playLast,playedId,update){
			
			var match = _match, filtered = {}, parts, part, i, len, id, obj , color, container = new Container(), isGoal, player, isHome, homeCount = 0, awayCount = 0, max, playerBg;
			
			stopAnimation();
			
			container.name = 'renderePens';

			if(!update){
				
				clearViewport();
			
				var goal = new Bitmap(daddyUrl + 'goal-bg7b.jpg');
			
				_container.addChild(goal);
				
			}
			
			Gamecast.Timeline.removeChildObject(_stage,'renderePens');			
			
			Gamecast._container = _container;

			filtered.set = filterSection(match.set,function(play){
				if(play.shootout == 't'){
					return true;
				}
			});
						
			obj = filtered.set;
			
			var text = new Text(match.home.name.toUpperCase());
			text.x = (homeCount * 20) - 8 + baseConfig.leftGutter;
			text.y = baseConfig.height - 72;
			text.color = '#fff';
			text.textAlign = "left";
			text.font = 'bold 12px Arial';
			container.addChild(text);
			
			var text = new Text(match.away.name.toUpperCase());
			text.x = ( baseConfig.width + 5 - baseConfig.leftGutter) - (awayCount * 20);
			text.y = baseConfig.height - 72;
			text.color = '#fff';
			text.textAlign = "right";
			text.font = 'bold 12px Arial';
			container.addChild(text);
				
			for (i = 0, len = obj && obj.length; i < len; i++) {
				
				isHome = (match.home.id == obj[i].teamId);
					
				parts = obj[i].parts;

				color = isHome ? '#' + match.home.color : '#' + match.away.color;

				isGoal = (obj[i].goal == 't');
				
				if(isHome){
					homeCount++
					var row = (homeCount > 13) ? 2 : 1;
					var count = (homeCount > 13) ? homeCount - 13 : homeCount;
				}else{
					awayCount++
					var row = (awayCount > 13) ? 2 : 1;
					var count = (awayCount > 13) ? awayCount - 13 : awayCount;
				}
				
				if( parts.length > 0 ){

					//Last Player position
				    part = parts[ parts.length - 1 ];
					id = obj[i].id;
					
					playerBg = new Shape();
					playerBg.graphics.beginFill('#000');
					playerBg.alpha = 0.1;						
					playerBg.graphics.drawCircle(0, 0, isGoal ? baseConfig.goalsRadius : baseConfig.shotsRadius);
					playerBg.x = isHome ? (count * 20) - 20 + baseConfig.leftGutter : ( baseConfig.width + 20 - baseConfig.leftGutter) - (count * 20) ;
					playerBg.y = baseConfig.height - (55 * ((row == 2) ? 0.5 : row) );//baseConfig.height - 55;
					
					playerBg.playId = parseInt(id);
					playerBg.player = part.player || obj[i].player;
					playerBg.result = obj[i].result;
					playerBg.color = color;

					player = new Shape();
					player.graphics.beginFill( isGoal ? color : baseConfig.player.colors.fill);
					player.graphics.beginStroke(color);
					player.graphics.setStrokeStyle(2);
					player.graphics.drawCircle(0, 0, isGoal ? baseConfig.goalsRadius : baseConfig.shotsRadius);
					player.x = isHome ? (count * 20) - 20 + baseConfig.leftGutter : ( baseConfig.width + 20 - baseConfig.leftGutter) - (count * 20) ;
					player.y = baseConfig.height - (55 * ((row == 2) ? 0.5 : row) );//baseConfig.height - 55;
					// player.shadow = new Shadow ( baseConfig.player.colors.shadow , 1 , 1 , 1 );

					//Add custom property
					player.playId = parseInt(id);
					player.player = part.player || obj[i].player;
					player.result = obj[i].result;
					player.color = color;
					player.videoId = obj[i].videoId;
					
					container.addChild(playerBg);
					container.addChild(player);
					
					(function(i){
						player.onPress = playerBg.onPress = function(){
							renderPlay(String(obj[i].id),true);
						}
						
						if(obj[i].videoId && window.country == 'united states'){
							var playArrow = new Shape();
							playArrow.graphics.beginFill('#fff');
							playArrow.graphics.drawPolyStar( player.x + 0.5, player.y, 3.5, 3, 0.5, 0 );
							playArrow.playId = player.playId;
							playArrow.player = player.player;
							playArrow.result = player.result;
							playArrow.color = color;
							var videoId = obj[i].videoId;

							if(videoId){
								playArrow.onPress = function(){
									playWatch(obj[i].videoId,obj[i].id);
								};
								container.addChild(playArrow);
								player.onPress = playerBg.onPress = playArrow.onPress;
							}	
						}
						
					})(i)
					
					
					if(update){
						playedId = renderPenalties.lastShot;
					}

					if( (playedId == player.playId && !lastVideoPlayed ) || (lastVideoPlayed == player.playId) || ( !renderPenalties.lastShot && i+1 == len && !update )){
						player = new Shape();
						player.graphics.beginFill('transparent');
						player.graphics.beginStroke(color);
						player.graphics.setStrokeStyle(1);
						player.graphics.drawCircle(0, 0, 11);
						player.x = isHome ? (count * 20) - 20 + baseConfig.leftGutter : ( baseConfig.width + 20 - baseConfig.leftGutter) - (count * 20) ;
						player.y = baseConfig.height - (55 * ((row == 2) ? 0.5 : row) );//baseConfig.height - 55;
						container.addChild(player);
						if(playLast){
							renderPlay(String(id),true);
						}
						renderPenalties.lastShot = id;
						lastVideoPlayed = null;
					}
				}
			}
			
			var penalties = filterSection(_match.set,function(play){ if( play.shootout == 't'){ return true; } });
			
			if(start && !penalties.length){
				renderEmptyPenaltyMarker( { container : container, count : 0, home : true} );
				renderEmptyPenaltyMarker( { container : container, count : 0, home : false} );
			}
			
			renderEmptyPenaltyMarker( { container : container, count : homeCount, home : true} );
			renderEmptyPenaltyMarker( { container : container, count : awayCount, home : false} );
			
			_stage.addChild(container);
		}
		
		function renderEmptyPenaltyMarker(options){
			
			var home = options.home,
			color = home ? '#' + _match.home.color : '#' + _match.away.color,
			// color = baseConfig.colors.penalties.noshot,
			container = options.container,
			count = options.count,
			player, i, max;
			
			for( i = 0, max = (5 - count); i < max; i++ ){
				var row = Math.ceil((i + 1 + options.count)/13) || 1;
				player = new Shape();
				player.graphics.beginFill(color);
				// player.graphics.beginStroke(color);
				// player.graphics.setStrokeStyle(2);
				if(count == 13){
					// reset row
					count = 0;
				}
				player.graphics.drawCircle(0, 0, 10);
				player.x = home ? ( ++count * 20 ) - 20 + baseConfig.leftGutter : ( baseConfig.width + 20 - baseConfig.leftGutter ) - ( ++count * 20 ) ;
				player.y = baseConfig.height - (55 * ((row == 2) ? 0.5 : row) );
				player.alpha = 0.3;
				// player.shadow = new Shadow ( baseConfig.player.colors.shadow , 1 , 1 , 1 );

				container.addChild(player);
			}
			return container;
		}
		
		function filterGoals(obj){
			
			var i, len, play, set = [];
			
			for( i = 0, len = obj && obj.length; i < len; i ++){
				play = obj[i];
				if(play.goal == 't'){
					set.push(play);
				}
			}
			return set;			
		}
		
		function getGoals(side){
			
			var i, len, set, goals = {}, teamId, team, isHome, match = _match, temp, key;
			
			set = filterGoals(match.set);
			
			for( i = 0, len = set.length; i < len; i ++){
				teamId = set[i].teamId;
				isHome = (match.home.id == teamId) ? 'home' : 'away';
				team = isHome ? match.home.name : match.away.name;
				key = side ? isHome : team;
				if(!goals[key]){
					goals[key] = [];
				}
				goals[key].push({ player : set[i].player, clock : set[i].clock, shootout : set[i].shootout })
			}
			
			return goals;
		}
		
		function getTeams(){
			return { home : { id : _match.home.id , name : _match.home.name, color : '#' + _match.home.color } , away: { id: _match.away.id, name : _match.away.name, color : '#' + _match.away.color } }
		}
		
		function filterSection(obj,filter){
			var i, len, play, set = [], filter = filter || function(){ return true; };
			
			for( i = 0, len = obj && obj.length; i < len; i ++){
				play = obj[i];
				if(filter && filter(play)){
					set.push(play);
				}
			}
			return set;
		}
		
		function filterPlay(obj,id){
			
			var i, len, play;
			
			for( i = 0, len = obj.length; i < len; i ++){
				play = obj[i];
				if(play.id == id){
					return play;
				}
			}
			return null;
		}
		
		Gamecast.Modules.Soccer.Field.renderPlay = renderPlay;
		
		function animate(part,isHome){
			
			var txt = part.resulttext,
			player = part.player,
			bottom = (part.endZ * 154) + 130,
			bottom = (bottom > 350) ? 350 : bottom, //bring inside the viewport
			endY = part.endY,
			y,
			left,
			prevLeft,
			prevY,
			me = $('.' + baseConfig.classNames.fieldClone);
			Gamecast._isPlaying = true;
			
			// if(!overlayIsSet){
				// overlap the anim on canvas
				var animTop = $('#' + baseConfig.canvas).position().top;	
				$('.goalAnimation').css('top', animTop + 'px');
				overlayIsSet = true;
			// }
			
			if(isHome){
				y = endY;
				prevY = part.y;
			}else{
				y = (374-endY);
				prevY = (374-part.y);
			}
			
			left = y - 187; //187 = 374/2
			prevLeft = prevY - 187;
			left = left * 10.10; //10.10 = scale
			prevLeft = prevLeft * 10.10;
			left = left + 292.5 - 52; //292 = 585/2, (zoom goal center line), 51 is dist between edge of image and goal post
			prevLeft = prevLeft + 292.5 - 52; 
			
			$('.' + baseConfig.classNames.ball_front).css({ bottom: '-70px', left: prevLeft || '275px',  height : '52px', width : '52px' }).attr('src',baseConfig.images.ball);
			
			// txt = (part.goal == "t") ? txt += '!!!' : txt;
			
			$('.' + baseConfig.classNames.perspective_container).fadeIn('fast');
			
			$('.' + baseConfig.classNames.anim_1 + ', .' + baseConfig.classNames.anim_2).hide();
			
			setTimeout(function(){
				$('.' + baseConfig.classNames.anim_1).fadeIn('fast');				
			},350);
			
			setTimeout(function(){
				$('.' + baseConfig.classNames.anim_2).fadeIn('slow').children().html( (Gamecast.langId == "es" ? 'Disparo de ' : 'Shot by ') + player);
			},1500);
			
			setTimeout(function(){
				$('.' + baseConfig.classNames.ball_front).css({ bottom : bottom , left : left,  height : '26px', width : '26px' });
			},2700);
			
			setTimeout(function(){
				if(part.goal != "t"){
					$('.' + baseConfig.classNames.ball_front).attr('src',baseConfig.images.ballMiss);
				}
			},3400);
			
			setTimeout(function(){
				$('.' + baseConfig.classNames.anim_2).children().append("<br><br><br><div style='display:none'></div><b class='js-playResult' style='display:none'>" + txt + "</b>");
				$('.' + baseConfig.classNames.anim_2 + ' div').show().css('height',$('.anim-2 b').height());
				$('.' + baseConfig.classNames.anim_2 + ' b.js-playResult').fadeIn('slow');
			},3800);
			// return 0;
			setTimeout(function(){
				// $('.' + baseConfig.classNames.perspective_container).fadeOut('slow');
				
				Gamecast._isPlaying = false;
				
				if(part.shootout == "t"){
					renderPenalties(null,null,part.id);
					$('.appliedFilter').removeClass('appliedFilter');
					$('.showPenalties').addClass('appliedFilter');
					$('.' + baseConfig.classNames.perspective_container).css({overflow:'hidden',height:'280px'});
				}else{
					$('.' + baseConfig.classNames.perspective_container).fadeOut('slow');
					$('li.appliedFilter').trigger('click');
					$('.' + baseConfig.classNames.perspective_container).css({overflow:'auto',height:'374px'});
					// $('li[data-div=filterShots]').trigger('click');
				}
				
				if(Gamecast._queue.length){
					for (var play; Gamecast._queue.length && (play = Gamecast._queue.shift());) {
						var id = play.id;
						var isShootout = play.isShootout;
						var shootoutInProgress = (Gamecast._match.gameStatus.toLowerCase().indexOf('shootout') != -1);
						var playShot = true;
						
						if(shootoutInProgress && !isShootout){
							playShot = false;
						}
						
						if(!Gamecast._playedAnim[id]){
							Gamecast._playedAnim[id] = 0;
						}

						if(Gamecast._playedAnim[id] < 1 && playShot){
							renderPlay(String(id),isShootout);
							Gamecast._playedAnim[id] = Gamecast._playedAnim[id] + 1;
							return false;
						}
					}
				}
			},6100);
			
		}
		
		/*
		*	@param {Object} match
		*	@param {array} play
		*/
		
		function renderPlay(play,anim){
			
			play = (typeof play == 'string') ? filterPlay(_match.set,play) : play ;
			var isHome = (_match.home.id == play.teamId) ? true : false;
			var match = _match, parts = play && play.parts, part, i, len, left, top, id = play && play.id, coords = [], container = new Container(), color, player, ball;
			
			color = isHome ? '#' + _match.home.color : '#' + _match.away.color;
			
			$('.' + baseConfig.classNames.popup).hide();
			
			$('.' + baseConfig.classNames.perspective_container).hide();
						
			clearViewport();
			
			for (i = 0, len = parts.length; i < len; i++) {
			    part = parts[i];

			    left = part.startX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter;
				
			    top = part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin;
			
				coords.push({ id: play.id, videoId : play.videoId, shootout : play.shootout, goal : play.goal, player: part.player, resulttext : part.resulttext , result : part.result, x :part.startX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter, y : part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin, endX: part.endX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter, endY: part.endY * baseConfig.height, endZ : part.endZ });
				
				//Skip the player pointer if the next has same coords
				if( ! ( ( parseFloat(part.startX) == parseFloat(parts[i-1] && parts[i-1].startX)) && (parseFloat(parts[i-1] && parts[i-1].startY) == parseFloat(part.startY) ) ) ){
					
					player = new Shape();
					player.graphics.beginFill(color);
					// player.graphics.beginStroke(color);
					// player.graphics.setStrokeStyle(2);
					player.graphics.drawCircle(0.3, 0.3, baseConfig.playerRadius);
					player.x = left;
					player.y = top;
					player.shadow = new Shadow ( baseConfig.player.colors.shadow , 1 , 1 , 2 )
					player.result = part.result;
					player.color = color;

					//Add custom property
					player.playId = parseInt(id);

					//Place on Canvas
					container.addChild(player);
				}
				
				//Add ball and an event handler
				if(i == 0){
					
					//Push the starting point
					coords.unshift( {x: left, y: top, endX: part.endX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter, endY: part.endY * baseConfig.height} );
					
					ball = new Shape();
					ball.graphics.beginFill(color);
					ball.graphics.beginStroke(baseConfig.ball.colors.stroke);
					ball.graphics.setStrokeStyle(2);
					ball.graphics.drawCircle(0.4, 0.4, baseConfig.ballRadius);
					ball.x = part.startX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter;
					ball.y = part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin;
					ball.snapToPixel = true;
					ball.shadow = new Shadow ( baseConfig.ball.colors.shadow , 1 , 1 , 1 );
					ball.color = color;

					//Add custom property
					ball.playId = parseInt(id);
					ball.player = part.player;
					ball.result = part.result;

					container.addChild(ball);
					
					ball.onPress = function(){
						playParts(this,coords,container,play);
					}
				}
			}
			
			if(anim){
				animate(coords[1],isHome);
				
				return 0;
			}else{
				_stage.addChild(container);

				playParts(ball,coords,container,play);

				_stage.update();
			}
			
		}
		
		/*
		*	@return {Boolean} True if the animation was stopped
		*/
		
		function stopAnimation(){
			if(playParts._ball){
				Tween.removeTweens(playParts._ball);
				$('.' + baseConfig.classNames.popup).fadeOut('fast');
				return true;
			}
			return false;
		}
		
		function removeContainerByName(name){
			for( var i = 0, len = _stage.children.length; i < len; i++ ){
				if( _stage.children[i] && (_stage.children[i].name == name) ){
					_stage.removeChildAt(i);
				}
			}
			return false;
		}
		
		function addCloseLink(){
			var l, label, container = new Container();
			
			removeContainerByName('close');
			
			l = new Shape();
			l.graphics.beginFill('#111');
			l.graphics.drawRoundRect((baseConfig.width/2 - 28) + 2, 335, 60,15,4);
			l.alpha = 0.7;
			l.disableSort = true;

			label = new Text('CLOSE X');
			label.x = (baseConfig.width/2 - 28) + 9;
			label.y = 346;
			label.color = "#fff";
			label.shadow = new Shadow ('#333' , 1 , 1 , 2 );
			label.font = 'bold 10px Arial';
			label.disableSort = true;

			label.onPress = l.onPress = function(){
				stopAnimation();
				Gamecast._isPlaying = false;
				if($('.showPenalties').hasClass('appliedFilter')){
					renderPenalties();
				}else{
					$('li.appliedFilter').trigger('click');
					// $('li[data-div=filterShots]').trigger('click');
				}
			}

			container.name = 'close';

			container.addChild(l);

			container.addChild(label);

			_stage.addChild(container);
		}
		
		/*
		*	@param {object} match
		*	@param {object} ball
		*	@param {array} parts
		*	@param {object} stage
		*	@param {object} container
		*	@return {object}
		*/
		
		function playParts(ball,parts,container,obj){
			
			var i, len, pos, posEnd, part, path, lineSet = new Container(), ballTween, color, label, isHome;
			
			addCloseLink();
			
			isHome = (_match.home.id == obj.teamId);
			
			color = isHome ? '#' + _match.home.color : '#' + _match.away.color;
			
			stopAnimation();
			
			if(_container.children.length > 1){
				_container.children = [_container.children[0]];
			}
			
			container.children.reverse();
			
			$('.' + baseConfig.classNames.fieldClone).hide();
			
			$('.playerList, .tactList').slideUp();
			
			$('.selectedPlayerMap').hide();
			
			Gamecast._isPlaying = true;
			
			//Cache the prev ball, to stop previously running anim
			playParts._ball = ball;
			
			ballTween = Tween.get(ball);
			
			for( i = 1, len = parts.length; i < len; i++ ){
				part = parts[i];
				pos = { x: part.x, y: part.y };
				posEnd = { x: (!isNaN(part.endX)) ? part.endX : part.x , y: (!isNaN(part.endY)) ? part.endY : part.y };
				// posEnd = { x: part.endX, y: part.endY };
				
				/* i want the i, so lets do some Closure Magic! */
				
				(function(i){
					
					path = new Shape();
					
					ballTween
					.wait(100)
					.to(pos,1000)
					.call(function(){
						path.graphics.beginStroke(color);
						(i > 1)	? path.graphics.moveTo(parts[i-1].x,parts[i-1].y) : path.graphics.moveTo(ball.x,ball.y);			
						path.graphics.lineTo(parts[i].x,parts[i].y);
						path.alpha = 1;
						lineSet.addChild(path);
					})
					.wait(100)
					.call(function(){
						var offset = $('#' + baseConfig.canvas).position(),
						popup = $('.' + baseConfig.classNames.popup);
						
						popup.html(parts[i].result).css({ left: this.x + offset.left - (popup.outerWidth()/2), top: this.y + offset.top - popup.outerHeight() - 15 }).fadeIn('fast');
						if(this.color){
							$('b',popup).css('color',this.color);
						}
					})
					.wait(1000).call(function(){
						if( i+1 == len ){
							path.graphics.moveTo(parts[i].x,parts[i].y)
							path.graphics.lineTo(parts[i].endX,parts[i].endY)
						}
						$('.' + baseConfig.classNames.popup).fadeOut();
					});
										
					if( i+1 == len ){
						ballTween
						.to(posEnd,250)
						.call(function(){
							container.children.reverse();
						})
						.wait(500)
						.call(function(){
							animate(part,isHome);
						});
					}
				}(i))
			}
			
			_stage.addChild(lineSet);
			
			ballTween
			.wait(1500)
			.call(function(){
				path.alpha = 0;
			})
			.to({alpha:0},100)
			.to({ x: parts[0].x ,y: parts[0].y, alpha : 1 });
			
			return { ballTween : ballTween }
		}
		
		function getPlayersSide(name){
			var attack = _match && _match.attack; 
			for( var i=0, len = attack.length; i < len; i++ ){
				if( attack[i].player.toLowerCase() == name.toLowerCase() ){
					return ( parseInt(_match.home.id) == parseInt(attack[i].teamId) ) ? 'home' : 'away';
				}
			}
			return null;
		}
		
		function getPlayerAttack(id){
			var attack = _match && _match.attack; 
			for( var i=0, len = attack.length; i < len; i++ ){
				if( parseInt(attack[i].playerId) == parseInt(id) ){
					return attack[i];
				}
			}
			return null;
		}
		
		/*
		*	APIs
		*/
		game.Field = {
			init : init,
			filterPlay : filterPlay,
			renderPlay : renderPlay,
			renderTacticalInformation : renderTacticalInformation,
			filterSection : filterSection,
			renderViewport : renderViewport,
			renderPenalties : renderPenalties,
			filterGoals : filterGoals,
			getGoals : getGoals,
			getGrid : getGrid,
			getPlayers : getPlayers,
			getPlayersSide : getPlayersSide,
			getPlayerAttack : getPlayerAttack,
			updateHeatMap : updateHeatMap,
			renderHeatMap : renderHeatMap,
			stopAnimation : stopAnimation,
			getTeams : getTeams,
			addAttack : addAttack,
			addPlay : addPlay,
			removePlay : removePlay,
			updateScores : updateScores,
			updateClock : updateClock,
			updateGameStatusText : updateGameStatusText,
			updateGameStatus : updateGameStatus,
			clearViewport : clearViewport,
			playWatch : playWatch
		}
	}
	
	Gamecast.Modules.Soccer.Timeline = function(game){
		
		var baseConfig = {
			canvas : 'gcTimelineCanvas',
			height : 100,
			width : 930,
			url : './data/timeline_2.xml',
			timebar : {
				height : 19,
				width : 900,
				leftPadding : 15
			},
			teams : {
				home : {
					topPadding : 17	
				},
				away : {
					topPadding : 65
				}
			},
			popupPadding : 25,
			classNames : {
				timeline : 'gcTimeline',
				popup : 'timelinePopup',
				timebar : 'timebar'
			},
			colors : {
				controls : '#fff',
				background : '#fff',
				halfTime : {
					stroke : '#dbdbdb',
					shadow : '#555',
					background : '#dbdbdb',
					color : '#666'
				},
				fullTime : {
					stroke : '#111',
					background : '#333',
					color : '#fff'
				},
				eventShadow : '#555'
			},
			fonts : {
				fullTime : 'bold 10px Arial',
				teams : 'bold 15px Arial',
				axis : "bold 12px Arial"
			},
			images : {
				axis : daddyUrl + 'timebar.jpg'
			}
		},
		_timelineStage,
		_timelineData,
		_holder,
		_axis,
		_numbers,
		_events;
		
		/*
		*	
		*/
		function init(callback){
			
			var timelineStage,
			background,
			config = game.config && game.config.Timeline || {},
			canvas = config.canvas || baseConfig.canvas,
			url = config.url || baseConfig.url,
			label,
			baseContainer = new Container(),
			holder = new Container();
			
			holder.name = 'holder';
			
			_holder = holder;
			
			_events = new Container();
			
			_events.name = '_eventsContainer';
			
			_holder.addChild(_events);
			
			Gamecast._holder = holder;

			timelineStage = new Stage(canvas);
			
			_timelineStage = timelineStage;
			
			Gamecast._timelineStage = timelineStage;
			
			_timelineStage.offsetLeft = 0;

			timelineStage.mouseEventsEnabled = true;

			timelineStage.onMouseMove = function(e){
				showLabels(e)
			};

			timelineStage.autoClear = true;

			Ticker.setFPS(60);

			Ticker.addListener(timelineStage);

			fetch(url,function(data){
				
				var data = buildDataSet(data),
				clock = parseInt(data.clock);
				
				_timelineData = data;
				
				Gamecast._timelineData = _timelineData;
				
				buildAxis(clock);
				
				renderEvents(data.events, { home: "#" + data.home.color ,away: "#" + data.away.color });
				
				renderTimeline();
				
				setClockMarker( { clock : clock, gameStatusText : data.gameStatusText, gameStatus : data.gameStatus });
				
			},config.xdomain);
			
			baseContainer.name = 'base';
						
			background = new Shape();
			background.graphics.beginFill(baseConfig.colors.background);
			background.graphics.drawRect(0, 0, baseConfig.width, baseConfig.height);

			baseContainer.addChild(background);
			
			timelineStage.addChild(baseContainer);
			
			if(typeof callback == 'function'){
				callback(timelineStage)
			}
			
		}
		
		function buildAxis(clock){
			
			var timelineStage = _timelineStage, i, len, container = _axis || new Container(), background, numbers = new Container();
			
			container.name = 'axis';
			
			for( i = 0, len = (clock < 90) ? 90 : clock; i < len; i = i + 5 ){
				if( i > 0 ){
					var label = new Text(i);
					label.x = (10 * i) + baseConfig.timebar.leftPadding - 7;
					label.y = 56;
					label.font = baseConfig.fonts.axis;
					
					numbers.addChild(label);
				}
			}
			
			_axis = container;
			_numbers = numbers;
			
			_axis.addChild(numbers);
			_holder.addChildAt(_axis,0);
		}
		
		function fetch(url,callback,xdomain){
			game.get(url,function(data){
				if(xdomain){
					//Get the results from YQL
					// data = data.firstChild || data;
				}
				if( typeof callback == 'function'){
					callback(data);
				}
			},xdomain)
		}

		function buildDataSet(data){
			
			var home, away, events = [], clock, video, gameStatus, gameStatusText, obj, i, len, eventNode, eventNodes, eventObj, homeColor, awayColor;

			homeColor = /*game.rgb2hex($('.country h2:first').css('color')) ||*/ $('home',data).attr('color');

			awayColor = /*game.rgb2hex($('.country h2:last').css('color')) || */$('away',data).attr('color');

			home = { name : $('home',data).text(), color : /*'2b579e'*/ homeColor };
			away = { name : $('away',data).text(), color : /*'da2932'*/ awayColor };
			gameStatus = $('gameStatus',data).text();
			gameStatusText = $('gameStatusText',data).text();
			clock = $(data).attr('clock') || $('timeline',data).attr('clock');
			video = $(data).attr('videoEnabled') || $('timeline',data).attr('videoEnabled');
			eventNodes = $('event',data);

			for( i = 0, len = eventNodes.length; i < len ; i ++ ){
				eventNode = $(eventNodes[i]);
				eventObj = {
				    id: eventNode.attr('id'),
				    clock: eventNode.attr('clock'),
				    side: eventNode.attr('side'),
				    type: eventNode.attr('type'),
				    addedTime: eventNode.attr('addedTime'),
				    videoId: eventNode.attr('videoId'),
					result: $('result',eventNode).text()
				}
				events.push(eventObj);
			}

			obj = {
				home : home,
				away : away,
				gameStatus : gameStatus,
				gameStatusText : gameStatusText,
				clock : clock,
				video : video,
				events : events
			};
			
			return obj;
		}
		
		function showLabels(e){
			var offset = $('#' + baseConfig.canvas).position(),
			player = _timelineStage.getObjectsUnderPoint(e.stageX,e.stageY)[0],
			popup = $('.' + baseConfig.classNames.popup);
			
			if(player && player.info){
				popup.html(player.info).css({ left: (player.x) + offset.left - (popup.outerWidth()/2) - _timelineStage.offsetLeft, top: (player.top) + offset.top - popup.outerHeight() - 5 }).fadeIn('fast');
				if(player.goal === true){
					$('#' + baseConfig.canvas).css('cursor','pointer');
				}
				if(player.color){
					$('b',popup).css('color',player.color);
				}
			}else{
				$('#' + baseConfig.canvas).css('cursor','default');
				popup.fadeOut();
			}
		}
		
		function renderTimeline(){
			
			var data = _timelineData, timelineStage = _timelineStage, container, i, len, label, halfTime, halfTimeBg, fullTime, fullTimeBg, teamColor, container = new Container();


			teamColor = new Shape();
			teamColor.graphics.beginFill('#' + data.home.color);
			teamColor.graphics.drawRect(0,17,10,15);

			container.addChild(teamColor);
			
			label = new Text($('<div>' + (data.home.name).toUpperCase() + '</div>').text());
			label.x = 15;
			label.y = 30;
			label.color = "#666";//'#' + data.home.color;
			label.font = baseConfig.fonts.teams;
						
			container.addChild(label);

			teamColor = new Shape();
			teamColor.graphics.beginFill('#' + data.away.color);
			teamColor.graphics.drawRect(0,72,10,15);

			container.addChild(teamColor);
			
			label = new Text($('<div>' + (data.away.name).toUpperCase() + '</div>').text());
			label.x = 15;
			label.y = 85;
			label.color = "#666";//'#' + data.away.color;
			label.font = baseConfig.fonts.teams;
			
			container.addChild(label);
						
			timelineStage.addChild(container);
			
			container = new Container();
			container.name = 'halftime';
			
			halfTime = new Shape();
			halfTime.graphics.beginStroke(baseConfig.colors.halfTime.stroke);
			halfTime.graphics.moveTo(baseConfig.width/2 + 1,0);	
			halfTime.graphics.lineTo(baseConfig.width/2 + 1,100);
			// halfTime.shadow = new Shadow (baseConfig.colors.halfTime.shadow , 1 , 0 , 1 );
			
			container.addChild(halfTime);
			
			halfTimeBg = new Shape();
			halfTimeBg.graphics.beginFill(baseConfig.colors.halfTime.background);
			halfTimeBg.graphics.drawRoundRect(baseConfig.width/2 - 30,85,60,15,3);
			
			container.addChild(halfTimeBg);
			
			label = new Text('HALFTIME');
			label.x = (baseConfig.width/2 - 30) + 9;
			label.y = 96;
			label.color = baseConfig.colors.halfTime.color;
			label.font = '9px Arial'
			
			container.addChild(label);
			
			_axis.addChildAt(container,0);
			
		}
		
		function flushAxisNumbers(){
			return _numbers.parent.children.pop();
		}
		
		function removeChildObject(parent,childName){
			for( var i=0, max = parent.children.length; i < max; i++ ){
				if(parent.children[i] && parent.children[i].name == childName){
					parent.removeChildAt(i);
					return 1;
				}
			}
		}
		
		function setClockMarker(marker){
			
			var timelineStage = _timelineStage, fullTime, holder = _holder, controls, statusMarker = new Container(), label, fullTimeBg, timeBar, background,
			clock = marker.clock, gameStatusText = marker.gameStatusText || _timelineData.gameStatusText, gameStatus = marker.gameStatus || _timelineData.gameStatus;
			
			//Flush Old markers
			
			var ctrls = removeChildObject(timelineStage,'controls');
			
			removeChildObject(holder,'statusMarker');
			
			removeChildObject(_axis,'axisImage');
			
			timeBar = new Bitmap(baseConfig.images.axis);
			// timeBar.x = ((clock * 10) - baseConfig.timebar.width - baseConfig.timebar.leftPadding) - 600;
			timeBar.x = ((clock * 10) - baseConfig.timebar.width + baseConfig.timebar.leftPadding) - 600;
			timeBar.y = 42;
			timeBar.name = 'axisImage';
									
			_axis.addChildAt(timeBar,1);
						
			statusMarker.name = 'statusMarker';
			
			// label = new Text( ( gameStatus && gameStatus.indexOf("FINAL") != -1 || gameStatus && gameStatus == "HT" ) ? gameStatusText : clock + "'");
			label = new Text( gameStatusText );
			label.x = (clock * 10) - (label.getMeasuredWidth()/20) + baseConfig.timebar.leftPadding;
			label.y = 15;
			label.color = baseConfig.colors.fullTime.color;
			label.font = baseConfig.fonts.fullTime;
			label.textAlign = 'center';
			
			fullTime = new Shape();
			fullTime.graphics.beginStroke(baseConfig.colors.fullTime.stroke)
			fullTime.graphics.moveTo((clock * 10) + baseConfig.timebar.leftPadding,0);	
			fullTime.graphics.lineTo((clock * 10) + baseConfig.timebar.leftPadding,100);
			
			statusMarker.addChild(fullTime);
			
			fullTimeBg = new Shape();
			fullTimeBg.graphics.beginFill(baseConfig.colors.fullTime.background);
			fullTimeBg.graphics.drawRoundRect(label.x - (label.getMeasuredWidth() / 2) - 3 ,2,label.getMeasuredWidth() + 6,18,3);
			
			statusMarker.addChild(fullTimeBg);
			
			statusMarker.addChild(label);
			
			holder.addChild(statusMarker);
			
			timelineStage.addChild(holder);
			
			if(ctrls == 1 && clock < 91){
				var test = Tween.get(_holder);
				test.to( {x : 0},750);
				timelineStage.offsetLeft = 0;
			}
						
			if(clock > 90){
				controls = new Container();

				controls.name = 'controls';

				var left = new Shape();

				left.graphics.beginFill(baseConfig.colors.controls);
				left.graphics.drawPolyStar( 40, 51, 8, 3, 0.5, 180 );
				left.alpha = 0;
				left.shadow = new Shadow ( baseConfig.colors.eventShadow , 1 , 1 , 2 );
				left.onClick = function(){
					var test = Tween.get(_holder);
					test.to( {x : 0},750);
					timelineStage.offsetLeft = 0;
					right.alpha = 0.9;
					left.alpha = 0;
				}

				controls.addChild(left);

				var right = new Shape();

				right.graphics.beginFill(baseConfig.colors.controls);
				right.graphics.drawPolyStar( 930, 51, 8, 3, 0.5, 0 );
				right.alpha = 0.9;
				right.shadow = new Shadow ( baseConfig.colors.eventShadow , 1 , 1 , 2 );
				right.leftOffset = right.x;
				
				right.onClick = function(){
					var test = Tween.get(_holder),
					leftOffset = this.leftOffset - ( (clock * 10) - baseConfig.timebar.width );
					test.to( {x : leftOffset },750);
					timelineStage.offsetLeft = - (this.x - ( (clock * 10) - baseConfig.timebar.width ));
					left.alpha = 0.9;
					right.alpha = 0;
				}

				controls.addChild(right);

				timelineStage.addChildAt(controls,4);
								
				//move to the current pos and slide timer
				if(clock > 90){
					right.onClick();
				}
			}
			
		}
		
		function addEvent(eventObject){
			_timelineData.events.push(eventObject);
		}
		
		function updateClock(clock){
			_timelineData.clock = clock;
		}
		
		function updateGameStatusText(gameStatusText){
			_timelineData.gameStatusText = gameStatusText;
		}
		
		function updateGameStatus(gameStatus){
			_timelineData.gameStatus = gameStatus;
		}

		function renderEvents(events,colors){
			
			var timelineStage = _timelineStage, i, len, eventNode, y, x, type, color, isHome, eventsContainer = _holder || new Container(), events = events || _timelineData.events,
			colors = colors || { home: "#" + _timelineData.home.color ,away: "#" + _timelineData.away.color };
			
			//flush cache
			_events.children = [];
			Gamecast.Modules.Soccer.Timeline.renderedEvent['home'] = null;
			Gamecast.Modules.Soccer.Timeline.renderedEvent['away'] = null;
			
			for( i = 0, len = events.length; i < len; i++ ){
				eventNode = events[i];
				isHome = (eventNode.side == 'home') ? true : false;
				y =  isHome ? baseConfig.teams.home.topPadding : baseConfig.teams.away.topPadding;
				x = parseInt(eventNode.clock) * 10 + baseConfig.timebar.leftPadding - 7;
				type = eventNode.type;
				color = isHome ? colors.home : colors.away;
				eventNode.x = x;
				eventNode.y = y;
				eventNode.color = color;
				eventNode.eventsContainer = eventsContainer;
				renderEvent(eventNode)
			}
			
		}
				
		/*
		*	@param {object} eventNode
		*/
		
		function renderEvent(eventNode){
			
			var text = eventNode.result,
			timelineStage = _timelineStage,
			x = eventNode.x,
			y = eventNode.y,
			id = eventNode.id,
			type = eventNode.type,
			clock = eventNode.clock,
			count,
			image,
			renderedEvent,
			eventImg,
			pointer,
			pointerY,
			isAway = (eventNode.side == 'away') ? true : false,
			color = (isAway) ? _timelineData.away.color : _timelineData.home.color,
			container = _events || new Container(),
			lang = game.language || 'en';
			
			switch(type){
				case 'goal':
					image = daddyUrl + 'goal_icon.png';
					if(text.toLowerCase().indexOf('own goal') != -1){
						image = daddyUrl + 'goal_icon_red.png';
					}
				break;
				case 'substitution':
					image = daddyUrl + 'substitution.png';					
				break;
				case 'yellowCard':
					image = daddyUrl + 'yellowCard.png';					
				break;
				case 'redCard':	
					image = daddyUrl + 'redCard.png';					
				break;
				default:
				break;
			}
			
			renderedEvent = Gamecast.Modules.Soccer.Timeline.renderedEvent;
			
			if(!renderedEvent[eventNode.side]){
				renderedEvent[eventNode.side] = {};
			}
			
			if(!renderedEvent[eventNode.side][clock]){
				renderedEvent[eventNode.side][clock] = [];
			}
			
			renderedEvent[eventNode.side][clock].push(id);
			
			count = renderedEvent[eventNode.side][clock].length;
			
			x = x + (count * 5);
			
			y = isAway ? y + (count * 5) - 5 : y - (count * 5) + 5;
			
			if(count == 1){
				pointer = new Shape();
				pointer.name = eventNode.side + '-' + clock;
				pointer.graphics.beginFill(color);
				pointerY = (isAway) ? y - 1 : y + 23;
				pointer.graphics.drawPolyStar( x + 3, pointerY, 5, 3, 0.5, (isAway) ? -90 : 90 );
				container.addChild(pointer);	
			}
						
			eventImg = new Bitmap(image);
			eventImg.x = x + 3 - 8 + 0.5;  //(x+3) : x of pointer , 0.5 pointer of radius, 8: 1/2 img w
			eventImg.y = y + 5;
			eventImg.info = text;
			eventImg.id = id;
			eventImg.top = eventImg.y;
			eventImg.color = (!isAway) ? '#' + _timelineData.home.color : '#' + _timelineData.away.color;
			eventImg.clock = clock;
			eventImg.side = eventNode.side;
			
			if(eventNode.videoId && window.country == 'united states'){
				var play = new Bitmap(daddyUrl + 'play_icon.png');
				play.x = x + 3 - 8 + 2;  //(x+3) : x of pointer , 0.5 pointer of radius, 8: 1/2 img w
				play.y = y + 5 - 15;
				play.info = text;
				play.id = id;
				play.top = eventImg.y - 15;
				play.color = (!isAway) ? '#' + _timelineData.home.color : '#' + _timelineData.away.color;
				play.clock = clock;
				play.side = eventNode.side;
				
				if(isAway){
					play.x = x - 1.5;
					play.y = y + 17 + 5;
					play.top = eventImg.y + 10;
				}
				container.addChild(play);
			}
			
			if(!isAway){
				eventImg.rotation = 180;
				eventImg.x = x + 8 + 2;
				eventImg.y = y + 17;
			}
			
			if(type == 'goal'){
				eventImg.goal = true;
				eventImg.onPress = function(){
					if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
						$('li[data-div="filterGoals"]').trigger('click');
						Gamecast.Modules.Soccer.Field.renderPlay(eventImg.id);
					}
				}
			}
			
			//TODO : add watch function
			if(play){
				play.goal = true;
				eventImg.onPress = play.onPress = function(){
					if(!Gamecast._isPlaying){
						Gamecast.Field.playWatch(eventNode.videoId);
					}
				};
			}
			
			container.addChild(eventImg);
			
		}
		
		function removeEvent(id){
			var events = _timelineData.events;
			for( var i=0, len = events.length; i < len; i++){
				var ev = events[i];
				if(parseInt(id) == parseInt(ev.id)){
					var newEvents = game.removeElementFromArray(events,ev);
					_timelineData.events = newEvents;
					return ev;
				}
			}			
		}
		
		/*
		*	APIs
		*/
		game.Timeline = {
			init : init,
			renderEvent : renderEvent,
			renderEvents : renderEvents,
			addEvent : addEvent,
			buildAxis : buildAxis,
			updateClock : updateClock,
			updateGameStatus : updateGameStatus,
			updateGameStatusText : updateGameStatusText,
			setClockMarker : setClockMarker,
			removeChildObject : removeChildObject,
			flushAxisNumbers : flushAxisNumbers,
			removeEvent : removeEvent
		};
		
		Gamecast.Modules.Soccer.Timeline.renderedEvent = {};
	};

	Gamecast.prototype = {
		init : function(){
			// console.log('1377')
		},
		getColorPercent : function(start, end, percent){
			function hex2dec(hex){return(parseInt(hex,16));}
			function dec2hex(dec){return (dec < 16 ? "0" : "") + dec.toString(16);}
			var r1 = hex2dec(start.slice(0,2)), g1=hex2dec(start.slice(2,4)), b1=hex2dec(start.slice(4,6));
			var r2 = hex2dec(end.slice(0,2)),   g2=hex2dec(end.slice(2,4)),   b2=hex2dec(end.slice(4,6));
			var pc = percent/100;
			var r  = Math.floor(r1+(pc*(r2-r1)) + .5), g=Math.floor(g1+(pc*(g2-g1)) + .5), b=Math.floor(b1+(pc*(b2-b1)) + .5);
			return("#" + dec2hex(r) + dec2hex(g) + dec2hex(b));
		},
		toTitleCase : function(str){
			return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		},
		getLocalizedText : function(language,text){
			
			// text = $.trim(text.toLowerCase());
			
			var languageMap = {
				"COMPLETE TEAM" : {
					"es" : "PLANTEL COMPLETO"
				}
			};
			
			return languageMap[text] && languageMap[text][language] && this.toTitleCase(languageMap[text][language]) || text;
		},
		wait : (function(){
		  var timer = 0;
		  return function(callback, ms){
		    clearTimeout (timer);
		    timer = setTimeout(callback, ms);
		  };
		})(),
		sortArray : function(array,index){
			var x = [];
			for( var i=0, len = array.length; i <len; i++ ){
				if(i !== index){
					x.push(array[i])
				}
			}
			x.push(array[index]);
			return x;
		},
		get : function(url,callback,xdomain){
			if(xdomain){
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
				return $.get('http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url +'"') ,callback);
			}else{
				return $.get(url,callback);
			}
		},
		removeElementFromArray : function(arr,child){
			var x = [];
			for( var i=0, len = arr.length; i < len; i++){
				if(arr[i] != child){
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
		extendDeep : function(parent, child) {
		    var i,
		    toStr = Object.prototype.toString,
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
		name : 'Gamecast',
		version : '1.0',
		getName : function(){
			return this.sport + ' ' + this.name;
		},
		copyrights : "© ESPN International",
		author : 'Nihar.Kabinittal@espn.com'
	}
	window.Gamecast = Gamecast;
}());
/** GENERATED: Wed May 21 23:52:26 PDT 2014 **/
$(document).ready(function(){
	
	"use strict";

	var params = getParams(),
	isDev = params.dev || 0,
	sessionName = Gamecast.sessionId || params.sessionName;
	
	makeCasterConnection(isDev,sessionName,params);
	
	if(!isCanvasSupported()){
		$('#gcField').remove();
		$('#soccerGameCast').append('<div id="gcField">Please upgrade your browser to latest version of Internet explorer / Chrome / Safari / Firefox to view the HTML5 Gamecast experience.</div>');
		$('#gcTimelineCanvas, .gamecastFilters').hide();
		return false;
	}
	
	/* Override text color for selected tabs */
	if(params.selectedColor){
		var selectedColor = params.selectedColor;
		(function(){
			// make a new stylesheet
			var ns = document.createElement('style');
			document.getElementsByTagName('head')[0].appendChild(ns);

			if (!window.createPopup) {
			   ns.appendChild(document.createTextNode(''));
			}
			var s = document.styleSheets[document.styleSheets.length - 1];

			var rules = {
			   '.tabWrap div[class^="filter"] li.appliedFilter' : '{ color:' + selectedColor + '; }',
			   '.soccerGameCast .filterTabs .selected' : '{ color:' + selectedColor + ';}'
			}

			for (selector in rules) {
			   if (s.insertRule) {
			      // it's an IE browser
			      try { 
			         s.insertRule(selector + rules[selector], s.cssRules.length); 
			      } catch(e) {}
			   } else {
			      // it's a W3C browser
			      try { 
			         s.addRule(selector, rules[selector]); 
			      } catch(e) {}
			   }               
			}	
		}());
	}
	
	var matchId = Gamecast.matchId || params.id || 318146,
	lang = params.lang || 'en',
	langId = (Gamecast.langId == "es") ? 1 : 0,
	gameCastOptions = {
		language : Gamecast.langId,
		sport : 'Soccer',
		modules : ["Timeline","Field"], //or use "*" to load all modules
		callback : onLoadGameCast,
		config : {
			Timeline : {
				url : 'http://www.espnfc.com/gamepackage10/data/timeline?gameId=' + matchId +  '&langId=' + langId + '&snap=0',
				xdomain : true,
				width: Gamecast.timelineWidth && parseInt(Gamecast.timelineWidth) || params.timelineWidth && parseInt(params.timelineWidth) || null,
				background : params.timelineBgColor || '#fff'
			},
			Field : {
				url : 'http://www.espnfc.com/gamepackage10/data/gamecast?gameId=' + matchId + '&langId=' + langId + '&snap=0',
				xdomain : true,
				logo:{
					path : './images/espn-logo.png',
					width : 171,
					height : 43,
					opacity : 0.15
				},
				enableLogo : false,
				width: Gamecast.timelineWidth && parseInt(Gamecast.timelineWidth) || params.pitchWidth && parseInt(params.pitchWidth) || null
			},
			Watch : {
				url : 'http://espn.go.com/espn3/feeds/marker/getMarkers?gameId=303630012', //should pass match id
				xdomain : true,
				width : 768, 
				height : 432
			}
		}
	},
	iframeWidth = $(window).width(),
	iframeHeight = $(window).height();

	if(window.self !== window.top && Gamecast && !params.pitchWidth && !params.timelineWidth){
		gameCastOptions.config.Timeline.width = iframeWidth;
		gameCastOptions.config.Field.width = iframeWidth;
	}

	// If dimensions less than min, use min
	if(gameCastOptions.config.Timeline.width < 630){
		gameCastOptions.config.Timeline.width = 630;
	}else if(gameCastOptions.config.Timeline.width > 980){
		gameCastOptions.config.Timeline.width = 980;
	}

	if(gameCastOptions.config.Field.width < 350){
		gameCastOptions.config.Field.width = 350;
	}else if(gameCastOptions.config.Field.width > 680){
		gameCastOptions.config.Field.width = 680;
	}
	
	//disable cross domain request on prod
	if(window.location.href.indexOf('http://www.espnfc.com') != -1 || window.location.href.indexOf('http://espnfc.com') != -1){
		gameCastOptions.config.Timeline.url = '/gamepackage10/data/timeline?gameId=' + matchId +  '&langId=' + langId + '&snap=0';
		gameCastOptions.config.Timeline.xdomain = false;
		gameCastOptions.config.Field.url = '/gamepackage10/data/gamecast?gameId=' + matchId +  '&langId=' + langId + '&snap=0';
		gameCastOptions.config.Field.xdomain = false;
	}

	if(window.location.href.indexOf('http://test.espn.go.com') != -1){
		gameCastOptions.config.Timeline.url = '/soccernet/gamepackage10/data/timeline?gameId=' + matchId +  '&langId=' + langId + '&snap=0';
		gameCastOptions.config.Timeline.xdomain = false;
		gameCastOptions.config.Field.url = '/soccernet/gamepackage10/data/gamecast?gameId=' + matchId +  '&langId=' + langId + '&snap=0';
		gameCastOptions.config.Field.xdomain = false;
	}
	
	new Gamecast(gameCastOptions);
	
	function onLoadGameCast(gamecast){
				
		// console.log(gamecast, 'HTML5 ' + gamecast.getName() + ' ' + gamecast.version + ' ' + gamecast.copyrights + ', author ' + gamecast.author);
		
		var timeline = gamecast.Timeline,
		gamecastDiv = $('#soccerGameCast');
		
		Gamecast.Timeline = gamecast.Timeline;
		Gamecast.Field = gamecast.Field;
		
		timeline.init(function(timelineStage){
			Gamecast.setClock = timeline.setClockMarker;
			Gamecast.renderEvent = timeline.renderEvent;
		});
		
		var field = gamecast.Field,
		firstHalf = function(play){ if(play.clock <= 45 && play.shootout == 'f'){ return true; } },
		secondHalf = function(play){ if(play.clock > 45 && play.clock <= 90 && play.shootout == 'f'){ return true; } },
		extraTime = function(play){ if(play.clock > 90 && play.shootout == 'f'){ return true; } },
		justGoals = function(play){ if( play.goal == 't' && play.shootout == 'f'){ return true; } },
		justShots = function(play){ if( play.shootout == 'f'){ return true; } };
		
		field.init(function(match,stage){
			
			gamecastDiv
			.delegate('.closeWatch','click',function(){
				espn.video.pause();
				$('#gcField, #gcFieldVector').css('visibility','visible');
				$('.videoplayer').height('0px');
				$(this).hide();
				//$('li[data-div=filterShots]').trigger('click');
				if(Gamecast._match.gameStatusText != "V"){
					$('li.appliedFilter').filter(':visible').trigger('click');
				}
			})
			.delegate('.activeGame .reset','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {};
					filtered.set = field.filterSection(Gamecast._match.set,justShots)
					filtered.home = match.home;
					filtered.away = match.away;
				
					field.renderViewport(filtered);
					$('.soccerGameCast .selectedPlayerMap').hide();
				}
			})
			.delegate('.activeGame .resetGoals','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {};
					filtered.set = field.filterSection(Gamecast._match.set,justGoals)
					filtered.home = match.home;
					filtered.away = match.away;
				
					field.renderViewport(filtered);
					$('.soccerGameCast .selectedPlayerMap').hide();
				}
			})
			.delegate('.activeGame .showPenalties','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					field.clearViewport();
					var penalties = Gamecast.Field.filterSection(Gamecast._match.set,function(play){ if( play.shootout == 't'){ return true; } });
					if(penalties.length){
						field.renderPenalties();
					}
				}
			})
			.delegate('.activeGame .firstHalf','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {};
					filtered.set = field.filterSection(Gamecast._match.set,firstHalf);
					filtered.home = match.home;
					filtered.away = match.away;
				
					field.renderViewport(filtered);
					$('.soccerGameCast .selectedPlayerMap').hide();
				}
			})
			.delegate('.activeGame .secondHalfGoals','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {};
					var set = field.filterSection(Gamecast._match.set,secondHalf);
					filtered.set = field.filterGoals(set);
					filtered.home = match.home;
					filtered.away = match.away;
				
					field.renderViewport(filtered);
				}
			})
			.delegate('.activeGame .firstHalfGoals','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var set = field.filterSection(Gamecast._match.set,firstHalf);
				
					var filtered = {
						home : match.home,
						away : match.away,
						set : field.filterGoals(set)
					};
				
					field.renderViewport(filtered);
				}
			})
			.delegate('.activeGame .extraGoals','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {};
					var set = field.filterSection(Gamecast._match.set,extraTime);
					filtered.set = field.filterGoals(set);
					filtered.home = match.home;
					filtered.away = match.away;
				
					field.renderViewport(filtered);
				}
			})
			.delegate('.activeGame .extraShots','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {
						home : match.home,
						away : match.away,
						set : field.filterSection(Gamecast._match.set,extraTime)
					};
				
					field.renderViewport(filtered);
				}
			})					
			.delegate('.activeGame .secondHalf','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {
						home : match.home,
						away : match.away,
						set : field.filterSection(Gamecast._match.set,secondHalf)
					};
				
					field.renderViewport(filtered);
				}
			})
			.delegate('.activeGame .homeTacticalInfoStart','click',function(){
				field.renderTacticalInformation(match.home.id);
				$('.soccerGameCast .selectedPlayerMap').hide();
			})
			.delegate('.activeGame .homeTacticalInfoAvg','click',function(){
				field.renderTacticalInformation(Gamecast._match.home.id,'average');
				$('.soccerGameCast .selectedPlayerMap').hide();
			})
			.delegate('.activeGame .awayTacticalInfoStart','click',function(){
				field.renderTacticalInformation(match.away.id);
				$('.soccerGameCast .selectedPlayerMap').hide();
			})
			.delegate('.activeGame .awayTacticalInfoAvg','click',function(){
				field.renderTacticalInformation(Gamecast._match.away.id,'average');
				$('.soccerGameCast .selectedPlayerMap').hide();
			})
			.delegate('.activeGame .heatMapHome','click',function(){
				var sel = $('.soccerGameCast .selectedPlayerMap'); 
				var map = match.attack[0].grid.split('~');
				field.renderHeatMap(map);
				$('.soccerGameCast .selectedPlayerMap').show().text($(this).text()).css({'left':(gamecast._fieldCanvasWidth/2)-(sel.outerWidth()/2)-30,color: '#' + Gamecast._match.home.color});
			})
			.delegate('.activeGame .heatMapAway','click',function(){
				var sel = $('.soccerGameCast .selectedPlayerMap'); 
				var map = match.attack[1].grid.split('~');
				field.renderHeatMap(map);
				$('.soccerGameCast .selectedPlayerMap').show().text($(this).text()).css({'left':(gamecast._fieldCanvasWidth/2)-(sel.outerWidth()/2)-30,color: '#' + Gamecast._match.away.color});
			})
			.delegate('.activeGame .heatMap','click',function(){
				var sel = $('.soccerGameCast .selectedPlayerMap');
				var id = $(this).data('player-id');
				var grid = field.getGrid(match.attack,id);
				if(grid){
					field.renderHeatMap(grid);
					$('.soccerGameCast .selectedPlayerMap').show().text($(this).text()).css({'left':(gamecast._fieldCanvasWidth/2)-(sel.outerWidth()/2)-30,color:$(this).parents('table').css('borderTopColor')});
				}
			})
			.delegate('.activeGame .tabWrap table','click',function(){
				$(this).parents('.playerList, .tactList').slideUp();
			})
			.delegate('.activeGame .tabWrap li','click',function(){
				$('.tabWrap li').removeClass('appliedFilter');
				$(this).addClass('appliedFilter');
			})
			.delegate('.activeGame .perspective-container','click',function(){
				$(this).fadeOut();
			})
			.delegate('.activeGame .filterTabs li','click',function(){
				var self = $(this),
				div = self.data('div'),
				txt = self.text();
				
				$('.filterTabs li.selected').removeClass('selected');
				self.addClass('selected');
				$('.tabWrap div').removeClass('active');
				
				if(txt == "Goals" || txt == "Shots" || txt == "Disparos" || txt == "Goles"){
					$('.' + div + ' li:first').addClass('appliedFilter').trigger('click');
					$('.' + div).addClass('active');
				}else{
					if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
						$('.' + div).addClass('active');
						field.stopAnimation();
						field.clearViewport();
						Gamecast.Field.update();
						$('.soccerGameCast .playerList, .soccerGameCast .tactList').hide().slideDown();	
						$('.soccerGameCast .selectedPlayerMap').hide();
					}
				}
			});
			
			var teams = field.getTeams(),
			table;

			table = '<div class="tactList"><table class="homeTeam top-mark" style="border-top-color:' + teams.home.color + '">'
						+ '<tbody>' 
							+ '<tr class="homeTacticalInfoStart"><td>Start Position</td></tr>'
							+ '<tr class="homeTacticalInfoAvg"><td>Average Position</td></tr>'
						+ '</tbody>'
					+ '</table>'
					+ '<table class="awayTeam top-mark" style="border-top-color:' + teams.away.color + '">'
						+ '<tbody>' 
							+ '<tr class="awayTacticalInfoStart"><td>Start Position</td></tr>'
							+ '<tr class="awayTacticalInfoAvg"><td>Average Position</td></tr>'
						+ '</tbody>'
					+ '</table></div>';

			$('.showTacticalInformation',gamecastDiv).append(table);
			
			Gamecast.Field.update = function(){
				
				var players,
				list = '<div class=""></div>',
				goals = field.getGoals(true),
				str,
				i,
				j,
				leng,
				player,
				position,
				team,
				isHome,
				teamName,
				color,
				time;
				
				var t1 = $('.stat-table:first tr');
				var t2 = $('.stat-table:last tr');
				var comp = (Gamecast.langId == 'es') ? 'PLANTEL COMPLETO' : 'COMPLETE TEAM';
				
				if(t1.length && t2.length){
					list += buildPlayerList(t1,'home') + buildPlayerList(t2,'away');
				}else{
					players = field.getPlayers(Gamecast._match.attack,function(attack){ if(attack.grid){ return true; }else{ return false; } });
					
					for( j in players ){
						team = players[j];
						isHome = (match.home.id == j);
						teamName = (isHome) ? match.home.name : match.away.name;
						color = (isHome) ? match.home.color : match.away.color;
						list += '<table class="top-mark ' + (isHome ? '_home' : '_away') + '" style="border-top-color: #' + color + '; margin:0;">';
						list += '<tr><td class="' + (isHome ? 'heatMapHome' : 'heatMapAway') + '" >' + comp + '</td></tr>';
						for( i=0, leng = team.length;i < leng; i++ ){
							player = team[i];
							position = player.position ? "<em>" + player.position + " - </em>" : '';
							list +=	'<tr><td class="heatMap" data-player-id="' + player.id + '">' + position + player.name + '</em></td></tr>'
						}
						list += '</table>';
					}
				}
				
				function buildPlayerList(rows,side){
					var cache = {};
					var color = (side == 'home') ? match.home.color : match.away.color;
					var classMark = (side == 'home') ? '_home' : '_away';
					var list = '<table class="top-mark ' + classMark + '" style="border-top-color: #' + color + '">';
					var className = (side == 'home') ? 'heatMapHome' : 'heatMapAway';
					var comp = (Gamecast.langId == 'es') ? 'PLANTEL COMPLETO' : 'COMPLETE TEAM';
					list += '<tr><td class="' + className + '" >' + comp + '</td></tr>';

					for (var i = 0, max = rows.length; i < max; i++) {
						var pos = "<em>" + $('.first', rows[i]).text() + " - </em>";
						var anchor = $('.last a', rows[i]);
						var name = anchor.text();
						var href = anchor.attr('href');
						var id;
						if(href){
							id = parseInt(href.split('/')[3]);
							id = (isNaN(id)) ? parseInt(href.split('/')[4]) : id;
							id = (isNaN(id)) ? parseInt(href.split('/')[6]) : id;
						}
						if(id && name && pos){
							if(!cache[id]){
								cache[id] = 1;
								list +=	'<tr><td class="heatMap" data-player-id="' + id + '">' + pos + name + '</em></td></tr>'
							}
						}
					}
					list += '</table>';
					
					return list;
				}

				$('.showHeatMaps',gamecastDiv).html('<div class="playerList">' + list + '</div>');
			
				// $('.fauxTopBorder',gamecastDiv).css('background-color','#' + match.away.color);

				$('.tactList, .playerList','.soccerGameCast').width(gamecast._fieldCanvasWidth + 'px');

				$('.tactList table, .playerList table','.soccerGameCast').width('50%');

				$('.fauxTopBorder').hide();

			}			

			espn.video.embed({
				'player': "espnfcgameCast",
				'width': gamecast._fieldCanvasWidth,
				'height': gamecast._fieldCanvasHeight,
				'cms': "espn"
			});

			$('.closeWatch').css('left', ((gamecast._fieldCanvasWidth / 2) - ($('.closeWatch').width() / 2) + 'px'));
			
		})
	}
	
	function updateMarker(gameId,obj){
		if(gameId.split('-')[2] != matchId){
			return false;
		}
		var values = obj[2].split('|');
		var clock = parseInt(values[0].replace("'",''));
		if($.trim(obj[3]) == 'live' && clock == 1){
			Gamecast.Field.clearViewport();
		}
		if(obj[3] && $.trim(obj[3]) != 'pregame' && (clock > 0)){
			Gamecast.setClock( { clock: clock, gameStatusText:values[0] } );
			if(!Gamecast.started){
				Gamecast.started = true;
				Gamecast.Field.clearViewport();
			}
		}
	}
	
	function updateAttacks(gameId,value){
		var gameVals = gameId.split('-');
		if(gameVals[0] != matchId){
			return false;
		}
		var values = value.split('|');
		var jersey = values[0];
		var player = values[1];
		var playerId = parseInt(gameVals[3]);
		var teamId = gameVals[2];
		var position = values[3];
		var x = values[12];
		var y = values[13];
		var avgX = values[10];
		var avgY = values[11];
		var grid = '';
		var old = Gamecast.Field.getPlayerAttack(gameVals[3]);
		if(old.grid){
			grid = old.grid
		}
		var obj = { avgX : avgX, avgY : avgY, grid : grid, gridMax : null, jersey : jersey, left : '0' , middle : '0' , player: player, playerId : playerId , posX : x, posY : y , right:'0' , position : position , teamId : teamId };
		Gamecast.Field.addAttack(obj);
		if(avgX >0 && avgY > 0){
			Gamecast.Field.updateHeatMap(obj,avgX,avgY);
			var vis = $('li[data-div=showHeatMaps],li[data-div=showTacticalInformation]').is(':visible');
			if(!updateAttacks.enabled && !vis){
				$('li[data-div=showHeatMaps],li[data-div=showTacticalInformation]').show();
				updateAttacks.enabled = true;
			}
			if(vis && !updateAttacks.enabled){
				updateAttacks.enabled = true;
			}
		}
	}
	updateAttacks.enabled = false;
	
	function updateTimelinePos(gameId,value){
		
		if(matchId != gameId.split('-')[1]){
			return false;
		}

		var values = value.split('|'),
		clock = values[2],
		gameStatus = values[4],
		gameStatusText = values[5],
		homeScore = values[0],
		awayScore = values[1],
		pens = values[3];
		
		//penalties - change the field, add empty markers
		if(pens == 'p'){
			$('li[data-div=filterShots]').trigger('click');
			$('.showPenalties:first').trigger('click');
			Gamecast.Field.renderPenalties(1);
		}

		if(clock > 90){
			//rebuild axis
			Gamecast.Timeline.flushAxisNumbers();
			Gamecast.Timeline.buildAxis(120);
		}
		
		if(gameStatus == 'INPROGRESS' || gameStatus == 'SHOOTOUT' || gameStatus.indexOf('FINAL') != -1 || gameStatus == 'FINAL/SHOOTOUT'){
			Gamecast.setClock( {clock:clock, gameStatus:gameStatus, gameStatusText:gameStatusText } );

			if(!Gamecast.started){
				Gamecast.started = true;
				Gamecast.Field.clearViewport();
			}

			//update the object
			Gamecast._match.gameStatus = gameStatus;
			Gamecast._match.gameStatusText = gameStatusText;
			Gamecast._match.clock = clock;
			Gamecast._match.homeScore = homeScore;
			Gamecast._match.awayScore = awayScore;			
		}
	}
	
	function addEventToTimeline(gameId,value){
		if(matchId != gameId.split('-')[1]){
			return false;
		}
		var values = value.split('|');
		if(gameId.indexOf('t') != -1){
			
			var type = values[3];
			
			if( type == 'substitution' || type == 'yellowCard' || type == 'redCard' ){
				var id = values[0];
				var clock = values[1];
				var extra = values[2];
				if(type == 'substitution'){ extra = '' }
				var side = values[2];
				var y = (side == 'home') ? 17 : 65;
				var x = parseInt(clock) * 10 + 15 - 7;//parseInt(clock) * 10 - 7;
				var type = values[3];
				var res;
				var text = (langId == 0) ? values[4] : values[5];
				var pens = values[12];
				
				if(type == 'substitution'){
					var on = (langId == 0) ? 'On': 'Cambio-Entra';
					var off = (langId == 0) ? 'Off': 'Cambio-Sale';
					res = "<b>" + on + ": " + values[8] + '</b> - ' + clock + "'" + extra + "<br>" + off + ': ' + values[10];	
				}else if( type == 'yellowCard' || type == 'redCard' ){
					res = '<b>' + values[8] + '</b> - ' + clock + "'<br>" + text;
				}
				
				if(addEventToTimeline.cache[id]){
					var old = Gamecast.Timeline.removeEvent(values[0]);
					Gamecast.Timeline.renderEvents();
					delete addEventToTimeline.cache[values[0]];
				}
					
				var renderedEvent = Gamecast.Modules.Soccer.Timeline.renderedEvent;
				var alreadyAdded = false;
				for (var i in renderedEvent[side]) {
					if($.inArray(id,renderedEvent[side][i]) != -1){
						//already added
						alreadyAdded = true;
					}
				}
				if(!alreadyAdded){
					addEventToTimeline.cache[id] = 1;
					var ev = { result : res , x: x , y: y, id: id, type: type, clock: clock , side: side, videoId : values[12] || old && old.videoId || '' };
					Gamecast.Timeline.addEvent(ev);
					Gamecast.renderEvent(ev);						
				}
			}
			
			if( values[7].indexOf('Goal') != -1 && pens != 'p' && values[11] != 't'){
				var id = values[0];
				var clock = values[1];
				var extra = values[2];
				var side = Gamecast.Field.getPlayersSide(values[6]);
				var y = (side == 'home') ? 17 : 65;
				var x = parseInt(clock) * 10 + 15 - 7;
				var type = 'goal';
				var text = (langId == 0) ? values[7] : values[8];
				var res = '<b>' + values[6] + '</b> - ' + clock + "'" + extra + "<br>" + text;
				
				if(addEventToTimeline.cache[id]){
					var old = Gamecast.Timeline.removeEvent(values[0]);
					Gamecast.Timeline.renderEvents();
					delete addEventToTimeline.cache[values[0]];
				}
				
				var renderedEvent = Gamecast.Modules.Soccer.Timeline.renderedEvent;
				var alreadyAdded = false;
				for (var i in renderedEvent[side]) {
					if($.inArray(id,renderedEvent[side][i]) != -1){
						//already added
						alreadyAdded = true;
					}
				}
				if(!alreadyAdded){
					addEventToTimeline.cache[id] = 1;
					var ev = { result : res , x: x , y: y, id: id, type: type, clock: clock , side: side, videoId: values[10] || old && old.videoId || '' };
					Gamecast.Timeline.addEvent(ev);
					Gamecast.renderEvent(ev);
				}
			}
			
			if( values[7].indexOf('Goal') != -1 || values[7].indexOf('Shot') != -1 || values[7].indexOf('Free Kick') != -1 || values[7].indexOf('Penalty') != -1 ){
				
				var allParts = values.slice(19);
				var partsAr = [];
				
				for( var i=0, len = allParts.length; i < len ; i++){
					if(allParts[i]){
						var parts = allParts[i].split('^');
						var text = (langId == 0) ? parts[9] : parts[11];
						var resultText = (langId == 0) ? parts[10] : parts[12];
						var temp = {
					        "pId": parts[0],
					        "jersey": parts[1],
					        "startX": parts[2],
					        "startY": parts[3],
					        "endX": parts[5],
					        "endY": parts[6],
					        "endZ": parts[7],
					        "player": parts[8],
					        "result": "<b>" + parts[8] + "</b><br>" + text,
					        "resulttext": resultText
					    };
						partsAr.push(temp);
						if(parts[0]){
							var playerAttack = Gamecast.Field.getPlayerAttack(parts[0]);
							if(playerAttack && parts[2] && parts[3]){
								Gamecast.Field.updateHeatMap(playerAttack,parts[2],parts[3]);
							}	
						}	
					}
				}
				
				var text = (langId == 0) ? values[7] : values[8];

				var newPlay = {
				    "id": values[0],
				    "clock": values[1],
				    "addedTime": values[2],
				    "period": values[12],
				    "startX": parts[2],
				    "startY": parts[3],
				    "teamId": values[3],
				    "goal": values[4],
				    "ownGoal": values[5],
				    "videoId": values[10],
				    "shootout": values[11],
				    "player": values[6],
				    "result": "<b>" + values[6] + " </b> - " + values[1] + "'" + values[2] + "<br>" + text,
				    "shotbytext": "",
				    "topscoretext": "",
				    "parts": partsAr
				}
				Gamecast.Field.addPlay(newPlay);
				
				var id = values[0];
				
				var isShootout = (values[11] == 't') ? true : false;
				
				var isGoal = values[4];
				
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){	
					
					if(!Gamecast._playedAnim[id]){
						Gamecast._playedAnim[id] = 0;
					}
					
					var shootoutInProgress = (Gamecast._match.gameStatus.toLowerCase().indexOf('shootout') != -1);
					var playShot = true;

					if(shootoutInProgress && !isShootout){
						playShot = false;
					}

					if(!shootoutInProgress){
						$('li.appliedFilter').trigger('click');
					}
					
					if(Gamecast._playedAnim[id] < 2 && Gamecast._match.gameStatus.indexOf('FINAL') == -1 && playShot && Gamecast._match.gameStatus != 'FINAL/SHOOTOUT'){
						Gamecast.Field.renderPlay(values[0],isShootout);
						Gamecast._playedAnim[id] = Gamecast._playedAnim[id] + 1;
					}
					
					if(isShootout && (Gamecast._playedAnim[id] >= 1) && values[10]){
						Gamecast.Field.renderPenalties(null,null,id,true);
					}
				}
				if(Gamecast._isPlaying && $('.videoplayer').height() == 0 && (isGoal == 't' || isShootout) && Gamecast._match.gameStatus.indexOf('FINAL') == -1){
					Gamecast._queue.push({id:id,isShootout:isShootout});
				}
			}			
		}
	}
	addEventToTimeline.cache = {}
	
	function updateEvents(gameId,value){
		var details = gameId.split('-')
		if(matchId != details[1]){
			return false;
		}
		var values = value.split('|');
		
		if(details[2] == 'add'){
			var id = values[0];
			var clock = values[1];
			var added = values[2];
			var teamId = values[3];
			var playerId = values[7];
			var jersey = values[8];
			var x = values[9];
			var y = values[10];
			var player = values[11];
			var result = (langId == 0) ? values[12] : values[13]; //18,20
			var resultText = (langId == 0) ? values[12] : values[13];
			var shootout = values[6];
			var isGoal = values[4];
			var ownGoal = values[5];
			var videoId = values[16];
			
			var newPlay = {
			    "id": id,
			    "clock": clock,
			    "addedTime": "",
			    "period": "",
			    "startX": x,
			    "startY": y,
			    "teamId": teamId,
			    "goal": isGoal,
			    "ownGoal": ownGoal,
			    "videoId": videoId,
			    "shootout": shootout,
			    "player": player,
			    "result": "<b>" + player + " </b> - " + clock + "'" + "<br>" + result,
			    "shotbytext": "",
			    "topscoretext": "",
			    "parts": [{
			        "pId": playerId,
			        "jersey": jersey,
			        "startX": x,
			        "startY": y,
			        "endX": x,
			        "endY": y,
			        "endZ": "",
			        "player": player,
			        "result": "<b>" + player + "</b><br>" + result,
			        "resulttext": resultText
			    }]
			}
			
			Gamecast.Field.addPlay(newPlay,true);
			
			var isShootout = (shootout == 't') ? true : false;
			
			// if(videoId && Gamecast.edition == 'us' && ($('.videoplayer').height() == 0)){
			// 	Gamecast.Field.playWatch(videoId);
			// }else if
			if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
				
				if(!Gamecast._playedAnim[id]){
					Gamecast._playedAnim[id] = 0;
				}
				
				var shootoutInProgress = (Gamecast._match.gameStatus.toLowerCase().indexOf('shootout') != -1);
				var playShot = true;

				if(shootoutInProgress && !isShootout){
					playShot = false;
				}

				if(!shootoutInProgress){
					$('li.appliedFilter').trigger('click');
				}

				if(Gamecast._playedAnim[id] < 1 && (isGoal == 't' || isShootout) && playShot && Gamecast._match.gameStatus.indexOf('FINAL') == -1 && Gamecast._match.gameStatus != 'FINAL/SHOOTOUT'){
					Gamecast.Field.renderPlay(id,isShootout);
					Gamecast._playedAnim[id] = Gamecast._playedAnim[id] + 1;
				}
				
				if(isShootout && (Gamecast._playedAnim[id] >= 1) && videoId){
					Gamecast.Field.renderPenalties(null,null,id,true);
				}
			}
			
			if(Gamecast._isPlaying && $('.videoplayer').height() == 0 && (isGoal == 't' || isShootout) && Gamecast._match.gameStatus.indexOf('FINAL') == -1){
				Gamecast._queue.push({id:id,isShootout:isShootout});
			}
			
			//add to timeline
			if(isGoal == 't'){
				var side = (teamId == Gamecast._match.home.id) ? 'home' : 'away';
				var y = (side == 'home') ? 17 : 65;
				var x = parseInt(clock) * 10 + 15 - 7;
				var type = 'goal';
				var res = '<b>' + player + '</b> - ' + clock + "'" + "<br>" + result;
				
				if(addEventToTimeline.cache[id]){
					var old = Gamecast.Timeline.removeEvent(values[0]);
					Gamecast.Timeline.renderEvents();
					delete addEventToTimeline.cache[values[0]];
				}
				
				if(added != 'p'){
					var renderedEvent = Gamecast.Modules.Soccer.Timeline.renderedEvent;
					var alreadyAdded = false;
					for (var i in renderedEvent[side]) {
						if($.inArray(id,renderedEvent[side][i]) != -1){
							//already added
							alreadyAdded = true;
						}
					}
					if(!alreadyAdded){
						addEventToTimeline.cache[id] = 1;
						var ev = { result : res , x: x , y: y, id: id, type: type, clock: clock , side: side, videoId: videoId || old && old.videoId || '' };
						Gamecast.Timeline.addEvent(ev);
						Gamecast.renderEvent(ev);
					}
				}
			}
			
		}
		
		if(details[2] == 'remove' && values[0] && values[0] != "null"){
			//Remove shot/s and icon 
			Gamecast.Field.removePlay(values[0]);
			$('.gamecastFilters .appliedFilter').trigger('click');
			
			Gamecast.Timeline.removeEvent(values[0]);
			Gamecast.Timeline.renderEvents();
			
			delete addEventToTimeline.cache[values[0]];
		}
		
	}
	
	/*
	*	APIs
	*/
	Gamecast.Caster = {
		updateMarker : updateMarker,
		updateAttacks : updateAttacks,
		updateTimelinePos : updateTimelinePos,
		addEventToTimeline : addEventToTimeline,
		updateEvents : updateEvents
	};
	
	function getParams(){
		var params = {}, param, val, paramStr = location.search.replace('?','');

		paramStr = paramStr.split('&');

		for( var i =0, max = paramStr.length; i < max; i++ ){
			param = paramStr[i].split('=');
			val = param[1];
			param = param[0];
			
			params[param] = val;
		}
		return params;
	}
	
	function isCanvasSupported(){
	  var elem = document.createElement('canvas');
	  return !!(elem.getContext && elem.getContext('2d'));
	}

	function postSize(e){
		if (parent && parent.postMessage && document.body.scrollHeight && document.body.scrollWidth){
			parent.postMessage({height:document.body.scrollHeight,width:document.body.scrollWidth,resize:true}, "*");
		}
	}
	window.addEventListener("load", postSize, false);

})
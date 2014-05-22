/** GENERATED: Wed May 21 23:53:04 PDT 2014 **/
window.makeCasterConnection = function(isDev, sessionName) {
    var sessionId = sessionName || "uefa.euro-gp10",
        snapshotId = Gamecast.snapshotId || 0,
        pollDuration = 10000,
        containerName = "casterListener",
        flashString = "http://assets.espn.go.com/swf/caster/snapshotCasterClientv2.swf",
        baseURL = "soccernet.espn.go.com/caster/gamecast/snapshot",
        casterHost = "site.caster.espn.go.com",
        casterPort = 80,
        devFauxCasterDomain = "",
        isDev = isDev || 0,
        flashVersion = swfobject.getFlashPlayerVersion(),
        casterObj,
        casterInterval,
        snapshotURL,
        firstUpdate;
    if (isDev) {
        baseURL = "proxy.espn.go.com/sports/caster/snapshot";
        casterHost = "vldchadoop02.corp.espn3.com";
        casterPort = 2223;
        devFauxCasterDomain = "/soccernet";
    }
    if (flashVersion !== undefined && flashVersion.major !== undefined && flashVersion.major >= 8) {
        casterObj = new flashObj();
        casterObj.flashFile = flashString;
        casterObj.flashVars = "&sessionName=" + sessionId + "&duration=" + pollDuration + "&pollMode=absolute&baseURL=" + baseURL + "&host=" + casterHost + "&port=" + casterPort + "&SnapshotId=" + snapshotId;
        casterObj.wmode = "window";
        casterObj.width = "1";
        casterObj.height = "1";
        casterObj.quality = "best";
        casterObj.FlashVer = 8;
        casterObj.DenyIEdl = "TRUE";
        casterObj.cabVersion = "8,0,0,0";
        casterObj.useDOM = true;
        casterObj.targetElement = containerName;
        $(casterObj.render(true));
    } else {
        $(fauxCast());
    }
    casterInterval;

    function fauxCast() {
        snapshotURL = devFauxCasterDomain + "/caster/gamecast/json?sessionId=" + sessionId + "&masterSnap=" + snapshotId + "&rand=" + new Date()
            .getTime();
        $.ajax({
            type: "GET",
            url: snapshotURL,
            dataType: "json",
            success: function(data) {
                if (data !== undefined && data.snapshotId !== undefined) {
                    handleCasterMessage(data.snapshotId, data.snapshots);
                    snapshotId = data.snapshotId;
                }
                casterInterval = setTimeout(fauxCast, pollDuration);
            },
            error: function() {
                casterInterval = setTimeout(fauxCast, pollDuration);
            }
        });
    }
    var prevGameId = "0";
};

var editionMap = new Object();
editionMap['Global'] = 0;
editionMap['uk'] = 0;
editionMap['es'] = 1;
editionMap['us'] = 6;

function setGameData(nodeName, attribute, value) {

    //header gets updated everywhere, rest of the data only on match page

    var listArray = nodeName.split('-')

    if (listArray.length == 2) {
        if (activeGameId == listArray[1]) {

            switch (attribute) {
            case "0":
                //updateMatchElement(activeGameId + 'headerScore', value)
                break
            case "1":
                updateMatchElement('home-shots', value);
                break
            case "2":
                updateMatchElement('away-shots', value);
                break
            case "3":
                updateMatchElement('home-fouls', value);
                break
            case "4":
                updateMatchElement('away-fouls', value);
                break
            case "5":
                updateMatchElement('home-corner-kicks', value);
                break
            case "6":
                updateMatchElement('away-corner-kicks', value);
                break
            case "7":
                updateMatchElement('home-offsides', value);
                break
            case "8":
                updateMatchElement('away-offsides', value);
                break
            case "9":
                updateMatchElement('home-possession', value);
                break
            case "10":
                updateMatchElement('away-possession', value);
                break
            case "11":
                updateMatchElement('home-yellow-cards', value);
                break
            case "12":
                updateMatchElement('away-yellow-cards', value);
                break
            case "13":
                updateMatchElement('home-red-cards', value);
                break
            case "14":
                updateMatchElement('away-red-cards', value);
                break
            case "15":
                updateMatchElement('home-saves', value);
                break
            case "16":
                updateMatchElement('away-saves', value);
                break
            case "17":
                //updateTimeDisplay(activeGameId, value)
                break
            case "18":
                //updateStatusTextTab(activeGameId, value, 'EN')
                break
            case "19":
                //updateStatusTextTab(activeGameId, value, 'ES')
                break
            case "20":
                //updateStatusTextTab(activeGameId, value, 'US')
                break
                //case "21":
                //updateStatusTextTab(activeGameId, value, 'DE')
                //break
                //case "22":
                //updateStatusTextTab(activeGameId, value, 'IT')
                //break
            case "21":
                //updateGameNote(value, 'EN')
                //updateGameNote(value, 'US') //use the same value for en/us
                break
            case "22":
                //updateGameNote(value, 'ES')
                break

            case "23":
                updateMatchElement('home-tackles', value);
                break
            case "24":
                updateMatchElement('away-tackles', value);
                break

            default:
                break
            }
        }
    }

}

window.updateData = function(node, attribute, value) {

    // ONLY EXECUTE EVENTS FOR THIS GAME
    if (node.indexOf("-" + activeGameId) != -1) {

        // MATCH STATS
        if (node.indexOf("GC-") != -1) {
            setGameData(node, attribute + "", value);

            // GOALS
        } else if (node.indexOf('s-' + activeGameId + '-add') != -1) {
            setGoalScorer(value);

            // RED AND YELLOW CARDS
        } else if (node.indexOf('t-' + activeGameId + '-add') != -1) {
            setEvent(value);

            // CIL COMMENTARY
        } else if (node.indexOf('COMMENT-CIL-' + activeGameId + '-' + editionMap[Gamecast.edition]) != -1) {
            setCoverItLiveComment(node, value);


            // LIVE COMMENTARY GLOBAL
            //}else if (node.indexOf('COMMENT-'+ activeGameId + '-' + editionMap[Gamecast.edition]) != -1) {
        } else if (node.indexOf('COMMENT-' + activeGameId + '-0') != -1) {
            setCommentaryComment(node, value);

            // LIVE COMMENTARY US
        } else if (node.indexOf('COMMENT-' + activeGameId + '-6') != -1) {
            //setCommentaryComment(node, value);

        } else if (node.indexOf("gameInfo-" + activeGameId) != -1) {
            createGameInfoObj(node, value);

        }

    }
};

var debugCaster = false;

window.handleCasterMessage = function(message, updateObj) {
    //Testing
    for (var k = 0, len = updateObj.length; k < len; k++) {

        var update = updateObj[k]['objId'].split('-');

        if(update[0] === 'OOT'){            
            espn.oot.consume_update(updateObj[k]);
        }

        if (update[0] == 't') {
            Gamecast.Caster.addEventToTimeline(updateObj[k]['objId'], updateObj[k][0]);
        }

        if (update[0] == 's') {
            Gamecast.Caster.updateEvents(updateObj[k]['objId'], updateObj[k][0]);
        }
    }
    //testing 
    for (var k = 0, len = updateObj.length; k < len; k++) {

        var update = updateObj[k]['objId'].split('-');

        if (update[1] == "lineup") {
            Gamecast.Caster.updateAttacks(updateObj[k]["objId"], updateObj[k][0]);
        }
    }

    for (var i = 0, max = updateObj.length; i < max; i++) {

        // ONLY EXECUTE EVENTS FOR THIS GAME
        if (updateObj[i]["objId"].indexOf("-" + activeGameId) != -1) {

            var update = updateObj[i]["objId"].split("-");
            // if (update[0] == "t") {
            // Gamecast.Caster.addEventToTimeline(updateObj[i]["objId"], updateObj[i][0]);
            // }
            // if (update[0] == "s") {
            // Gamecast.Caster.updateEvents(updateObj[i]["objId"], updateObj[i][0]);
            // }
            if (update[1] == "lineup") {
                //Gamecast.Caster.updateAttacks(updateObj[i]["objId"], updateObj[i][0]);
                lineupObject(updateObj[i]["objId"], updateObj[i][0]);
            }
            if (update[0] == "OOT" && updateObj[i]) {
                Gamecast.Caster.updateMarker(updateObj[i]["objId"], updateObj[i]);
            }
            if (update[0] == "gameInfo" && updateObj[i]) {
                Gamecast.Caster.updateTimelinePos(updateObj[i]["objId"], updateObj[i][0]);
            }
        }
    }
    if (message != "connectionStatus" && message != "system") {

        for (var i in updateObj) {
            for (var j in updateObj[i]) {
                if (j != "objId") {
                    if (updateObj[i]["objId"] != null && j != null && updateObj[i][j] != null) {
                        if (debugCaster) {
                            console.log("Message: " + message + "node: " + updateObj[i]['objId'] + ", attribute: " + j + ", value: " + updateObj[i][j]);
                        }
                        updateData(updateObj[i]["objId"], j, updateObj[i][j]);
                    }
                }
            }
        }
    }
};
function getPlayers2() {
  const gitUrl = "https://raw.githubusercontent.com/aquamancer/wl2-tracker/main/Games_Information_CTF.json"

  const fetch = UrlFetchApp.fetch(gitUrl)
  const dataAsText = fetch.getContentText() 
  const data = JSON.parse(dataAsText)
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet()

  //loop variables

  var gameCount = 0
  var bluePlayerCount = 0
  var redPlayerCount = 0
  var placeholderCount = 0

  var playerMajority = ""



  var singletonCount = 0

  //arrays 
  var blueName = []
  var blueUuid = []
  var blueSpec = []
  var blueKills = []
  var blueDeaths = []
  var blueAssists = []
  var blueDmg = []
  var blueHeal = []
  var blueAbsorb = []
  var blueDmgCarrier = []
  var blueHealCarrier = []
  var redName = []
  var redUuid = []
  var redSpec = []
  var redKills = []
  var redDeaths = []
  var redAssists = []
  var redDmg = []
  var redHeal = []
  var redAbsorb = []
  var redDmgCarrier = []
  var redHealCarrier = []
  //arrays singletons
  var dateUtc = []
  var dateEst = []
  var gameId = []
  var gameMap = []
  var winner = []
  var timeLeft = []
  var gameAddons = []
  var gameMode = []
  var isCounted = []





//makes array of blue players and stores blue player count for one-row repeaters
  while(gameCount < data.length){
    while(bluePlayerCount < data[gameCount].players.BLUE.length){
      blueName.push(data[gameCount].players.BLUE[bluePlayerCount].name)
      blueUuid.push(data[gameCount].players.BLUE[bluePlayerCount].uuid.$binary.base64)
      blueSpec.push(data[gameCount].players.BLUE[bluePlayerCount].spec)
      blueKills.push(data[gameCount].players.BLUE[bluePlayerCount].total_kills)
      blueDeaths.push(data[gameCount].players.BLUE[bluePlayerCount].total_deaths)
      blueAssists.push(data[gameCount].players.BLUE[bluePlayerCount].total_assists)
      blueDmg.push(data[gameCount].players.BLUE[bluePlayerCount].total_damage)
      blueHeal.push(data[gameCount].players.BLUE[bluePlayerCount].total_healing)
      blueAbsorb.push(data[gameCount].players.BLUE[bluePlayerCount].total_absorbed)
      blueDmgCarrier.push(data[gameCount].players.BLUE[bluePlayerCount].total_damage_on_carrier)
      blueHealCarrier.push(data[gameCount].players.BLUE[bluePlayerCount].total_healing_on_carrier)



      bluePlayerCount++
    }

    
    while(redPlayerCount < data[gameCount].players.RED.length){
      redName.push(data[gameCount].players.RED[redPlayerCount].name)
      redUuid.push(data[gameCount].players.RED[redPlayerCount].uuid.$binary.base64)
      redSpec.push(data[gameCount].players.RED[redPlayerCount].spec)
      redKills.push(data[gameCount].players.RED[redPlayerCount].total_kills)
      redDeaths.push(data[gameCount].players.RED[redPlayerCount].total_deaths)
      redAssists.push(data[gameCount].players.RED[redPlayerCount].total_assists)
      redDmg.push(data[gameCount].players.RED[redPlayerCount].total_damage)
      redHeal.push(data[gameCount].players.RED[redPlayerCount].total_healing)
      redAbsorb.push(data[gameCount].players.RED[redPlayerCount].total_absorbed)
      redDmgCarrier.push(data[gameCount].players.RED[redPlayerCount].total_damage_on_carrier)
      redHealCarrier.push(data[gameCount].players.RED[redPlayerCount].total_healing_on_carrier)



      redPlayerCount++
    }

    //singletons





//NEED TO SPLICE A BLANK SPACE IF A TEAM HAS MORE PLAYERS
    if(data[gameCount].players.BLUE.length < data[gameCount].players.RED.length){ //if red majority
      while(singletonCount < data[gameCount].players.RED.length){ //while #repeated < red.length
        dateUtc.push(data[gameCount].exact_date.$date) //add element
        dateEst.push(data[gameCount].date)
        gameId.push(data[gameCount]._id.$oid)
        gameMap.push(data[gameCount].map)
        winner.push(data[gameCount].winner)
        timeLeft.push(data[gameCount].time_left)
        gameAddons.push(data[gameCount].game_addons[0])
        gameMode.push(data[gameCount].game_mode)
        isCounted.push(data[gameCount].counted)
        while(placeholderCount < data[gameCount].players.RED.length - data[gameCount].players.BLUE.length){
          blueName.push("")
          blueUuid.push("")
          blueSpec.push("")
          blueKills.push("")
          blueDeaths.push("")
          blueAssists.push("")
          blueDmg.push("")
          blueHeal.push("")
          blueAbsorb.push("")
          blueDmgCarrier.push("")
          blueHealCarrier.push("")
         
          placeholderCount++
        }




        singletonCount++
      }
      
    } else if(data[gameCount].players.BLUE.length > data[gameCount].players.RED.length){ //if blue majority
      while(singletonCount < data[gameCount].players.BLUE.length){ //while #repeated < blue.length
        dateUtc.push(data[gameCount].exact_date.$date) //add element
        dateEst.push(data[gameCount].date)
        gameId.push(data[gameCount]._id.$oid)
        gameMap.push(data[gameCount].map)
        winner.push(data[gameCount].winner)
        timeLeft.push(data[gameCount].time_left)
        gameAddons.push(data[gameCount].game_addons[0])
        gameMode.push(data[gameCount].game_mode)
        isCounted.push(data[gameCount].counted)

        while(placeholderCount < data[gameCount].players.BLUE.length - data[gameCount].players.RED.length){ 
          redName.push("")
          redUuid.push("")
          redSpec.push("")
          redKills.push("")
          redDeaths.push("")
          redAssists.push("")
          redDmg.push("")
          redHeal.push("")
          redAbsorb.push("")
          redDmgCarrier.push("")
          redHealCarrier.push("")
          
          placeholderCount++
        }
        
 
        singletonCount++
      }
    } else{
      while(singletonCount < bluePlayerCount){
        dateUtc.push(data[gameCount].exact_date.$date) //add element
        dateEst.push(data[gameCount].date)
        gameId.push(data[gameCount]._id.$oid)
        gameMap.push(data[gameCount].map)
        winner.push(data[gameCount].winner)
        timeLeft.push(data[gameCount].time_left)
        gameAddons.push(data[gameCount].game_addons[0])
        gameMode.push(data[gameCount].game_mode)
        isCounted.push(data[gameCount].counted)

        singletonCount++
      }
    }
    placeholderCount = 0
    gameCount++
    bluePlayerCount = 0
    redPlayerCount = 0
    singletonCount = 0
  }



var combined = [dateUtc, dateEst, gameId, gameMap, winner, timeLeft, gameAddons, gameMode, isCounted, blueName, blueUuid, blueSpec, blueKills, blueDeaths, blueAssists, blueDmg, blueHeal, blueAbsorb, blueDmgCarrier, blueHealCarrier,redName, redUuid, redSpec, redKills, redDeaths, redAssists, redDmg, redHeal, redAbsorb, redDmgCarrier, redHealCarrier]



var combinedTransposed = combined[0].map((_, colIndex) => combined.map(row => row[colIndex]));
console.log(combinedTransposed)
return combinedTransposed
}






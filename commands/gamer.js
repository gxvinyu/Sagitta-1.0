const got = require('got');
const {apis} = require('../ini.js')

league = async arg => {
    try {
        const response1 = await got(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${arg}?api_key=${apis['riot-api']}`)

        const summonerID = JSON.parse(response1.body).id

        const response = await got(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerID}?api_key=${apis['riot-api']}`)
        console.log(JSON.parse((response.body)))
        return "Found"
    } catch (err) {
        console.log(err)
        return "Summoner not found"
    }

    return "jo"
}

const gamesMap = new Map()
gamesMap.set('lol', league)

console.log(gamesMap)

module.exports = (message, args) => {
    if (!args.length) {
        return message.reply('fucking stupid candy ass faggot')
    }
    let gameFunction = gamesMap.get(args[0])

    if (gameFunction) {
        if (args[1]) {
            gameFunction(args[1]).then(r => {
                console.log(r)
            })
        }
    }
}
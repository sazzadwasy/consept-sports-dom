const allPlayers = () => {
    document.getElementById('player-container').textContent = ""
    document.getElementById('loading').style.display = 'block'
    const searchField = document.getElementById('search-field').value

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchField}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPlayerInUi(data.player))
    console.log(data.player)
}

const showPlayerInUi = (players) => {
    document.getElementById('loading').style.display = 'none'

    const parent = document.getElementById('player-container')
    for (const player of players) {
        // console.log(player)
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="border border-1 m-5 p-4">
            <div class="pro-pic">
                <img class="w-50"src="${player.strThumb}" alt="">
            </div>
                <h2>Name: ${player.strPlayer}</h2>
                <h3>Country: ${player.strNationality}</h3>
                <p>About this player: ${player.strDescriptionEN.slice(0, 100)}</p>
            <div class="allButton">
                <button class="btn btn-danger">Delete</button>
                <button onClick="details(${player.idPlayer})" class="btn btn-success">Details</button>
            </div>
        </div>`
        parent.appendChild(div)
    }
}

const details = (idInfo) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${idInfo}`)
        .then(res => res.json())
        .then(data => showDetailInUi(data.players[0]))
}

const showDetailInUi = (PDetail) => {

    console.log(PDetail.strGender)
    if (PDetail.strGender == 'Male') {
        document.getElementById('male').style.display = "block"
        document.getElementById('female').style.display = "none"
    }
    else {
        document.getElementById('male').style.display = "none"
        document.getElementById('female').style.display = "block"
    }
    // console.log(PDetail)
    const parent2 = document.getElementById('detail-container')
    parent2.textContent = ''
    const div = document.createElement('div')
    div.innerHTML = `<div class="border border-1 m-5 p-4">
        <div class="pro-pic">
            <img class="w-50"src="${PDetail.strThumb}" alt="">
        </div>
            <h2>Name: ${PDetail.strPlayer}</h2>
            <h3>Country: ${PDetail.strNationality}</h3>
            <p>About this player: ${PDetail.strDescriptionEN.slice(0, 100)}</p>
    </div>`
    parent2.appendChild(div)
}
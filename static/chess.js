// Access <body> element

const body = document.querySelector('body')

// Access data attribute to retrieve game id and orientation
const gameId = body.dataset.game_id
const orientation = body.dataset.orientation

console.log(`gameId: ${gameId}, orientation: ${orientation}`)

// Handle onDrop
const onDrop = (src, dst, piece) => {
    console.info(`src=${src}, dst=${dst}, piece=${piece}`)

    // Construct the move
    const move = {src, dst, piece}

    // PATCH /chess/:game_id
    fetch(`/chess/${gameId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(move)
    })
    .then(resp => console.info("RESPONSE: ", resp))
    .catch(err => console.error("ERROR: ", err))
}

// Create a chess configuration
const config = {
    draggable: true,
    position: 'start',
    orientation, 
    onDrop
}

// Insantiate chess
const chess = Chessboard('chess', config)

// Create an SSE connection
const sse = new EventSource("/chess/stream")

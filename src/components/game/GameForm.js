import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from "react-router-dom"



export const GameForm = () => {
    const history = useHistory()
    const { gameId } = useParams()
    const { createGame, getGameTypes, gameTypes, editGame, getGame } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        description: "",
        numberOfPlayers: 0,
        name: "",
        maker: "",
        gamer: localStorage.getItem("lu_token"),
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(() => {
        if (gameId) {
            getGame(gameId).then(game => {
                setCurrentGame({
                    description: game.description,
                    numberOfPlayers: game.numberOfPlayers,
                    name: game.name,
                    maker: game.maker,
                    gamer: game.gamer,
                    gameTypeId: game.gameTypeId
                })
            })
        }
    }, [gameId])


    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const changeGameNameState = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    /*const changeGameMakerState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.maker = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGamePlayersState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.numberOfPlayers = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameDescriptionState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.description = event.target.value
        setCurrentGame(newGameState)
    }

    const changeGameTypeState = (event) => {
        const newGameState = { ...currentGame }
        newGameState.gameTypeId = event.target.value
        setCurrentGame(newGameState)
    }*/
    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={changeGameNameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameNameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="players">Number Of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameNameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameNameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Game Type: </label>
                    <select type="select" name="gameTypeId" required autoFocus className="form-control"
                        value={currentGame.gameTypeId}
                        onChange={changeGameNameState}>
                        <option value="0">Select Game Type</option>
                        {gameTypes.map((element => {
                            return <option value={element.id}>
                                {element.label}
                            </option>
                        }))}
                    </select>

                </div>
            </fieldset>

            {
                (gameId)
                    ? <button
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const game = {
                                id: gameId,
                                maker: currentGame.maker,
                                name: currentGame.name,
                                numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                                description: currentGame.description,
                                gameTypeId: parseInt(currentGame.gameTypeId)
                            }

                            // Send PUT request to your API
                            editGame(game)
                                .then(() => history.push("/games"))
                        }}
                        className="btn btn-primary">Edit Game</button>
                    :
                    <button type="submit"
                        onClick={evt => {
                            // Prevent form from being submitted
                            evt.preventDefault()

                            const game = {
                                maker: currentGame.maker,
                                name: currentGame.name,
                                numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                                description: currentGame.description,
                                gameTypeId: parseInt(currentGame.gameTypeId)
                            }

                            // Send POST request to your API
                            createGame(game)
                                .then(() => history.push("/games"))
                        }}
                        className="btn btn-primary">Create Game</button>
            }
        </form>
    )
}
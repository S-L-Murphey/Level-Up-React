import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from "react-router-dom"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__name">{game.name} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__description">{game.description}</div>
                    </section>
                })

            }
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
        </article>
    )
}
import React, { createContext, useEffect, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = props => {
    let savedList = [];
    if (localStorage.getItem("watchlist")) {
        savedList = localStorage.getItem("watchlist").split(",");
    }
    const [watchlist, setWatchList] = useState(savedList || ["bitcoin", "ethereum", "solana", "litecoin"])

    useEffect(() => {
        localStorage.setItem("watchlist", watchlist)
    }, [watchlist])

    const addCoin = coin => {
        if (watchlist.indexOf(coin) === -1) {
            setWatchList([...watchlist, coin])
        }
    }

    const deleteCoin = (coin) => {
        setWatchList(watchlist.filter(el => {
            return el !== coin
        }))
    };

    return (
        <WatchListContext.Provider value={{ watchlist, deleteCoin, addCoin }}>
            {props.children}
        </WatchListContext.Provider>
    )
}
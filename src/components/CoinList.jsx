import React, { useContext, useEffect, useState } from 'react'
import coinGecko from "../apis/coinGecko";
import { WatchListContext } from '../context/watchListContext';
import Coin from './Coin';

const CoinList = () => {
    const [coins, setCoins] = useState([]);
    const {watchlist, deleteCoin } = useContext(WatchListContext);
    const [isLoading, setIsLoading] = useState(false);
    console.log(watchlist);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await coinGecko.get("/coins/markets", {
                params: {
                    vs_currency: "usd",
                    ids: watchlist.join(","),
                }
            })
            setCoins(response.data);
            setIsLoading(false);
        }

        if (watchlist.length > 0) {
            fetchData();
        } else {
            setCoins([]);
        }

    }, [watchlist]);

    const renderCoins = () => {
        if (isLoading) {
            return <div className="text-white">Loading...</div>
        }

        return (
            <ul className="coinlist list-group mt-2">
                {coins.map((coin) => {
                   return <Coin key={coin.id} coin={coin} deleteCoin={deleteCoin}/>
                })}
            </ul>
        )
    }


    return (
        <div>
            {renderCoins()}
        </div>
    )
}

export default CoinList;
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './Boxing.css';

const options1 = {
    method: 'GET',
    url: `https://bc-game1.p.rapidapi.com/competitions_bcgame`,
    params: {
        sport: 'boxing'
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
    }
};
function Boxing() {
    const [competitions, setCompetitions] = useState([]);
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [matches, setMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchCompetitions = async () => {
            try {
                const response = await axios.request(options1);
                setCompetitions(response.data);
                // console.log(response.data);
                if (response.data) {
                    // console.log("Here");
                    // Automatically select the first competition
                    setSelectedCompetition(response.data[0]);
                    // console.log(response.data);
                    fetchMatches(response.data[0].competition, response.data[0].country);
                }
            } catch (error) {
                console.error('Error fetching competitions:', error);
            }
        };

        fetchCompetitions();
    }, []);

    const fetchMatches = async (competition, country) => {
        const options2 = {
            method: 'GET',
            url: `https://bc-game1.p.rapidapi.com/matches_bcgame`,
            params: {
                sport: 'boxing',
                country: country,
                competition: competition,
                match_urls: 'false'
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
            }
        };
        try {
            const response = await axios.request(options2);
            // console.log(response.data)
            const matchesArray = Object.keys(response.data).map(key => response.data[key]);
            const filteredMatches = matchesArray.filter(match => match.match_status === 'pre-game');
            const firstMatch = filteredMatches.length > 0 ? [filteredMatches[0]] : [];
            setMatches(firstMatch);
            setIsLoading(false);
            // console.log(firstMatch);
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    };
    const [selectedPlayer, setSelectedPlayer] = useState();


    const handlePlayerSelect = (player) => {
        setSelectedPlayer(player);
    };A


    const player1Selected = selectedPlayer === 'player1';
    const player2Selected = selectedPlayer === 'player2';


    return (
        <div className='apex'>
            <div className="group-32">
                {isLoading && <CircularProgress className='circle' />}
                {matches.length > 0 ? (
                    <div className="content">
                        <span className="boxing">BOXING</span>
                        <div className="rectangle-20">
                            <span className="live-match">{matches[0].match_status}</span>
                            <span className="competition">{matches[0].competition}</span>
                            <div className="group-104">
                                <div className="player-1">
                                    <span className="neelesh">{matches[0].home_team}</span>
                                    <span className="india">(INDIA)</span>
                                </div>
                                <div className="player-1">
                                    <span className="vs">VS</span>
                                </div>
                                <div className="player-1">
                                    <span className="neelesh">{matches[0].away_team}</span>
                                    <span className="india">(INDIA)</span>
                                </div>
                            </div>
                        </div>
                        <div className="group-105">
                            <span className="who">Who will win the match</span>
                            <div className="rectangle-25">
                                <div className={`rectangle-39 ${player1Selected ? 'selected' : ''}`} onClick={() => handlePlayerSelect("player1")}>
                                    <div className="group-100">
                                        <div className="frame-6">Player1</div>
                                        <input type="radio" name="winner" checked={player1Selected} />
                                        <div className="radio-button"></div>
                                    </div>
                                </div>
                                <div className={`rectangle-39 ${player2Selected ? 'selected' : ''}`} onClick={() => handlePlayerSelect("player2")}>
                                    <div className="group-101">
                                        <div className="frame-7">Player2</div>
                                        <input type="radio" name="winner" checked={player2Selected} />
                                        <div className="radio-button"></div>
                                    </div>
                                </div>
                            </div>
                            <div className='group-98'>
                                <input type="text" placeholder='Enter the amount' className='text_amount'></input>
                                <button className='submit'>Submit</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <span>There are no matches currently!</span>
                )}
            </div>
            <div className='group-45'>
                <div className='left'>
                    <span className='rules'>RULES</span>
                    <div className='group-44'>
                        <ul className='list'>
                            <li>WIN: 2x the amount you pay</li>
                            <li>LOSE: No return</li>
                            <li>MINIMUM AMOUNT to put: 100ETH</li>
                        </ul>
                    </div>
                </div>
                <div className='right'>
                    <span className='need-loan'>Need Loan ?</span>
                    <span className='loan'>Now get the flash loan instantly</span>
                    <div className='loan_amount'>
                        <input type='text' className='group-322' placeholder='ENTER THE AMOUNT'></input>
                        <button className='group-33'>GET LOAN</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Boxing;
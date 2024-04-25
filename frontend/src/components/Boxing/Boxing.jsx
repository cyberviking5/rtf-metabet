import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './Boxing.css';
import { address1, abi1 } from "../../contracts_abi_address/NFT"
import { address, abi } from "../../contracts_abi_address/SimpleFlashLoan"
import { ethers, providers } from "ethers";
import { address2, abi2 } from '../../contracts_abi_address/Gamble'
import { toast } from 'react-toastify';
import Modal from './Modal'

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
    const [num, setnum] = useState('');
    const [id, setid] = useState('0');
    const [competitions, setCompetitions] = useState([]);
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [matches, setMatches] = useState([]);
    const [num1, setnum1] = useState('');
    const [sub, setsub] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [entered, setEntered] = useState(false);

    const [isOpen, setIsOpen] = useState(false)

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

    function listenForTransactionMined(transactionResponse, provider) {
        try {
            console.log(`Mining ${transactionResponse.hash}...`);
            //listen for this transaction to be finished
            return new Promise((resolve, reject) => {
                provider.once(transactionResponse.hash, (transactionReciept) => {
                    console.log(`Completed with ${transactionReciept.confirmations}`);
                    resolve();
                });
            });
        } catch (e) {
            console.log(e);
        }
    }

    async function NFT_Gen() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address1, abi1, signer);
            console.log(provider)
            console.log(signer)
            const transactionResponse = await contract.mintNFT("https://purple-petite-dragonfly-645.mypinata.cloud/ipfs/QmaoqmQWB1AGeqq659Zt7s5GTr7itRtqX2yooyeJoVzxt7")
            await listenForTransactionMined(transactionResponse, provider);
            console.log(transactionResponse)
            const number = await contract.getTokenCounter()
            setid(parseInt(number._hex));
            setIsOpen(true);
            toast.success("Congratulations on your reward")
        }
        catch (e) { console.log(e) }
    }

    async function enter() {
        try {
            console.log(address1)
            if (window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                let number = 1;
                if (selectedPlayer === "player2") {
                    console.log("here");
                    number = 2;
                }
                // console.log(number)
                // console.log(selectedPlayer)
                const contract = new ethers.Contract(address2, abi2, signer);
                // console.log(num1)
                const transactionResponse = await contract.enter(number, { value: ethers.utils.parseEther(num1) })
                // const transactionResponse = await contract.settleTeamResultWon();
                await listenForTransactionMined(transactionResponse, provider);
                setsub(false)
                toast.success("Entered")
                setEntered(true);
                console.log("Done");
            } else {
                toast.warning("please install metamask")
            }
        } catch (e) {
            toast.warning("Please enter the amount");
            console.log(e)
        }
    }
    async function Withdraw() {
        try {
            console.log(address1)
            if (window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(address2, abi2, signer);
                const transactionResponse = await contract.settleTeamResultWon();
                await listenForTransactionMined(transactionResponse, provider);
            } else {
                toast.warning("please install metamask")
            }
        } catch (e) {
            toast.warning("Please enter the amount");
            console.log(e)
        }
    }
    async function winner() {
        try {
            console.log(address1)
            if (window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(address2, abi2, signer);
                const transactionResponse = await contract.setWinner(1);
                await listenForTransactionMined(transactionResponse, provider);
            } else {
                toast.warning("please install metamask")
            }
        } catch (e) {
            toast.warning("Please enter the amount");
            console.log(e)
        }
    }

    async function loan() {
        try {
            if (window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(address, abi, signer);
                const transactionResponse = await contract.fn_RequestFlashLoan(
                    "0xda9d4f9b69ac6C22e444eD9aF0CfC043b7a7f53f",
                    num1
                );
                await listenForTransactionMined(transactionResponse, provider);
                toast.success("Loan processed")
                console.log("Done");
            } else {
                console.log("error")
                toast("please install metamask")
            }
        } catch (e) {
            toast.warning("Enter money in natural number");
            console.log(e);
        }
    }

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
            console.log(matches.length)
            // console.log(firstMatch);
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    };
    const [selectedPlayer, setSelectedPlayer] = useState();


    const handlePlayerSelect = (player) => {
        setSelectedPlayer(player);
    };


    const player1Selected = selectedPlayer === 'player1';
    const player2Selected = selectedPlayer === 'player2';


    return (
        <div className='apex'>
        <Modal token_id={id} open={isOpen} onClose={() => setIsOpen(false)}></Modal>   
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
                                    <span className="neelesh text-wrap truncate w-64">{matches[0].home_team}</span>
                                    <span className="india">(HOME)</span>
                                </div>
                                <div className="player-1">
                                    <span className="vs">VS</span>
                                    <span className='time'>{matches[0].time}</span>
                                </div>
                                <div className="player-1">
                                    <span className="neelesh text-wrap truncate w-64">{matches[0].away_team}</span>
                                    <span className="india">(AWAY)</span>
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
                                {!entered ? (
                                    <div className='enter'>
                                        <input
                                            type="text"
                                            placeholder="Enter the amount"
                                            className="text_amount"
                                            onChange={(e) => { setnum1(e.target.value) }}
                                        />
                                        <button className="sub" onClick={enter}>Submit</button>
                                    </div>
                                ) : (
                                    <button className="submit" onClick={Withdraw}>Withdraw</button>
                                )}
                                {/* <button className="submit" onClick={winner}>setWinner</button> */}
                                <button className='submit' onClick={async() => {await NFT_Gen()}}>Rewards</button>
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
                            <li>WIN upto2x the amount you pay</li>
                            <li>LOSE: No return</li>
                            <li>MINIMUM AMOUNT to put: 0.01 ETH</li>
                        </ul>
                    </div>
                </div>
                <div className='right'>
                    <span className='need-loan'>Need Loan ?</span>
                    <span className='loan'>Now get the flash loan instantly</span>
                    <div className='loan_amount'>
                        <input type='text' className='group-322' placeholder='ENTER THE AMOUNT' onChange={(e) => { setnum1(e.target.value) }}></input>
                        <button className='group-33' onClick={loan}>GET LOAN</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Boxing;
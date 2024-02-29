import React, { useContext, useState } from 'react';
import { UALContext } from 'ual-reactjs-renderer';
import Countdown from 'react-countdown';

import Header from '../../components/Header/Header';
import NavbarMenu from '../../components/NavbarMenu/NavbarMenu';

import AppleImg from '../../images/food-icon.png';
import PlusImg from '../../images/plus.png';
import LockImg from '../../images/lock.png';

import { claimRes, stakeTool } from '../../services/wax.services';

import './Workplaces.css';

function Workplaces() {
    const { activeUser } = useContext(UALContext);

    const [isClaimButtonDisabled, setIsClaimButtonDisabled] = useState(false);
    const [startCountdown, setStartCountdown] = useState(false);
    const [selectItem, setSelectItem] = useState([]);

    const handleClaimRes = () => {
        if (!isClaimButtonDisabled) {
            claimRes({ activeUser })
                .then(() => {
                    console.log('Resources claimed');
                    setIsClaimButtonDisabled(true);
                    setStartCountdown(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleEquip = () => {
            stakeTool({ activeUser, selectItem })
                .then(() => {
                    console.log('Success');
                })
                .catch((error) => {
                    console.log(error);
                });
    };

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            setIsClaimButtonDisabled(false);
            setStartCountdown(false);
            return <span>Claim Now!</span>;
        } else {
            return (
                <span>
                    Left to the next production: {`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
                </span>
            );
        }
    };

    return (
        <>
            <Header />

            <div className="center-block">
                <NavbarMenu />

                <div className="center-container-workplaces">
                    <div className="center-container-workplaces_wrapper">
                        <div className="workplace-top">
                            <div className="workplace-top_time">
                                {startCountdown && (
                                    <Countdown
                                        date={Date.now() + 3600000} // Set the initial time to 1 hour
                                        onComplete={() => {
                                            setIsClaimButtonDisabled(false);
                                            setStartCountdown(false);
                                        }}
                                        renderer={renderer}
                                    />
                                )}
                            </div>
                            <div className="workplace-top_claim">
                                <div className="workplace-top_claim-res">
                                    <p>500</p>
                                    <img src={AppleImg} alt="" />
                                </div>
                                <button onClick={handleClaimRes} disabled={isClaimButtonDisabled}>
                                    Claim
                                </button>
                            </div>
                        </div>
                        <div className="workplace-list">
                            <div>
                                <div className="workplace-item">
                                    <div className="wrapper">
                                        <div className="img">
                                            <img src={PlusImg} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <button className='btn-equip' onClick={() => handleEquip()}>Equip</button>
                                {/* <button className='btn-unequip'>Unequip</button> */}
                            </div>

                            <div>
                                <div className="workplace-item">
                                    <div className="wrapper">
                                    <div className="img">
                                            <img src={PlusImg} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <button className='btn-equip' onClick={() => handleEquip()}>Equip</button>
                                {/* <button className='btn-unequip'>Unequip</button> */}
                            </div>
                            <div>
                                <div className="workplace-item">
                                    <div className="wrapper">
                                    <div className="img">
                                            <img src={PlusImg} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <button className='btn-equip' onClick={() => handleEquip()}>Equip</button>
                            </div>
                            <div>
                                <div className="workplace-item">
                                    <div className="wrapper">
                                    <div className="img">
                                            <img src={LockImg} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <button className='btn-unlock'>Unlock</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Workplaces;
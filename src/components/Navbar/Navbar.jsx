import React, {useContext} from 'react';
import { UALContext } from 'ual-reactjs-renderer';

import StoneImg from '../../images/stone-icon.png';
import WoodImg from '../../images/wood-icon.png';
import AppleImg from '../../images/food-icon.png';
import DiamondImg from '../../images/gems-icon.png';
import UserImg from '../../images/user.png';
import HeroImg from '../../images/hero.png';

import './Navbar.css';


function Navbar() {
    const { activeUser } = useContext(UALContext);
    return (
        <nav className="nav">
            <div className="logo">
                <p className='logo-p'>FarmingKingdom</p>
            </div>
            <div className="farm-items">
                <div className="farm-items-left">
                    <div className="stone">
                        <img src={StoneImg} alt="" />
                        <p>2 212</p>
                    </div>
                    <div className="wood">
                        <img src={WoodImg} alt="" />
                        <p>2 212</p>
                    </div>
                </div>
                <div className="hero-img">
                    <img src={HeroImg} alt="hero" />
                </div>
                <div className="farm-items-right">
                    <div className="apple">
                        <img src={AppleImg} alt="" />
                        <p>2 212</p>
                    </div>
                    <div className="diamond">
                        <img src={DiamondImg} alt="" />
                        <p>2 212</p>
                    </div>
                </div>
            </div>
            <div className="user">
                <img src={UserImg} alt="user" />
                <p>{activeUser?.accountName ?? 'test.wax'}</p>
            </div>
        </nav>
    );
}

export default Navbar;
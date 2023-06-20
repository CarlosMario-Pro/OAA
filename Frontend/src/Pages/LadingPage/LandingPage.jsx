import React from 'react';
import Hero from "../../Components/LandingPage/Hero/Hero";
import PresentationIcons from "../../Components/LandingPage/PresentationIcons/PresentationIcons";
import Novelty from "../../Components/LandingPage/Novelty/Novelty";
import Communities from "../../Components/LandingPage/Communities/Communities";
import Agroecology from "../../Components/LandingPage/Agroecology/Agroecology";
import MostReadNews from "../../Components/LandingPage/MostReadNews/MostReadNews";
import Galery from "../../Components/LandingPage/Galery/Galery";
import Footer from "../../Components/LandingPage/Footer/Footer";
import styles from './LandingPage.module.css';
import Chat from '../../Components/Chat/Chat'
import { useState } from "react";
export default function LandingPage () {
    const [chatStatus,setChatStatus] =useState(false);
    return (
        <div>
            <Hero />
            <div id={styles.ChatSectionContainer}>
                {chatStatus?(<div id={styles.chatContainer}>
                    <p onClick={()=>setChatStatus(false)}>x</p>
                    <div>
                        <Chat/>
                    </div>
                </div>):(<div id={styles.openChat} onClick={()=>setChatStatus(true)}><p>Chat</p></div>)}
                
                
            </div>
                 



            <PresentationIcons />
            <Novelty />
            <Communities />
            <Agroecology />
            <MostReadNews />
            <Galery />
            <Footer />





        </div>
        
    );
    
   
};
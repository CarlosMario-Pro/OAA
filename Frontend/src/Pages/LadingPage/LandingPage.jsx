import React from 'react';
import Hero from "../../Components/LandingPage/Hero/Hero";
import PresentationIcons from "../../Components/LandingPage/PresentationIcons/PresentationIcons";
import Novelty from "../../Components/LandingPage/Novelty/Novelty";
import styles from './LandingPage.module.css';


export default function LandingPage () {
    
    return (
        <div>
            <Hero />
            <PresentationIcons />
            <Novelty />
        </div>
    );
};
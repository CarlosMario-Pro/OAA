import React from 'react';
import Hero from "../../Components/LandingPage/Hero/Hero";
import PresentationIcons from "../../Components/LandingPage/PresentationIcons/PresentationIcons";
import Novelty from "../../Components/LandingPage/Novelty/Novelty";
import Communities from "../../Components/LandingPage/Communities/Communities";
import Galery from "../../Components/LandingPage/Galery/Galery";
import MostReadNews from "../../Components/LandingPage/MostReadNews/MostReadNews";
import styles from './LandingPage.module.css';


export default function LandingPage () {
    
    return (
        <div>
            <Hero />
            <PresentationIcons />
            <Novelty />
            <Communities />
            <Galery />
            <MostReadNews />
        </div>
    );
};
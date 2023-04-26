import React from 'react';
import Hero from "../../Components/LandingPage/Hero/Hero";
import PresentationIcons from "../../Components/LandingPage/PresentationIcons/PresentationIcons";
import NewsOAA from "../../Components/LandingPage/NewsOAA/NewsOAA";
import styles from './LandingPage.module.css';


export default function LandingPage () {
    
    return (
        <div>
            <Hero />
            <PresentationIcons />
            <NewsOAA />
        </div>
    );
};
import React from 'react';
import styles from './Detail.module.css';
import FormNewsletter from '../../Components/NewDetail/NewsletterForm';
import SameCategories from '../../Components/NewDetail/SameCategorie';


export default function Detail () {
    
  return (
    <div>
        <FormNewsletter />
        <hr />
        <hr />
        <hr />
        <SameCategories />
    </div>
  );
};
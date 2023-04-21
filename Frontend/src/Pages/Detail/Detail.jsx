import React, { useEffect } from 'react';
import styles from './Detail.module.css';
import FormNewsletter from '../../Components/NewDetail/NewsletterForm';
import SameCategories from '../../Components/NewDetail/SameCategorie';
import DetailNew from '../../Components/NewDetail/DetailNew';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNewDetail } from '../../stateManagement/actions/panelAdmin/news.actions';
import { threNewsCategory } from '../../stateManagement/actions/newsDetailActions/newsDetailActions';


export default function Detail () {
  const { id } = useParams(),
  dispatch = useDispatch(),
  { newDetail } = useSelector((state) => state.news);


  useEffect(() => {
    if (Object.keys(newDetail).length === 0 || newDetail._id !== id) {
      dispatch(getNewDetail(id));
    }
  }, []);

  useEffect(() => {
    if (newDetail.category) {
      dispatch(threNewsCategory(newDetail.category));
    }
  }, [dispatch, newDetail.category]);

  

  return (
    <div>
        <FormNewsletter />

        <SameCategories  />

        <DetailNew newDetail={newDetail} />
    </div>
  );
};
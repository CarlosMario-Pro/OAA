import React, { useEffect, useState } from 'react'
import { threNewsCategoty } from '../../stateManagement/actions/newsDetailActions/newsDetailActions'
import { useDispatch, useSelector } from 'react-redux'

export default function SameCategories() {
  
  const categories = useSelector((state)=> state?.threeCategories)

  const dispatch = useDispatch()
    useEffect(() => {
      dispatch(threNewsCategoty())
    }, [dispatch])
    
    console.log(categories);
  return (
    <div>SameCategories.........</div>
  )
}

import React, { useEffect, useState } from 'react'
import { threNewsCategoty } from '../../stateManagement/actions/newsDetailActions/newsDetailActions'
import { useDispatch, useSelector } from 'react-redux'

export default function SameCategories() {

  const categories = useSelector((state)=> state?.threeCategories)
  let id = "642d41f9b27a0497192946e6"

  const dispatch = useDispatch()
    useEffect(() => {
      dispatch(threNewsCategoty(id))
    }, [dispatch])
    
    console.log(categories);
  return (
    <div>SameCategories.........</div>
  )
}

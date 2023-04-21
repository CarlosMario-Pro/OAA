import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function SameCategories() {

  const dispatch = useDispatch()

  const { 
    newUserCreate,
    threeCategories 
} = useSelector((state)=> state?.threeCategories)

 console.log(threeCategories, 'reducer');

    
  return (
    <div>SameCategories.........</div>
  )
}

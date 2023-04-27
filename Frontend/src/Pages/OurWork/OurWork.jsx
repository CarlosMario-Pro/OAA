import React from "react"
import { useEffect, useState } from "react"
import {useSelector, useDispatch} from "react-redux"
import { getAllWorKs } from "../../stateManagement/actions/newsDetailActions/newsDetailActions";
import OurWorkCards from "../../Components/OurWorkComponents/OurWorkCards";
import ForoIntroduction from "../../Components/OurWorkComponents/ForoIntroduction";



export default function OurWork() {
    const dispatch = useDispatch()
    const { allWorks, onlyAWork } = useSelector((state)=> state?.newsDetail)

    console.log(allWorks, 'allworks');

    useEffect(() => {
        dispatch(getAllWorKs())
    }, []);

    return (
    <div>
        <ForoIntroduction />
        <OurWorkCards  allWorks={allWorks} />
    </div>
  )
}


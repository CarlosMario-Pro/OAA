import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAWorkById } from '../../stateManagement/actions/newsDetailActions/newsDetailActions';
import { useQuill } from 'react-quilljs';
import "quill/dist/quill.snow.css";



export default function WorkDetail() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const { onlyAWork } = useSelector((state)=>state?.newsDetail)
    
    const {quill, quillRef} = useQuill({
      readOnly: true,
      modules: {toolbar: false},
    })

    useEffect(() => {
      dispatch(getAWorkById(id))
    }, [id]);

    console.log(onlyAWork);
  return (
    <div>
        <h3>{onlyAWork.title}</h3>
        <div>
          <img src={onlyAWork?.image} alt="" />
        </div>
        <div>
          {
            onlyAWork?.content && onlyAWork?.content.charAt(0) === "{" ? (
              <article ref={quillRef} ></article>
            ) : (
              <p>{onlyAWork.content}</p>
            )
          }
        </div>
          <div>
            {
              onlyAWork?.information ?
              onlyAWork.information.map((work)=>(
              <div key={work.url} >
                <a href={work.url} target='_blank' ><h6>{work.label}</h6></a>
              </div>
                )) :''}
          </div>

    </div>
  )
}


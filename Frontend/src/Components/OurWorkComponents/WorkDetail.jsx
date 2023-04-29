import React from 'react'

export default function WorkDetailComponent({onlyAWork}) {
  return (
    <div>
    <h3>{onlyAWork?.titleMain}</h3>
    <div>
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
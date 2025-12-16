import markdownIt from 'markdown-it'
import React from 'react'

const MdPreviewComponent = ({data}) => {
  const md=markdownIt()
  return (
    <>
      <article className='prose !max-w-[100%] prose-invert text-white text-lg py-10' dangerouslySetInnerHTML={{__html:md.render(data)}} />
    </>
  )
}

export default MdPreviewComponent

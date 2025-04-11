/* eslint-disable react/prop-types */
import 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <p className='text-sm'>
        {resumeInfo?.summary}</p>
  )
}

export default SummaryPreview
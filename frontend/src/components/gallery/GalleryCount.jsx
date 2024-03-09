import { forwardRef, useImperativeHandle, useState } from "react"

const GalleryCount = forwardRef(function GalleryCount({ totalCnt }, ref) {
    const [submittedCount, setSubmittedCount] = useState(0);

    useImperativeHandle(ref, () => ({
        increaseCnt: () => {
            setSubmittedCount(prevCnt => prevCnt + 1);
        },
        decreaseCnt: () => {
            setSubmittedCount(prevCnt => prevCnt - 1);
        }
    }))


    return (
        <p className='gallery-info'>Already submitted: <span className='money-cnt'> {submittedCount} / {totalCnt}</span></p>
    )
})

export default GalleryCount;
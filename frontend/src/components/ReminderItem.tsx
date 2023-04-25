import React from 'react'

type Props = {}


interface IReminderItem{
    key:string,
    id:string,
    text:string,
    dueDate:Date,
    isCompleted:boolean
}

const ReminderItem = (props: IReminderItem) => {

    const date = new Date(props.dueDate);

const options = { day: "numeric", month: "long", year: "numeric" };
const formattedDateString = date.toLocaleDateString("en-US", options);
  return (
<div className='reminder'>
      <h2>{props.text}</h2>
      <p>Due Date: {formattedDateString}</p>
      <button className='close'>
      {/* <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'> */}
        X
      </button>
    </div>  )
}

export default ReminderItem
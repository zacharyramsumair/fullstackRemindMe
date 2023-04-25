import React from 'react'
import { useGetAllReminders } from '../hooks/useGetAllReminders'
import Spinner from './Spinner'
import ReminderItem from './ReminderItem'

type Props = {}

interface IReminderItem{
    // key:string,
    _id:string,
    text:string,
    dueDate:Date,
    isCompleted:boolean
}
const RemindersList = (props: Props) => {

    let {isLoading, error, data:reminders, refetch} = useGetAllReminders()


    if (isLoading) {
        return <Spinner />
      }


      let reminderElements;


      if(reminders){

        reminderElements = reminders.data.reminders.map((reminder:IReminderItem) => (
            <ReminderItem key={reminder._id} id={reminder._id}  text={reminder.text} dueDate={reminder.dueDate} isCompleted={reminder.isCompleted}  />
          ))
        
        }
      

  return (
    <>
    <p>Double Click to change the completion status</p>
    {reminderElements}
    </>
  )
}

export default RemindersList
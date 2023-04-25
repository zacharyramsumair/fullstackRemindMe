import React, { useEffect, useState } from 'react'
import { useGetAllReminders } from '../hooks/useGetAllReminders'
import Spinner from './Spinner'
import ReminderItem from './ReminderItem'
import SelectSortOptionForm from './SortRemindersForm'

type Props = {}

interface IReminderItem{
    // key:string,
    _id:string,
    text:string,
    dueDate:Date,
    isCompleted:boolean
}
const RemindersList = (props: Props) => {

    let [sortOption, setSortOption] = useState<string>("lastUpdated")
    let {isLoading, error, data:reminders, refetch} = useGetAllReminders(sortOption)

useEffect(()=>{
refetch()
},[sortOption])

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
    {sortOption}
    <p>Double Click to change the completion status</p>
    <SelectSortOptionForm setSortOption={setSortOption}/>
    
    
    {reminderElements}
    </>
  )
}

export default RemindersList
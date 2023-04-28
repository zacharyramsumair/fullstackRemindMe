import React, { useEffect, useState } from 'react'
import { useGetAllReminders } from '../hooks/useGetAllReminders'
import Spinner from './Spinner'
import ReminderItem from './ReminderItem'
import SelectSortOptionForm from './SortRemindersForm'
import { useNavigate } from 'react-router-dom';

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

    let navigate = useNavigate()
    if(!localStorage.getItem("user")){
      navigate("/login")
      }

useEffect(()=>{
refetch()
},[sortOption])

    if (isLoading) {
        return <Spinner />
      }


      let reminderElements;


      if(reminders?.data?.reminders){

        reminderElements = reminders.data.reminders.map((reminder:IReminderItem) => (
            <ReminderItem key={reminder._id} id={reminder._id}  text={reminder.text} dueDate={reminder.dueDate} isCompleted={reminder.isCompleted}  />
          ))
        
        }
      

  return (
    <section className='remindersList'>
    <p className='instructions'><b>Double Click</b> to change the completion status</p>
    <SelectSortOptionForm setSortOption={setSortOption}/>
    
    
    {reminderElements && reminderElements.length > 0 ? reminderElements : <h3 className='noReminders'>You have no reminders</h3>}
    </section>
  )
}

export default RemindersList
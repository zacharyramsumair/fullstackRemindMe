import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';
import { useDeleteReminder } from "../hooks/useDeleteReminder";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

type Props = {};

interface IReminderItem {
	key: string;
	id: string;
	text: string;
	dueDate: Date;
	isCompleted: boolean;
}

interface IOptions{
    day:string,
    year:string,
    month:string,
}

const ReminderItem = (props: IReminderItem) => {
	const date = new Date(props.dueDate);
    let navigate = useNavigate()
    const token = useSelector((state: RootState) => state.auth.user.token)


    let {deleteReminder} = useDeleteReminder()

	const options:IOptions = { day: "numeric", month: "long", year: "numeric" };
	const formattedDateString = date.toLocaleDateString("en-US", options);

    let [com, setCom] = useState(false)

    const handleDoubleClick = () => {
		console.log("Reminder double-clicked!");
        setCom(prev => !prev)
		// Call your function here
	};


    
    

	return (
		<div className="reminder" onDoubleClick={handleDoubleClick} style={{ opacity: com ? 0.7 : 1 }} >
			<h2 style={{ textDecoration: com ? "line-through" : "none" }}>{props.text}</h2>
			<p>Due Date: {formattedDateString}</p>
			<button className="edit" onClick={() => navigate(`reminders/${props.id}`)}>
				{/* <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'> */}
				<FaEdit />
			</button>
			<button className="delete" 
            onClick={() => deleteReminder({token , id:props.id})}
            >
				<FaTrash />
			</button>
		</div>
	);
};

export default ReminderItem;

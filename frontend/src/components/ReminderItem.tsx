import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';
import { useDeleteReminder } from "../hooks/useDeleteReminder";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useUpdateReminder } from "../hooks/useUpdateReminder";

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

	let {updateReminder, isSuccess:SuccessfulUpdate}= useUpdateReminder()



    let {deleteReminder} = useDeleteReminder()

	const options:IOptions = { day: "numeric", month: "long", year: "numeric" };
	const formattedDateString = date.toLocaleDateString("en-US", options);


    const handleDoubleClick = () => {
		console.log("Reminder double-clicked!");
		updateReminder({id:props.id, token, reminderInfo: {
			data: {
				reminder:props.text,
				dueDate:props.dueDate,
				isCompleted:!props.isCompleted
			}
		} })
	};


    
    

	return (
		<div className="reminder" onDoubleClick={handleDoubleClick} style={{ opacity: props.isCompleted ? 0.7 : 1 }} >
			<h2 style={{ textDecoration: props.isCompleted ? "line-through" : "none" }}>{props.text}</h2>
			<p>Due Date: {formattedDateString}</p>
			<button className="edit" onClick={() => navigate(`reminders/${props.id}`)}>
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

import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

type Props = {};

interface IReminderItem {
	key: string;
	id: string;
	text: string;
	dueDate: Date;
	isCompleted: boolean;
}

const ReminderItem = (props: IReminderItem) => {
	const date = new Date(props.dueDate);

	const options = { day: "numeric", month: "long", year: "numeric" };
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
			<button className="edit">
				{/* <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'> */}
				<FaEdit />
			</button>
			<button className="delete">
				<FaTrash />
			</button>
		</div>
	);
};

export default ReminderItem;

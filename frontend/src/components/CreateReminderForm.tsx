
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../components/toastFunctions";
import { useAddReminder } from '../hooks/useAddReminder';
import { RootState } from '../app/store';


type Props = {}


interface IaddReminder {
  reminder: string;
  dueDate: Date|number;
  isCompleted: boolean;
}

export type IAddReminderFormData = {
  reminder: string;
  dueDate:  Date|number;
};




const CreateReminderForm = (props: Props) => {

  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.user.token)

let blankAddReminderForm:IAddReminderFormData = {
  reminder:"",
  dueDate: new Date()
}

  let [formData,setFormData] =useState<IAddReminderFormData>(blankAddReminderForm)

  // let {
	// 	loginAccount,
	// 	error,
	// 	data: loggedInUser,
	// 	isError,
	// 	isLoading,
	// 	isSuccess,
	// } = useLoginUser();

  let {addReminder, error:APIError, data:newReminder, isError, isLoading, isSuccess} = useAddReminder()

console.log(formData)

  useEffect(() => {
		if (isSuccess) {
			successToast(`Reminder Added!`);
			//put in the return data from the post
			// dispatch(loginUser({...newReminder,}));
      setFormData(blankAddReminderForm)
			navigate("/");
		}
	}, [isSuccess]);

  let date = new Date()

  const previousDay = new Date(date.getTime());
  previousDay.setDate(date.getDate() - 1);

  const schema: ZodType<IAddReminderFormData> = z
  .object({
    reminder: z.string().nonempty("Please enter a reminder").min(2, { message: "Must be 2 or more characters long" }),
    dueDate: z
    .date()
    .refine((value) => value > previousDay, {
    // .refine((value) => value >= new Date(), {
      message: "Due date must be today or in the future",
    }),
  })

  const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IAddReminderFormData>({
		resolver: zodResolver(schema),
	});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};


 
  

  const submitData = (data: IAddReminderFormData) => {
    // console.log("submitted")
    let actualDueDate = data.dueDate.setUTCDate(data.dueDate.getUTCDate() + 1);
    data.dueDate = actualDueDate


    console.log("add reminder" , data)
    let ReminderData:IaddReminder = {...data, isCompleted:false}
		addReminder({data:ReminderData, token});

		if (isError) {
      // console.log(error)
			errorToast(APIError.response.data.message as string);
		}

   
	};

  


  return (
    <section className='form'>
      <h2>Add a Reminder</h2>
      
    <form onSubmit={handleSubmit(submitData)}>
      <div className='form-group'>
        <label htmlFor='reminder'>Reminder</label>
        <input
          type='text'
          id='reminder'
          {...register("reminder")}
          value={formData.reminder}
          onChange={(e) => onChange(e)}        />
          {errors.reminder &&
   (
							<span className="errorMessage">{errors.reminder.message}</span>
						)}
      </div>
      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input 
        type="date" 
        id="dueDate" 
        // value={formData.dueDate}
        {...register("dueDate", {valueAsDate:true})}
        onChange={(e) => onChange(e)}        />
        {errors.dueDate &&
   (
							<span className="errorMessage">{errors.dueDate.message}</span>
						)}
      </div>
      <div className='form-group'>
        <button className='btn btn-block' type='submit'>
          Add Reminder
        </button>
      </div>
    </form>
  </section>
  )
}

export default CreateReminderForm

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "./toastFunctions";
import { useAddReminder } from '../hooks/useAddReminder';
import { RootState } from '../app/store';
import { FaEdit } from 'react-icons/fa';
import { useGetOneReminder } from '../hooks/useGetOneReminder';
import { useUpdateReminder } from '../hooks/useUpdateReminder';


type Props = {}


interface IaddReminder {
  reminder: string;
  dueDate: Date|number;
  isCompleted: boolean;
}

export type IAddReminderFormData = {
  reminder: string;
  dueDate:  Date|number;
  isCompleted:boolean
};




const EditReminderForm = (props: Props) => {

  let {id} = useParams()

  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.user.token)

  let {ErrorOneReminder, OneReminderData, LoadingOneReminder } = useGetOneReminder(id)


  // let blankAddReminderForm:IAddReminderFormData = {
  //   reminder:OneReminderData?.data.text,
  //   dueDate: OneReminderData?.data.dueDate,
  //   isCompleted: OneReminderData?.data.isCompleted,
  // }


  let blankAddReminderForm:IAddReminderFormData = {
    reminder:"",
    dueDate: new Date(),
    isCompleted: false,
  }


  if(OneReminderData){
    blankAddReminderForm = {
        reminder:OneReminderData?.data.text,
        dueDate: OneReminderData?.data.dueDate,
        isCompleted: OneReminderData?.data.isCompleted,
      }
  }



  let [formData,setFormData] =useState<IAddReminderFormData>(blankAddReminderForm)

  useEffect(()=>{
    // blankAddReminderForm = {
    //   reminder:OneReminderData?.data.text,
    //   dueDate: OneReminderData.data.dueDate.setUTCDate(OneReminderData.data.dueDate.getUTCDate() + 1)
    //   isCompleted: OneReminderData?.data.isCompleted,
    // }
    
    const dateStr = OneReminderData?.data.dueDate
    const date = new Date(dateStr);

    if (isNaN(date)) {
      console.error('Invalid date:', dateStr);
    } else {
      date.setDate(date.getDate()-1);
      const nextDateStr = date.toISOString();
      // console.log(nextDateStr);
  
    setFormData({
      reminder:OneReminderData?.data.text,
      // dueDate: "2023-04-28",
      dueDate: nextDateStr.slice(0, 10),
      isCompleted: OneReminderData?.data.isCompleted,
    })
  }

  }, [OneReminderData])
  



  // console.log(OneReminderData?.data.text)
  // console.log("form",formData)

  // let {
	// 	loginAccount,
	// 	error,
	// 	data: loggedInUser,
	// 	isError,
	// 	isLoading,
	// 	isSuccess,
	// } = useLoginUser();

  let {addReminder, error:APIError, data:newReminder, isError, isLoading, isSuccess} = useAddReminder()
  let {updateReminder, isSuccess:SuccessfulUpdate}= useUpdateReminder()

 

  // console.log("one remidner" , OneReminderData)

console.log(formData)

  useEffect(() => {
		if (SuccessfulUpdate) {
			successToast(`Reminder Updated!`);
      // setFormData(blankAddReminderForm)
			// navigate("/");
		}
	}, [SuccessfulUpdate]);

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
    isCompleted:z.boolean(),
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
    console.log("submitted")
    let actualDueDate = data.dueDate.setUTCDate(data.dueDate.getUTCDate() + 1);
    data.dueDate = actualDueDate


    console.log("add reminder" , data)
    // let ReminderData:IaddReminder = {...data}
		updateReminder({token , id, reminderInfo:{data}});

		if (isError) {
      // console.log(error)
			errorToast(APIError.response.data.message as string);
		}

   
	};

  


  return (
    <section className='form'>
      <h2> <FaEdit /> Edit Reminder</h2>
      
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
        value={formData.dueDate}
        {...register("dueDate", {valueAsDate:true})}
        onChange={(e) => onChange(e)}        />
        {errors.dueDate &&
   (
							<span className="errorMessage">{errors.dueDate.message}</span>
						)}
      </div>

      <div className="form-group checkbox">
        <label htmlFor="isCompleted">Completed</label>
        <input 
        type="checkbox" 
        id="isCompleted" 
        className='isCompleted'
        // value={formData.isCompleted}
        checked={formData.isCompleted}
        {...register("isCompleted")}
        onChange={(e) => onChange(e)}        />
        {errors.isCompleted &&
   (
							<span className="errorMessage">{errors.isCompleted.message}</span>
						)}
      </div>
      <div className='form-group'>
        <button className='btn btn-block' type='submit'>
          Edit Reminder
        </button>
      </div>
    </form>
  </section>
  )
}

export default EditReminderForm
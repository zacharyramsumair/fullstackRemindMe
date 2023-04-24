import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser } from "react-icons/fa";
import { ZodType } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { errorToast } from "../components/toastFunctions";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Props = {};

const postRequest = async (data) => {
	// const token = 'Bearer 38473289kjfsdf4r84'; // Replace this with your actual token
	// const headers = { Authorization: token };
	const response = await axios.post(`${import.meta.env.VITE_BASEURL}/users`, data,);
	// const response = await axios.post('https://api.example.com/endpoint', data, { headers });
	return response.data;
  };

const Register = (props: Props) => {
	const navigate = useNavigate();
	const { mutate, isLoading, isError, isSuccess, data, error } = useMutation(postRequest);

	




	type IFormData = {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	};

	const blankRegisterForm:IFormData = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
  }
	let initialValue: IFormData = localStorage.getItem("registerFormData")
		? JSON.parse(localStorage.getItem("registerFormData")!)
		: blankRegisterForm;


	console.log("s", initialValue);

	let [formData, setFormData] = useState<IFormData>(initialValue);

	useEffect(() => {
		localStorage.setItem("registerFormData", JSON.stringify(formData));

		if (5 > 10) {
			console.log
			navigate("/");
		}

	}, [formData]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("changed");
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));

		// localStorage.setItem("registerFormData" , JSON.stringify(formData))
	};

	const schema: ZodType<IFormData> = z
		.object({
			name: z
				.string()
				.min(3, { message: "Must be 3 or more characters long" })
				.max(30, { message: "Must be less than 30 characters long" })
				.refine((value) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(value), {
					message: "Must contain only characters from the alphabet",
				}),
			email: z.string().email({ message: "Enter a valid email" }),
			password: z
				.string()
				.refine(
					(value) =>
						/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
							value
						),
					{
						message:
							"Password must be at least 8 characters, including 1 number, 1 letter and 1 special character(@$!%*#?&)",
					}
				),
			confirmPassword: z
				.string()
				.refine(
					(value) =>
						/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
							value
						),
					{
						message:
							"Password must be at least 8 characters, including 1 number, 1 letter and 1 special character(@$!%*#?&)",
					}
				),
		})
		.refine((data) => data.password == data.confirmPassword, {
			message: "Passwords do not match",
			path: ["confirmPassword"],
		});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({
		resolver: zodResolver(schema),
	});

	const submitData = (data: IFormData) => {
		console.log("submitted" , data)
		mutate(formData);
	
		// registerUser(data)
		// 	.then((res) => {
		// 		if ("error" in res) {
		// 			return errorToast(res.error.data.message);
		// 		}

		// 		console.log("response", res);
		// 		setFormData(blankRegisterForm)
		// 		localStorage.setItem("registerFormData", JSON.stringify(blankRegisterForm));

		// 		localStorage.setItem("user", JSON.stringify(res));
		// 		dispatch(loginUser(res.data));
		// 		navigate("/");
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		errorToast(err.message);
		// 	});
	};

	return (
		<>
			<section className="heading">
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>

			<section className="form">
				<form onSubmit={handleSubmit(submitData)}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							id="name"
							type="text"
							placeholder="Full Name"
							defaultValue={formData.name}
							{...register("name")}
							onChange={(e) => onChange(e)}
						/>
						{errors.name && (
							<span className="errorMessage">{errors.name.message}</span>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="text"
							defaultValue={formData.email}
							placeholder="Email"
							{...register("email")}
							onChange={(e) => onChange(e)}
						/>

						{errors.email && (
							<span className="errorMessage">
								{errors.email.message}
							</span>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							defaultValue={formData.password}
							placeholder="Password"
							{...register("password")}
							onChange={(e) => onChange(e)}
						/>
						{errors.password && (
							<span className="errorMessage">
								{errors.password.message}
							</span>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="confirmPassword">Confirm Password</label>
						<input
							id="confirmPassword"
							type="password"
							placeholder="Confirm Password"
							defaultValue={formData.confirmPassword}
							{...register("confirmPassword")}
							onChange={(e) => onChange(e)}
						/>
						{errors.confirmPassword && (
							<span className="errorMessage">
								{errors.confirmPassword.message}
							</span>
						)}
					</div>

					{/* <input type="submit" /> */}

					<div className="form-group">
						<button type="submit" className="btn btn-block">
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Register;

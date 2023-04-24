import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser } from "react-icons/fa";
import { ZodType } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../components/toastFunctions";
import { useRegisterUser } from "../hooks/useRegisterUser";
import { loginUser } from "../features/auth/authSlice";

type Props = {};

const Register = (props: Props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// const { mutate, isLoading, isError, isSuccess, data, error } = useMutation(postRequest);

	let {
		registerUser,
		error,
		data: registeredUser,
		isError,
		isLoading,
		isSuccess,
	} = useRegisterUser();

	

	type IFormData = {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	};

	const blankRegisterForm: IFormData = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	};
	let initialValue: IFormData = localStorage.getItem("registerFormData")
		? JSON.parse(localStorage.getItem("registerFormData")!)
		: blankRegisterForm;


	let [formData, setFormData] = useState<IFormData>(initialValue);

	useEffect(() => {
		localStorage.setItem("registerFormData", JSON.stringify(formData));

		if (isSuccess) {
			successToast(`Welcome ${registeredUser.name} `);
			setFormData(blankRegisterForm);
			localStorage.setItem(
				"registerFormData",
				JSON.stringify(blankRegisterForm)
			);

			//put in the return data from the post
			localStorage.setItem("user", JSON.stringify(registeredUser));
			dispatch(loginUser(registeredUser));
			navigate("/");
		}
	}, [formData,isSuccess]);

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
		registerUser(data);

		if (isError) {
			errorToast(error.response.data.message as string);
		}

		// if (isSuccess) {
		// 	successToast(`Welcome ${registeredUser.name} `);
		// 	setFormData(blankRegisterForm);
		// 	localStorage.setItem(
		// 		"registerFormData",
		// 		JSON.stringify(blankRegisterForm)
		// 	);

		// 	//put in the return data from the post
		// 	localStorage.setItem("user", JSON.stringify(registeredUser));
		// 	dispatch(loginUser(registeredUser));
		// 	navigate("/");
		// }
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
function dispatch(arg0: any) {
	throw new Error("Function not implemented.");
}

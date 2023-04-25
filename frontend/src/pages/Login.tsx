import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser } from "react-icons/fa";
import { ZodType } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { errorToast, successToast } from "../components/toastFunctions";
import { loginUser } from "../features/auth/authSlice";
import { useLoginUser } from "../hooks/useLoginUser";

type Props = {};

const Login = (props: Props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let {
		loginAccount,
		error,
		data: loggedInUser,
		isError,
		isLoading,
		isSuccess,
	} = useLoginUser();

	

	type IFormData = {
		email: string;
		password: string;
	};

	const blankLoginForm: IFormData = {
		email: "",
		password: "",
	};

	// let initialValue: IFormData = localStorage.getItem("registerFormData")
	// 	? JSON.parse(localStorage.getItem("registerFormData")!)
	// 	: blankRegisterForm;


	let [formData, setFormData] = useState<IFormData>(blankLoginForm);

	useEffect(() => {

		if (isSuccess) {
			successToast(`Welcome back ${loggedInUser.name}!`);
			//put in the return data from the post
			localStorage.setItem("user", JSON.stringify(loggedInUser));
			dispatch(loginUser(loggedInUser));
			navigate("/");
		}
	}, [formData,isSuccess]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));

		// localStorage.setItem("registerFormData" , JSON.stringify(formData))
	};

	const schema: ZodType<IFormData> = z
		.object({
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
		})
		

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({
		resolver: zodResolver(schema),
	});

	const submitData = (data: IFormData) => {
		loginAccount(data);

		if (isError) {
			errorToast(error.response.data.message as string);
		}

	};

	return (
		<>
			<section className="heading">
				<h1>
					<FaUser /> Login
				</h1>
				<p>Login and never forget</p>
			</section>

			<section className="form">
				<form onSubmit={handleSubmit(submitData)}>
					

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
						<button type="submit" className="btn btn-block">
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Login;


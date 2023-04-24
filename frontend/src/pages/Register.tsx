import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ZodType } from "zod/lib";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUser } from "react-icons/fa";
import { useRegisterUserMutation } from "../features/api/apiSlice";

type Props = {};

const Register = (props: Props) => {
	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (loggedIn) {
	// 		navigate("/");
	// 	}
	// }, [loggedIn]);

  const [registerUser] = useRegisterUserMutation()

	type IFormData = {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
	};

	let initialValue: IFormData = JSON.parse(
		localStorage.getItem("registerFormData")
	) || {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	};

	console.log("s", initialValue);

	let [formData, setFormData] = useState<IFormData>(initialValue);

	useEffect(() => {
		localStorage.setItem("registerFormData", JSON.stringify(formData));
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
		// if (setLoggedIn) {
		// 	setLoggedIn(true);
		// }
		// setFormData(data)
      registerUser(data)
		// console.log(data);
		console.log("coming throught");
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

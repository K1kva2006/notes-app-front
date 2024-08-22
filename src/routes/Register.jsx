import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [status, setStatus] = useState("");

    const navigateLogin = useNavigate();

    return (
        <>
            <div className="register-login-main-cont">
                <div className="register-login-border-cont">
                    <form
                        className="register-login-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <h1 className="register-login-main-title">
                            Registration Form
                        </h1>
                        <input
                            className="register-login-form-inputs"
                            type="text"
                            placeholder="Name"
                            title="Name"
                            minLength={6}
                            maxLength={20}
                            required
                            onChange={(e) => setNameValue(e.target.value)}
                        />
                        <input
                            className="register-login-form-inputs"
                            type="email"
                            placeholder="Email"
                            title="Email"
                            minLength={6}
                            maxLength={36}
                            required
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                        <input
                            className="register-login-form-inputs"
                            type="password"
                            placeholder="Password"
                            title="Password"
                            minLength={6}
                            maxLength={20}
                            required
                            onChange={(e) => setPasswordValue(e.target.value)}
                        />
                        <button
                            className="register-login-form-button"
                            onClick={async () => {
                                try {
                                    if (
                                        nameValue.trim().length >= 6 &&
                                        nameValue.trim().length <= 20 &&
                                        emailValue.trim().length >= 6 &&
                                        emailValue.trim().length <= 36 &&
                                        passwordValue.trim().length >= 6 &&
                                        passwordValue.trim().length <= 20
                                    ) {
                                        await fetch(
                                            "http://localhost:3069/register",
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-type":
                                                        "application/json",
                                                },
                                                body: JSON.stringify({
                                                    name: nameValue,
                                                    email: emailValue,
                                                    password: passwordValue,
                                                }),
                                            }
                                        )
                                            .then((res) => {
                                                setTimeout(
                                                    () =>
                                                        navigateLogin("/login"),
                                                    1500
                                                );
                                                return res.json();
                                            })
                                            .then((data) => setStatus(data))
                                            .catch((err) => setStatus(err));
                                    }
                                } catch (err) {
                                    setStatus(err);
                                }
                            }}
                        >
                            Register
                        </button>
                        <h3>
                            already have an account?{" "}
                            <Link to={"/login"}>Login</Link>
                        </h3>
                        <h2 className="status-message">{status}</h2>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Register;

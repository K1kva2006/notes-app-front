import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [status, setStatus] = useState("");
    const navigateProfile = useNavigate();

    
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
                            Login Form
                        </h1>

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
                                        emailValue.trim().length >= 6 &&
                                        emailValue.trim().length <= 36 &&
                                        passwordValue.trim().length >= 6 &&
                                        passwordValue.trim().length <= 20
                                    ) {
                                        const res = await fetch(
                                            "http://localhost:3069/login",
                                            {
                                                method: "POST",
                                                headers: {
                                                    "Content-type":
                                                        "application/json",
                                                },
                                                body: JSON.stringify({
                                                    email: emailValue,
                                                    password: passwordValue,
                                                }),
                                            }
                                        );
                                        const data = await res.json();
                                        if (res.status === 202) {
                                            localStorage.setItem(
                                                "authToken",
                                                data
                                            );
                                            setStatus("Login successfully");
                                            setTimeout(() => {
                                                navigateProfile("/profile");
                                            }, 500);
                                        } else {
                                            setStatus(data);
                                        }
                                    }
                                } catch (err) {
                                    setStatus(err);
                                }
                            }}
                        >
                            Login
                        </button>
                        <h3>
                            Don't have an account?{" "}
                            <Link to={"/register"}>Register</Link>
                        </h3>
                        <h2 className="status-message">{status}</h2>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Login;

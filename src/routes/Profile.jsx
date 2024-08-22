import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment"

const Profile = () => {
    const navigateLogin = useNavigate();

    const [noteValue, setNoteValue] = useState("");

    const [userData, setUserData] = useState([{ name: "loading..." }, []]);
    const [status, setStatus] = useState("");

    const [request, setRequest] = useState(0);

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            return navigateLogin("/");
        }
        return async () => {
            try {
                const req = await fetch("https://notes-app-back-gfpf.onrender.com/getUserData", {
                    method: "GET",
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("authToken"),
                    },
                });
                const res = await req.json();
                setUserData(res);
            } catch (err) {
                console.log(err);
            }
        };
    }, [request]);

    return (
        <>
            <div className="profile">
                <header className="profile-header">
                    <h1 className="main-title">Note App</h1>
                    <nav className="profile-nav">
                        <ul className="profile-nav-ul">
                            <li>Name: {userData[0].name}</li>
                            <li>
                                <Link
                                    onClick={() => {
                                        localStorage.removeItem("authToken");
                                        window.location.reload();
                                    }}
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>

                <section className="profile-section">
                    <div className="profile-note-section-div">
                        <div className="profile-note-section-div-wrapper">
                            {userData[1].map((item, index) => {
                                return (
                                    <div key={index} className="note-wrapper">
                                        <h3>Note Create Date: {item.date}</h3>
                                        <p>{item.note}</p>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const req = await fetch(
                                                        "https://notes-app-back-gfpf.onrender.com/deleteNote",
                                                        {
                                                            method: "POST",
                                                            headers: {
                                                                Authorization:
                                                                    "Bearer " +
                                                                    localStorage.getItem(
                                                                        "authToken"
                                                                    ),
                                                                "Content-Type":
                                                                    "application/json",
                                                            },
                                                            body: JSON.stringify(
                                                                {
                                                                    noteId: item._id,
                                                                }
                                                            ),
                                                        }
                                                    );
                                                    const res =
                                                        await req.json();
                                                    setStatus(res);

                                                    request === 0
                                                        ? setRequest(1)
                                                        : setRequest(1);
                                                } catch (err) {
                                                    setStatus(err);
                                                }
                                            }}
                                        >
                                            Delete Note
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <form
                            className="profile-add-note-form"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                title="Write a note here"
                                placeholder="Write a note here"
                                type="text"
                                required
                                minLength={6}
                                maxLength={150}
                                onChange={(e) => {
                                    setNoteValue(e.target.value);
                                }}
                                value={noteValue}
                            />
                            <button 
                                onClick={async () => {
                                    try {
                                        if (
                                            noteValue.trim().length > 6 &&
                                            noteValue.trim().length < 150
                                        ) {
                                            const req = await fetch(
                                                "https://notes-app-back-gfpf.onrender.com/addNote",
                                                {
                                                    method: "POST",
                                                    headers: {
                                                        Authorization:
                                                            "Bearer " +
                                                            localStorage.getItem(
                                                                "authToken"
                                                            ),
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                    body: JSON.stringify({
                                                        note: noteValue,
                                                        userObjectId:
                                                            userData[0]._id,
                                                        date: moment().format('MMMM Do YYYY, h:mm:ss a')
                                                    }),
                                                }
                                            );
                                            const res = await req.json();
                                            setStatus(res);
                                            setNoteValue("");
                                            request === 0
                                                ? setRequest(1)
                                                : setRequest(0);
                                        } else {
                                            setStatus(
                                                "Note Is Too Long or to Small"
                                            );
                                        }
                                    } catch (err) {
                                        setStatus(err);
                                    }
                                }}
                            >
                                Add Note
                            </button>
                            <button
                                onClick={() => {
                                    request === 0
                                                ? setRequest(1)
                                                : setRequest(0);
                                }}
                            >
                                Click Here For New Data
                            </button>
                            <p className="error-msg">{status}</p>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
};
export default Profile;

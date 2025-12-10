import { useState } from "react";
import { apiPost } from "../api/api";
import { useNavigate } from "react-router-dom";

function CreateNews() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();
    const loggedUser = parseInt(localStorage.getItem("loggedUser"));

    async function handleSubmit(e) {
        e.preventDefault();
        if(!title) {
            return alert("Title cannot be empty");
        }
        if(body.length < 20) {
            return alert("Body must be at least 20 characters");
        }

        await apiPost("/news", {
            title,
            body,
            author_id: loggedUser,
            comments: []
        });
        navigate("/news");
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Create News</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="News Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                /><br /><br />
                <textarea
                    placeholder="News Body"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    rows={5}
                    cols={50}
                /><br /><br />
                <button type="submit">Create</button>
            </form>
        </div>
  );
}

export default CreateNews;

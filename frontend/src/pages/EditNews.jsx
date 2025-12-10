import { useEffect, useState } from "react";
import { apiGet, apiPatch } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

function EditNews() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();
    const loggedUser = parseInt(localStorage.getItem("loggedUser"));

    useEffect(() => {
        loadNews();
    }, []);

    async function loadNews() {
        const news = await apiGet(`/news/${id}`);
        if(news.author_id !== loggedUser) {
            alert("You are not allowed to edit this news");
            navigate("/news");
            return;
        }
        setTitle(news.title);
        setBody(news.body);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(!title) {
            return alert("Title cannot be empty");
        }
        if(body.length < 20) {
            return alert("Body must be at least 20 characters");
        }

        await apiPatch(`/news/${id}`, { title, body });
        navigate("/news");
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Edit News</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                /><br /><br />
                <textarea
                value={body}
                    onChange={e => setBody(e.target.value)}
                    rows={5}
                    cols={50}
                /><br /><br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditNews;

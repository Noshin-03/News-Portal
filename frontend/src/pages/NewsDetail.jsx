import { useEffect, useState } from "react";
import { apiGet, apiPatch } from "../api/api";
import { useParams } from "react-router-dom";

function NewsDetail() {
    const { id } = useParams();          
    const [news, setNews] = useState(null);
    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState("");
    const loggedUser = parseInt(localStorage.getItem("loggedUser"));

    useEffect(() => {
        loadUsers();
        loadNews();
    }, []);

    async function loadUsers() {
        const data = await apiGet("/users");
        setUsers(data);
    }

    async function loadNews() {
        try {
            const data = await apiGet(`/news/${id}`);
            setNews(data);
        } catch (error) {
            console.error("Failed to load news:", error);
        }
    }

    function getUserName(user_id) {
        const user = users.find(u => u.id === user_id);
        return user ? user.name : "Unknown";
    }

    async function handleAddComment() {
        if(!comment.trim()) {
            return alert("Comment cannot be empty");
        }

        const updatedNews = {
            ...news,
            comments: [...news.comments, { user_id: loggedUser, text: comment }]
        };

        await apiPatch(`/news/${id}`, updatedNews);
        setComment("");
        loadNews();
    }

    if(!news) {
        return <p>Loading news details...</p>;
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>{news.title}</h2>
            <p>Author: {getUserName(news.author_id)}</p>
            <p>{news.body}</p>

            <hr />
            <h3>Comments</h3>
            {news.comments.length === 0 ? (
            <p>No comments yet.</p>
            ) : (
                news.comments.map((c, idx) => (
                    <div key={idx}>
                        <strong>{getUserName(c.user_id)}:</strong> {c.text}
                    </div>
                ))
            )}

            <hr />
                <textarea
                value={comment}
                placeholder="Add a comment"
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                cols={50}
            />
            <br />
            <button onClick={handleAddComment}>Submit Comment</button>
        </div>
    );
}

export default NewsDetail;

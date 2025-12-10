import { useEffect, useState } from "react";
import { apiGet, apiDelete } from "../api/api";
import { useNavigate } from "react-router-dom";

function NewsList() {
    const [newsList, setNewsList] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const loggedUser = localStorage.getItem("loggedUser");

    useEffect(() => {
        loadUsers();
        loadNews();
    }, []);

    async function loadUsers() {
        const data = await apiGet("/users");
        setUsers(data);
    }

    async function loadNews() {
         const data = await apiGet("/news");
        setNewsList(data);
    }

    function getAuthorName(author_id) {
        const user = users.find(u => u.id === author_id);
        return user ? user.name : "Unknown";
    }

    async function handleDelete(id) {
        if (!window.confirm("Are you sure to delete this news?")) return;
        await apiDelete(`/news/${id}`);
        loadNews();
    }

    return(
        <div style={{padding: 20}}>
            <h2>News List</h2>
            <p>Logged in: {getAuthorName(parseInt(loggedUser))}</p>
            <button onClick={() =>
                navigate("/news/create")}>
                    Create News
            </button>
            <hr />
            {newsList.map(news => (
                <div key={news.id} style={{ marginBottom: 15}}>
                    <h3>{news.title}</h3>
                    <p>Author: {getAuthorName(news.author_id)}</p>
                    <button onClick={() => navigate(`/news/${news.id}`)}>
                        View Details
                    </button>
                    {parseInt(loggedUser) === news.author_id && (
                        <>
                            <button onClick={() => navigate(`/news/${news.id}/edit`)}>Edit</button>
                            <button onClick={() => handleDelete(news.id)}>Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}

export default NewsList;


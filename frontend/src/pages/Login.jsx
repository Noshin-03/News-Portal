import { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        const data = await apiGet("/users");
        setUsers(data);
    }

    function handleLogin() {
        if (!selectedUser) {
            alert("Please select a user");
            return;
        }

        localStorage.setItem("loggedUser", selectedUser);
        navigate("/news");
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Login</h2>

            <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
            >
                <option value="">Select User</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>
                        {u.name}
                    </option>
                ))} 
            </select>

            <br /><br />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;

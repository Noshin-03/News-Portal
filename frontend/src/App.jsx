import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NewsList from "./pages/NewsList";
import CreateNews from "./pages/CreateNews";
import NewsDetail from "./pages/NewsDetail";
import EditNews from "./pages/EditNews";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/news" element={<NewsList />} />
        <Route path="/news/create" element={<CreateNews />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/news/:id/edit" element={<EditNews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

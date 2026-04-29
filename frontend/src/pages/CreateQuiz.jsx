import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/admin.css";

export default function CreateQuiz() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        categories: [],
        difficulty: "easy",
        timeLimit: 100,
    });
    const [category, setCategory] = useState("");
    const navigate = useNavigate()

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function addCategory() {
        if (!category.trim()) {
            return;
        }
        setForm({
            ...form,
            categories: [...form.categories, category.trim()],
        });
        setCategory("");
        console.log(form);
    }

    function removeCategory(i) {
        setForm({
            ...form,
            categories: form.categories.filter((_, ind) => ind != i),
        });
    }

    async function handleSubmit(){
        console.log(form)
        try{
                const res = await api.post(`/quiz`,form);
                navigate(`/create/${res.data._id}`)

        }catch(err){
                console.log(err);
                
        }
    }

    return (
        <div className="admin-page-container">
            <Navbar />
            <div className="admin-content-wrapper">
                <div className="admin-card text-left">
                    <h1 className="admin-title text-center">Create New Quiz</h1>
                    <p className="admin-subtitle text-center">Define the settings for your new quiz.</p>

                    <form className="form-container">
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <input
                                placeholder="E.g., Intro to React"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                placeholder="What is this quiz about?"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="form-textarea"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Categories</label>
                            <div className="category-input-group">
                                <input
                                    placeholder="Add Category"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="form-input flex-1"
                                />
                                <button type="button" onClick={addCategory} className="admin-btn-secondary">
                                    Add
                                </button>
                            </div>
                            <div className="category-tags">
                                {form.categories.map((val, i) => (
                                    <div key={i} className="category-tag">
                                        <span>{val}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeCategory(i)}
                                            className="category-tag-remove"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Difficulty</label>
                            <div className="radio-group">
                                {["easy", "medium", "hard"].map((level) => (
                                    <label key={level} className="radio-label">
                                        <input
                                            type="radio"
                                            name="difficulty"
                                            value={level}
                                            checked={form.difficulty === level}
                                            onChange={handleChange}
                                            className="radio-input"
                                        />
                                        {level}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Time Limit (minutes)</label>
                            <input
                                type="number"
                                placeholder="Time Limit"
                                name="timeLimit"
                                value={form.timeLimit}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="admin-btn-primary mt-20"
                        >
                            Next &rarr; Add Questions
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

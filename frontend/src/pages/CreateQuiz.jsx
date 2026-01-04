import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        categories: [],
        difficulty: "",
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
        <div>
            <form>
                <input
                    placeholder="Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    placeholder="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />
                <input
                    placeholder="Add Category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <button type="button" onClick={addCategory}>
                    add
                </button>
                <ul>
                    {form.categories.map((val, i) => (
                        <div key={i}>
                            <li>{val}</li>
                            <button
                                type="button"
                                onClick={() => removeCategory(i)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </ul>
                <div>
                    <p>Difficulty</p>

                    <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="easy"
                            checked={form.difficulty === "easy"}
                            onChange={handleChange}
                        />
                        Easy
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="medium"
                            checked={form.difficulty === "medium"}
                            onChange={handleChange}
                        />
                        Medium
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="hard"
                            checked={form.difficulty === "hard"}
                            onChange={handleChange}
                        />
                        Hard
                    </label>
                </div>

                <input
                    type="number"
                    placeholder="Time Limit"
                    name="timeLimit"
                    value={form.timeLimit}
                    onChange={handleChange}
                />

                <button
                type ="button"
                onClick={handleSubmit}
                >Next -&gt; Add Question</button>
            </form>
        </div>
    );
}

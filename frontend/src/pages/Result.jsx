import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function Result() {
    const { id } = useParams();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await api.get(`/result/${id}`);
                setResult(res.data);
                console.log(res)
            } catch (err) {
                console.error(err);
            }
        };

        fetchResult();
    }, [id]);

    return <div>hello</div>;
}

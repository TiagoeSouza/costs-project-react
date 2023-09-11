import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([])
    useEffect(`http://localhost:5000/projects${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return (
        <p>Project</p>

    )
}

export default Project
import Message from "../layout/Message";
import { useLocation } from "react-router-dom";

import styles from './Projects.module.css'
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";
import { useState, useEffect, useRef } from "react";

function Projects() {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const location = useLocation()

    let message = ''

    if (location.state) {
        message = location.state.message
        // Limpo o location, para que a mensagem não seja exibida novamante caso recarregue a pagina
        location.state.message = "";
    }

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            setTimeout(() => {
                initialized.current = true
                fetch("http://localhost:5000/projects", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then((resp) => resp.json())
                    .then((data) => {
                        setProjects(data)
                        setRemoveLoading(true)
                    })
                    .catch((err) => console.log(err))
            }, 3000)
        }
    }, [])

    return (
        <>
            {message && <Message type="success" text={message} />}

            <div className={styles.project_container}>
                <div className={styles.title_container}>
                    <h1>Meus Projetos</h1>
                    <LinkButton to="/newproject" text="Criar Projeto" />

                </div>

                <Container customClass="start">
                    {projects.length > 0 &&
                        projects.map(project => (
                            <ProjectCard
                                id={project.id}
                                name={project.name}
                                budget={project.budget}
                                category={project.category.name}
                                key={project.id}
                            ></ProjectCard>
                        ))
                    }
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 &&(
                        <p>Não há projetos cadastrados!</p>
                    )}
                </Container>
            </div>
        </>
    )
}

export default Projects;
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
    const [projectMsgText, setprojectMsgText] = useState('')
    const [projectMsgType, setprojectMsgType] = useState('')
    const location = useLocation()

    let message = ''

    if (location.state) {
        message = location.state.message
        // Limpo o location, para que a mensagem não seja exibida novamante caso recarregue a pagina
        location.state.message = "";
    }
    const initialized = useRef(false)
    useEffect(() => {
        // Executa de x em x tempo a busca de projetos para mostrar atualização de outras maquinas,
        // TODO: Adiciona progress-bar para ficar visivel quando será a aproxima atualização
        // setInterval(() => {
        // console.log('executando time interval')
        if (!initialized.current) {
            // initialized.current = true
            // setRemoveLoading(false)
            // setProjects([])

            setTimeout(() => {
                initialized.current = false
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
            }, 500)
        }
        // }, 10000)
    }, [])

    function removeProject(id) {
        id = id + 10;
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json())
            .then((data) => {
                console.log("data: ", data);
                console.log("id: ", id);
                console.log("count: ", projects.filter((project) => project.id === id).length);

                if (projects.filter((project) => project.id === id).length === 0) {
                    setprojectMsgText('Projeto não encontrado!')
                    setprojectMsgType("warning")
                    return;
                }

                if (projects.filter((project) => project.id === id).length > 0) {
                    setprojectMsgText('Projeto removido com successo!')
                    setprojectMsgType("success")

                    setProjects(projects.filter((project) => project.id !== id))
                    return;
                }
            })
            .catch((err) => {
                console.log(err)
                setprojectMsgText('Ocorreu um erro ao remover o projeto!')
                setprojectMsgType("error")
            })
    }

    return (
        <>
            {message && <Message type={projectMsgType} text={message} />}
            {projectMsgText && <Message setUseMessage={setprojectMsgText} type={projectMsgType} text={projectMsgText} />}

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
                                handleRemove={removeProject}
                            ></ProjectCard>
                        ))
                    }
                    {!removeLoading && <Loading />}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados!</p>
                    )}
                </Container>
            </div>
        </>
    )
}

export default Projects;
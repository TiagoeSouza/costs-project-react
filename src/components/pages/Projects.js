import Message from "../layout/Message";
import { useLocation } from "react-router-dom";

import styles from './Projects.module.css'
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";

function Projects() {
    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
        // Limpo o location, para que a mensagem não seja exibida novamante caso recarregue a pagina
        location.state.message = "";
    }

    return (
        <>
            {message && <Message type="success" text={message} />}
            
            <div className={styles.project_container}>
                <div className={styles.title_container}>
                    <h1>Meus Projetos</h1>
                    <LinkButton to="/newproject" text="Criar Projeto" />

                </div>

                <Container customClass="start">
                    <p>Projetos ...</p>
                </Container>
            </div>
        </>
    )
}

export default Projects;
import styles from './ProjectCard.module.css'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function ProjectCard({ id, name, budget, category, handleRemove }) {
    return (
        <div className={styles.project_card}>
            <h4 title={name}>{`${name.length > 15 ? name.substr(0, 12) + "..." : name}`}</h4>
            <p>
                <span>Orçamento:</span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span>{category}
            </p>

            <div className={styles.project_card_actions}>
                <div>
                    <Link to="/">
                        <BsPencil /> Editar
                    </Link>
                </div>
                <div>
                    <button>
                        <BsFillTrashFill /> Excluir
                    </button>
                </div>
            </div>
        </div>

    )
}

export default ProjectCard
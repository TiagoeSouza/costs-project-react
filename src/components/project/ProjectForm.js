import { useEffect, useState, useRef } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {})

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true

            fetch("http://localhost:5000/categories", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((resp) => resp.json())
                .then((data) => {
                    setCategories(data)
                })
                .catch((err) => console.log(err))
        }
    }, [])

    const submit = (e) => {
        e.preventDefault()
        console.log("dados 2: ", project)
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        console.log("dados 3", project);
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        })
        console.log("dados 4", project);
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                handleOnChange={handleChange}
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                value={project.name ? project.name : ''} />
            <Input
                handleOnChange={handleChange}
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                value={project.budget ? project.budget : ''} />

            <Select
                handleOnChange={handleCategory}
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                value={project.category ? project.category.id : ''}></Select>

            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm
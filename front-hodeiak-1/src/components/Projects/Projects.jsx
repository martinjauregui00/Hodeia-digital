import { useEffect, useState } from "react"
import DataTable, { defaultThemes } from 'react-data-table-component'
import React from 'react'
import Select from 'react-select'
import Modal from '../Modal/Modal';
import "./projects.scss"
import { ContactlessOutlined } from "@mui/icons-material";

const Projects = () => {
    let [modalOpen, setModalOpen] = useState(false)
    let [allTask, setAllTask] = useState(undefined)
    let [selectedProject, setSelectedProject] = useState(undefined)
    let [selectedEpic, setSelectedEpic] = useState(undefined)
    let [selectedFeature, setSelectedFeature] = useState(undefined)
    let [selectedPbi, setSelectedPbi] = useState(undefined)
    let [selectedTask, setSelectedTask] = useState(undefined)

    let [projects, setProjects] = useState([])
    let [epics, setEpics] = useState([])
    let [feature, setFeature] = useState([])
    let [pbi, setPbi] = useState([])
    let [tasks, setTasks] = useState([])

    let [doneStatus, setDoneStatus] = useState("To do")

    function finish() {
        setDoneStatus("Done")
    }
    function doing() {
        setDoneStatus("Doing")
    }
    useEffect(() => {

    }, [selectedFeature])

    function changeSelectedProject(e) {
        setSelectedProject(e.value)
        setSelectedEpic(undefined)
        setSelectedFeature(undefined)
        setSelectedPbi(undefined)
        setSelectedTask(undefined)
    }

    function changeselectedEpic(e) {
        setSelectedEpic(e.value)
        setSelectedFeature(undefined)
        setSelectedPbi(undefined)
        setSelectedTask(undefined)
    }

    function changeselectedFeature(e) {
        setSelectedFeature(e.value)
        setSelectedPbi(undefined)
        setSelectedTask(undefined)
    }
    function changeselectedPbi(e) {
        console.log(pbi)
        setSelectedPbi(e.value)
        setSelectedTask(undefined)
    }
    function changeTasksName(e) {
        console.log(e.value)
        setSelectedTask(e.value)
    }

    useEffect(() => {
        fetch('http://localhost:8000/projects')
            .then(response => response.json())
            .then((res) => {
                setProjects(res)
            });
    }, [])

    useEffect(() => {
        if (selectedProject) {
            fetch(`http://localhost:8000/epics/epics-by-project/${selectedProject}`)
                .then((res) => res.json())
                .then((res) => {
                    setEpics(res)
                })
        }
    }, [selectedProject])


    useEffect(() => {
        if (selectedEpic) {
            fetch(`http://localhost:8000/features/features-by-epic/${selectedEpic}`)
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    setFeature(res)
                })
        }
    }, [selectedEpic])

    useEffect(() => {
        if (selectedFeature) {
            fetch(`http://localhost:8000/pbis/pbis-by-feature/${selectedFeature}`)
                .then((res) => res.json())
                .then((res) => {
                    setPbi(res)
                })
        }
    }, [selectedFeature])

    useEffect(() => {

        if (selectedPbi) {
            fetch(`http://localhost:8000/tasks/tasks-by-pbi/${selectedPbi}`)
                .then((res) => res.json())
                .then((res) => {
                    setTasks(res)
                })
        }
    }, [selectedPbi])

    useEffect(() => {

        if (doneStatus != "To do") {
            let newTasks = [...tasks]
            newTasks.forEach(element => {
                if (element.id == selectedTask) {
                    
                    element.status = doneStatus
                    console.log("task ",element.status)
                }
            });
            setTasks(newTasks)

            const putDoneInTask = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: doneStatus })
            };
            fetch(`http://localhost:8000/tasks/update/${selectedTask}`, putDoneInTask)
                .then(response => response.json())
                .then(data => {
                    let cont = 0
                    let contDoing = 0
                    tasks.forEach(elem => {
                        if (elem.status == "Done") {
                            cont++
                            console.log(cont+"tasks")
                        }if(elem.status== "Doing"){
                            contDoing++
                        }
                    })
                    let newPbis = [...pbi]
                    newPbis.forEach(element => {
                        if (element.id == selectedPbi) {
                            element.status = (cont == 0 ? "To do" : cont == tasks.length  ? "Done" : contDoing>0? "Doing" : "Doing")
                            console.log("pbi ",element.status)
                        }
                    });
                    setPbi(newPbis)

                    const putDoneInTask2 = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: cont == 0 ? "To do" : cont == tasks.length ? "Done":contDoing>0?"Doing" : "Doing" })
                    };
                    fetch(`http://localhost:8000/pbis/update/${selectedPbi}`, putDoneInTask2)
                        .then(response => response.json())
                        .then(data => {
                            let cont2 = 0
                            let contDoing2 = 0
                            pbi.forEach(elem => {
                                if (elem.status == "Done") {
                                    console.log(cont2+"pbi")
                                    cont2++
                                    
                                }if(elem.status== "Doing") {
                                    contDoing++
                                }
                            })

                            let newFeatures = [...feature]
                            newFeatures.forEach(element => {
                                if (element.id == selectedFeature) {
                                    element.status = (cont2 == 0 ? "To do" : cont2 == pbi.length ? "Done": contDoing2>0 ? "Doing"  : "Doing")
                                    console.log("feature ",element.status)
                                }
                            });
                            setFeature(newFeatures)


                            const putDoneInTask3 = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ status: cont2 == 0 ? "To do" : cont2 == pbi.length ? "Done": contDoing2>0?"Doing" : "Doing" })
                            };
                            fetch(`http://localhost:8000/features/update/${selectedFeature}`, putDoneInTask3)
                                .then(response => response.json())
                                .then(data => {
                                    let cont3 = 0
                                    let contDoing3 = 0
                                    feature.forEach(elem => {
                                        if (elem.status == "Done") {
                                            cont3++
                                            console.log(cont3+"feature")
                                        }if(elem.status == "Doing"){
                                            contDoing3++
                                        }
                                    })

                                    let newEpics = [...epics]
                                    newEpics.forEach(element => {
                                        if (element.id == selectedEpic) {
                                            element.status = (cont3 == 0 ? "To do" : cont3 == feature.length ? "Done": contDoing3 > 0 ?"Doing" : "Doing")
                                            console.log("epic ",element.status)
                                        }
                                    });
                                    setFeature(newEpics)

                                    const putDoneInTask4 = {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ status: cont3 == 0 ? "To do" : cont3 == feature.length ? "Done": contDoing3>1?"Doing" : "Doing" })
                                    };
                                    fetch(`http://localhost:8000/epics/update/${selectedEpic}`, putDoneInTask4)
                                        .then(response => response.json())
                                        .then(data => {
                                            let cont4 = 0
                                            let contDoing4 = 0
                                            epics.forEach(elem => {
                                                if (elem.status == "Done") {
                                                    console.log(cont4+"epics")
                                                    cont4++
                                                }if(elem.status =="Doing"){
                                                    contDoing4++
                                                }
                                            })

                                            let newProjects = [...projects]
                                            newProjects.forEach(element => {
                                                if (element.projectname == selectedProject) {
                                                    element.status = (cont4 == 0 ? "To do" : cont4 == epics.length ? "Done": contDoing4>1?"Doing" : "Doing")
                                                    console.log("project ", element.status)
                                                }
                                            });
                                            setFeature(newProjects)

                                            console.log('task length', tasks.length);

                                            const putDoneInTask5 = {
                                                method: 'PUT',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ status: cont4 == 0 ? "To do" : cont4 == epics.length ? "Done":contDoing4?"Doing" : "Doing" })
                                            };
                                            fetch(`http://localhost:8000/projects/update/${selectedProject}`, putDoneInTask5)
                                                .then(response => response.json())
                                                .then(data => console.log("Listo"));
                                        });
                                });
                        });
                });
        }
    }, [doneStatus])



    return (
        <>
        <h2 id="titulo">Projects</h2>
            <button onClick={finish} id="done">Done</button>
            <button onClick={doing} id="doing">Doing</button>
            <div id="selects">
                <Select className="item"
                    onChange={changeSelectedProject} options={projects.length != undefined && projects.length > 0 ? projects.map(element => {
                        return { value: element.projectname, label: `${element.projectname} ${element.status}` }
                    }) : ""} />

                {selectedProject && <Select onChange={changeselectedEpic} options={
                    epics != undefined && epics.length != undefined && epics.length > 0 ?
                        epics.map(element => {
                            return { value: element.id, label: `${element.epicname} ${element.status}` }
                        })
                        : ''
                } />}

                {selectedEpic && <Select onChange={changeselectedFeature} options={
                    feature != undefined && feature.length != undefined && feature.length > 0 ? feature.map(element => {
                        return { value: element.id, label: `${element.featurename} ${element.status}` }
                    })
                        : ""
                } />}

                {selectedFeature && <Select onChange={changeselectedPbi} options={
                    pbi != undefined && pbi.length != undefined && pbi.length > 0 ? pbi.map(element => {
                        return { value: element.id, label: `${element.pbiname} ${element.status}` }
                    })
                        : ""
                } />}
                {selectedPbi && <Select onChange={changeTasksName} options={
                    tasks != undefined && tasks.length != undefined && tasks.length > 0 ? tasks.map(element => {
                        return { value: element.id, label: `${element.title} ${element.status}` }
                    })
                        : ""
                } />}

            </div>

        </>
    )
}
export default Projects;




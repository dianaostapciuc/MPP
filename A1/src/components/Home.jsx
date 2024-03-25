import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import 'bootstrap/dist/css/bootstrap.min.css';
import Characters from "./Characters";
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const [sortByAge, setSortByAge] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const [detailsVisibility, setDetailsVisibility] = useState({}); // State to manage visibility of details for each character
    const [characters, setCharacters] = useState(Characters); // State to manage characters
    let history = useNavigate();

    const handleEdit = (id, name, age, classs, spells) => {
        localStorage.setItem("name", name);
        localStorage.setItem("age", age);
        localStorage.setItem("class", classs);
        localStorage.setItem("spells", spells);
        localStorage.setItem("id", id);
    }

    const handleDelete = (id) => {
        var index = characters.findIndex(character => character.id === id);
        const updatedCharacters = [...characters];
        updatedCharacters.splice(index, 1);
        setCharacters(updatedCharacters);
        history('/');
    }

    const toggleSortByAge = () => {
        handleSort();
    }

    useEffect(() => {
        drawChart();
    }, []);

    let ageChart = null;

    const drawChart = () => {
        const ctx = document.getElementById('ageChart').getContext('2d');
        const ages = characters.map(character => character.age);
        const labels = characters.map((character, index) => `Character ${index + 1}`);

        if (ageChart) {
            ageChart.destroy();
        }
        
        ageChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Age',
                    data: ages,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = characters.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to toggle visibility of details for a character
    const handleToggleDetails = (index) => {
        setDetailsVisibility(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    }

    // Function to handle sorting by age
    const handleSort = () => {
        const sortedCharacters = [...characters];
        sortedCharacters.sort((a, b) => {
            if (sortByAge) {
                return a.age - b.age; // Ascending order
            } else {
                return b.age - a.age; // Descending order
            }
        });
        setSortByAge(!sortByAge);
        setCharacters(sortedCharacters);
    };

    return (
        <>
            <div className="container" style={{ position: "absolute", top: "40px", left: "75px", background:"white" }}>
                <button type="button" className="btn btn-outline-secondary" onClick={toggleSortByAge}>
                    {sortByAge ? 'Unsort by Age' : 'Sort by Age'}
                </button>
                <table className="table  table-bordered table-light table-striped table-hover"  striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th scope="col">
                                NAME
                            </th>
                            <th scope="col">
                                AGE
                            </th>
                            <th scope="col">
                                DETAILS
                            </th>
                            <th>
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>
                                    <button type="button" className="btn btn-outline-dark" onClick={() => handleToggleDetails(index)}>
                                        {detailsVisibility[index] ? 'Hide Details' : 'Show Details'}
                                    </button>
                                    {detailsVisibility[index] && (
                                        <div>
                                            <p>Class: {item.class}</p>
                                            <p>Spells: {item.spells.join(", ")}</p>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                    &nbsp;
                                    <Link to={'/editing'}>
                                        <button type="button" className="btn btn-outline-primary" onClick={() => handleEdit(item.id, item.name, item.age, item.class, item.spells)}>Edit</button>
                                    </Link>
                                    &nbsp;
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination" style={{background:"white"}}>
                        {Array.from({length: Math.ceil(characters.length / itemsPerPage)}, (_, i) => (
                            <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                <button onClick={() => paginate(i + 1)} className="page-link" style={{}}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Link to={"/adding"}>
                    <button type="button" className="btn btn-outline-success" style={{ position: 'relative', height: '60px', width: '280px', left: '550px' }}>Add a character</button>
                </Link>
                <canvas id="ageChart" style={{width:"50px", height:"50px",background:"white" }}></canvas>
            </div>
        </>
    )
}

export default Home;

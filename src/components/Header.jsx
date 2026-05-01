import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'; // 1. Added useEffect

function Header() {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        fetch('http://localhost:9090/api/v1/subject', { signal: controller.signal })
            .then(response => response.json())
            .then(apiResponse => {
                if (apiResponse && apiResponse.data) {
                    setSubjects(apiResponse.data);
                }
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    console.error('Fetch error:', err);
                }
            });

        return () => controller.abort();
    }, []);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Quiz App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>

                            {/* 4. Dynamic Dropdown implementation */}
                            {/* Move the condition INSIDE the <ul> so the "Subjects" button always stays visible */}
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Subjects
                                </a>
                                <ul className="dropdown-menu">
                                    {subjects.length > 0 ? (
                                        subjects.map((sub) => (
                                            <li key={sub.id}>
                                                <Link className="dropdown-item" to={`/quiz/${sub.id}?subject=${sub.name.charAt(0).toUpperCase() + sub.name.slice(1)}`}>
                                                    {sub.name}
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li><span className="dropdown-item text-muted">Loading...</span></li>
                                    )}
                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/quiz">Quiz</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
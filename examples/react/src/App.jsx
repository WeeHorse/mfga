import {Outlet, Link} from 'react-router-dom';

export default function App() {  

    // Application DOM
    return (
            <main className="container">
                <header>
                    <nav>
                    <Link to="/">About MFG(a)</Link>                    
                    <Link to="/form-1">Form 1</Link>
                    <Link to="/form-2">Form 2</Link>
                    <Link to="/form-3">Form 3</Link>
                    <Link to="/form-4">Form 4</Link>
                    <Link to="/form-using-loader-data">Form using loader data</Link>
                    </nav>
                </header>
                <Outlet/> {/* sub routes from router defined in main */}
            </main>
    )
}

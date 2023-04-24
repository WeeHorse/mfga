import {Outlet} from 'react-router-dom';

export default function App() {  

    // Application DOM
    return <>
            <main>
                <h1>MFGA React Example</h1>
                <Outlet/> {/* sub routes from router defined in main */}
            </main>
        </>
}

import {  RouterProvider } from 'react-router-dom';
import styles from './app.module.css';
import { router } from '../../router';

function App() {
    return (
        <div className={styles.app}>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
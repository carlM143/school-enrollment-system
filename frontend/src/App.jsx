import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EnrollmentForm from './components/EnrollmentForm';
import AdminDashboard from './components/AdminDashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<EnrollmentForm />} />
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
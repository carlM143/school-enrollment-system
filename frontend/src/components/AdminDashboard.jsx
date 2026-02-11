import React, { useState, useEffect } from 'react';
import { enrollmentService } from '../services/enrollmentService';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            const data = await enrollmentService.getAllEnrollments();
            setEnrollments(data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = () => {
        enrollmentService.exportEnrollments();
    };

    const filteredEnrollments = enrollments.filter(enrollment => {
        if (filter === 'all') return true;
        return enrollment.status === filter;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusCount = (status) => {
        return enrollments.filter(e => e.status === status).length;
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                {/* Header */}
                <div className="dashboard-header">
                    <div className="header-content">
                        <div>
                            <h1>Staff Dashboard</h1>
                            <p>Manage student enrollments</p>
                        </div>
                        <div className="header-actions">
                            <button onClick={handleExport} className="btn btn-success">
                                📥 Export to Excel
                            </button>
                            <a href="/" className="btn btn-secondary">
                                Back to Form
                            </a>
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon stat-icon-primary">
                            <span>👥</span>
                        </div>
                        <div className="stat-info">
                            <p className="stat-label">Total Enrollments</p>
                            <p className="stat-value">{enrollments.length}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon stat-icon-warning">
                            <span>⏰</span>
                        </div>
                        <div className="stat-info">
                            <p className="stat-label">Pending</p>
                            <p className="stat-value stat-value-warning">
                                {getStatusCount('pending')}
                            </p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon stat-icon-success">
                            <span>✓</span>
                        </div>
                        <div className="stat-info">
                            <p className="stat-label">Approved</p>
                            <p className="stat-value stat-value-success">
                                {getStatusCount('approved')}
                            </p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon stat-icon-info">
                            <span>👁</span>
                        </div>
                        <div className="stat-info">
                            <p className="stat-label">Reviewed</p>
                            <p className="stat-value stat-value-info">
                                {getStatusCount('reviewed')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="card filter-card">
                    <div className="filter-buttons">
                        {['all', 'pending', 'reviewed', 'approved', 'rejected'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`filter-btn ${filter === status ? 'active' : ''}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="card table-card">
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <p>Loading enrollments...</p>
                        </div>
                    ) : (
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Child Name</th>
                                        <th>Birthday</th>
                                        <th>Parent Name</th>
                                        <th>Contact</th>
                                        <th>Email</th>
                                        <th>Relationship</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredEnrollments.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="no-data">
                                                <div className="no-data-message">
                                                    <span>📋</span>
                                                    <p>No enrollments found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredEnrollments.map((enrollment) => (
                                            <tr key={enrollment.id}>
                                                <td className="td-bold">{enrollment.student_id}</td>
                                                <td className="td-bold">{enrollment.child_name}</td>
                                                <td>{formatDate(enrollment.child_birthday)}</td>
                                                <td>{enrollment.parent_name}</td>
                                                <td>{enrollment.parent_contact_number}</td>
                                                <td>{enrollment.parent_email}</td>
                                                <td>{enrollment.parent_relationship}</td>
                                                <td>
                                                    <span className={`badge badge-${enrollment.status}`}>
                                                        {enrollment.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
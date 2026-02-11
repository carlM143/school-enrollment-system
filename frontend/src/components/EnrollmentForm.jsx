import React, { useState } from 'react';
import { enrollmentService } from '../services/enrollmentService';
import './EnrollmentForm.css';

export default function EnrollmentForm() {
    const [formData, setFormData] = useState({
        child_name: '',
        child_birthday: '',
        parent_name: '',
        parent_contact_number: '',
        parent_email: '',
        parent_relationship: 'Mother'
    });
    
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess(false);

        try {
            await enrollmentService.createEnrollment(formData);
            setSuccess(true);
            setFormData({
                child_name: '',
                child_birthday: '',
                parent_name: '',
                parent_contact_number: '',
                parent_email: '',
                parent_relationship: 'Mother'
            });
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            if (error.errors) {
                setErrors(error.errors);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="enrollment-page">
            <div className="enrollment-container">
                <div className="enrollment-header">
                    <h1>School Enrollment Form</h1>
                    <p>Please fill in the information below to enroll your child</p>
                </div>

                {success && (
                    <div className="success-alert">
                        <strong>✓ Enrollment Successful!</strong>
                        <p>A confirmation email has been sent to your email address.</p>
                    </div>
                )}

                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h2>Child Information</h2>
                            
                            <div className="form-group">
                                <label className="form-label">Child's Full Name *</label>
                                <input
                                    type="text"
                                    name="child_name"
                                    value={formData.child_name}
                                    onChange={handleChange}
                                    className={`form-input ${errors.child_name ? 'error' : ''}`}
                                    placeholder="Enter child's full name"
                                />
                                {errors.child_name && (
                                    <p className="error-text">{errors.child_name[0]}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Date of Birth *</label>
                                <input
                                    type="date"
                                    name="child_birthday"
                                    value={formData.child_birthday}
                                    onChange={handleChange}
                                    max={new Date().toISOString().split('T')[0]}
                                    className={`form-input ${errors.child_birthday ? 'error' : ''}`}
                                />
                                {errors.child_birthday && (
                                    <p className="error-text">{errors.child_birthday[0]}</p>
                                )}
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Parent/Guardian Information</h2>
                            
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input
                                    type="text"
                                    name="parent_name"
                                    value={formData.parent_name}
                                    onChange={handleChange}
                                    className={`form-input ${errors.parent_name ? 'error' : ''}`}
                                    placeholder="Enter your full name"
                                />
                                {errors.parent_name && (
                                    <p className="error-text">{errors.parent_name[0]}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Relationship to Child *</label>
                                <select
                                    name="parent_relationship"
                                    value={formData.parent_relationship}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="Mother">Mother</option>
                                    <option value="Father">Father</option>
                                    <option value="Guardian">Guardian</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Contact Number *</label>
                                <input
                                    type="tel"
                                    name="parent_contact_number"
                                    value={formData.parent_contact_number}
                                    onChange={handleChange}
                                    className={`form-input ${errors.parent_contact_number ? 'error' : ''}`}
                                    placeholder="+63 XXX XXX XXXX"
                                />
                                {errors.parent_contact_number && (
                                    <p className="error-text">{errors.parent_contact_number[0]}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email Address *</label>
                                <input
                                    type="email"
                                    name="parent_email"
                                    value={formData.parent_email}
                                    onChange={handleChange}
                                    className={`form-input ${errors.parent_email ? 'error' : ''}`}
                                    placeholder="your.email@example.com"
                                />
                                {errors.parent_email && (
                                    <p className="error-text">{errors.parent_email[0]}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary btn-submit"
                        >
                            {loading ? 'Processing...' : 'Submit Enrollment'}
                        </button>
                    </form>
                </div>

                <div className="admin-link">
                    <a href="/admin">Staff Login →</a>
                </div>
            </div>
        </div>
    );
}
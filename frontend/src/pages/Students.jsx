import React, { useState, useEffect } from 'react';
import { studentService } from '../services/api';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ student_code: '', name: '', email: '', department: '' });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const res = await studentService.getAll();
        setStudents(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await studentService.update(editingId, formData);
                setEditingId(null);
            } else {
                await studentService.create(formData);
            }
            setFormData({ student_code: '', name: '', email: '', department: '' });
            setShowForm(false);
            fetchStudents();
        } catch (error) {
            alert('Error saving student: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            await studentService.delete(id);
            fetchStudents();
        }
    };

    const startEdit = (student) => {
        setFormData({ student_code: student.student_code, name: student.name, email: student.email, department: student.department });
        setEditingId(student.id);
        setShowForm(true);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Student Management</h1>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowForm(true)}>
                    <Plus size={20} /> Add Student
                </button>
            </div>

            {showForm && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3>{editingId ? 'Edit Student' : 'Add New Student'}</h3>
                        <X size={24} style={{ cursor: 'pointer' }} onClick={() => { setShowForm(false); setEditingId(null); }} />
                    </div>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label>Student Code</label>
                            <input type="text" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} value={formData.student_code} onChange={(e) => setFormData({ ...formData, student_code: e.target.value })} required />
                        </div>
                        <div>
                            <label>Name</label>
                            <input type="text" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                        </div>
                        <div>
                            <label>Department</label>
                            <input type="text" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} required />
                        </div>
                        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                            <button type="submit" className="btn btn-primary">Save Student</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card" style={{ padding: 0 }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s) => (
                            <tr key={s.id}>
                                <td>{s.student_code}</td>
                                <td>{s.name}</td>
                                <td>{s.email}</td>
                                <td>{s.department}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn" style={{ padding: '0.25rem', color: '#3b82f6' }} onClick={() => startEdit(s)}><Edit2 size={18} /></button>
                                        <button className="btn" style={{ padding: '0.25rem', color: '#ef4444' }} onClick={() => handleDelete(s.id)}><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Students;

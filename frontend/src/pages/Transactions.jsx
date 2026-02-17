import React, { useState, useEffect } from 'react';
import { issuanceService, resourceService, studentService } from '../services/api';
import { Plus, CheckCircle, XCircle, X } from 'lucide-react';

const Transactions = () => {
    const [issuances, setIssuances] = useState([]);
    const [resources, setResources] = useState([]);
    const [students, setStudents] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ student_id: '', resource_id: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [iss, res, stu] = await Promise.all([
                issuanceService.getAll(),
                resourceService.getAll(),
                studentService.getAll()
            ]);
            setIssuances(iss.data);
            setResources(res.data.filter(r => r.available_quantity > 0));
            setStudents(stu.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleIssue = async (e) => {
        e.preventDefault();
        try {
            await issuanceService.issue(formData);
            setFormData({ student_id: '', resource_id: '' });
            setShowForm(false);
            fetchData();
        } catch (error) {
            alert('Error issuing resource: ' + error.response?.data?.message || error.message);
        }
    };

    const handleReturn = async (id) => {
        try {
            await issuanceService.returnResource(id);
            fetchData();
        } catch (error) {
            alert('Error returning resource: ' + error.message);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Resource Transactions</h1>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowForm(true)}>
                    <Plus size={20} /> Issue Resource
                </button>
            </div>

            {showForm && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3>New Issuance</h3>
                        <X size={24} style={{ cursor: 'pointer' }} onClick={() => setShowForm(false)} />
                    </div>
                    <form onSubmit={handleIssue} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label>Student</label>
                            <select
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                value={formData.student_id}
                                onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                                required
                            >
                                <option value="">Select Student</option>
                                {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.student_code})</option>)}
                            </select>
                        </div>
                        <div>
                            <label>Resource</label>
                            <select
                                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                value={formData.resource_id}
                                onChange={(e) => setFormData({ ...formData, resource_id: e.target.value })}
                                required
                            >
                                <option value="">Select Resource</option>
                                {resources.map(r => <option key={r.id} value={r.id}>{r.name} ({r.available_quantity} left)</option>)}
                            </select>
                        </div>
                        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                            <button type="submit" className="btn btn-primary">Submit Issuance</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card" style={{ padding: 0 }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Resource</th>
                            <th>Issue Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issuances.map((i) => (
                            <tr key={i.id}>
                                <td>{i.student_name}</td>
                                <td>{i.resource_name}</td>
                                <td>{new Date(i.issue_date).toLocaleDateString()}</td>
                                <td>{i.return_date ? new Date(i.return_date).toLocaleDateString() : '-'}</td>
                                <td>
                                    <span className={`badge ${i.status === 'ISSUED' ? 'badge-warning' : 'badge-success'}`}>
                                        {i.status}
                                    </span>
                                </td>
                                <td>
                                    {i.status === 'ISSUED' && (
                                        <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => handleReturn(i.id)}>
                                            Return
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;

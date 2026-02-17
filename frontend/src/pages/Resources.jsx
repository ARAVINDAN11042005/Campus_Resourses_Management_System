import React, { useState, useEffect } from 'react';
import { resourceService } from '../services/api';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', type: '', total_quantity: 0 });

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        const res = await resourceService.getAll();
        setResources(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await resourceService.update(editingId, { ...formData, available_quantity: formData.total_quantity }); // Simple logic: reset available if total changes
                setEditingId(null);
            } else {
                await resourceService.create(formData);
            }
            setFormData({ name: '', type: '', total_quantity: 0 });
            setShowForm(false);
            fetchResources();
        } catch (error) {
            alert('Error saving resource: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this resource?')) {
            await resourceService.delete(id);
            fetchResources();
        }
    };

    const startEdit = (resource) => {
        setFormData({ name: resource.name, type: resource.type, total_quantity: resource.total_quantity });
        setEditingId(resource.id);
        setShowForm(true);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Resources Management</h1>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowForm(true)}>
                    <Plus size={20} /> Add Resource
                </button>
            </div>

            {showForm && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3>{editingId ? 'Edit Resource' : 'Add New Resource'}</h3>
                        <X size={24} style={{ cursor: 'pointer' }} onClick={() => { setShowForm(false); setEditingId(null); }} />
                    </div>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label>Name</label>
                            <input type="text" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div>
                            <label>Type</label>
                            <input type="text" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} required />
                        </div>
                        <div>
                            <label>Total Quantity</label>
                            <input type="number" style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} value={formData.total_quantity} onChange={(e) => setFormData({ ...formData, total_quantity: parseInt(e.target.value) })} required />
                        </div>
                        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
                            <button type="submit" className="btn btn-primary">Save Resource</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card" style={{ padding: 0 }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Total</th>
                            <th>Available</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resources.map((r) => (
                            <tr key={r.id}>
                                <td>{r.name}</td>
                                <td>{r.type}</td>
                                <td>{r.total_quantity}</td>
                                <td>
                                    <span className={`badge ${r.available_quantity > 0 ? 'badge-success' : 'badge-danger'}`}>
                                        {r.available_quantity} Available
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn" style={{ padding: '0.25rem', color: '#3b82f6' }} onClick={() => startEdit(r)}><Edit2 size={18} /></button>
                                        <button className="btn" style={{ padding: '0.25rem', color: '#ef4444' }} onClick={() => handleDelete(r.id)}><Trash2 size={18} /></button>
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

export default Resources;

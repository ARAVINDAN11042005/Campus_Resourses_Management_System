import React, { useState, useEffect } from 'react';
import { resourceService, studentService, issuanceService } from '../services/api';
import { Package, Users, Repeat, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        resources: 0,
        students: 0,
        issuances: 0,
        outOfStock: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [res, stu, iss] = await Promise.all([
                    resourceService.getAll(),
                    studentService.getAll(),
                    issuanceService.getAll()
                ]);

                setStats({
                    resources: res.data.length,
                    students: stu.data.length,
                    issuances: iss.data.filter(i => i.status === 'ISSUED').length,
                    outOfStock: res.data.filter(r => r.available_quantity === 0).length
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Resources', value: stats.resources, icon: Package, color: '#3b82f6' },
        { label: 'Registered Students', value: stats.students, icon: Users, color: '#10b981' },
        { label: 'Resources Issued', value: stats.issuances, icon: Repeat, color: '#f59e0b' },
        { label: 'Out of Stock', value: stats.outOfStock, icon: AlertCircle, color: '#ef4444' },
    ];

    return (
        <div>
            <h1>Dashboard Overview</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                {statCards.map((card) => (
                    <div key={card.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: card.color + '20', padding: '1rem', borderRadius: '0.75rem', color: card.color }}>
                            <card.icon size={32} />
                        </div>
                        <div>
                            <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>{card.label}</p>
                            <h2 style={{ margin: 0 }}>{card.value}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

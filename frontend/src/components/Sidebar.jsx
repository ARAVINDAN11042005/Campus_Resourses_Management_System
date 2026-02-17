import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Users, Repeat } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Resources', path: '/resources', icon: Package },
        { name: 'Students', path: '/students', icon: Users },
        { name: 'Transactions', path: '/transactions', icon: Repeat },
    ];

    return (
        <div className="sidebar">
            <h2 style={{ marginBottom: '2rem', color: '#facc15' }}>Campus Resource</h2>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.75rem 1rem',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '0.5rem',
                            background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                            transition: 'all 0.2s'
                        })}
                    >
                        <item.icon size={20} />
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;

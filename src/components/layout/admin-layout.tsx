// src/components/layout/admin-layout.tsx

import Sidebar from '@/components/common/sidebar'; // Sidebar Component
import { ReactNode } from 'react';


const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex">

            <Sidebar />
            {/* Main content area */}
            <main className="flex-1 p-6">

                {children}
            </main>


        </div>
    );
};

export default AdminLayout;

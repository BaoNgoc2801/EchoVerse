
'use client';

import AdminLayout from '@/components/layout/admin-layout';
import LayoutWithHeader from '@/components/layout/layout-with-header';

const AdminHome = () => {
    return (
        <LayoutWithHeader>

        <AdminLayout>

            <div className="container mx-auto mt-2">
                <h1 className="text-3xl font-bold mb-4 text-white">Admin Dashboard</h1>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">Welcome back, Admin!</h2>
                    <p className="mt-2">Here are some quick stats and information for you:</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {/* Stats / Content */}
                        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                            <h3 className="font-semibold">Users</h3>
                            <p className="text-xl">1000</p>
                        </div>
                        <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
                            <h3 className="font-semibold">Active Sessions</h3>
                            <p className="text-xl">250</p>
                        </div>
                        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
                            <h3 className="font-semibold">Pending Requests</h3>
                            <p className="text-xl">30</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
        </LayoutWithHeader>
    );
};

export default AdminHome;

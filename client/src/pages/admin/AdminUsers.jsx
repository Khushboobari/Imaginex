import React, { useEffect, useState } from 'react';
import { Search, Users } from 'lucide-react';
import UserAvatar from '../../components/UserAvatar';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { banUnBanUser, getAllUsers } from '../../features/admin/adminSlice';

const AdminUsers = () => {

  const { users, adminLoading, adminSuccess, adminError, adminErrorMessage } = useSelector(state => state.admin)

  const dispatch = useDispatch()

  const handleBanUnbanUser = (uid) => {
    dispatch(banUnBanUser(uid))
  }




  useEffect(() => {

    if (!adminError) {
      // Fetch All Users
      dispatch(getAllUsers())
    }

    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center" })
    }


  }, [adminError, adminErrorMessage])

  if (adminLoading) {
    return (
      <Loader />
    )
  }




  return (

    <>
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h1 className="font-syne text-3xl font-bold text-white">Users</h1>
                <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium border border-white/10">
                  {users.length} total
                </span>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full bg-white/5 border border-white/10 focus:border-violet-500 rounded-xl py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Filters */}

            {/* Table */}
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-max">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-gray-400 text-sm">
                      <th className="py-4 px-4 font-medium">#</th>
                      <th className="py-4 px-4 font-medium">User</th>
                      <th className="py-4 px-4 font-medium">Phone</th>
                      <th className="py-4 px-4 font-medium">Credits</th>
                      <th className="py-4 px-4 font-medium">Followers</th>
                      <th className="py-4 px-4 font-medium">Status</th>
                      <th className="py-4 px-4 font-medium">Joined</th>
                      <th className="py-4 px-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((u, index) => (
                        <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-4 text-gray-400">{index + 1}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <UserAvatar size="sm" />
                              <div>
                                <p className="text-white font-medium">{u.name}</p>
                                <p className="text-gray-400 text-xs">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-300">{u.phone || '-'}</td>
                          <td className="py-4 px-4 text-gray-300">{u.credits}</td>
                          <td className="py-4 px-4 text-gray-300">{u.followers?.length || 0}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${u.isActive ? 'bg-green-500/20 text-green-400' : 'bg-rose-500/20 text-rose-400'}`}>
                              {u.isActive ? 'Active' : 'Banned'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-400 text-sm">
                            {new Date(u.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4 text-right">
                            {u.isActive ? (
                              <button onClick={() => handleBanUnbanUser(u._id)} className="border border-rose-500/50 text-rose-400 hover:bg-rose-500/10 px-3 py-1 rounded-full text-xs font-medium transition-colors">
                                Ban
                              </button>
                            ) : (
                              <button onClick={() => handleBanUnbanUser(u._id)} className="border border-green-500/50 text-green-400 hover:bg-green-500/10 px-3 py-1 rounded-full text-xs font-medium transition-colors">
                                Unban
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="py-16 text-center text-gray-500">
                          <div className="flex flex-col items-center justify-center">
                            <Users className="w-10 h-10 mb-3 opacity-20" />
                            <p>No users found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>



  );
};

export default AdminUsers;

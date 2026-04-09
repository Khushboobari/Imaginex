import React, { useEffect, useState } from 'react';
import { Flag, Image as ImageIcon } from 'lucide-react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { getAllReports } from '../../features/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';

const AdminReports = () => {
  const { reports, adminLoading, adminSuccess, adminError, adminErrorMessage } = useSelector(state => state.admin)

  const dispatch = useDispatch()



  useEffect(() => {

    if (!adminError) {
      // Fetch All Reports
      dispatch(getAllReports())
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
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-syne text-3xl font-bold text-white">Reports</h1>
                <span className="bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-sm font-medium border border-rose-500/30">
                  {reports.length} pending
                </span>
              </div>
              <p className="text-gray-400 mt-1">Review flagged content from users</p>
            </div>

            {/* Reports List */}
            <div className="space-y-4">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <div key={report._id} className="glass-card p-4 flex flex-col sm:flex-row gap-4 sm:items-center hover:bg-white/5 transition-colors">
                    {/* Thumbnail */}
                    <div className="shrink-0">
                      {report.post?.imageLink ? (
                        <img src={report.post.imageLink} alt="Reported Post" className="w-20 h-20 object-cover rounded-xl border border-white/10" />
                      ) : (
                        <div className="w-20 h-20 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium mb-1">"{report.text}"</p>
                      <div className="space-y-1">
                        <p className="text-gray-400 text-sm line-clamp-1 truncate">
                          Post: {report.post?.prompt || 'Unknown Prompt'}
                        </p>
                        <p className="text-gray-500 text-xs text-medium">
                          Reported by @{report.user?.name}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2 shrink-0 items-end sm:items-end justify-between sm:justify-start w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-white/10">
                      <span className="text-gray-500 text-xs sm:mb-2">{new Date(report.createdAt).toLocaleDateString()}</span>
                      <div className="flex gap-2">
                        <button className="border border-gray-500/50 text-gray-300 hover:text-white hover:bg-white/10 px-4 py-1.5 rounded-full text-xs font-medium transition-colors">
                          Dismiss
                        </button>
                        <button className="border border-violet-500/50 text-violet-400 hover:bg-violet-500/10 px-4 py-1.5 rounded-full text-xs font-medium transition-colors">
                          View Post
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-card py-20 text-center flex flex-col items-center justify-center text-gray-500">
                  <Flag className="w-12 h-12 mb-4 opacity-20 text-rose-500" />
                  <h3 className="text-xl font-syne text-gray-400 mb-1">No reports found</h3>
                  <p className="text-sm">Great job! Your community guidelines are being upheld.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>



  );
};

export default AdminReports;

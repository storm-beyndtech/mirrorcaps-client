import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { contextData } from '../../context/AuthContext';
import PageLoader from '../PageLoader';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';

export default function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, fetching } = contextData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/login');
    if (user && user.fullName === '') return navigate('/account-setup');

    const chatCtn = document.getElementById('smartsupp-widget-container');
    if (chatCtn) chatCtn.style.display = 'none';

    return () => {
      if (chatCtn) chatCtn.style.display = 'block';
    };
  }, [fetching, user, navigate]);

  if (fetching || !user) return <PageLoader />;

  return (
    <div className="bg-gray-100 dark:bg-[#0f1117]">
      <div className="flex h-screen overflow-hidden p-5">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-2 pb-20 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>

          <MobileNav />
        </div>
      </div>
    </div>
  );
}

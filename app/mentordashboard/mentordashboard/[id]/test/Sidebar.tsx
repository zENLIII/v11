import Link from 'next/link';

interface SidebarProps {
  projectId: string;
}

const Sidebar: React.FC<SidebarProps> = ({ projectId }) => {
  return (
    <div className="hidden border-r bg-[#c4b5fd] lg:block dark:bg-[#2C2C54]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/mentordashboard">
            <Package2Icon className="h-6 w-6" />
            <span className="">Dashboard</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href={`/mentordashboard/${projectId}/`}>
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href={`/mentordashboard/${projectId}/students`}>
              <TrendingUpIcon className="h-4 w-4" />
              Students
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href={`/mentordashboard/${projectId}/announcements`}>
              <PackageIcon className="h-4 w-4" />
              Announcements
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href={`/mentordashboard/${projectId}/resources`}>
              <ResourceIcon className="h-4 w-4" />
              Resources
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href={`/mentordashboard/${projectId}/assignments`}>
              <MessageSquareIcon className="h-4 w-4" />
              Assignment
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-[#525252] transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href={`/mentordashboard/${projectId}/chats`}>
              <UserIcon className="h-4 w-4" />
              Chat
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;




function Package2Icon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
        <path d="M12 3v6" />
      </svg>
    )
  }
  
  
  function BellIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    )
  }
  
  
  function HomeIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  }
  
  
  function TrendingUpIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    )
  }
  
  
  function PackageIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    )
  }
  
  
  function MessageSquareIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  }
  
  
  function UserIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  }
  
  
  function ResourceIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l7 7-7 7-7-7 7-7z" />
        <path d="M2 12l5-5-5-5" />
        <path d="M22 12l-5 5 5 5" />
      </svg>
    )
  }
  
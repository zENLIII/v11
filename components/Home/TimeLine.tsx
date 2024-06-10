import React from "react";
function TimeLine(){
  const steps = [
    { title: 'What to Learn?' },
    { title: 'Choose a Project' },
    { title: 'Get a Mentor' },
    { title: 'Work on Project' },
    { title: 'New Skill Acquired' },
  ];

  return (
    <section className="grid-in-container py-12 lg:py-16 p-20 justify-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#64748b] ..." >
      <ol className="items-center sm:flex  justify-center">
      <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
          <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
          </svg>
          </div>
          <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div className="mt-3 sm:pe-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">What to Learn?</h3>
          {/* <time className="block mb-1 text-sm font-normal leading-none text-[#334155] dark:text-[#cbd5e1]">decide on what you want to learn</time> */}
          <p className="text-base font-normal text-[#0f172a] dark:text-[#cbd5e1]">Discover Your Learning Path and Achieve Your Goals!</p>
        </div>
      </li>
      <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
          <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          </div>
          <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div className="mt-3 sm:pe-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Choose a Project</h3>
          {/* <time className="block mb-1 text-sm font-normal leading-none text-[#334155] dark:text-[#cbd5e1]">choose on creating a project</time> */}
          <p className="text-base font-normal text-[#0f172a] dark:text-[#cbd5e1]">Select the Perfect Project and Kickstart Your Journey Today!</p>
        </div>
      </li>
      <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
          <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
          </div>
          <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div className="mt-3 sm:pe-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Get a Mentor</h3>
          {/* <time className="block mb-1 text-sm font-normal leading-none text-[#334155] dark:text-[#cbd5e1]">get a mentor from set of full mentor list</time> */}
          <p className="text-base font-normal text-[#0f172a] dark:text-[#cbd5e1]">Find Your Mentor and Unlock Your Full Potential!</p>
        </div>
      </li>
      <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
          <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
          </svg>
          </div>
          <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
        </div>
        <div className="mt-3 sm:pe-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Work on the Project</h3>
          {/* <time className="block mb-1 text-sm font-normal leading-none text-[#334155] dark:text-[#cbd5e1]">put on the effort of the project</time> */}
          <p className="text-base font-normal text-[#0f172a] dark:text-[#cbd5e1]">Start Working on Your Project and Gain Hands-On Experience!</p>
        </div>
      </li>
      <li className="relative mb-6 sm:mb-0">
        <div className="flex items-center">
          <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
          </svg>
          </div>
          <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700 last:hidden"></div>
        </div>
        <div className="mt-3 sm:pe-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New Skill Acquired</h3>
          {/* <time className="block mb-1 text-sm font-normal leading-none text-[#334155] dark:text-[#cbd5e1]">you have achieved a new skill</time> */}
          <p className="text-base font-normal text-[#0f172a] dark:text-[#cbd5e1]">Showcase Your New Skills and Propel Your Career Forward!</p>
        </div>
      </li>
    </ol>
    </section>
  );
};

export default TimeLine;


import { useEffect, useState } from "react";
import { fetchProjects } from "@/lib/firebase"; // Ensure this function is correctly imported
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const ProjectsList = ({ user, purchasedProjectIds, handleBuyProject }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    const loadedProjects = await fetchProjects();
    setProjects(loadedProjects);
  };

  return (
    <section className="w-full ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
          {projects.map((project) => (
            <div key={project.id}>
              <Card className="flex flex-col rounded-lg shadow-lg overflow-hidden w-full max-w-sm transition-transform duration-300 ease-in-out transform hover:scale-105 bg-white dark:bg-black shadow-[5px_5px_rgba(7,_89,_133,_0.4),_10px_10px_rgba(7,_89,_133,_0.3),_15px_15px_rgba(7,_89,_133,_0.2),_20px_20px_rgba(7,_89,_133,_0.1),_25px_25px_rgba(7,_89,_133,_0.05)]">
                <CardHeader className="flex-shrink-0 px-2 py-2 relative h-48 overflow-hidden">
                  <Link
                    href={`/explore/${project.id}`}
                    className="relative w-full h-full "
                  >
                    {project.imageUrl ? (
                      <img
                        alt={project.name}
                        src={project.imageUrl}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        height="200"
                        width="400"
                        style={{ aspectRatio: "400/200" }}
                      />
                    ) : (
                      <Image
                        alt="Project Image"
                        src="/placeholder.svg"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        height="200"
                        width="400"
                        style={{ aspectRatio: "400/200" }}
                      />
                    )}
                  </Link>
                </CardHeader>
                <CardContent className="flex-1 bg-white dark:bg-black px-4 py-0 flex flex-col justify-between">
                  <div className="flex-1">
                    <p className=" font-medium text-indigo-600 text-xs dark:text-indigo-400">
                      Project
                    </p>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 mt-0">
                      <Link
                        href={`/explore/${project.id}`}
                        className="hover:text-indigo-900 cursor-pointer"
                      >
                        {project.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-3">
                      {project.intro}
                    </CardDescription>
                  </div>
                  <div className="mt-4 py-4 flex items-center justify-end">
                    <Link
                      href={`/explore/${project.id}`}
                      className="relative inline-flex items-center justify-start px-1.5 py-1.5 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
                    >
                      <span className="w-32 h-32 rounded rotate-[-40deg] bg-[#dc2626] dark:bg-[#fca5a5] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-24 group-hover:translate-x-0"></span>
                      <span className="relative w-full text-left text-black dark:text-[#111827] transition-colors duration-300 ease-in-out group-hover:text-white dark:group-hover:text-[#7f1d1d]">
                        View More
                      </span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;

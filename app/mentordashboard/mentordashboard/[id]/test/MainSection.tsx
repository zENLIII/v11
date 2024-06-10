import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface MainSectionProps {
  project: any;
  mentor: string | null;
}

const MainSection: React.FC<MainSectionProps> = ({ project, mentor }) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-[#f5f3ff] dark:bg-[#3D405B]">
      <div className="mt-2 space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {project.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Mentored by {mentor ? mentor : "No mentor assigned"}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {project.intro}
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-col p-6 bg-[#a78bfa] dark:bg-[#1e1b4b]">
          <CardHeader className="mb-4">
            <CardTitle className="text-2xl font-bold">12</CardTitle>
            <CardDescription className="text-sm font-medium">
              Enrolled Students
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}

export default MainSection;
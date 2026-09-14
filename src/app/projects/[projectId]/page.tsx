import { ProjectIdView } from "@/features/projects/components/project-id-view";
import { Id } from "../../../../convex/_generated/dataModel";

interface ProjectIdProps {
    params: Promise<{ projectId: Id<"projects"> }>;
};

const ProjectIdPage = async ({
    params,
}: ProjectIdProps) => {
    const { projectId } = await params;

    return ( 
        <ProjectIdView 
            projectId={projectId}
        />
    );
};

export default ProjectIdPage;
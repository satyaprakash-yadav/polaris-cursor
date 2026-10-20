import { ProjectIdLayout } from "@/features/projects/components/project-id-layout";
import { Id } from "../../../../convex/_generated/dataModel";

interface Props {
    params: Promise<{ projectId: Id<"projects"> }>;
    children: React.ReactNode;
};

const Layout = async ({
    params,
    children,
}: Props) => {
    const { projectId } = await params;

    return (
        <ProjectIdLayout
            projectId={projectId}
        >
            {children}
        </ProjectIdLayout>
    );
};

export default Layout;
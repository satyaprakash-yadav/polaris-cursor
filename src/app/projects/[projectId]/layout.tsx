import { ProjectIdLayout } from "@/features/projects/components/project-id-layout";

interface Props {
    params: Promise<{ projectId: string }>;
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
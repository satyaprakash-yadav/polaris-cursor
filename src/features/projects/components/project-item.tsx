import Link from "next/link";
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Doc } from "../../../../convex/_generated/dataModel";
import { FaGithub } from "react-icons/fa";

export const formatTimestamp = (timestamp: number) => {
    return formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
    });
};

export const getProjectIcon = (project: Doc<"projects">) => {
    if (project.importStatus === "completed") {
        return <FaGithub className="size-3.5 text-muted-foreground" />
    };

    if (project.importStatus === "failed") {
        return <AlertCircleIcon className="size-3.5 text-muted-foreground" />
    };

    if (project.importStatus === "importing") {
        return <Loader2Icon className="size-3.5 text-muted-foreground animate-spin" />
    };

    return <GlobeIcon className="size-3.5 text-muted-foreground" />;
};

interface ProjectItemProps {
    data: Doc<"projects">;
};

export const ProjectItem = ({
    data,
}: ProjectItemProps) => {
    return (
        <Link
            href={`/projects/${data._id}`}
            className="text-sm text-foreground/60 font-medium hover:text-foreground py-1 flex items-center justify-between w-full group"
        >
            <div className="flex items-center gap-2">
                {getProjectIcon(data)}
                <span className="truncate">{data.name}</span>
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-foreground/60 transition-colors">
                {formatTimestamp(data.updatedAt)}
            </span>
        </Link>
    );
};

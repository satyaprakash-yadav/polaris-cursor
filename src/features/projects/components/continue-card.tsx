import { Button } from "@/components/ui/button";
import { Doc } from "../../../../convex/_generated/dataModel";
import Link from "next/link";
import { formatTimestamp, getProjectIcon } from "./project-item";
import { ArrowRightIcon } from "lucide-react";

interface ContinueCardProps {
    data: Doc<"projects">;
};

export const ContinueCard = ({
    data,
}: ContinueCardProps) => {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">
                Last updated
            </span>
            <Button
                variant="outline"
                asChild
                className="h-auto items-start justify-start p-4 bg-background border rounded-none flex flex-col gap-2"
            >
                <Link href={`/projects/${data._id}`} className="group">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            {getProjectIcon(data)}
                            <span className="font-medium truncate">{data.name}</span>
                        </div>
                        <ArrowRightIcon className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {formatTimestamp(data.updatedAt)}
                    </span>
                </Link>
            </Button>
        </div>
    );
};
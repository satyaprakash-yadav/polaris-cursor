import { ShieldAlertIcon } from "lucide-react";

import {
    Item,
    ItemTitle,
    ItemMedia,
    ItemContent,
    ItemDescription,
    ItemActions,
} from "@/components/ui/item";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export const UnauthenticatedView = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-background">
            <div className="w-full max-w-lg bg-muted">
                <Item variant="outline">
                    <ItemMedia variant="icon">
                        <ShieldAlertIcon />
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>Unauthenticated Access</ItemTitle>
                        <ItemDescription>
                            You are not authorized to access this resource
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <SignInButton>
                            <Button variant="outline" size="sm">
                                Sign In
                            </Button>
                        </SignInButton>
                    </ItemActions>
                </Item>
            </div>
        </div>
    );
};

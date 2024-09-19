import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loader = ({ className }: { className?: string }) => {
    return (
        <Loader2
            className={cn('className="w-6 h-6 ml-3 animate-spin font-bold text-white', className)}
        />
    );
};

export default Loader;
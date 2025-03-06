import {cn} from "@/lib/utils";

const Container = ({ children , className}) => {
    return (
        <div className={cn("mx-auto px-2 sm:px-4 md:px-6 lg:px-8 max-w-7xl", className)}>
            {children}
        </div>
    );
};

export default Container;
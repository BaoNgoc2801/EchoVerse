import { FC } from "react";
import Header from "../common/header";
import Footer from "../common/footer"; // Make sure to create this component
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const LayoutWithHeader: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen px-4 md:px-10 bg-black">
            <Header />
            <main className="flex-1 "> {/* Adjust padding here */}
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default LayoutWithHeader;

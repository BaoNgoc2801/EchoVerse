import Header from "../common/header";
import Footer from "../common/footer";
import { ReactNode } from "react";
import { ThemeProvider } from "@/contexts/themeContext";

interface LayoutWithHeaderProps {
    children: ReactNode;
}

const LayoutWithHeader: React.FC<LayoutWithHeaderProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default LayoutWithHeader;
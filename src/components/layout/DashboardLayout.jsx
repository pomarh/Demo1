import Sidebar from "./Sidebar";
import Header from "./Header";

function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Header>
                    <main className="flex-1 p-6">{children}</main>
                </Header>
            </div>
        </div>
    );
}

export default DashboardLayout;

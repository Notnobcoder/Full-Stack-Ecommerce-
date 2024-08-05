import Navbar from "../../components/Navbar"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>

  )
}

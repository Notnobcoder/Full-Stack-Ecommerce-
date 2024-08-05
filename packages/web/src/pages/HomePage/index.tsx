import DialogC from "../../components/Dialog";
import { MainLayout } from "../../layout/main";
import { Details } from "./details";
import Home from "./home";

export default function HomePage() {
  return (
    <MainLayout>
      <Home />
      <DialogC />
      <Details />
    </MainLayout>
  )
}

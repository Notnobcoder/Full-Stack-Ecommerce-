import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "../HomePage"
import SocketPage from "../SocketPage"
import LoginPage from "../LoginPage"
import { RegisterPage } from "../RegisterPage"

export const Application = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/socket" element={<SocketPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

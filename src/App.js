import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import TopNavbar from "./components/TopNavbar";
import Dashboard from "./components/dashboard/Dashboard";
import Inspecoes from "./components/pages/Inspecoes";
import AgendaInspecoes from "./components/pages/AgendaInspecoes";
import PlanoAcao from "./components/pages/PlanoAcao";
import ControleEquipamentos from "./components/pages/ControleEquipamentos";
import ArmazenamentoDocumentos from "./components/pages/ArmazenamentoDocumentos";
import Login from "./components/login/Login";
import DssEmociograma from "./components/pages/DssEmociograma";
import OrdemServico from "./components/pages/OrdemServico";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState({ text: "", icon: null });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const sidebarWidth = 250;
  const sidebarMinWidth = 60;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {isAuthenticated && (
          <Navbar
            isOpen={isSidebarOpen}
            sidebarWidth={sidebarWidth}
            sidebarMinWidth={sidebarMinWidth}
            setSelectedMenu={setSelectedMenu}
            onLogout={handleLogout}
          />
        )}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {isAuthenticated && (
            <TopNavbar
              sidebarWidth={isSidebarOpen ? sidebarWidth : sidebarMinWidth}
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              selectedMenu={selectedMenu}
            />
          )}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              marginTop: isAuthenticated ? "64px" : "0",
              padding: "16px",
            }}
          >
            <Routes>
              {!isAuthenticated ? (
                <Route
                  path="*"
                  element={<Login onLogin={() => setIsAuthenticated(true)} />}
                />
              ) : (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/inspecoes" element={<Inspecoes />} />
                  <Route path="/dss-emociograma" element={<DssEmociograma />} />
                  <Route path="/ordem-servico" element={<OrdemServico />} />
                  <Route path="/agenda-inspecoes" element={<AgendaInspecoes />} />
                  <Route path="/plano-acao" element={<PlanoAcao />} />
                  <Route path="/controle-equipamentos" element={<ControleEquipamentos />} />
                  <Route path="/armazenamento-documentos" element={<ArmazenamentoDocumentos />} />
                  <Route path="*" element={<Navigate to="/inicio" replace />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

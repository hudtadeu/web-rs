import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faClipboardList,
  faCalendarAlt,
  faTasks,
  faToolbox,
  faFolderOpen,
  faBarChart,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = ({ isOpen, sidebarWidth, sidebarMinWidth, setSelectedMenu, onLogout }) => {
  const [activeMenu, setActiveMenu] = useState(null); 
  const [openInspecoes, setOpenInspecoes] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const menuItems = [
    { id: "dashboard", text: "Dashboard", icon: faBarChart, link: "/dashboard" },
    {
      id: "inspecoes",
      text: "Inspeções",
      icon: faClipboardList,
      submenus: [
        { id: "inspecoes-campo", text: "Inspeções de Campo", link: "/inspecoes" },
        { id: "dss-emociograma", text: "DSS Emociograma", link: "/dss-emociograma" },
        { id: "ordem-servico", text: "Ordem de Serviço", link: "/ordem-servico" }
      ]
    },
    { id: "agenda", text: "Cronograma de inspeções", icon: faCalendarAlt, link: "/agenda-inspecoes" },
    { id: "planoacao", text: "Plano de Ação", icon: faTasks, link: "/plano-acao" },
    { id: "controlequip", text: "Controle de Equipamentos", icon: faToolbox, link: "/controle-equipamentos" },
    { id: "armazenamento", text: "Documentos", icon: faFolderOpen, link: "/armazenamento-documentos" },
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    if (menuId === "inspecoes") setOpenInspecoes((prev) => !prev);
    else setOpenInspecoes(false);
    setActiveSubMenu(null); // limpa seleção de submenu ao trocar menu principal
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open
      sx={{
        width: isOpen ? sidebarWidth : sidebarMinWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isOpen ? sidebarWidth : sidebarMinWidth,
          boxSizing: "border-box",
          backgroundColor: "#3C8DBC",
          color: "#fff",
          borderRadius: "0px 10px 10px 0px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          transition: "width 0.3s ease",
          overflowX: "visible", 
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#3C8DBC",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#3C8DBC",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#e0f7fa",
            borderRadius: "10px",
          },
        },
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {isOpen ? (
            <img
              src="/rsdata-branco-logo.png"
              alt="RS Data Logo Aberta"
              style={{
                width: "120px",
                height: "auto",
              }}
            />
          ) : (
            <img
              src="/rs-branco-logo.png"
              alt="RS Data Logo Fechada"
              style={{
                width: "30px",
                height: "auto",
              }}
            />
          )}
        </Box>

        {/* Menu */}
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                disablePadding
                sx={{
                  justifyContent: isOpen ? "flex-start" : "center",
                  padding: isOpen ? "4px 15px" : "5px 10px",
                  marginBottom: isOpen ? "0px" : "5px",
                }}
              >
                {item.submenus ? (
                  <ListItemButton
                    onClick={() => handleMenuClick(item.id)}
                    sx={{
                      borderRadius: isOpen ? "4px" : "5px",
                      justifyContent: isOpen ? "flex-start" : "center",
                      padding: isOpen ? "4px" : "4px",
                      backgroundColor: activeMenu === item.id ? "#e0f7fa" : "transparent",
                      color: activeMenu === item.id ? "#3C8DBC" : "#fff",
                      "&:hover": {
                        backgroundColor: "#e0f7fa",
                        color: "#3C8DBC",
                        "& .MuiListItemIcon-root": {
                          color: "#3C8DBC",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: activeMenu === item.id ? "#3C8DBC" : "#fff",
                        justifyContent: "center",
                        minWidth: "auto",
                        fontSize: isOpen ? "0.85rem" : "0.85rem",
                        marginRight: isOpen ? "8px" : "0px",
                      }}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                    </ListItemIcon>
                    {isOpen && (
                      <>
                        <ListItemText
                          primary={item.text}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: "0.75rem",
                              fontWeight: "500",
                              color: "inherit",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                            },
                          }}
                        />
                        <FontAwesomeIcon
                          icon={openInspecoes ? faChevronUp : faChevronDown}
                          style={{ marginLeft: 8, fontSize: "0.7rem" }}
                        />
                      </>
                    )}
                  </ListItemButton>
                ) : (
                  <ListItemButton
                    component={Link}
                    to={item.link}
                    onClick={() => {
                      handleMenuClick(item.id);
                      setSelectedMenu({ text: item.text, icon: item.icon });
                    }}
                    sx={{
                      borderRadius: isOpen ? "4px" : "5px",
                      justifyContent: isOpen ? "flex-start" : "center",
                      padding: isOpen ? "4px" : "4px",
                      backgroundColor: activeMenu === item.id ? "#e0f7fa" : "transparent",
                      color: activeMenu === item.id ? "#3C8DBC" : "#fff",
                      "&:hover": {
                        backgroundColor: "#e0f7fa",
                        color: "#3C8DBC",
                        "& .MuiListItemIcon-root": {
                          color: "#3C8DBC",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: activeMenu === item.id ? "#3C8DBC" : "#fff",
                        justifyContent: "center",
                        minWidth: "auto",
                        fontSize: isOpen ? "0.85rem" : "0.85rem",
                        marginRight: isOpen ? "8px" : "0px",
                      }}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                    </ListItemIcon>
                    {isOpen && (
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: "0.75rem",
                            fontWeight: "500",
                            color: "inherit",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                )}
              </ListItem>
              {/* Submenus de Inspeções */}
              {item.submenus && openInspecoes && activeMenu === "inspecoes" && isOpen && (
                <Box sx={{ pl: 4 }}>
                  {item.submenus.map((sub) => (
                    <ListItemButton
                      key={sub.id}
                      component={Link}
                      to={sub.link}
                      onClick={() => {
                        setSelectedMenu({ text: sub.text, icon: item.icon });
                        setActiveSubMenu(sub.id); // apenas seta o submenu ativo
                        // não altera activeMenu nem openInspecoes
                      }}
                      sx={{
                        borderRadius: "4px",
                        fontSize: "0.7rem",
                        color: activeSubMenu === sub.id ? "#3C8DBC" : "#fff",
                        backgroundColor: activeSubMenu === sub.id ? "#e0f7fa" : "transparent",
                        ml: 1,
                        mb: 0.5,
                        "&:hover": {
                          backgroundColor: "#e0f7fa",
                          color: "#3C8DBC",
                        },
                      }}
                    >
                      <ListItemText
                        primary={sub.text}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: "0.7rem",
                            fontWeight: "400",
                            color: "inherit",
                          },
                        }}
                      />
                    </ListItemButton>
                  ))}
                </Box>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Botão Sair */}
      <Divider />
      <Box sx={{ padding: "5px 0" }}>
        <ListItem disablePadding>
        <ListItemButton
            onClick={onLogout} 
            sx={{
              borderRadius: "4px",
              transition: "all 0.3s ease",
              margin: "2px 8px",
              justifyContent: isOpen ? "flex-start" : "center",
              backgroundColor: "transparent",
              color: "#fff",
              padding: "4px 8px",
              "&:hover": {
                backgroundColor: "#e0f7fa",
                color: "#3C8DBC",
              },
              "&:hover .MuiListItemIcon-root": {
                color: "#3C8DBC",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#fff",
                minWidth: 28,
                transition: "color 0.3s ease",
              }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ fontSize: "0.8rem" }}
              />
            </ListItemIcon>
            {isOpen && (
              <ListItemText
                primary="Sair"
                primaryTypographyProps={{
                  sx: {
                    fontSize: "0.8rem",
                    fontWeight: "500",
                    color: "inherit",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  },
                }}
              />
            )}
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Navbar;

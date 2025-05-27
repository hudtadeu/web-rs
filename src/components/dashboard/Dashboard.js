import React from "react";
import { Box, Grid, Card, Typography, TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBalanceScale,
  faHardHat,
  faFireExtinguisher,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Chart from "react-apexcharts";

const Indicadores = () => {
  const data = [
    {
      title: "Conformidade Legal",
      icon: faBalanceScale,
      iconColor: "#007bff",
      iconBackground: "#e6f0ff",
      value: "92%",
      description: "Relatórios atendem às normas.",
      metric: "Conformidade (NR-6, NR-12)",
    },
    {
      title: "Gestão de EPI's",
      icon: faHardHat,
      iconColor: "#ffc107",
      iconBackground: "#fff7e6",
      value: "120",
      description: "Eficiência no uso de EPI's.",
      metric: "EPI's distribuídos",
    },
    {
      title: "Prevenção de Incêndios",
      icon: faFireExtinguisher,
      iconColor: "#ff4d4f",
      iconBackground: "#ffe6e6",
      value: "95%",
      description: "Simulados com sucesso.",
      metric: "Eficiência em simulados",
    },
    {
      title: "Cultura de Segurança",
      icon: faUsers,
      iconColor: "#36cfc9",
      iconBackground: "#e6fffb",
      value: "85%",
      description: "Adesão em campanhas.",
      metric: "Taxa de reportes: 72%",
    },
  ];

  const pieChartOptions = {
    chart: {
      type: "donut",
      toolbar: {
        show: false, 
      },
    },
    labels: ["Capacetes", "Luvas", "Máscaras", "Óculos de Proteção", "Outros"],
    colors: ["#0056b3", "#ff9100", "#e60000", "#1de9b6", "#555555"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#003d80", "#b37400", "#b20000", "#007d66", "#333333"],
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.8,
      },
    },
    tooltip: {
      enabled: false, 
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              formatter: (w) =>
                w.globals.seriesTotals.reduce((a, b) => a + b, 0), 
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: "bold",
              formatter: (val) => val, 
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
  };

  const pieChartData = [25, 30, 15, 20, 10];

  const barChartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false, 
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%", 
      },
    },
    xaxis: {
      categories: [
        "Produção",
        "Transporte",
        "Manutenção",
        "Administração",
        "Logística", 
        "Suprimentos", 
      ],
    },
    colors: ["#007bff"],
    legend: {
      show: false,
    },
  };

  const barChartData = [
    {
      name: "Não-Conformidades",
      data: [12, 8, 15, 6, 9, 5], 
    },
  ];  

  const auditRadialBarChartOptions = {
    chart: {
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%", 
        },
        track: {
          background: "#e0e0e0", 
          strokeWidth: "100%", 
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: "16px",
          },
          value: {
            show: true,
            fontSize: "14px",
            formatter: (val) => `${val}%`, 
          },
          total: {
            show: true,
            label: "Total",
            formatter: (w) => {
              const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              return `${total}`;
            },
          },
        },
      },
    },
    labels: ["Concluídas", "Em Andamento", "Pendentes"],
    colors: ["#28a745", "#ffc107", "#dc3545"],
    legend: {
      show: true, 
      position: "bottom", 
      fontSize: "13px",
      labels: {
        colors: "#333", 
      },
      markers: {
        width: 12,
        height: 12,
        radius: 6, 
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
  };
  
  
  const auditRadialBarChartData = [50, 30, 20]; 

  const useStyles = {
    tableContainer: {
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    tableHeader: {
      backgroundColor: "#007bff",
    },
    tableHeaderCell: {
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: "0.8rem",
      padding: "11px",
    },
    tableRow: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#f9f9f9",
      },
      "&:hover": {
        backgroundColor: "#f1f1f1",
      },
    },
    tableCell: {
      fontSize: "0.8rem",
      color: "#333333",
      padding: "12px",
    },
  };
  

  const tableData = [
    {
      equipamento: "Capacete de Segurança",
      data: "2025-01-05",
      status: "Aprovado",
      setor: "Produção",
      responsavel: "João Silva",
    },
    {
      equipamento: "Luva Térmica",
      data: "2025-01-03",
      status: "Em Teste",
      setor: "Manutenção",
      responsavel: "Ana Souza",
    },
    {
      equipamento: "Óculos de Proteção",
      data: "2025-01-07",
      status: "Reprovado",
      setor: "Laboratório",
      responsavel: "Carlos Mendes",
    },
    {
      equipamento: "Máscara Respiratória",
      data: "2025-01-04",
      status: "Aprovado",
      setor: "Logística",
      responsavel: "Fernanda Lima",
    },
  ];
  

  return (
    <Box sx={{ padding: "16px",  mt: "-20px", }}>
      <Grid container spacing={3}>
        {data.map((item, index) => (
          <Grid
            item
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={index}
          >
            <Card
              sx={{
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "16px",
                height: "auto",
                maxWidth: "100%",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                },
                "&:hover .faixa": {
                  backgroundColor: item.iconColor,
                },
                "@media (max-width: 768px)": {
                  width: "calc(100% - 16px)", 
                  margin: "0 auto",
                },
                "@media (max-width: 480px)": {
                  width: "100%",
                  padding: "8px", 
                },
              }}
            >
              <Box
                className="faixa"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "6px",
                  backgroundColor: `${item.iconColor}33`,
                  transition: "background-color 0.3s ease",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    backgroundColor: item.iconBackground,
                  }}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{
                      fontSize: "1.2rem",
                      color: item.iconColor,
                    }}
                  />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#333",
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "0.9rem",
                    color: "#666",
                  }}
                >
                  {item.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.8rem",
                    color: "#999",
                  }}
                >
                  {item.metric}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: "16px" }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
              height: "320px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#333",
                marginBottom: "24px",
              }}
            >
              Distribuição de EPIs por Tipo
            </Typography>
            <Chart
              options={pieChartOptions}
              series={pieChartData}
              type="donut"
              width="100%"
              height="290px"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
              height: "320px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#333",
                marginBottom: "24px",
              }}
            >
              Ocorrências de Não-Conformidade por Setor
            </Typography>
            <Chart
              options={barChartOptions}
              series={barChartData}
              type="bar"
              width="105%"
              height="280px"
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: "25px" }}>
        <Grid item xs={12} md={6}>
        <Card
            sx={{
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
            height: "310px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
            },
            }}
        >
            <Typography
            variant="h6"
            sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#333",
                marginBottom: "24px",
            }}
            >
            Cultura de SSO
            </Typography>
            <Box sx={{ display: "flex", height: "32px", borderRadius: "8px", overflow: "hidden", marginBottom: "16px" }}>
            {[
                { label: "Participação em campanhas", percentage: 39.7, color: "#bfbfbf" },
                { label: "Adesão a treinamentos", percentage: 28.3, color: "#7b8cff" },
                { label: "Conformidade com normas", percentage: 17.4, color: "#24c7f8" },
                { label: "Reportes de incidentes", percentage: 14.6, color: "#1a1a3c" },
            ].map((item, index) => (
                <Box
                key={index}
                sx={{
                    backgroundColor: item.color,
                    width: `${item.percentage}%`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                <Typography sx={{ color: "#fff", fontSize: "12px", fontWeight: "bold" }}>
                    {item.percentage}%
                </Typography>
                </Box>
            ))}
            </Box>
            {[
            { label: "Participação em campanhas", percentage: 39.7, color: "#bfbfbf" },
            { label: "Adesão a treinamentos", percentage: 28.3, color: "#7b8cff" },
            { label: "Conformidade com normas", percentage: 17.4, color: "#24c7f8" },
            { label: "Reportes de incidentes", percentage: 14.6, color: "#1a1a3c" },
            ].map((item, index, arr) => (
            <Box
                key={index}
                sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "8px",
                marginBottom: "8px",
                borderBottom: index !== arr.length - 1 ? "1px solid #e0e0e0" : "none",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Box
                    sx={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    }}
                />
                <Typography sx={{ fontSize: "13px", color: "#333" }}>{item.label}</Typography>
                </Box>
                <Typography sx={{ fontSize: "13px", color: "#666" }}>{item.percentage}%</Typography>
            </Box>
            ))}
        </Card>
        </Grid>
        <Grid item xs={12} md={6}>
        <Card
            sx={{
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
            background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
            height: "310px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)",
            },
            }}
        >
            <Typography
            variant="h6"
            sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#333",
                marginBottom: "10px",
            }}
            >
            Status de Auditorias
            </Typography>
            <Chart
            options={auditRadialBarChartOptions}
            series={auditRadialBarChartData}
            type="radialBar"
            width="100%"
            height="280px"
            />
        </Card>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: "24px" }}>
        <Grid item xs={12}>
          <Card
            sx={{
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1rem",
                color: "#333",
                marginBottom: "16px",
              }}
            >
              Monitoramento e Testes de EPIs
            </Typography>
            <TableContainer component={Paper} sx={useStyles.tableContainer}>
              <Table>
                <TableHead sx={useStyles.tableHeader}>
                  <TableRow>
                    <TableCell sx={useStyles.tableHeaderCell}>Equipamento</TableCell>
                    <TableCell sx={useStyles.tableHeaderCell}>Data de Validação/Teste</TableCell>
                    <TableCell sx={useStyles.tableHeaderCell}>Status</TableCell>
                    <TableCell sx={useStyles.tableHeaderCell}>Setor de Aplicação</TableCell>
                    <TableCell sx={useStyles.tableHeaderCell}>Responsável</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index} sx={useStyles.tableRow}>
                      <TableCell sx={useStyles.tableCell}>{row.equipamento}</TableCell>
                      <TableCell sx={useStyles.tableCell}>{row.data}</TableCell>
                      <TableCell sx={useStyles.tableCell}>{row.status}</TableCell>
                      <TableCell sx={useStyles.tableCell}>{row.setor}</TableCell>
                      <TableCell sx={useStyles.tableCell}>{row.responsavel}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
      </Grid>
    </Box>
  );
};

export default Indicadores;

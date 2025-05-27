import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slider,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import {
  SentimentVerySatisfied,
  SentimentSatisfied,
  SentimentNeutral,
  SentimentDissatisfied,
  SentimentVeryDissatisfied,
  HelpOutline,
  Save,
  Add,
  Edit,
  Delete,
  Close,
  Person,
  Badge
} from '@mui/icons-material';

// Dados mockados - na prática viriam de uma API
const initialEmployees = [
  {
    id: 1,
    name: "João Silva",
    registration: "12345",
    stressLevel: 3,
    motivationLevel: 4,
    concentrationLevel: 3,
    teamworkLevel: 4,
    satisfactionLevel: 3,
    comments: "",
    lastEvaluation: "2023-05-15"
  },
  {
    id: 2,
    name: "Maria Souza",
    registration: "54321",
    stressLevel: 2,
    motivationLevel: 5,
    concentrationLevel: 4,
    teamworkLevel: 5,
    satisfactionLevel: 4,
    comments: "Me sinto muito motivada com o novo projeto",
    lastEvaluation: "2023-05-18"
  }
];

const DssEmociograma = () => {
  // Estados
  const [employees, setEmployees] = useState(initialEmployees);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [searchTerm, setSearchTerm] = useState("");

  // Ícones para representar os níveis
  const moodIcons = [
    <SentimentVeryDissatisfied color="error" fontSize="medium" />,
    <SentimentDissatisfied color="warning" fontSize="medium" />,
    <SentimentNeutral color="info" fontSize="medium" />,
    <SentimentSatisfied color="success" fontSize="medium" />,
    <SentimentVerySatisfied color="success" fontSize="medium" />
  ];

  // Calcular resultado geral
  const calculateResult = (employee) => {
    if (!employee) return { text: 'Não avaliado', color: 'default' };
    
    const total = employee.stressLevel + employee.motivationLevel + 
                 employee.concentrationLevel + employee.teamworkLevel + 
                 employee.satisfactionLevel;
    const average = total / 5;
    
    if (average <= 2) return { text: 'Crítico', color: 'error' };
    if (average <= 3) return { text: 'Atenção', color: 'warning' };
    if (average <= 4) return { text: 'Normal', color: 'info' };
    return { text: 'Excelente', color: 'success' };
  };

  // Handlers
  const handleOpenCreate = () => {
    setCurrentEmployee({
      id: null,
      name: "",
      registration: "",
      stressLevel: 3,
      motivationLevel: 4,
      concentrationLevel: 3,
      teamworkLevel: 4,
      satisfactionLevel: 3,
      comments: "",
      lastEvaluation: new Date().toISOString().split('T')[0]
    });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleOpenEdit = (employee) => {
    setCurrentEmployee({ ...employee });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentEmployee(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const handleSliderChange = (name) => (e, newValue) => {
    setCurrentEmployee({ ...currentEmployee, [name]: newValue });
  };

  const handleSaveEmployee = () => {
    if (!currentEmployee.name || !currentEmployee.registration) {
      setSnackbar({ open: true, message: "Nome e matrícula são obrigatórios!", severity: "error" });
      return;
    }

    if (editMode) {
      // Atualizar colaborador existente
      setEmployees(employees.map(emp => 
        emp.id === currentEmployee.id ? currentEmployee : emp
      ));
      setSnackbar({ open: true, message: "Colaborador atualizado com sucesso!", severity: "success" });
    } else {
      // Adicionar novo colaborador
      const newId = Math.max(...employees.map(emp => emp.id), 0) + 1;
      const newEmployee = { ...currentEmployee, id: newId };
      setEmployees([...employees, newEmployee]);
      setSnackbar({ open: true, message: "Colaborador cadastrado com sucesso!", severity: "success" });
    }

    handleCloseDialog();
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    setSnackbar({ open: true, message: "Colaborador removido com sucesso!", severity: "info" });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Filtra colaboradores pela busca
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.registration.includes(searchTerm)
  );

  return (
    <Box sx={{ p: 2, pt: 3, maxWidth: 1200, margin: 'auto' }}>
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 32, height: 32 }}>
            <SentimentSatisfied fontSize="small" />
          </Avatar>
          <Typography variant="h4" component="h1">
            DSS Emociograma
          </Typography>
          <Tooltip title="Sistema de avaliação emocional para segurança no trabalho">
            <IconButton>
              <HelpOutline />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Avaliação psicossocial dos colaboradores para prevenção de riscos no ambiente de trabalho
      </Typography>

      {/* Barra de ações: Botão à esquerda, busca à direita */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleOpenCreate}
          size="small"
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            boxShadow: 1,
            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
            fontSize: 13,
            px: 2,
            py: 0.5,
            minHeight: 32,
            fontFamily: "'Inter', sans-serif",
            textTransform: 'none'
          }}
        >
          <span style={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Novo Colaborador</span>
        </Button>
        <Box sx={{ width: 350 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar por nome ou matrícula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Badge sx={{ mr: 1, color: 'action.active' }} />
            }}
            size="small"
            sx={{
              borderRadius: 2,
              background: '#fafbfc',
              fontSize: 13,
              fontFamily: "'Inter', sans-serif"
            }}
            inputProps={{
              style: { fontSize: 13, fontFamily: "'Inter', sans-serif" }
            }}
          />
        </Box>
      </Box>

      {/* Lista de colaboradores */}
      <TableContainer component={Paper} elevation={3} sx={{
        borderRadius: 3,
        boxShadow: 2,
        background: 'rgba(255,255,255,0.95)',
        fontFamily: "'Inter', sans-serif"
      }}>
        <Table size="small" sx={{ fontFamily: "'Inter', sans-serif" }}>
          <TableHead>
            <TableRow sx={{
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)'
            }}>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Colaborador</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }} align="center">Estado</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }} align="center">Última Avaliação</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }} align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((employee) => {
              const result = calculateResult(employee);
              return (
                <TableRow
                  key={employee.id}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f4f6fb' },
                    '&:hover': { backgroundColor: '#e3f2fd' },
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ bgcolor: 'secondary.main', mr: 2, width: 28, height: 28 }}>
                        <Person fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography fontWeight="medium">{employee.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Matrícula: {employee.registration}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      icon={moodIcons[Math.round((employee.stressLevel + employee.motivationLevel + 
                        employee.concentrationLevel + employee.teamworkLevel + 
                        employee.satisfactionLevel) / 5) - 1]}
                      label={result.text}
                      color={result.color}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {employee.lastEvaluation || 'Não avaliado'}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEdit(employee)}
                        size="small"
                        sx={{
                          borderRadius: 2,
                          background: '#e3f2fd',
                          mr: 0.5,
                          '&:hover': { background: '#bbdefb' },
                          p: 0.5,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        <Edit sx={{ fontSize: 18 }} />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteEmployee(employee.id)}
                        size="small"
                        sx={{
                          borderRadius: 2,
                          background: '#ffebee',
                          '&:hover': { background: '#ffcdd2' },
                          p: 0.5,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        <Delete sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo para adicionar/editar */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 340,
            background: '#fff',
            boxShadow: 3,
            border: '1px solid #e0e0e0',
            fontFamily: "'Inter', sans-serif"
          }
        }}
      >
        <DialogTitle sx={{
          fontWeight: 600,
          color: '#222',
          pb: 0.5,
          fontSize: 16,
          fontFamily: "'Inter', sans-serif",
          borderBottom: '1px solid #f0f0f0',
          mb: 2,
          p: 2
        }}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: 'secondary.main', mr: 2, width: 32, height: 32 }}>
              <Person fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="h6" component="div" sx={{ fontSize: 16, fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                {editMode ? 'Editar Colaborador' : 'Cadastrar Novo Colaborador'}
              </Typography>
              <Typography variant="body2" color="inherit" sx={{ fontFamily: "'Inter', sans-serif" }}>
                {currentEmployee?.name || "Novo Colaborador"}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            pt: 2,
            pb: 1,
            overflow: 'visible',
            background: '#fafbfc',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 0,
            fontFamily: "'Inter', sans-serif"
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  name="name"
                  value={currentEmployee?.name || ""}
                  onChange={handleInputChange}
                  margin="dense"
                  required
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ sx: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
                  sx={{
                    borderRadius: 2,
                    background: '#fff',
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif"
                  }}
                  inputProps={{ style: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Matrícula"
                  name="registration"
                  value={currentEmployee?.registration || ""}
                  onChange={handleInputChange}
                  margin="dense"
                  required
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ sx: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
                  sx={{
                    borderRadius: 2,
                    background: '#fff',
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif"
                  }}
                  inputProps={{ style: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
                  Data da Avaliação
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
                  {currentEmployee?.lastEvaluation || new Date().toISOString().split('T')[0]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
                  Estado Geral
                </Typography>
                <Chip
                  icon={moodIcons[
                    Math.round(
                      (currentEmployee?.stressLevel +
                        currentEmployee?.motivationLevel +
                        currentEmployee?.concentrationLevel +
                        currentEmployee?.teamworkLevel +
                        currentEmployee?.satisfactionLevel) / 5
                    ) - 1
                  ]}
                  label={calculateResult(currentEmployee).text}
                  color={calculateResult(currentEmployee).color}
                  variant="filled"
                  sx={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              {/* Sliders de avaliação em grid compacto */}
              {[
                { name: 'stressLevel', label: 'Estresse' },
                { name: 'motivationLevel', label: 'Motivação' },
                { name: 'concentrationLevel', label: 'Concentração' },
                { name: 'teamworkLevel', label: 'Trabalho em Equipe' },
                { name: 'satisfactionLevel', label: 'Satisfação' }
              ].map((item) => (
                <Grid item xs={12} sm={6} key={item.name}>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography sx={{ flexGrow: 1, fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
                      {item.label}
                    </Typography>
                    {moodIcons[currentEmployee?.[item.name] - 1]}
                  </Box>
                  <Slider
                    value={currentEmployee?.[item.name] || 3}
                    onChange={handleSliderChange(item.name)}
                    min={1}
                    max={5}
                    step={1}
                    marks={[
                      { value: 1, label: '' },
                      { value: 2, label: '' },
                      { value: 3, label: '' },
                      { value: 4, label: '' },
                      { value: 5, label: '' }
                    ]}
                    valueLabelDisplay="auto"
                    sx={{ mb: 2 }}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Comentários"
                  name="comments"
                  value={currentEmployee?.comments || ""}
                  onChange={handleInputChange}
                  margin="dense"
                  multiline
                  rows={3}
                  placeholder="Descreva como o colaborador está se sentindo no trabalho..."
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ sx: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
                  sx={{
                    borderRadius: 2,
                    background: '#fff',
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif"
                  }}
                  inputProps={{ style: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{
          px: 2,
          pb: 1.5,
          fontFamily: "'Inter', sans-serif",
          borderTop: '1px solid #f0f0f0',
          mt: 0
        }}>
          <Button
            onClick={handleCloseDialog}
            size="small"
            sx={{
              borderRadius: 2,
              fontWeight: 500,
              color: '#1976d2',
              fontSize: 13,
              px: 1.5,
              py: 0.5,
              minHeight: 28,
              fontFamily: "'Inter', sans-serif",
              background: 'none',
              boxShadow: 'none',
              textTransform: 'none'
            }}
            startIcon={<Close />}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSaveEmployee}
            color="primary"
            variant="contained"
            size="small"
            sx={{
              borderRadius: 2,
              fontWeight: 500,
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
              fontSize: 13,
              px: 2,
              py: 0.5,
              minHeight: 32,
              fontFamily: "'Inter', sans-serif",
              boxShadow: 1,
              textTransform: 'none'
            }}
            startIcon={<Save />}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DssEmociograma;
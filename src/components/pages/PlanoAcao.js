import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from "@mui/icons-material";

const PlanoAcao = () => {
  // Estados do componente
  const [planData, setPlanData] = useState({
    assunto: "Solicitar Consultoria em Produtividade",
    dataPrevisao: "de 03/Jan a 01/Mar",
    responsavel: "Setor Administrativo/Financeiro",
    objetivo: "Facilitar significativamente o registro de dados e extração de relatório para avaliação de indicadores e Gestão ADM/Financeiro",
    atividades: [
      {
        id: 1,
        oque: "Solicitar propostas de valor em Produtividade",
        quem: "Analista",
        quando: "3 - Jan",
        como: "Pesquisa sites especializados",
        custo: "Varia de 100 - 1000 reais cada solicitação",
        status: "Feito"
      },
      {
        id: 2,
        oque: "Avaliar propostas",
        quem: "Analista/Gestor",
        quando: "até 10/Jan",
        como: "Via chamada de vídeo, presencial e consulta material recebido",
        custo: "Estimado no início",
        status: "Feito"
      },
      {
        id: 3,
        oque: "Decisão proposta adequada",
        quem: "Analista/Gestor",
        quando: "até 17/Jan",
        como: "Avaliando a metodologia de registro presente e as melhorias propostas",
        custo: "Estimado no início",
        status: "Fazendo"
      }
    ]
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Funções auxiliares
  const getStatusColor = (status) => {
    switch (status) {
      case 'Feito': return 'success';
      case 'Fazendo': return 'warning';
      case 'Pendente': return 'error';
      default: return 'default';
    }
  };

  const handleOpenAddDialog = () => {
    setCurrentActivity({
      id: Date.now(),
      oque: "",
      quem: "",
      quando: "",
      como: "",
      custo: "",
      status: "Pendente"
    });
    setIsEditing(false);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (activity) => {
    setCurrentActivity({ ...activity });
    setIsEditing(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentActivity(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentActivity(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveActivity = () => {
    if (isEditing) {
      // Atualiza atividade existente
      setPlanData(prev => ({
        ...prev,
        atividades: prev.atividades.map(act => 
          act.id === currentActivity.id ? currentActivity : act
        )
      }));
    } else {
      // Adiciona nova atividade
      setPlanData(prev => ({
        ...prev,
        atividades: [...prev.atividades, currentActivity]
      }));
    }
    handleCloseDialog();
  };

  const handleDeleteActivity = (id) => {
    setPlanData(prev => ({
      ...prev,
      atividades: prev.atividades.filter(act => act.id !== id)
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">PLANO DE AÇÃO</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenAddDialog}
          >
            Adicionar Atividade
          </Button>
        </Box>
        
        <Typography variant="h6" gutterBottom>
          ASSUNTO: {planData.assunto}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
          <Typography variant="body1">
            <strong>DATA PREVISÃO:</strong> {planData.dataPrevisao}
          </Typography>
          <Typography variant="body1">
            <strong>RESPONSÁVEL:</strong> {planData.responsavel}
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          <strong>OBJETIVO:</strong> {planData.objetivo}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Plano de Ação">
            <TableHead>
              <TableRow>
                <TableCell><strong>O quê? (What?)</strong></TableCell>
                <TableCell><strong>Quem? (Who?)</strong></TableCell>
                <TableCell><strong>Quando? (When?)</strong></TableCell>
                <TableCell><strong>Como? (How?)</strong></TableCell>
                <TableCell><strong>Custo? (How much?)</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planData.atividades.map((atividade) => (
                <TableRow key={atividade.id}>
                  <TableCell>{atividade.oque}</TableCell>
                  <TableCell>{atividade.quem}</TableCell>
                  <TableCell>{atividade.quando}</TableCell>
                  <TableCell>{atividade.como}</TableCell>
                  <TableCell>{atividade.custo}</TableCell>
                  <TableCell>
                    <Chip 
                      label={atividade.status} 
                      color={getStatusColor(atividade.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Editar">
                      <IconButton onClick={() => handleOpenEditDialog(atividade)}>
                        <EditIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton onClick={() => handleDeleteActivity(atividade.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog para adicionar/editar atividades */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {isEditing ? 'Editar Atividade' : 'Adicionar Nova Atividade'}
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="O quê? (What?)"
              name="oque"
              value={currentActivity?.oque || ''}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Quem? (Who?)"
              name="quem"
              value={currentActivity?.quem || ''}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Quando? (When?)"
              name="quando"
              value={currentActivity?.quando || ''}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Como? (How?)"
              name="como"
              value={currentActivity?.como || ''}
              onChange={handleInputChange}
              margin="normal"
              required
              multiline
              rows={2}
            />
            <TextField
              fullWidth
              label="Custo? (How much?)"
              name="custo"
              value={currentActivity?.custo || ''}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={currentActivity?.status || 'Pendente'}
              onChange={handleInputChange}
              margin="normal"
            >
              <MenuItem value="Pendente">Pendente</MenuItem>
              <MenuItem value="Fazendo">Fazendo</MenuItem>
              <MenuItem value="Feito">Feito</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            startIcon={<CancelIcon />} 
            onClick={handleCloseDialog}
          >
            Cancelar
          </Button>
          <Button 
            startIcon={<SaveIcon />} 
            onClick={handleSaveActivity}
            variant="contained"
            color="primary"
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlanoAcao;
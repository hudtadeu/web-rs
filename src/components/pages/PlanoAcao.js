import React, { useState, useEffect } from "react";
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

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('planActions') || '[]');
    setPlanData(prev => ({
      ...prev,
      atividades: [
        ...prev.atividades,
        ...saved.map((item, idx) => ({
          id: Date.now() + idx,
          oque: item.pergunta,
          responsavel: '',    // preencher conforme necessidade
          quando: '',         // ...
          como: '',           // ...
          custo: '',
          status: 'Pendente'
        }))
      ]
    }));
    localStorage.removeItem('planActions'); // opcional: limpa após uso
  }, []);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // FunÃ§Ãµes auxiliares
  const getStatusColor = (status) => (
    { Feito: 'success', Fazendo: 'warning', Pendente: 'error' }[status] || 'default'
  );

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
        
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
          <Table sx={{ minWidth: 700 }} aria-label="Plano de Ação">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold', width: '18%' }}><strong>O quê?</strong></TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '13%' }}><strong>Quem?</strong></TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '12%' }}><strong>Quando?</strong></TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '20%' }}><strong>Como?</strong></TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}><strong>Custo?</strong></TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '10%' }}><strong>Status</strong></TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '12%' }}><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planData.atividades.map((atividade, idx) => (
                <TableRow
                  key={atividade.id}
                  sx={{
                    backgroundColor: idx % 2 === 0 ? '#fafafa' : '#fff',
                    '&:hover': { backgroundColor: '#f0f7fa' }
                  }}
                >
                  <TableCell sx={{ py: 1.5 }}>{atividade.oque}</TableCell>
                  <TableCell sx={{ py: 1.5 }}>{atividade.quem}</TableCell>
                  <TableCell sx={{ py: 1.5 }}>{atividade.quando}</TableCell>
                  <TableCell sx={{ py: 1.5 }}>{atividade.como}</TableCell>
                  <TableCell sx={{ py: 1.5 }}>{atividade.custo}</TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Chip 
                      label={atividade.status} 
                      color={getStatusColor(atividade.status)} 
                      size="small"
                      sx={{ fontWeight: 'bold', minWidth: 70, justifyContent: 'center' }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Editar">
                        <IconButton
                          onClick={() => handleOpenEditDialog(atividade)}
                          size="small"
                          sx={{
                            bgcolor: '#e3f2fd',
                            '&:hover': { bgcolor: '#bbdefb' },
                            borderRadius: 2,
                            p: 0.5
                          }}
                        >
                          <EditIcon color="primary" fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton
                          onClick={() => handleDeleteActivity(atividade.id)}
                          size="small"
                          sx={{
                            bgcolor: '#ffebee',
                            '&:hover': { bgcolor: '#ffcdd2' },
                            borderRadius: 2,
                            p: 0.5
                          }}
                        >
                          <DeleteIcon color="error" fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog para adicionar/editar atividades */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', bgcolor: '#f5f5f5' }}>
          {isEditing ? 'Editar Atividade' : 'Adicionar Nova Atividade'}
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: '#fafafa' }}>
          <Box component="form" sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="O quê?"
              name="oque"
              value={currentActivity?.oque || ''}
              onChange={handleInputChange}
              margin="normal"
              required
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Quem?"
                name="quem"
                value={currentActivity?.quem || ''}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{ bgcolor: '#fff', borderRadius: 1 }}
              />
              <TextField
                fullWidth
                label="Quando?"
                name="quando"
                value={currentActivity?.quando || ''}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{ bgcolor: '#fff', borderRadius: 1 }}
              />
            </Box>
            <TextField
              fullWidth
              label="Como?"
              name="como"
              value={currentActivity?.como || ''}
              onChange={handleInputChange}
              margin="normal"
              required
              multiline
              rows={2}
              sx={{ bgcolor: '#fff', borderRadius: 1 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Custo?"
                name="custo"
                value={currentActivity?.custo || ''}
                onChange={handleInputChange}
                margin="normal"
                sx={{ bgcolor: '#fff', borderRadius: 1 }}
              />
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={currentActivity?.status || 'Pendente'}
                onChange={handleInputChange}
                margin="normal"
                sx={{ bgcolor: '#fff', borderRadius: 1 }}
              >
                <MenuItem value="Pendente">Pendente</MenuItem>
                <MenuItem value="Fazendo">Fazendo</MenuItem>
                <MenuItem value="Feito">Feito</MenuItem>
              </TextField>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#f5f5f5', px: 3, py: 2 }}>
          <Button 
            startIcon={<CancelIcon />} 
            onClick={handleCloseDialog}
            sx={{ borderRadius: 2 }}
          >
            Cancelar
          </Button>
          <Button 
            startIcon={<SaveIcon />} 
            onClick={handleSaveActivity}
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2, fontWeight: 'bold' }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlanoAcao;
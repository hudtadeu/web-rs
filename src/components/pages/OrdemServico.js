import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar
} from '@mui/material';
import {
  Assignment,
  Today,
  Warning,
  Engineering,
  CheckCircle,
  Schedule,
  Delete,
  Edit,
  Visibility
} from '@mui/icons-material';

const OrdemServico = () => {
  const [formData, setFormData] = useState({
    numeroOS: '',
    dataEmissao: new Date().toISOString().split('T')[0],
    prioridade: 'Média',
    setorSolicitante: '',
    nomeSolicitante: '',
    descricaoServico: '',
    localExecucao: '',
    equipamentosNecessarios: '',
    riscosEnvolvidos: '',
    medidasControle: '',
    nomeResponsavel: '',
    prazoConclusao: '',
    status: 'Aberto',
    observacoes: '',
  });

  const [ordensServico, setOrdensServico] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrdem, setSelectedOrdem] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const novaOrdem = {
      id: Date.now(),
      ...formData,
      dataEmissaoFormatada: new Date(formData.dataEmissao).toLocaleDateString('pt-BR'),
      prazoFormatado: formData.prazoConclusao ? new Date(formData.prazoConclusao).toLocaleDateString('pt-BR') : 'Não definido'
    };
    
    setOrdensServico([novaOrdem, ...ordensServico]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      numeroOS: '',
      dataEmissao: new Date().toISOString().split('T')[0],
      prioridade: 'Média',
      setorSolicitante: '',
      nomeSolicitante: '',
      descricaoServico: '',
      localExecucao: '',
      equipamentosNecessarios: '',
      riscosEnvolvidos: '',
      medidasControle: '',
      nomeResponsavel: '',
      prazoConclusao: '',
      status: 'Aberto',
      observacoes: '',
    });
  };

  const handleDelete = (id) => {
    setOrdensServico(ordensServico.filter(ordem => ordem.id !== id));
  };

  const handleViewDetails = (ordem) => {
    setSelectedOrdem(ordem);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getPriorityColor = (prioridade) => {
    switch (prioridade) {
      case 'Urgente': return 'error';
      case 'Alta': return 'warning';
      case 'Média': return 'info';
      case 'Baixa': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aberto': return 'error';
      case 'Em andamento': return 'warning';
      case 'Concluído': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Formulário */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Cadastrar Nova Ordem de Serviço
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Cabeçalho */}
              <Typography variant="h6" gutterBottom>
                Cabeçalho
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Número da OS"
                    name="numeroOS"
                    value={formData.numeroOS}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Data de Emissão"
                    type="date"
                    name="dataEmissao"
                    value={formData.dataEmissao}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Prioridade</InputLabel>
                    <Select
                      name="prioridade"
                      value={formData.prioridade}
                      onChange={handleChange}
                      label="Prioridade"
                    >
                      <MenuItem value="Urgente">Urgente</MenuItem>
                      <MenuItem value="Alta">Alta</MenuItem>
                      <MenuItem value="Média">Média</MenuItem>
                      <MenuItem value="Baixa">Baixa</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Solicitante */}
              <Typography variant="h6" gutterBottom>
                Solicitante
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Setor/Departamento"
                    name="setorSolicitante"
                    value={formData.setorSolicitante}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nome do Solicitante"
                    name="nomeSolicitante"
                    value={formData.nomeSolicitante}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Descrição do Serviço */}
              <Typography variant="h6" gutterBottom>
                Descrição do Serviço
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Descrição do Serviço"
                    name="descricaoServico"
                    value={formData.descricaoServico}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Local de Execução"
                    name="localExecucao"
                    value={formData.localExecucao}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Equipamentos Necessários"
                    name="equipamentosNecessarios"
                    value={formData.equipamentosNecessarios}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Riscos Envolvidos */}
              <Typography variant="h6" gutterBottom>
                Riscos Envolvidos
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Riscos Identificados"
                    name="riscosEnvolvidos"
                    value={formData.riscosEnvolvidos}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Medidas de Controle"
                    name="medidasControle"
                    value={formData.medidasControle}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Responsáveis */}
              <Typography variant="h6" gutterBottom>
                Responsáveis
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nome do Responsável Técnico"
                    name="nomeResponsavel"
                    value={formData.nomeResponsavel}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Prazo e Status */}
              <Typography variant="h6" gutterBottom>
                Prazo e Status
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Prazo de Conclusão"
                    type="date"
                    name="prazoConclusao"
                    value={formData.prazoConclusao}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      label="Status"
                    >
                      <MenuItem value="Aberto">Aberto</MenuItem>
                      <MenuItem value="Em andamento">Em andamento</MenuItem>
                      <MenuItem value="Concluído">Concluído</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Observações */}
              <Typography variant="h6" gutterBottom>
                Observações Finais
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Observações"
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="primary" type="submit">
                  Salvar Ordem de Serviço
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>

        {/* Lista de Ordens de Serviço */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Ordens de Serviço Cadastradas
            </Typography>
            
            {ordensServico.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Nenhuma ordem de serviço cadastrada ainda.
              </Typography>
            ) : (
              <List>
                {ordensServico.map((ordem) => (
                  <Card key={ordem.id} sx={{ mb: 3, boxShadow: 3 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="h6" component="div">
                            OS #{ordem.numeroOS} - {ordem.descricaoServico.substring(0, 30)}...
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Chip
                              icon={<Assignment />}
                              label={`Solicitante: ${ordem.nomeSolicitante}`}
                              variant="outlined"
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Chip
                              icon={<Engineering />}
                              label={`Responsável: ${ordem.nomeResponsavel || 'Não definido'}`}
                              variant="outlined"
                              size="small"
                            />
                          </Box>
                        </Box>
                        <Box>
                          <Chip
                            label={ordem.prioridade}
                            color={getPriorityColor(ordem.prioridade)}
                            size="small"
                            sx={{ mb: 1 }}
                          />
                          <Chip
                            label={ordem.status}
                            color={getStatusColor(ordem.status)}
                            size="small"
                          />
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', mt: 2, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                          <Today color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2">
                            Emissão: {ordem.dataEmissaoFormatada}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Schedule color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2">
                            Prazo: {ordem.prazoFormatado}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleViewDetails(ordem)}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => handleDelete(ordem.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Dialog de Detalhes */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Detalhes da Ordem de Serviço #{selectedOrdem?.numeroOS}</DialogTitle>
        <DialogContent dividers>
          {selectedOrdem && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Assignment sx={{ mr: 1, color: 'primary.main' }} />
                    <strong>Informações Básicas</strong>
                  </Box>
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Data de Emissão"
                      secondary={selectedOrdem.dataEmissaoFormatada}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Prioridade"
                      secondary={
                        <Chip 
                          label={selectedOrdem.prioridade} 
                          size="small" 
                          color={getPriorityColor(selectedOrdem.prioridade)}
                        />
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Status"
                      secondary={
                        <Chip 
                          label={selectedOrdem.status} 
                          size="small" 
                          color={getStatusColor(selectedOrdem.status)}
                        />
                      }
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Engineering sx={{ mr: 1, color: 'primary.main' }} />
                    <strong>Responsáveis</strong>
                  </Box>
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Solicitante"
                      secondary={`${selectedOrdem.nomeSolicitante} (${selectedOrdem.setorSolicitante})`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Responsável Técnico"
                      secondary={selectedOrdem.nomeResponsavel || 'Não definido'}
                    />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Warning sx={{ mr: 1, color: 'primary.main' }} />
                    <strong>Descrição do Serviço</strong>
                  </Box>
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedOrdem.descricaoServico}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Local de Execução:</strong> {selectedOrdem.localExecucao}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  <strong>Equipamentos Necessários:</strong> {selectedOrdem.equipamentosNecessarios || 'Nenhum especificado'}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Warning sx={{ mr: 1, color: 'error.main' }} />
                    <strong>Riscos Identificados</strong>
                  </Box>
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedOrdem.riscosEnvolvidos || 'Nenhum risco identificado'}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ mr: 1, color: 'success.main' }} />
                    <strong>Medidas de Controle</strong>
                  </Box>
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedOrdem.medidasControle || 'Nenhuma medida especificada'}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Schedule sx={{ mr: 1, color: 'primary.main' }} />
                    <strong>Prazo e Observações</strong>
                  </Box>
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Prazo de Conclusão:</strong> {selectedOrdem.prazoFormatado}
                </Typography>
                <Typography variant="body1">
                  <strong>Observações:</strong> {selectedOrdem.observacoes || 'Nenhuma observação'}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrdemServico;
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Badge,
  List,
  ListItem,
  ListItemText
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
  Visibility,
  Add,
  Work,
  PriorityHigh,
  DoneAll,
  AccessTime
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
  const [openModal, setOpenModal] = useState(false);
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
    setOpenModal(false);
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Aberto': return <PriorityHigh />;
      case 'Em andamento': return <AccessTime />;
      case 'Concluído': return <DoneAll />;
      default: return <Work />;
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1400, margin: 'auto' }}>
      {/* Cabeçalho e Botão de Nova Ordem */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          <Work sx={{ verticalAlign: 'middle', mr: 1 }} />
          Ordens de Serviço
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenModal(true)}
          sx={{ borderRadius: 2 }}
        >
          Nova Ordem
        </Button>
      </Box>

      {/* Modal para Nova Ordem de Serviço */}
      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          resetForm();
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Add sx={{ mr: 1 }} />
            Cadastrar Nova Ordem de Serviço
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Cabeçalho */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
                  Informações Básicas
                </Typography>
              </Grid>
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

              {/* Solicitante */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1, mt: 2 }}>
                  Solicitante
                </Typography>
              </Grid>
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

              {/* Descrição do Serviço */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1, mt: 2 }}>
                  Descrição do Serviço
                </Typography>
              </Grid>
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

              {/* Riscos Envolvidos */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1, mt: 2 }}>
                  Riscos e Controles
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6}>
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

              {/* Responsáveis */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1, mt: 2 }}>
                  Responsáveis
                </Typography>
              </Grid>
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

              {/* Observações */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1, mt: 2 }}>
                  Observações Finais
                </Typography>
              </Grid>
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenModal(false);
            resetForm();
          }}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">Salvar Ordem</Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Visualização de Detalhes */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ mr: 1 }} />
            Detalhes da Ordem de Serviço #{selectedOrdem?.numeroOS}
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrdem && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardHeader
                    avatar={<Today color="primary" />}
                    title="Informações Básicas"
                  />
                  <CardContent>
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
                              icon={<PriorityHigh />}
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
                              icon={getStatusIcon(selectedOrdem.status)}
                            />
                          }
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardHeader
                    avatar={<Engineering color="primary" />}
                    title="Responsáveis"
                  />
                  <CardContent>
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
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardHeader
                    avatar={<Work color="primary" />}
                    title="Descrição do Serviço"
                  />
                  <CardContent>
                    <Typography variant="body1" paragraph>
                      {selectedOrdem.descricaoServico}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Local de Execução:</strong> {selectedOrdem.localExecucao}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>Equipamentos Necessários:</strong> {selectedOrdem.equipamentosNecessarios || 'Nenhum especificado'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardHeader
                    avatar={<Warning color="error" />}
                    title="Riscos Identificados"
                  />
                  <CardContent>
                    <Typography variant="body1" paragraph>
                      {selectedOrdem.riscosEnvolvidos || 'Nenhum risco identificado'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardHeader
                    avatar={<CheckCircle color="success" />}
                    title="Medidas de Controle"
                  />
                  <CardContent>
                    <Typography variant="body1" paragraph>
                      {selectedOrdem.medidasControle || 'Nenhuma medida especificada'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardHeader
                    avatar={<Schedule color="primary" />}
                    title="Prazo e Observações"
                  />
                  <CardContent>
                    <Typography variant="body1" paragraph>
                      <strong>Prazo de Conclusão:</strong> {selectedOrdem.prazoFormatado}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Observações:</strong> {selectedOrdem.observacoes || 'Nenhuma observação'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Tabela de Ordens de Serviço */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="h2">
            Lista de Ordens de Serviço
          </Typography>
          <Chip 
            label={`Total: ${ordensServico.length}`} 
            color="primary" 
            variant="outlined"
          />
        </Box>
        
        {ordensServico.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            p: 4,
            border: '1px dashed #ccc',
            borderRadius: 2,
            textAlign: 'center'
          }}>
            <Work sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Nenhuma ordem de serviço cadastrada
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Clique no botão "Nova Ordem" para cadastrar sua primeira ordem de serviço
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />} 
              onClick={() => setOpenModal(true)}
            >
              Criar Primeira Ordem
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nº OS</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Solicitante</TableCell>
                  <TableCell>Responsável</TableCell>
                  <TableCell>Prioridade</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Emissão</TableCell>
                  <TableCell>Prazo</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordensServico.map((ordem) => (
                  <TableRow key={ordem.id} hover>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="bold">
                        #{ordem.numeroOS}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          display: '-webkit-box', 
                          WebkitLineClamp: 2, 
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: 200
                        }}
                      >
                        {ordem.descricaoServico}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {ordem.nomeSolicitante}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {ordem.setorSolicitante}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {ordem.nomeResponsavel || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={ordem.prioridade}
                        color={getPriorityColor(ordem.prioridade)}
                        size="small"
                        icon={<PriorityHigh />}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={ordem.status}
                        color={getStatusColor(ordem.status)}
                        size="small"
                        icon={getStatusIcon(ordem.status)}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {ordem.dataEmissaoFormatada}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {ordem.prazoFormatado}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Visualizar">
                        <IconButton 
                          color="primary"
                          onClick={() => handleViewDetails(ordem)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton 
                          color="error"
                          onClick={() => handleDelete(ordem.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default OrdemServico;
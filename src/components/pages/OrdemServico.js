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
} from '@mui/material';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados da OS:', formData);
    // Lógica para enviar ao backend
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Ordem de Serviço - Segurança do Trabalho
        </Typography>

        {/* Grupo 1: Cabeçalho */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ width: '100%' }}>
            Cabeçalho
          </Typography>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Número da OS"
              name="numeroOS"
              value={formData.numeroOS}
              onChange={handleChange}
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Prioridade</InputLabel>
              <Select
                name="prioridade"
                value={formData.prioridade}
                onChange={handleChange}
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

        {/* Grupo 2: Solicitante */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ width: '100%' }}>
            Solicitante
          </Typography>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Setor/Departamento"
              name="setorSolicitante"
              value={formData.setorSolicitante}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome do Solicitante"
              name="nomeSolicitante"
              value={formData.nomeSolicitante}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Grupo 3: Descrição do Serviço */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ width: '100%' }}>
            Descrição do Serviço
          </Typography>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Descrição do Serviço"
              name="descricaoServico"
              value={formData.descricaoServico}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Local de Execução"
              name="localExecucao"
              value={formData.localExecucao}
              onChange={handleChange}
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

        {/* Grupo 4: Riscos Envolvidos */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ width: '100%' }}>
            Riscos Envolvidos
          </Typography>
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
              label="Medidas de Controle (EPIs, EPCs, Procedimentos)"
              name="medidasControle"
              value={formData.medidasControle}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Grupo 5: Responsáveis */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ width: '100%' }}>
            Responsáveis
          </Typography>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nome do Responsável Técnico"
              name="nomeResponsavel"
              value={formData.nomeResponsavel}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Grupo 6: Prazo e Status */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ width: '100%' }}>
            Prazo e Status
          </Typography>
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
              >
                <MenuItem value="Aberto">Aberto</MenuItem>
                <MenuItem value="Em andamento">Em andamento</MenuItem>
                <MenuItem value="Concluído">Concluído</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Grupo 7: Observações/Aprovação */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ width: '100%' }}>
            Observações Finais
          </Typography>
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
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Salvar Ordem de Serviço
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrdemServico;
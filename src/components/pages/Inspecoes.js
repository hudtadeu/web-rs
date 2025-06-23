import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import {
  PhotoCamera,
  Delete,
  Assignment,
  Today,
  Warning,
  Notes,
  Add,
  Visibility,
  Edit,
} from "@mui/icons-material";

const Inspecoes = () => {
  const [form, setForm] = useState({
    local: "",
    data: "",
    epi: false,
    riscosIdentificados: "",
    observacoes: "",
    fotos: [],
  });

  const [inspecoes, setInspecoes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [currentInspecao, setCurrentInspecao] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({
      ...prev,
      fotos: [...prev.fotos, ...files],
    }));
  };

  const handleRemovePhoto = (index) => {
    setForm((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const novaInspecao = {
      id: Date.now(),
      ...form,
      dataFormatada: new Date(form.data).toLocaleDateString('pt-BR'),
      status: form.epi ? 'Conforme' : 'Não Conforme'
    };
    
    setInspecoes([novaInspecao, ...inspecoes]);
    resetForm();
    setOpenModal(false);
  };

  const resetForm = () => {
    setForm({
      local: "",
      data: "",
      epi: false,
      riscosIdentificados: "",
      observacoes: "",
      fotos: [],
    });
  };

  const handleDeleteInspecao = (id) => {
    setInspecoes(inspecoes.filter(inspecao => inspecao.id !== id));
  };

  const handleViewInspecao = (inspecao) => {
    setCurrentInspecao(inspecao);
    setViewMode(true);
  };

  return (
    <Box sx={{ maxWidth: 1400, margin: "auto", p: 3 }}>
      {/* Cabeçalho e Botão de Nova Inspeção */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Inspeções de Segurança
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenModal(true)}
          sx={{ borderRadius: 2 }}
        >
          Nova Inspeção
        </Button>
      </Box>

      {/* Modal para Nova Inspeção */}
      <Dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          resetForm();
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Nova Inspeção de Segurança</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ pt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Local da Inspeção"
                  name="local"
                  value={form.local}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Data"
                  name="data"
                  type="date"
                  value={form.data}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="epi"
                      checked={form.epi}
                      onChange={handleChange}
                    />
                  }
                  label="Todos estão usando EPI?"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Riscos Identificados"
                  name="riscosIdentificados"
                  value={form.riscosIdentificados}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Observações"
                  name="observacoes"
                  value={form.observacoes}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Registros Fotográficos
                </Typography>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{ mb: 2 }}
                >
                  Adicionar Fotos
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={handlePhotoUpload}
                  />
                </Button>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {form.fotos.map((file, idx) => (
                    <Box key={idx} sx={{ position: "relative" }}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`foto-${idx}`}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 8,
                          border: "1px solid #ccc",
                        }}
                      />
                      <IconButton
                        size="small"
                        color="error"
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        onClick={() => handleRemovePhoto(idx)}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenModal(false);
            resetForm();
          }}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">Salvar Inspeção</Button>
        </DialogActions>
      </Dialog>

      {/* Modal para Visualizar Inspeção */}
      <Dialog
        open={viewMode}
        onClose={() => setViewMode(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Detalhes da Inspeção</DialogTitle>
        <DialogContent>
          {currentInspecao && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Local:</strong> {currentInspecao.local}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Data:</strong> {currentInspecao.dataFormatada}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Chip
                    label={`EPI: ${currentInspecao.epi ? "Sim" : "Não"}`}
                    color={currentInspecao.epi ? "success" : "error"}
                    icon={<Assignment />}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Riscos Identificados:</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {currentInspecao.riscosIdentificados}
                  </Typography>
                </Grid>
                {currentInspecao.observacoes && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Observações:</strong>
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {currentInspecao.observacoes}
                    </Typography>
                  </Grid>
                )}
                {currentInspecao.fotos.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      <strong>Fotos:</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {currentInspecao.fotos.map((foto, idx) => (
                        <img
                          key={idx}
                          src={URL.createObjectURL(foto)}
                          alt={`foto-${idx}`}
                          style={{
                            width: 120,
                            height: 120,
                            objectFit: 'cover',
                            borderRadius: 8,
                            border: '1px solid #ddd',
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewMode(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      {/* Tabela de Inspeções */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Histórico de Inspeções
        </Typography>
        
        {inspecoes.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            p: 4,
            border: '1px dashed #ccc',
            borderRadius: 2
          }}>
            <Assignment sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary">
              Nenhuma inspeção registrada ainda.
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<Add />} 
              onClick={() => setOpenModal(true)}
              sx={{ mt: 2 }}
            >
              Criar Primeira Inspeção
            </Button>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Local</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Riscos</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inspecoes.map((inspecao) => (
                  <TableRow key={inspecao.id}>
                    <TableCell>{inspecao.local}</TableCell>
                    <TableCell>{inspecao.dataFormatada}</TableCell>
                    <TableCell>
                      <Chip
                        label={inspecao.status}
                        color={inspecao.epi ? "success" : "error"}
                        size="small"
                      />
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
                          maxWidth: 300
                        }}
                      >
                        {inspecao.riscosIdentificados}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Visualizar">
                        <IconButton 
                          color="primary"
                          onClick={() => handleViewInspecao(inspecao)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton 
                          color="error"
                          onClick={() => handleDeleteInspecao(inspecao.id)}
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

export default Inspecoes;
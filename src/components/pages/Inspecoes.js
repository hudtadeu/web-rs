import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
  Chip,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TodayIcon from "@mui/icons-material/Today";
import WarningIcon from "@mui/icons-material/Warning";
import NotesIcon from "@mui/icons-material/Notes";

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
    
    // Criar nova inspeção com um ID único
    const novaInspecao = {
      id: Date.now(),
      ...form,
      dataFormatada: new Date(form.data).toLocaleDateString('pt-BR')
    };
    
    setInspecoes([novaInspecao, ...inspecoes]);
    
    // Resetar formulário
    setForm({
      local: "",
      data: "",
      epi: false,
      riscosIdentificados: "",
      observacoes: "",
      fotos: [],
    });
    
    alert("Inspeção registrada com sucesso!");
  };

  const handleDeleteInspecao = (id) => {
    setInspecoes(inspecoes.filter(inspecao => inspecao.id !== id));
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", p: 3 }}>
      <Grid container spacing={4}>
        {/* Formulário */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>
              Nova Inspeção de Segurança
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Preencha os dados da inspeção realizada
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
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
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ mt: 2, borderRadius: 2 }}
                  >
                    Registrar Inspeção
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Lista de Inspeções */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" gutterBottom>
              Inspeções Registradas
            </Typography>
            
            {inspecoes.length === 0 ? (
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                Nenhuma inspeção registrada ainda.
              </Typography>
            ) : (
              <List sx={{ width: '100%' }}>
                {inspecoes.map((inspecao) => (
                  <React.Fragment key={inspecao.id}>
                    <Card sx={{ mb: 3, boxShadow: 3 }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6" component="div">
                            {inspecao.local}
                          </Typography>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteInspecao(inspecao.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, mb: 1 }}>
                          <TodayIcon color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            {inspecao.dataFormatada}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <AssignmentIcon color={inspecao.epi ? "success" : "error"} sx={{ mr: 1 }} />
                          <Typography variant="body2">
                            EPI: {inspecao.epi ? "Sim" : "Não"}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <WarningIcon color="warning" sx={{ mr: 1, mt: 0.5 }} />
                          <Typography variant="body2">
                            <strong>Riscos:</strong> {inspecao.riscosIdentificados}
                          </Typography>
                        </Box>
                        
                        {inspecao.observacoes && (
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                            <NotesIcon color="info" sx={{ mr: 1, mt: 0.5 }} />
                            <Typography variant="body2">
                              <strong>Observações:</strong> {inspecao.observacoes}
                            </Typography>
                          </Box>
                        )}
                        
                        {inspecao.fotos.length > 0 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                              Fotos:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {inspecao.fotos.map((foto, idx) => (
                                <img
                                  key={idx}
                                  src={URL.createObjectURL(foto)}
                                  alt={`foto-${idx}`}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    objectFit: 'cover',
                                    borderRadius: 4,
                                    border: '1px solid #ddd',
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                    <Divider sx={{ my: 2 }} />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Inspecoes;
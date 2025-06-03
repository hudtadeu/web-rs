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
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";

const Inspecoes = () => {
  const [form, setForm] = useState({
    local: "",
    data: "",
    epi: false,
    riscosIdentificados: "",
    observacoes: "",
    fotos: [],
  });

  // Para campos personalizáveis futuramente
  // const [customFields, setCustomFields] = useState([]);

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
    // Aqui você pode enviar os dados do formulário para um backend ou API
    alert("Inspeção registrada com sucesso!");
    setForm({
      local: "",
      data: "",
      epi: false,
      riscosIdentificados: "",
      observacoes: "",
      fotos: [],
    });
  };

  return (
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 600,
          margin: "auto",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          Formulário moderno e personalizável para inspeções de segurança do
          trabalho.
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
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
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
            {/* Campos personalizáveis podem ser adicionados aqui futuramente */}
            {/* <Grid item xs={12}>
              {customFields.map((field, idx) => (
                // Renderização dinâmica dos campos personalizados
              ))}
            </Grid> */}
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
  );
};

export default Inspecoes;

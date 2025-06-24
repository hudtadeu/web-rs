import React, { useState } from "react";
import {
  Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Typography, Paper, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, MenuItem
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";

// Inicia com dois templates de exemplo
const initialTemplates = {
  seguranca: {
    label: 'Inspeções de Segurança',
    verificacoes: [
      "Colaborador está utilizando o crachá funcional do cliente em local visível?",
      "Os colaboradores possuem crachá / cartão com treinamentos de atividades de risco crítico?"
    ]
  },
  qualidade: {
    label: 'Inspeções de Qualidade',
    verificacoes: [
      "Produto atende aos padrões de qualidade especificados?",
      "Foi realizada a verificação dimensional?"
    ]
  }
};

const Inspecoes = () => {
  // Templates dinâmicos
  const [templates, setTemplates] = useState(initialTemplates);
  const [tplModalOpen, setTplModalOpen] = useState(false);
  const [tplForm, setTplForm] = useState({ key: '', label: '', verificacoes: [''] });

  // Inspeções
  const [form, setForm] = useState({ type: '', verificacoes: [], catRisco: [], obsVerif: [], anexoVerif: [], acaoImediata: '' });
  const [inspecoes, setInspecoes] = useState([]);
  const [open, setOpen] = useState(false);

  // Inicializa arrays ao selecionar tipo
  const initArrays = (type) => {
    const len = templates[type].verificacoes.length;
    setForm({
      type,
      verificacoes: Array(len).fill(null),
      catRisco: Array(len).fill(''),
      obsVerif: Array(len).fill(''),
      anexoVerif: Array(len).fill(null),
      acaoImediata: ''
    });
  };

  // Handlers de Inspeção
  const handleTypeChange = (e) => initArrays(e.target.value);
  const handleVerifChange = (i, opt) => {
    const v = [...form.verificacoes];
    v[i] = v[i] === opt ? null : opt;
    setForm(f => ({ ...f, verificacoes: v }));
  };
  const handleNested = (field, i, val) => {
    const a = [...form[field]];
    a[i] = val;
    setForm(f => ({ ...f, [field]: a }));
  };

  // Reset e salvar Inspeção
  const reset = () => setForm({ type:'', verificacoes:[], catRisco:[], obsVerif:[], anexoVerif:[], acaoImediata:'' });
  const saveInspecao = () => {
    setInspecoes(prev => [{ id: Date.now(), ...form }, ...prev]);
    reset();
    setOpen(false);
  };

  // Handlers de cadastro de template
  const openTplModal = () => setTplModalOpen(true);
  const addQuestionField = () => setTplForm(f => ({ ...f, verificacoes: [...f.verificacoes, ''] }));
  const handleTplFieldChange = (i, val) => {
    const v = [...tplForm.verificacoes];
    v[i] = val;
    setTplForm(f => ({ ...f, verificacoes: v }));
  };
  const removeTplField = (i) => {
    const v = tplForm.verificacoes.filter((_, idx) => idx !== i);
    setTplForm(f => ({ ...f, verificacoes: v }));
  };
  const saveTemplate = () => {
    if (!tplForm.key || !tplForm.label) return;
    setTemplates(t => ({
      ...t,
      [tplForm.key]: { label: tplForm.label, verificacoes: tplForm.verificacoes.filter(q => q) }
    }));
    setTplForm({ key: '', label: '', verificacoes: [''] });
    setTplModalOpen(false);
  };

  const questions = form.type ? templates[form.type].verificacoes : [];

  return (
    <Box sx={{ p:3, maxWidth:1400, mx:'auto' }}>
      <Typography variant="h4">Inspeções</Typography>
      <Box sx={{ display:'flex', gap:2, my:2 }}>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Nova Inspeção</Button>
        <Button variant="outlined" startIcon={<Edit />} onClick={openTplModal}>Gerenciar Templates</Button>
      </Box>

      {/* Modal Inspeção */}
      <Dialog open={open} onClose={() => { reset(); setOpen(false); }} fullWidth maxWidth="lg">
        <DialogTitle>Nova Inspeção</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mb:2 }}>
            <Grid item xs={6} sm={4}>
              <TextField select label="Tipo" fullWidth value={form.type} onChange={handleTypeChange}>
                {Object.entries(templates).map(([key, t]) => <MenuItem key={key} value={key}>{t.label}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField label="Ação Imediata" fullWidth multiline rows={2} value={form.acaoImediata}
                onChange={e => setForm(f => ({ ...f, acaoImediata: e.target.value }))} />
            </Grid>
          </Grid>
          {form.type && (
            <>
              <Typography variant="subtitle1">VERIFICAÇÕES</Typography>
              <TableContainer component={Paper} variant="outlined" sx={{ mb:3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Verificação</TableCell>
                      {['C','NC','NA'].map(o => <TableCell key={o} align="center">{o}</TableCell>)}
                      <TableCell>Categoria</TableCell>
                      <TableCell>Obs</TableCell>
                      <TableCell>Anexo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions.map((q, i) => (
                      <TableRow key={i}>
                        <TableCell>{q}</TableCell>
                        {['C','NC','NA'].map(o => (
                          <TableCell key={o} align="center">
                            <Checkbox checked={form.verificacoes[i]===o} onChange={() => handleVerifChange(i, o)} />
                          </TableCell>
                        ))}
                        <TableCell>
                          <TextField size="small" value={form.catRisco[i]||''}
                            onChange={e => handleNested('catRisco', i, e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <TextField size="small" value={form.obsVerif[i]||''}
                            onChange={e => handleNested('obsVerif', i, e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <Button component="label" size="small">Upload<input type="file" hidden onChange={e => handleNested('anexoVerif', i, e.target.files[0])} /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { reset(); setOpen(false); }}>Cancelar</Button>
          <Button variant="contained" onClick={saveInspecao}>Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Templates */}
      <Dialog open={tplModalOpen} onClose={() => setTplModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Cadastro de Template</DialogTitle>
        <DialogContent>
          <TextField label="Chave" fullWidth sx={{ mb:2 }} value={tplForm.key}
            onChange={e => setTplForm(f => ({ ...f, key: e.target.value }))} />
          <TextField label="Label" fullWidth sx={{ mb:2 }} value={tplForm.label}
            onChange={e => setTplForm(f => ({ ...f, label: e.target.value }))} />
          <Typography variant="subtitle2">Perguntas</Typography>
          {tplForm.verificacoes.map((q, i) => (
            <Box key={i} sx={{ display:'flex', alignItems:'center', mb:1 }}>
              <TextField fullWidth value={q} onChange={e => handleTplFieldChange(i, e.target.value)} size="small" />
              <Button color="error" onClick={() => removeTplField(i)}>X</Button>
            </Box>
          ))}
          <Button onClick={addQuestionField}>+ Adicionar Pergunta</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTplModalOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={saveTemplate}>Salvar Template</Button>
        </DialogActions>
      </Dialog>

      {/* Histórico */}
      <Paper sx={{ mt:3, p:2 }}>
        <Typography variant="h6">Histórico de Inspeções</Typography>
        {inspecoes.map(ins => (
          <Paper key={ins.id} sx={{ mb:2, p:1, bgcolor:'#f9f9f9' }}>
            <Typography><strong>ID:</strong> {ins.id}</Typography>
            <Typography><strong>Tipo:</strong> {templates[ins.type]?.label}</Typography>
            <Typography variant="subtitle2" sx={{ mt:1 }}>Respostas:</Typography>
            <ul>
              {templates[ins.type].verificacoes.map((q, idx) => (
                <li key={idx}>
                  <strong>{q}</strong>: {ins.verificacoes[idx] || '---'}
                </li>
              ))}
            </ul>
            {ins.acaoImediata && (
              <Typography><strong>Ação Imediata:</strong> {ins.acaoImediata}</Typography>
            )}
          </Paper>
        ))}
      </Paper>
    </Box>
  );
};

export default Inspecoes;
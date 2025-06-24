import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  FormControlLabel,
  IconButton
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const initialTemplates = {
  seguranca: {
    label: 'Inspeções de Segurança',
    verificacoes: [
      "Todos os executantes estão cientes dos riscos mapeados na ART?",
      "Os trabalhadores estão utilizando os EPIs necessários para a realização das atividades?"
    ]
  },
  qualidade: {
    label: 'Inspeções de Meio Ambiente',
    verificacoes: [
      "Produto atende aos padrões de qualidade especificados?",
      "Foi realizada a verificação dimensional?"
    ]
  }
};

const Inspecoes = () => {
  // Estados de formulário e templates
  const [templates, setTemplates] = useState(initialTemplates);
  const [tplModalOpen, setTplModalOpen] = useState(false);
  const [tplForm, setTplForm] = useState({ key: '', label: '', verificacoes: [''] });

  // Inspeções
  const [form, setForm] = useState({
    type: '',
    verificacoes: [],
    catRisco: [],
    obsVerif: [],
    anexoVerif: [],
    corretivas: [],
    desvios: [],
    participantes: []
  });
  const [inspecoes, setInspecoes] = useState([]);
  const [open, setOpen] = useState(false);

    useEffect(() => {
  const saved = localStorage.getItem("inspecoes");
  if (saved) setInspecoes(JSON.parse(saved));
}, []);



  // Inicializa arrays ao selecionar tipo
  const initArrays = type => {
    const len = templates[type].verificacoes.length;
    setForm(f => ({
      ...f,
      type,
      verificacoes: Array(len).fill(null),
      catRisco: Array(len).fill(''),
      obsVerif: Array(len).fill(''),
      anexoVerif: Array(len).fill(null),
      corretivas: Array(len).fill('')
    }));
  };
  // Handlers de Inspeção
  const handleTypeChange = e => initArrays(e.target.value);
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

  // Handlers de template
  const openTplModal = () => setTplModalOpen(true);
  const addQuestionField = () => setTplForm(f => ({
    ...f,
    verificacoes: [...f.verificacoes, '']
  }));
  const handleTplFieldChange = (i, val) => {
    const v = [...tplForm.verificacoes];
    v[i] = val;
    setTplForm(f => ({ ...f, verificacoes: v }));
  };
  const removeTplField = i => {
    const v = tplForm.verificacoes.filter((_, idx) => idx !== i);
    setTplForm(f => ({ ...f, verificacoes: v }));
  };
  const saveTemplate = () => {
    if (!tplForm.key || !tplForm.label) return;
    setTemplates(t => ({
      ...t,
      [tplForm.key]: {
        label: tplForm.label,
        verificacoes: tplForm.verificacoes.filter(q => q)
      }
    }));
    setTplForm({ key: '', label: '', verificacoes: [''] });
    setTplModalOpen(false);
  };

  // Desvios
  const addDesvio = () => setForm(f => ({
    ...f,
    desvios: [...f.desvios, { desvio: '', categoria: '', acoes: [], responsavel: '', prazo: '', alerta: false }]
  }));
  const changeDesvio = (idx, key, val) => {
    const d = [...form.desvios];
    d[idx][key] = val;
    setForm(f => ({ ...f, desvios: d }));
  };
  const toggleAcao = (idx, tipo) => {
    const d = [...form.desvios];
    const list = d[idx].acoes;
    d[idx].acoes = list.includes(tipo)
      ? list.filter(x => x !== tipo)
      : [...list, tipo];
    setForm(f => ({ ...f, desvios: d }));
  };
  const toggleAlerta = idx => changeDesvio(idx, 'alerta', !form.desvios[idx].alerta);
  const removeDesvio = idx => setForm(f => ({
    ...f,
    desvios: f.desvios.filter((_, i) => i !== idx)
  }));

  // Participantes
  const addPart = () => setForm(f => ({
    ...f,
    participantes: [...f.participantes, { nome: '', funcao: '' }]
  }));
  const changePart = (idx, key, val) => {
    const p = [...form.participantes];
    p[idx][key] = val;
    setForm(f => ({ ...f, participantes: p }));
  };
  const removePart = idx => setForm(f => ({
    ...f,
    participantes: f.participantes.filter((_, i) => i !== idx)
  }));

  // Reset e salvar Inspeção
  const reset = () => setForm({
    type: '',
    verificacoes: [],
    catRisco: [],
    obsVerif: [],
    anexoVerif: [],
    corretivas: [],
    desvios: [],
    participantes: []
  });

  const save = () => {
    const newInspecao = { id: Date.now(), ...form };
    console.log('Salvando Inspeção:', newInspecao);
   setInspecoes(prev => {
    const updated = [newInspecao, ...prev];
    // persiste imediatamente
    localStorage.setItem("inspecoes", JSON.stringify(updated));
    return updated;
  });
    const actions = form.verificacoes.map((resp, idx) => ({
      pergunta: templates[form.type].verificacoes[idx],
      resposta: resp,
      responsavel: form.desvios[idx]?.responsavel || '',
      prazo: form.desvios[idx]?.prazo || '',
      acaoCorretiva: form.corretivas[idx] || ''
    })).filter(item => item.resposta === 'NC');
    
    const existing = JSON.parse(localStorage.getItem('planActions') || '[]');
    localStorage.setItem('planActions', JSON.stringify([...existing, ...actions]));
    reset();
    setOpen(false);
  };

  const questions = form.type ? templates[form.type].verificacoes : [];

  return (
    <Box sx={{ p: 3, maxWidth: 1400, mx: 'auto' }}>
      <Typography variant="h4">Inspeções</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2}}>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>
          Nova Inspeção
        </Button>
        <Box ml={2}>
          <Button variant="outlined" startIcon={<Edit />} onClick={openTplModal}>
            Gerenciar Templates
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={() => { reset(); setOpen(false); }} fullWidth maxWidth="xl">
        <DialogTitle>Nova Inspeção</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={6} sm={4}>
              <TextField select label="Tipo" fullWidth value={form.type} onChange={handleTypeChange}>
                {Object.entries(templates).map(([key, t]) => (
                  <MenuItem key={key} value={key}>{t.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Campo "Ação Imediata" removido — agora cada verificação tem sua própria ação corretiva */}
          </Grid>

          {form.type && (
            <>
              <Typography variant="subtitle1">VERIFICAÇÕES</Typography>
              <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'grey.200' }}>
                      <TableCell>Verificação</TableCell>
                      {['C','NC','NA'].map(o => <TableCell key={o} align="center">{o}</TableCell>)}
                      <TableCell>Categoria</TableCell>
                      <TableCell>Obs</TableCell>
                      <TableCell>Anexo</TableCell>
                      <TableCell>Ação Corretiva</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions.map((q, i) => (
                      <TableRow key={i} hover>
                        <TableCell>{q}</TableCell>
                        {['C','NC','NA'].map(o => (
                          <TableCell key={o} align="center">
                            <Checkbox size="small" checked={form.verificacoes[i] === o} onChange={() => handleVerifChange(i, o)} />
                          </TableCell>
                        ))}
                        <TableCell>
  <TextField
    size="small"
    fullWidth
    value={templates[form.type].label}
    InputProps={{ readOnly: true }}
  />
</TableCell>

                        <TableCell>
                          <TextField size="small" fullWidth placeholder="Observações" value={form.obsVerif[i] || ''} onChange={e => handleNested('obsVerif', i, e.target.value)} />
                        </TableCell>
                        <TableCell>
                          <Button component="label" size="small">
                            Imagem
                            <input type="file" hidden onChange={e => handleNested('anexoVerif', i, e.target.files[0])} />
                          </Button>
                        </TableCell>
                        <TableCell>
                        {form.verificacoes[i] === 'NC' && (
    <TextField
      size="small"
      fullWidth
      placeholder="Ação Corretiva"
      value={form.corretivas[i] || ''}
      onChange={e => handleNested('corretivas', i, e.target.value)}
    />
  )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="subtitle1">DESVIOS</Typography>
              {form.desvios.map((d, j) => (
                <Grid container spacing={1} alignItems="center" key={j} sx={{ mb: 1 }}>
                  <Grid item xs={3}>
                    <TextField label="Desvio" size="small" fullWidth value={d.desvio} onChange={e => changeDesvio(j, 'desvio', e.target.value)} />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField label="Categoria" size="small" fullWidth value={d.categoria} onChange={e => changeDesvio(j, 'categoria', e.target.value)} />
                  </Grid>
                  {['Corretiva','Preventiva','Melhoria'].map(tipo => (
                    <Grid item xs={1} key={tipo} align="center">
                      <FormControlLabel
                        control={<Checkbox checked={d.acoes.includes(tipo)} onChange={() => toggleAcao(j, tipo)} />}
                        label={tipo[0]}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={2}>
                    <TextField label="Responsável" size="small" fullWidth value={d.responsavel} onChange={e => changeDesvio(j, 'responsavel', e.target.value)} />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField label="Prazo" type="date" size="small" fullWidth InputLabelProps={{ shrink: true }} value={d.prazo} onChange={e => changeDesvio(j, 'prazo', e.target.value)} />
                  </Grid>
                  <Grid item xs={1} align="center">
                    <Checkbox checked={d.alerta} onChange={() => toggleAlerta(j)} />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton color="error" onClick={() => removeDesvio(j)}><Delete /></IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button onClick={addDesvio} sx={{ mb: 3 }}>+ Adicionar Desvio</Button>

              <Typography variant="subtitle1">PARTICIPANTES</Typography>
              {form.participantes.map((p, k) => (
                <Grid container spacing={1} key={k} sx={{ mb: 1 }}>
                  <Grid item xs={5}>
                    <TextField label="Nome" size="small" fullWidth value={p.nome} onChange={e => changePart(k, 'nome', e.target.value)} />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField label="Função" size="small" fullWidth value={p.funcao} onChange={e => changePart(k, 'funcao', e.target.value)} />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton color="error" onClick={() => removePart(k)}><Delete /></IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button onClick={addPart}>+ Adicionar Participante</Button>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { reset(); setOpen(false); }}>Cancelar</Button>
          <Button variant="contained" onClick={save}>Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Modal Templates */}
      <Dialog open={tplModalOpen} onClose={() => setTplModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Cadastro de Template</DialogTitle>
        <DialogContent>
          <TextField label="Chave" fullWidth sx={{ mb: 2, mt: 2 }} value={tplForm.key} onChange={e => setTplForm(f => ({ ...f, key: e.target.value }))} />
          <TextField label="Label" fullWidth sx={{ mb: 2 }} value={tplForm.label} onChange={e => setTplForm(f => ({ ...f, label: e.target.value }))} />
          <Typography variant="subtitle2">Perguntas</Typography>
          {tplForm.verificacoes.map((q, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TextField fullWidth value={q} onChange={e => handleTplFieldChange(i, e.target.value)} size="small" />
              <IconButton color="error" onClick={() => removeTplField(i)}><Delete /></IconButton>
            </Box>
          ))}
          <Button onClick={addQuestionField}>+ Adicionar Pergunta</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTplModalOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={saveTemplate}>Salvar Template</Button>
        </DialogActions>
      </Dialog>

      <Paper sx={{ mt:3, p:2 }}>
        <Typography variant="h6">Histórico de Inspeções</Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Tópico</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inspecoes.map(ins => (
                templates[ins.type]?.verificacoes.map((q, idx) => (
                  <TableRow key={`${ins.id}-${idx}`}>
                    <TableCell>{ins.id}</TableCell>
                    <TableCell>{templates[ins.type]?.label}</TableCell>
                    <TableCell>{q}</TableCell>
                    <TableCell>
                      {ins.verificacoes[idx] === 'C' && (
                        <span style={{ color: '#388e3c', fontWeight: 'bold' }}>Conforme</span>
                      )}
                      {ins.verificacoes[idx] === 'NC' && (
                        <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>Não Conforme</span>
                      )}
                      {ins.verificacoes[idx] === 'NA' && (
                        <span style={{ color: '#fbc02d', fontWeight: 'bold' }}>Não se aplica</span>
                      )}
                      {!ins.verificacoes[idx] && '---'}
                    </TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Inspecoes;
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Box
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const ControleEquipamentos = () => {
  // Estados
  const [equipamentos, setEquipamentos] = useState([
    {
      id: 1,
      descricao: 'Revisão de freios do veículo',
      tipo: 'Revisão de Carro',
      lote: 'REV-2024-001',
      prazoVencimento: '2024-08-15',
      quantidade: 1,
      status: 'Menor que 60 dias'
    },
    {
      id: 2,
      descricao: 'Teste de pressão do hidrante principal',
      tipo: 'Hidrantes',
      lote: 'HID-2024-002',
      prazoVencimento: '2024-07-10',
      quantidade: 2,
      status: 'Menor que 30 dias'
    },
    {
      id: 3,
      descricao: 'Inspeção de sensores de emergência',
      tipo: 'Dispositivos NR-12',
      lote: 'NR12-2024-003',
      prazoVencimento: '2024-12-01',
      quantidade: 5,
      status: 'Acima de 60 dias'
    },
    {
      id: 4,
      descricao: 'Verificação de extintores',
      tipo: 'Hidrantes',
      lote: 'EXT-2024-004',
      prazoVencimento: '2024-05-20',
      quantidade: 10,
      status: 'Vencido'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentEquipamento, setCurrentEquipamento] = useState({
    id: null,
    descricao: '',
    tipo: '',
    lote: '',
    prazoVencimento: '',
    quantidade: 0,
    status: ''
  });

  // Funções
  const handleOpenDialog = (equipamento = null) => {
    if (equipamento) {
      setCurrentEquipamento(equipamento);
    } else {
      setCurrentEquipamento({
        id: null,
        descricao: '',
        tipo: '',
        lote: '',
        prazoVencimento: '',
        quantidade: 0,
        status: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEquipamento(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (currentEquipamento.id) {
      // Editar equipamento existente
      setEquipamentos(equipamentos.map(item => 
        item.id === currentEquipamento.id ? currentEquipamento : item
      ));
    } else {
      // Adicionar novo equipamento
      const newId = Math.max(...equipamentos.map(item => item.id), 0) + 1;
      setEquipamentos([...equipamentos, { ...currentEquipamento, id: newId }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setEquipamentos(equipamentos.filter(item => item.id !== id));
  };

  const calcularStatus = (dataVencimento) => {
    const hoje = new Date();
    const vencimento = new Date(dataVencimento);
    const diffTime = vencimento - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Vencido';
    if (diffDays <= 30) return 'Menor que 30 dias';
    if (diffDays <= 60) return 'Menor que 60 dias';
    return 'Acima de 60 dias';
  };

  // Tipos de equipamentos
  const tiposEquipamentos = [
    'Revisão de Carro',
    'Hidrantes',
    'Dispositivos NR-12',
    'Extintores',
    'Sinalização de Segurança',
    'Kit de Primeiros Socorros',
    'Treinamento de Evacuação',
    'Inspeção de Escadas',
    'Iluminação de Emergência',
    'EPI',
    'Detector de Fumaça',
    'Chuveiro de Emergência'
  ];

  // Cores para status
  const statusColors = {
    'Vencido': '#e57373',
    'Menor que 30 dias': '#ffb74d',
    'Menor que 60 dias': '#fff176',
    'Acima de 60 dias': '#81c784'
  };

  return (
    <Box sx={{
      padding: 3,
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add sx={{ fontSize: 18 }} />}
          onClick={() => handleOpenDialog()}
          size="small"
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            boxShadow: 1,
            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
            fontSize: 13,
            px: 2,
            py: 0.5,
            minHeight: 32,
            fontFamily: "'Inter', sans-serif"
          }}
        >
          <span style={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Cadastrar Item</span>
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{
        borderRadius: 3,
        boxShadow: 2,
        background: 'rgba(255,255,255,0.95)',
        fontFamily: "'Inter', sans-serif"
      }}>
        <Table size="small" sx={{ fontFamily: "'Inter', sans-serif" }}>
          <TableHead>
            <TableRow sx={{
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)'
            }}>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Item</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Descrição do Item</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Tipo</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Lote</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Prazo Vencimento</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Quantidade</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Status</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipamentos.map((equipamento) => (
              <TableRow
                key={equipamento.id}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f4f6fb' },
                  '&:hover': { backgroundColor: '#e3f2fd' },
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                <TableCell sx={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{equipamento.id}</TableCell>
                <TableCell sx={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{equipamento.descricao}</TableCell>
                <TableCell sx={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{equipamento.tipo}</TableCell>
                <TableCell sx={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{equipamento.lote}</TableCell>
                <TableCell sx={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                  {new Date(equipamento.prazoVencimento).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{equipamento.quantidade}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      background: statusColors[equipamento.status] || '#bdbdbd',
                      color: '#222',
                      px: 1.5,
                      py: 0.2,
                      borderRadius: 2,
                      fontWeight: 'bold',
                      display: 'inline-block',
                      fontSize: 12,
                      boxShadow: 1,
                      fontFamily: "'Inter', sans-serif"
                    }}
                  >
                    {equipamento.status}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(equipamento)}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        background: '#e3f2fd',
                        mr: 0.5,
                        '&:hover': { background: '#bbdefb' },
                        p: 0.5,
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      <Edit sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(equipamento.id)}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        background: '#ffebee',
                        '&:hover': { background: '#ffcdd2' },
                        p: 0.5,
                        fontFamily: "'Inter', sans-serif"
                      }}
                    >
                      <Delete sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog para adicionar/editar equipamento */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 340,
            background: '#fff',
            boxShadow: 3,
            border: '1px solid #e0e0e0',
            fontFamily: "'Inter', sans-serif"
          }
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: '#222',
            pb: 0.5,
            fontSize: 16,
            fontFamily: "'Inter', sans-serif",
            borderBottom: '1px solid #f0f0f0',
            mb: 2
          }}
        >
          {currentEquipamento.id ? 'Editar Equipamento' : 'Cadastrar Novo Equipamento'}
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 2,
            pb: 1,
            overflow: 'visible'
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 0,
            fontFamily: "'Inter', sans-serif"
          }}>
            <TextField
              label="Descrição do Item"
              name="descricao"
              value={currentEquipamento.descricao}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{
                sx: { fontSize: 13, fontFamily: "'Inter', sans-serif" }
              }}
              sx={{
                borderRadius: 2,
                background: '#fafbfc',
                fontSize: 13,
                fontFamily: "'Inter', sans-serif",
              }}
              inputProps={{
                style: { fontSize: 13, fontFamily: "'Inter', sans-serif" }
              }}
            />
            <TextField
              select
              label="Tipo"
              name="tipo"
              value={currentEquipamento.tipo}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ sx: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
              sx={{
                borderRadius: 2,
                background: '#fafbfc',
                fontSize: 13,
                fontFamily: "'Inter', sans-serif"
              }}
              inputProps={{ style: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
            >
              {tiposEquipamentos.map((tipo) => (
                <MenuItem key={tipo} value={tipo} sx={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                  {tipo}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Lote"
              name="lote"
              value={currentEquipamento.lote}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ sx: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
              sx={{
                borderRadius: 2,
                background: '#fafbfc',
                fontSize: 13,
                fontFamily: "'Inter', sans-serif"
              }}
              inputProps={{ style: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
            />
            <TextField
              label="Prazo de Vencimento"
              type="date"
              name="prazoVencimento"
              value={currentEquipamento.prazoVencimento}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true, sx: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
              fullWidth
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 2,
                background: '#fafbfc',
                fontSize: 13,
                fontFamily: "'Inter', sans-serif"
              }}
              inputProps={{ style: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
            />
            <TextField
              label="Quantidade"
              type="number"
              name="quantidade"
              value={currentEquipamento.quantidade}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ sx: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
              sx={{
                borderRadius: 2,
                background: '#fafbfc',
                fontSize: 13,
                fontFamily: "'Inter', sans-serif"
              }}
              inputProps={{ style: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{
          px: 2,
          pb: 1.5,
          fontFamily: "'Inter', sans-serif",
          borderTop: '1px solid #f0f0f0',
          mt: 0
        }}>
          <Button
            onClick={handleCloseDialog}
            size="small"
            sx={{
              borderRadius: 2,
              fontWeight: 500,
              color: '#1976d2',
              fontSize: 13,
              px: 1.5,
              py: 0.5,
              minHeight: 28,
              fontFamily: "'Inter', sans-serif",
              background: 'none',
              boxShadow: 'none',
              textTransform: 'none'
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            size="small"
            sx={{
              borderRadius: 2,
              fontWeight: 500,
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
              fontSize: 13,
              px: 2,
              py: 0.5,
              minHeight: 32,
              fontFamily: "'Inter', sans-serif",
              boxShadow: 1,
              textTransform: 'none'
            }}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ControleEquipamentos;
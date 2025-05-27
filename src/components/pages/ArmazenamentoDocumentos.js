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
  Box,
  Typography,
  Chip,
  Avatar
} from '@mui/material';
import { 
  Add, 
  Edit, 
  Delete, 
  Description,
  PictureAsPdf,
  InsertDriveFile,
  Image,
  Folder
} from '@mui/icons-material';

const ArmazenamentoDocumentos = () => {
  // Estados
  const [documentos, setDocumentos] = useState([
    {
      id: 1,
      nome: 'Manual de Segurança',
      tipo: 'PDF',
      categoria: 'Segurança',
      dataUpload: '2023-10-15',
      dataValidade: '2025-10-15',
      tamanho: '2.4 MB',
      status: 'Válido',
      responsavel: 'João Silva'
    },
    {
      id: 2,
      nome: 'Laudo de Inspeção',
      tipo: 'PDF',
      categoria: 'Inspeção',
      dataUpload: '2024-01-20',
      dataValidade: '2024-07-20',
      tamanho: '1.8 MB',
      status: 'Válido',
      responsavel: 'Maria Souza'
    },
    {
      id: 3,
      nome: 'Certificado NR10',
      tipo: 'Imagem',
      categoria: 'Certificação',
      dataUpload: '2022-11-10',
      dataValidade: '2023-11-10',
      tamanho: '3.2 MB',
      status: 'Vencido',
      responsavel: 'Carlos Oliveira'
    },
    {
      id: 4,
      nome: 'Checklist Diário',
      tipo: 'Documento',
      categoria: 'Operacional',
      dataUpload: '2024-02-05',
      dataValidade: '2024-03-05',
      tamanho: '0.5 MB',
      status: 'Próximo do vencimento',
      responsavel: 'Ana Santos'
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentDocumento, setCurrentDocumento] = useState({
    id: null,
    nome: '',
    tipo: '',
    categoria: '',
    dataUpload: new Date().toISOString().split('T')[0],
    // dataValidade removido
    tamanho: '',
    responsavel: '',
    arquivo: null
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Funções
  const handleOpenDialog = (documento = null) => {
    if (documento) {
      const { status, dataValidade, ...docSemStatusValidade } = documento;
      setCurrentDocumento({ ...docSemStatusValidade, arquivo: null });
    } else {
      setCurrentDocumento({
        id: null,
        nome: '',
        tipo: '',
        categoria: '',
        dataUpload: new Date().toISOString().split('T')[0],
        // dataValidade removido
        tamanho: '',
        responsavel: '',
        arquivo: null
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDocumento(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getTipoByFileName = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return 'PDF';
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) return 'Imagem';
    if (['doc', 'docx', 'txt', 'odt', 'rtf'].includes(ext)) return 'Documento';
    if (['xls', 'xlsx', 'ods', 'csv'].includes(ext)) return 'Planilha';
    if (['ppt', 'pptx', 'odp'].includes(ext)) return 'Apresentação';
    return 'Outro';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentDocumento(prev => ({
        ...prev,
        arquivo: file,
        nome: file.name,
        tipo: getTipoByFileName(file.name),
        tamanho: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setCurrentDocumento(prev => ({
        ...prev,
        arquivo: file,
        nome: file.name,
        tipo: getTipoByFileName(file.name),
        tamanho: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSave = () => {
    if (!currentDocumento.nome || !currentDocumento.tipo || !currentDocumento.categoria || !currentDocumento.responsavel) {
      // validação simples
      return;
    }
    if (currentDocumento.id) {
      setDocumentos(documentos.map(item => 
        item.id === currentDocumento.id ? { ...currentDocumento, arquivo: undefined } : item
      ));
    } else {
      const newId = Math.max(...documentos.map(item => item.id), 0) + 1;
      setDocumentos([...documentos, { ...currentDocumento, id: newId, arquivo: undefined }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setDocumentos(documentos.filter(item => item.id !== id));
  };

  const getIconByType = (tipo) => {
    switch(tipo.toLowerCase()) {
      case 'pdf':
        return <PictureAsPdf color="error" />;
      case 'imagem':
        return <Image color="primary" />;
      case 'documento':
        return <InsertDriveFile color="info" />;
      default:
        return <Description color="action" />;
    }
  };

  // Tipos e categorias
  const tiposDocumentos = ['PDF', 'Documento', 'Imagem', 'Planilha', 'Apresentação'];
  const categoriasDocumentos = ['Segurança', 'Inspeção', 'Certificação', 'Operacional', 'RH', 'Financeiro'];

  // Filtrar documentos pela busca
  const filteredDocumentos = documentos.filter(doc =>
    doc.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.responsavel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estilo herdado do ControleEquipamentos
  const headerCellStyle = {
    color: '#fff',
    fontWeight: 600,
    fontSize: 13,
    fontFamily: "'Inter', sans-serif"
  };
  const cellStyle = {
    fontSize: 13,
    fontFamily: "'Inter', sans-serif"
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
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
          <span style={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>Adicionar Documento</span>
        </Button>

        <TextField
          label="Buscar documentos"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 250, fontFamily: "'Inter', sans-serif" }}
          inputProps={{ style: { fontSize: 13, fontFamily: "'Inter', sans-serif" } }}
        />
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
              <TableCell sx={{ ...headerCellStyle, width: 50 }}>Tipo</TableCell>
              <TableCell sx={headerCellStyle}>Nome do Documento</TableCell>
              <TableCell sx={headerCellStyle}>Categoria</TableCell>
              <TableCell sx={headerCellStyle}>Data Upload</TableCell>
              {/* <TableCell sx={headerCellStyle}>Data Validade</TableCell> removido */}
              <TableCell sx={headerCellStyle}>Tamanho</TableCell>
              <TableCell sx={headerCellStyle}>Responsável</TableCell>
              <TableCell sx={headerCellStyle}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDocumentos.map((documento) => (
              <TableRow
                key={documento.id}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f4f6fb' },
                  '&:hover': { backgroundColor: '#e3f2fd' },
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                <TableCell sx={cellStyle}>
                  <Tooltip title={documento.tipo}>
                    {getIconByType(documento.tipo)}
                  </Tooltip>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <Typography fontWeight="medium" sx={cellStyle}>{documento.nome}</Typography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <Chip 
                    label={documento.categoria} 
                    size="small" 
                    sx={{ fontSize: 12, fontFamily: "'Inter', sans-serif" }}
                  />
                </TableCell>
                <TableCell sx={cellStyle}>{new Date(documento.dataUpload).toLocaleDateString()}</TableCell>
                {/* <TableCell sx={cellStyle}>{new Date(documento.dataValidade).toLocaleDateString()}</TableCell> removido */}
                <TableCell sx={cellStyle}>{documento.tamanho}</TableCell>
                <TableCell sx={cellStyle}>{documento.responsavel}</TableCell>
                <TableCell sx={cellStyle}>
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => handleOpenDialog(documento)}
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
                    <IconButton color="error" onClick={() => handleDelete(documento.id)}
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

      {/* Dialog para adicionar/editar documento */}
      <Dialog open={openDialog} onClose={handleCloseDialog}
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
            fontFamily: "'Inter', sans-serif'",
            borderBottom: '1px solid #f0f0f0',
            mb: 2
          }}
        >
          {currentDocumento.id ? 'Editar Documento' : 'Adicionar Novo Documento'}
        </DialogTitle>
        <DialogContent
          sx={{
            pt: 2,
            pb: 1,
            overflow: 'visible'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 0, fontFamily: "'Inter', sans-serif" }}>
            {/* Área de upload de arquivo */}
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              sx={{
                border: '2px dashed #90caf9',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                background: '#f5fafd',
                cursor: 'pointer',
                mb: 1
              }}
              onClick={() => document.getElementById('file-input').click()}
            >
              <input
                id="file-input"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              {currentDocumento.arquivo ? (
                <Typography sx={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                  Arquivo selecionado: <b>{currentDocumento.arquivo.name}</b>
                </Typography>
              ) : (
                <Typography sx={{ color: '#1976d2', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                  Arraste e solte um arquivo aqui, ou clique para selecionar
                </Typography>
              )}
            </Box>

            <TextField
              label="Nome do Documento"
              name="nome"
              value={currentDocumento.nome}
              onChange={handleInputChange}
              fullWidth
              required
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
              disabled={!!currentDocumento.arquivo}
            />

            <TextField
              label="Tipo"
              name="tipo"
              value={currentDocumento.tipo}
              fullWidth
              required
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
              disabled
            />

            <TextField
              select
              label="Categoria"
              name="categoria"
              value={currentDocumento.categoria}
              onChange={handleInputChange}
              fullWidth
              required
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
              {categoriasDocumentos.map((categoria) => (
                <MenuItem key={categoria} value={categoria} sx={{ fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
                  {categoria}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Tamanho (MB)"
              name="tamanho"
              value={currentDocumento.tamanho}
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
              disabled
            />

            <TextField
              label="Responsável"
              name="responsavel"
              value={currentDocumento.responsavel}
              onChange={handleInputChange}
              fullWidth
              required
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
          <Button onClick={handleCloseDialog}
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
          <Button onClick={handleSave} color="primary" variant="contained"
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
  );};

export default ArmazenamentoDocumentos;
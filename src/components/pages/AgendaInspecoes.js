import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  Avatar,
  MenuItem,
  IconButton,
  Tooltip,
  Paper
} from "@mui/material";
import {
  Add,
  CalendarToday,
  Edit,
  Delete,
  CheckCircle,
  Warning,
  Error
} from "@mui/icons-material";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br'; // Adiciona o locale pt-br ao moment
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('pt-br'); // Define o locale globalmente

const localizer = momentLocalizer(moment);

const AgendaInspecoes = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Inspeção de EPIs",
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
      status: "pendente",
      responsavel: "João Silva",
      tipo: "Rotina",
      local: "Área de Produção"
    },
    {
      id: "2",
      title: "Verificação de Extintores",
      start: new Date(new Date().setDate(new Date().getDate() + 2)),
      end: new Date(new Date().setDate(new Date().getDate() + 2)),
      status: "agendado",
      responsavel: "Maria Souza",
      tipo: "Mensal",
      local: "Corredores"
    }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ 
    title: "", 
    start: moment().format('YYYY-MM-DDTHH:mm'),
    end: moment().add(1, 'hour').format('YYYY-MM-DDTHH:mm'),
    status: "pendente",
    responsavel: "",
    tipo: "",
    local: ""
  });

  const handleSlotSelect = (slotInfo) => {
    setNewEvent({
      ...newEvent,
      start: moment(slotInfo.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(slotInfo.end).format('YYYY-MM-DDTHH:mm')
    });
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      start: moment(event.start).format('YYYY-MM-DDTHH:mm'),
      end: moment(event.end).format('YYYY-MM-DDTHH:mm'),
      status: event.status,
      responsavel: event.responsavel,
      tipo: event.tipo,
      local: event.local
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    const eventData = {
      id: selectedEvent ? selectedEvent.id : String(Date.now()),
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      status: newEvent.status,
      responsavel: newEvent.responsavel,
      tipo: newEvent.tipo,
      local: newEvent.local
    };

    if (selectedEvent) {
      setEvents(events.map(evt => 
        evt.id === selectedEvent.id ? eventData : evt
      ));
    } else {
      setEvents([...events, eventData]);
    }

    setModalOpen(false);
    setSelectedEvent(null);
    setNewEvent({ 
      title: "", 
      start: moment().format('YYYY-MM-DDTHH:mm'),
      end: moment().add(1, 'hour').format('YYYY-MM-DDTHH:mm'),
      status: "pendente",
      responsavel: "",
      tipo: "",
      local: ""
    });
  };

  const handleDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(evt => evt.id !== selectedEvent.id));
      setModalOpen(false);
      setSelectedEvent(null);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pendente': return 'warning';
      case 'concluído': return 'success';
      case 'atrasado': return 'error';
      case 'agendado': return 'info';
      default: return 'primary';
    }
  };

  const EventComponent = ({ event }) => (
    <div style={{ padding: '2px 0' }}>
      <Chip
        size="small"
        label={event.title}
        color={getStatusColor(event.status)}
        sx={{ mb: 0.5 }}
      />
      <div style={{ fontSize: '0.8em' }}>
        {event.responsavel}
      </div>
    </div>
  );

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Grid item>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              <CalendarToday sx={{ verticalAlign: 'middle', mr: 1 }} />
              Agenda de Inspeções
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Controle de inspeções de segurança do trabalho
            </Typography>
          </Grid>
          <Grid item>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={() => {
                setSelectedEvent(null);
                setModalOpen(true);
              }}
              sx={{ borderRadius: '8px' }}
            >
              Nova Inspeção
            </Button>
          </Grid>
        </Grid>

        {/* Ajuste da altura do calendário para não sobrepor menus */}
        <div style={{ height: 'calc(70vh - 64px)' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSlotSelect}
            onSelectEvent={handleEventSelect}
            components={{
              event: EventComponent
            }}
            messages={{
              today: 'Hoje',
              previous: 'Anterior',
              next: 'Próximo',
              month: 'Mês',
              week: 'Semana',
              day: 'Dia',
              agenda: 'Agenda',
              date: 'Data',
              time: 'Hora',
              event: 'Evento',
              noEventsInRange: 'Nenhuma inspeção neste período.'
            }}
            popup
            views={['month', 'week', 'day', 'agenda']}
            culture="pt-BR"
          />
        </div>
      </Paper>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? 'Editar Inspeção' : 'Nova Inspeção'}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título da Inspeção"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data e Hora Início"
                type="datetime-local"
                value={newEvent.start}
                onChange={(e) => setNewEvent({...newEvent, start: e.target.value})}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data e Hora Fim"
                type="datetime-local"
                value={newEvent.end}
                onChange={(e) => setNewEvent({...newEvent, end: e.target.value})}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Responsável"
                value={newEvent.responsavel}
                onChange={(e) => setNewEvent({...newEvent, responsavel: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Status"
                value={newEvent.status}
                onChange={(e) => setNewEvent({...newEvent, status: e.target.value})}
              >
                {['pendente', 'agendado', 'concluído', 'atrasado'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Local"
                value={newEvent.local}
                onChange={(e) => setNewEvent({...newEvent, local: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Tipo de Inspeção"
                value={newEvent.tipo}
                onChange={(e) => setNewEvent({...newEvent, tipo: e.target.value})}
              >
                {['Rotina', 'Mensal', 'Trimestral', 'Anual', 'Extraordinária'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {selectedEvent && (
            <Button 
              onClick={handleDelete} 
              color="error"
              startIcon={<Delete />}
            >
              Excluir
            </Button>
          )}
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={!newEvent.title}
          >
            {selectedEvent ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AgendaInspecoes;
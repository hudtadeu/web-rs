import React, { useState, useMemo } from "react";
import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  MenuItem,
  IconButton,
  Tooltip,
  Paper,
  Typography,
  InputAdornment
} from "@mui/material";
import {
  Add,
  CalendarToday,
  Delete,
  Edit,
  Search,
  Close
} from "@mui/icons-material";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("pt-br");
const localizer = momentLocalizer(moment);

const STATUS_OPTIONS = [
  { value: "pendente", label: "Pendente", color: "warning" },
  { value: "agendado", label: "Agendado", color: "info" },
  { value: "concluído", label: "Concluído", color: "success" },
  { value: "atrasado", label: "Atrasado", color: "error" }
];

const TIPO_OPTIONS = [
  "Rotina",
  "Mensal",
  "Trimestral",
  "Anual",
  "Extraordinária"
];

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
      local: "Área de Produção",
      descricao: "Verificar todos os EPIs dos funcionários."
    },
    {
      id: "2",
      title: "Verificação de Extintores",
      start: new Date(new Date().setDate(new Date().getDate() + 2)),
      end: new Date(new Date().setDate(new Date().getDate() + 2)),
      status: "agendado",
      responsavel: "Maria Souza",
      tipo: "Mensal",
      local: "Corredores",
      descricao: "Checar validade e funcionamento dos extintores."
    }
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: moment().format("YYYY-MM-DDTHH:mm"),
    end: moment().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
    status: "pendente",
    responsavel: "",
    tipo: "",
    local: "",
    descricao: ""
  });
  const [search, setSearch] = useState("");
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  // Pesquisa filtrada
  const filteredEvents = useMemo(() => {
    if (!search) return events;
    return events.filter(
      evt =>
        evt.title.toLowerCase().includes(search.toLowerCase()) ||
        (evt.responsavel && evt.responsavel.toLowerCase().includes(search.toLowerCase())) ||
        (evt.local && evt.local.toLowerCase().includes(search.toLowerCase())) ||
        (evt.tipo && evt.tipo.toLowerCase().includes(search.toLowerCase()))
    );
  }, [events, search]);

  // Cores por status
  const getStatusColor = status =>
    STATUS_OPTIONS.find(opt => opt.value === status)?.color || "primary";

  // Ao clicar em slot vazio
  const handleSlotSelect = slotInfo => {
    setNewEvent({
      title: "",
      start: moment(slotInfo.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(slotInfo.end).format("YYYY-MM-DDTHH:mm"),
      status: "pendente",
      responsavel: "",
      tipo: "",
      local: "",
      descricao: ""
    });
    setSelectedEvent(null);
    setModalOpen(true);
  };

  // Ao clicar em evento
  const handleEventSelect = event => {
    setSelectedEvent(event);
    setNewEvent({
      title: event.title,
      start: moment(event.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(event.end).format("YYYY-MM-DDTHH:mm"),
      status: event.status,
      responsavel: event.responsavel,
      tipo: event.tipo,
      local: event.local,
      descricao: event.descricao || ""
    });
    setModalOpen(true);
  };

  // Salvar novo/editar evento
  const handleSave = () => {
    const eventData = {
      id: selectedEvent ? selectedEvent.id : String(Date.now()),
      title: newEvent.title,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
      status: newEvent.status,
      responsavel: newEvent.responsavel,
      tipo: newEvent.tipo,
      local: newEvent.local,
      descricao: newEvent.descricao
    };
    if (selectedEvent) {
      setEvents(events.map(evt => (evt.id === selectedEvent.id ? eventData : evt)));
    } else {
      setEvents([...events, eventData]);
    }
    setModalOpen(false);
    setSelectedEvent(null);
    setNewEvent({
      title: "",
      start: moment().format("YYYY-MM-DDTHH:mm"),
      end: moment().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
      status: "pendente",
      responsavel: "",
      tipo: "",
      local: "",
      descricao: ""
    });
  };

  // Excluir evento
  const handleDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(evt => evt.id !== selectedEvent.id));
      setModalOpen(false);
      setSelectedEvent(null);
    }
  };

  // Arrastar evento
  const handleEventDrop = ({ event, start, end }) => {
    setEvents(events.map(evt =>
      evt.id === event.id ? { ...evt, start, end } : evt
    ));
  };

  // Redimensionar evento
  const handleEventResize = ({ event, start, end }) => {
    setEvents(events.map(evt =>
      evt.id === event.id ? { ...evt, start, end } : evt
    ));
  };

  // Renderização customizada do evento
  const EventComponent = ({ event }) => (
    <Tooltip title={
      <div>
        <strong>{event.title}</strong><br />
        {event.responsavel && <>Resp.: {event.responsavel}<br /></>}
        {event.local && <>Local: {event.local}<br /></>}
        {event.tipo && <>Tipo: {event.tipo}<br /></>}
        {event.descricao && <>Desc.: {event.descricao}</>}
      </div>
    } arrow>
      <Chip
        size="small"
        label={event.title}
        color={getStatusColor(event.status)}
        sx={{ mb: 0.5, fontWeight: 500 }}
      />
    </Tooltip>
  );

  // Barra de pesquisa
  const SearchBar = (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Pesquisar eventos..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      sx={{ minWidth: 250, mr: 2 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: search && (
          <IconButton size="small" onClick={() => setSearch("")}>
            <Close />
          </IconButton>
        )
      }}
    />
  );

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 2 }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Grid item>
            {/* Removido o título e subtítulo */}
            {/* 
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
              <CalendarToday sx={{ verticalAlign: "middle", mr: 1 }} />
              Agenda Completa
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Visualização avançada de inspeções e compromissos
            </Typography>
            */}
          </Grid>
          <Grid item>
            {SearchBar}
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setSelectedEvent(null);
                setModalOpen(true);
              }}
              sx={{ borderRadius: "8px" }}
            >
              Novo Evento
            </Button>
          </Grid>
        </Grid>
        {/* Altere a altura aqui */}
        <div style={{ height: "70vh" }}>
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            selectable
            resizable
            onSelectSlot={handleSlotSelect}
            onSelectEvent={handleEventSelect}
            onEventDrop={handleEventDrop}
            onEventResize={handleEventResize}
            draggableAccessor={() => true}
            components={{
              event: EventComponent
            }}
            messages={{
              today: "Hoje",
              previous: "Anterior",
              next: "Próximo",
              month: "Mês",
              week: "Semana",
              work_week: "Semana de trabalho",
              day: "Dia",
              agenda: "Agenda",
              date: "Data",
              time: "Hora",
              event: "Evento",
              allDay: "Dia todo",
              noEventsInRange: "Nenhum evento neste período.",
              showMore: total => `+${total} mais`
            }}
            popup
            views={["month", "week", "day", "agenda"]}
            culture="pt-BR"
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            style={{ background: "#fff", borderRadius: 8 }}
          />
        </div>
      </Paper>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedEvent ? "Editar Evento" : "Novo Evento"}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                value={newEvent.title}
                onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data e Hora Início"
                type="datetime-local"
                value={newEvent.start}
                onChange={e => setNewEvent({ ...newEvent, start: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Data e Hora Fim"
                type="datetime-local"
                value={newEvent.end}
                onChange={e => setNewEvent({ ...newEvent, end: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Responsável"
                value={newEvent.responsavel}
                onChange={e => setNewEvent({ ...newEvent, responsavel: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Status"
                value={newEvent.status}
                onChange={e => setNewEvent({ ...newEvent, status: e.target.value })}
              >
                {STATUS_OPTIONS.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Local"
                value={newEvent.local}
                onChange={e => setNewEvent({ ...newEvent, local: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Tipo"
                value={newEvent.tipo}
                onChange={e => setNewEvent({ ...newEvent, tipo: e.target.value })}
              >
                {TIPO_OPTIONS.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                value={newEvent.descricao}
                onChange={e => setNewEvent({ ...newEvent, descricao: e.target.value })}
                multiline
                minRows={2}
              />
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
            startIcon={<Edit />}
          >
            {selectedEvent ? "Salvar" : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AgendaInspecoes;
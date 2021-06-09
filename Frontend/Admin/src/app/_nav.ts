import { INavData } from '@coreui/angular';
export const navItems: INavData[] = [

  {
    title: true,
    name: 'Medicina General'
  },
  {
    name: 'Citas',
    url: '/medicinageneralcitas',
    icon: 'icon-layers'
  },
  {
    name: 'Historial de consultas',
    url: '/medicinageneral',
    icon: 'icon-folder-alt'
  },
  {
    name: 'Pacientes',
    url: '/pacientes',
    icon: 'icon-people'
  },
  {
    name: 'Generar Reporte',
    url: '/reportesmedicinageneral',
    icon: 'icon-chart'
  },

  {
    title: true,
    name: 'Rehabilitación Física'
  },
  {
    name: 'Citas',
    url: '/rehabilitacionfisicacitas',
    icon: 'icon-layers'
  },
  {
    name: 'Historial de consultas',
    url: '/rehabilitacionfisica',
    icon: 'icon-folder-alt'
  },
  {
    name: 'Pacientes',
    url: '/pacientes',
    icon: 'icon-people'
  },
  {
    name: 'Generar Reporte',
    url: '/reportesrehabilitacionfisica',
    icon: 'icon-chart'
  },

  {
    title: true,
    name: 'Secretaría'
  },
  {
    name: 'Agendar Cita',
    url: '/agendarcita',
    icon: 'icon-calendar'
  },
  {
    name: 'Mostrar Citas',
    url: '/citas',
    icon: 'icon-list'
  },
  {
    name: 'Registrar Historia Clínica',
    url: '/registrarhistoriaclinica',
    icon: 'icon-user'
  },
  {
    title: true,
    name: 'Administrador'
  },
  {
    name: 'Cuentas',
    url: '/cuentas',
    icon: 'icon-people'
  },
  {
    name: 'Roles',
    url: '/roles',
    icon: 'icon-vector'
  },
  {
    name: 'Turnos',
    url: '/horarios',
    icon: 'icon-clock'
  },
];

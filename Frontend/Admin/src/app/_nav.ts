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
    url: '/medicinageneral/reporte',
    icon: 'icon-chart',
    children: [
      {
        name: 'Reporte Diario',
        url: '/medicinageneral/reporte/diario',
        icon: 'icon-graph'
      },
      {
        name: 'Reporte Mensual',
        url: '/medicinageneral/reporte/mensual',
        icon: 'icon-graph'
      },
      {
        name: 'Reporte Anual',
        url: '/medicinageneral/reporte/anual',
        icon: 'icon-graph'
      }
    ]
  },
  {
    name: 'Certificados',
    url: '/#',
    icon: 'icon-star'
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
    url: '/rehabilitacionfisica/reporte',
    icon: 'icon-chart',
    children: [
      {
        name: 'Reporte Diario',
        url: '/rehabilitacionfisica/reporte/diario',
        icon: 'icon-graph'
      },
      {
        name: 'Reporte Mensual',
        url: '/rehabilitacionfisica/reporte/mensual',
        icon: 'icon-graph'
      },
      {
        name: 'Reporte Anual',
        url: '/rehabilitacionfisica/reporte/anual',
        icon: 'icon-graph'
      }
    ]
  },
  {
    name: 'Certificados',
    url: '/#',
    icon: 'icon-star'
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
];

import { INavData } from '@coreui/angular';
export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
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
    name: 'Historia Clínica',
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

  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Navbars',
        url: '/base/navbars',
        icon: 'icon-puzzle'

      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },

];

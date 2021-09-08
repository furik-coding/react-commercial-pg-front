import React from 'react';
import MainBase from './containers/Base/Main/Main';
import OutdoorFurniture from './containers/Base/OutdoorFurniture/OutdoorFurniture';
import Brands from './containers/Base/Brands/Brands';
import Partners from './containers/Base/Partners/Partners';
import Partner from './containers/Base/Partner/Partner';
import Brand from './containers/Base/Brand/Brand';
import Construction from './containers/Base/Construction/Construction';
import Locations from './containers/Base/Locations/Locations';
import Location from './containers/Base/Location/Location';
import Agreements from './containers/Base/Documents/Agreements/Agreements';
import Agreement from './containers/Base/Documents/Agreement/Agreement';
import ApplicationsBase from './containers/Base/Documents/Application_base/Application_base';
import ApplicationBase from './containers/Base/Documents/Application/Application';
import Crews from './containers/Base/Crews/Crews';
import Summary from './containers/Sales/Summary/Summary';
import Invoice from './containers/Sales/Invoice/Invoice';
import Com_projects from './containers/Sales/Com_projects/Com_projects';
import Estimate from './containers/Sales/Estimate/Estimate';
import Application from './containers/Sales/Application/Application';
import Project_card from './containers/Sales/Project_card/Project_card';
import Project_new from './containers/Sales/Project_new/Project_new';
import AdvertisingParties from './containers/Sales/AdvertisingParties/AdvertisingParties';
import BatchPlacement from './containers/Sales/BatchPlacement/BatchPlacement';
import MainSales from './containers/Sales/Main/Main';
import Main from './containers/Main/Main';
import Design from './containers/Installations/Design/Design';
import MainInstall from './containers/Installations/Main/Main';
import Projects from './containers/Installations/Projects/Projects';
import Orders from './containers/Installations/Orders/Orders';
import MainAdministration from './containers/Administration/Main/Main';
import Person from './containers/Administration/Person/Person';
import AdminOutdoorFurniture from './containers/Administration/AdminFormats/FormatsPanel';
import AdminCitiesPanel from './containers/Administration/AdminLocations/AdminCitiesPanel';
import Packages from './containers/Administration/Packages/Packages';
import AdminCrews from './containers/Administration/AdminCrews/AdminCrews';
import Prices from './containers/Administration/Prices/Prices';


export const routes = {
  root:                        { root: { path: '/', title: 'Главная', component: Main } },
  sales: {
    root:                      { path: '/sales', name: '', idx: -1, title: 'Продажи', component: MainSales },
    advertising_parties:       { path: '/sales/advertising_parties', name: 'Справочник рекламных сторон', idx: 1, component: AdvertisingParties},
    batch_placement:           { path: '/sales/batch_placement', name: 'Пакетное размещение', idx: 2, component: BatchPlacement},
    project_new:               { path: '/sales/project_new', name: 'Создание проекта', idx: -1, component: Project_new},
    project_card:              { path: '/sales/project_card/:id?', name: 'Проект', idx: -1, component: Project_card,
                                 url: (id) => `/sales/project_card/${id}`, },
    project_estimate:          { path: '/sales/project_card/:id?/estimate', name: 'Смета проекта', idx: -1,
                                 url: (id) => `/sales/project_card/${id}/estimate`, component: Estimate},
    application:               { path: '/sales/application/:appId', name: 'Приложение', idx: -1,
                                 url: (id) => `/sales/application/${id}`, component: Application },
    application_estimate:      { path: '/sales/application/:appId/estimate', name: 'Смета приложения', idx: -1,
                                 url: (id) => `/sales/application/${id}/estimate`, component: Estimate },
    com_projects:              { path: '/sales/com_projects', name: 'Коммерческие проекты', idx: 3, component: Com_projects},
    invoice:                   { path: '/sales/invoice', name: 'Выставление счета', idx: 4, component: Invoice},
    summary:                   { path: '/sales/summary/:id', name: 'Сводка', idx: -1 , component: Summary,
                                 url: (id) => `/sales/summary/${id}`, }
  },
  bases: {
    root:                      { path: '/base', name: 'Базы', component: MainBase, },
    outdoor_furniture:         { path: '/base/outdoor_furniture', name: 'Конструкции', component: OutdoorFurniture, idx: 1 },
    locations:                 { path: '/base/locations',  name: 'Список местоположений', component: Locations, idx: 2 },
    brands:                    { path: '/base/brands',  name: 'Бренды', component: Brands, idx: 3 },
    partners:                  { path: '/base/partners', name: 'Контрагенты', component: Partners, idx: 4 },
    agreements:                { path: '/base/documents/agreements', name: 'Документы', component: Agreements, idx: 5  },
    crews:                     { path: '/base/crews', name: 'Экипажи', component: Crews, idx: 6 },
    partner:                   { path: '/base/partners/partner/:id?', name: 'Контрагент', component: Partner,
                                 url: id => `/base/partners/partner/${id}` },
    partner_brands:            { path: '/base/partners/partner/:id?/brands', name: 'Связанные бренды', component: Brands,
                                 url: id => `/base/partners/partner/${id}/brands` },
    partner_advertisers:       { path: '/base/partners/partner/:id?/advertisers', name: 'Связанные рекламодатели', component: Partners,
                                 url:  id => `/base/partners/partner/${id}/advertisers`},
    brand:                     { path: '/base/partner/brand/:id?', name: 'Бренд', component: Brand,
                                 url:  id => `/base/partner/brand/${id}` },
    construction:              { path: '/base/construction/:id?', name: 'Конструкция', component: Construction,
                                 url:  id => `/base/construction/${id}` },
    location:                  { path: '/base/locations/location/:id?', name: 'Местоположение', component: Location,
                                 url:  id => `/base/locations/location/${id}`},

    location_add_construction: { path: '/base/locations/location/:id?/add_outdoor_furniture', name: 'Добавление конструкции',
                                 url: id => `/base/locations/location/${id}/add_outdoor_furniture`,
                                 component: OutdoorFurniture  },
    agreement:                 { path: '/base/documents/agreement/:id?', name: 'Договор', component: Agreement,
                                 url: id => `/base/documents/agreement/${id}` },

    application_base:          { path: '/base/documents/application_base', name: 'Приложения', component: ApplicationsBase  },
    application:               { path: '/base/documents/application/:id?', name: 'Прилолжение', component: ApplicationBase,
                                 url:   id => `/base/documents/application/${id}`},
    crew:                      { path: '/base/crews/:id?',  name: 'Экипаж', component: Crews,
                                 url: id => `/base/crews/${id}`, },
    crew_add_construction:     { path: '/base/crews/:id?/add_outdoor_furniture', name: 'Добавить конструкцию экипажу',
                                 url:  id => `/base/crews/${id}/add_outdoor_furniture`,
                                 component:(()=><OutdoorFurniture isCrew={true}/>)  },
  },
  installations: {
    root:                      { path: "/installations", name: '', title: "Монтажи", component: MainInstall },
    projects:                  { path: "/installations/11projects", name: "Подача разнарядки", component:  Projects, idx: 1 },
    orders:                    { path: "/installations/orders", name: "Выгрузка разнарядки", component: Orders, idx: 2 },
    design:                    { path: "/installations/design", name: "Дизайны", component: Design },
  },
  administration: {
    root:                      { path: '/administration', name: '', idx: -1, title: 'Администрация', component: MainAdministration },
    person:                    { path: '/administration/person', name: 'Сотрудники', idx: 1, component: Person },
    outdoor_furniture:         { path: '/administration/outdoor_furniture', name: 'Конструкции', idx: 2, component: AdminOutdoorFurniture },
    locations:                 { path: '/administration/locations', name: 'Местоположения', idx: 3, component: AdminCitiesPanel },
    packages:                  { path: '/administration/packages', name: 'Пакеты', idx: 4, component: Packages },
    crews:                     { path: '/administration/crews', name: 'Экипажи', idx: 5, component: AdminCrews },
    prices:                    { path: '/administration/prices', name: 'Цены', idx: 6, component: Prices },
  },
};

export function sortRouteByIdx([aKey, aVal], [bKey, bVal]) {
  if ('idx' in aVal && 'idx' in bVal)
    return (((aVal.idx < bVal.idx) && -1) || ((aVal.idx > bVal.idx) && 1) || 0);
  else if ('idx' in aVal)
    return -1
  else if ('idx' in bVal)
    return 1
  else
    return 0;
}

export const filterRouteShowed = ([key, value]) => 'idx' in value && value.idx > 0

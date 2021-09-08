
import React from 'react';

import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { routes } from '../../../routes';
import { GridNoPadding, RowMargin1st, ColFormats } from '../components/Styled'
import { LocationState } from '../AdminFormats/location_state';
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';
import { AddSlider, EditSlider } from '../AdminFormats/Sliders';
import { RadiobuttonCRUDWithSearch } from '../AdminFormats/RadiobuttonCRUDWithSearch';

import { srcCountries, srcCities, srcDistricts } from './CitiesDatasource';

const APPEND_TITLES = [
  "Страну", "Город", "Район"
]

const APPEND_TITLES2 = [
  "страны", "города", "района"
]

const AdminCitiesPanel = () => {
  const districts = new LocationState({title: "Список районов", datasource: srcDistricts, idx: 2});
  const cities = new LocationState({title: "Список городов", datasource: srcCities, idx: 1});
  const countries = new LocationState({title: "Список стран", datasource: srcCountries, idx: 0});
  districts.setParent(cities)
  cities.setParent(countries)

  const sliderState = new SliderState({name: "", key: ""})
  const chain = [ countries, cities, districts ];
  const propCtx = { chain, sliderState, APPEND_TITLES, APPEND_TITLES2  }

  return (
    <AdminTopLayout activeRoute={routes.administration.locations}>
      {sliderState.addShowed && <AddSlider sliderState={sliderState} />}
      {sliderState.editMustShowed() && <EditSlider sliderState={sliderState} />}
      <GridNoPadding fluid>
        <RowMargin1st xs={12}>
          <ColFormats xs={4}>
            <RadiobuttonCRUDWithSearch location={countries} propCtx={propCtx} />
          </ColFormats>
          <ColFormats xs={4}>
            <RadiobuttonCRUDWithSearch location={cities} propCtx={propCtx} className="grid-col-central-margin"/>
          </ColFormats>
          <ColFormats xs={4}>
            <RadiobuttonCRUDWithSearch location={districts} propCtx={propCtx} />
          </ColFormats>
        </RowMargin1st>
      </GridNoPadding>
    </AdminTopLayout>
  );
};

export default AdminCitiesPanel;

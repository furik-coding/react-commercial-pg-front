import React, {useContext, useEffect} from 'react';
import { useHistory } from 'react-router';

import EditInformation from './Blocks/EditInformation';
import Address from './Blocks/Address';
import { YMaps, Map, Placemark, ListBox } from 'react-yandex-maps';
import Contract from './Blocks/Contract';
import AkimatResolution from './Blocks/AkimatResolution';
import GroundAct from './Blocks/GroundAct';
import Construction from './Blocks/Construction';
import Documents from './Blocks/Documents';

import { locationContext } from "../../../../containers/Base/Location/Location";
import './Blocks/panel_location.scss'

const GeneralInformation = () => {
  const  [apiData, setApiData] = useContext(locationContext);
  const history = useHistory();

  let newCoords;

  const { constructions } = apiData;

  const removeConstruction = (e, id) => {
    e.preventDefault();

    let edgesLocal = constructions.edges;

    edgesLocal = edgesLocal.filter(el => el.node.id != id);

    setApiData({
      ...apiData,
      constructions: {
        edges: edgesLocal
      },
      constructionsRemove: [
        ...(apiData.constructionsRemove || []),
        id
      ]
    })
  }
  const openConstruction = (e, id) => {
    e.preventDefault();

    history.push(`/base/construction/${id}`);
    history.go(0);
  }

  return (
    <div className="general-info-root">
      <div className={"edit-info"}>
        <EditInformation />
      </div>
      <div className={"address"}>
        <Address />
      </div>
      <div className={"ymaps-panel"}>
        <YMaps>
          <Map
            style={{ height: '100%' }}
            defaultState={{ center: [43.24230063395435, 76.90130050681198], zoom: 9 }}
          >
            <Placemark
              geometry={{
                type: 'Point',
                coordinates: [43.24230063395435, 76.90130050681198],
              }}
              options={{
                draggable: true,
              }}
              instanceRef={(ref) => {
                if (ref) {
                  ref.geometry.events.add('change', function (e) {
                    newCoords = e.get('newCoordinates');
                  });
                }
              }}
            />
          </Map>
        </YMaps>
      </div>

      {
        constructions && constructions.edges.length
        ? constructions.edges.map(({ node }, index) => (
            <div key={`${node.id}-${index}`} style={{ flex: '1 0 23%', margin: '1vw 1vw 1vw 0' }}>
              <Construction
                remove={(e) => removeConstruction(e, node.id)}
                open={(e) => openConstruction(e, node.id)}
                {
                  ...node
                }
              />
            </div>
          ))
        : ''
      }

      <br/>
      <div style={{ flex: '1 0 23%', margin: '1vw 1vw 1vw 0' }}>
        <AkimatResolution />
      </div>
      <div style={{ flex: '1 0 23%', margin: '1vw 0 1vw 1vw' }}>
        <GroundAct />
      </div>
      <div style={{ flex: '1 0 100%', margin: '1vw 0' }}>
        <Contract />
      </div>
      <div style={{ flex: '1 0 23%', margin: '1vw 1vw 1vw 0' }}>
        <Documents/>
      </div>
    </div>
  );
};

export default GeneralInformation;

import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { Map, GoogleApiWrapper, IMapProps, Circle, InfoWindow } from 'google-maps-react';
import '../major_elements/index.js';

import * as cst from "../utils/konst";
import i18n from '../i18n';
import * as clt from "../utils/client";


interface MapContainerState {
  zoom_level: number;
  info_box_lat: number,
  info_box_lng: number,

  country_list:any,

  map: any,
}

export class MapContainer extends React.Component<IMapProps, MapContainerState> {
  
  constructor(props) {
    super(props);

    this.state = {
      zoom_level: 2,
      info_box_lat: 35,
      info_box_lng: 155,

      country_list: [],

      map: null,
    }

    this.on_zoom_changed = this.on_zoom_changed.bind(this);

    clt.num_cases_per_country()
      .then(response => {
        const payload = response.data
        const error_code = payload[cst.KEY_ERROR_CODE]

        if (0 == error_code) {
            this.setState({
                country_list: payload[cst.KEY_RESULT]
            })
        }
        else {
            const err_msg = payload[cst.KEY_ERROR_TEXT];
            console.log(err_msg);
        }
      })
      .catch(err => {
          console.log(err);
      })
    };
  
  
  render() {
    const mapStyles = {
      width: '72%',
      height: '90%',
      textAlign: 'center'
    };

    const ctryinfo = this.state.country_list
    const mapinfo = [];
    for (const country in ctryinfo) {
      if (ctryinfo[country]['center']!=null){
        mapinfo.push(
          <Circle
            strokeColor= "#FF0000"
            trokeOpacity= {0.8}
            strokeWeight= {2}
            fillColor= "#FF0000"
            fillOpacity= {0.35}
            center= {ctryinfo[country]['center']}
            radius= {ctryinfo[country]['num_cases'] * 30}
          />
          
        )
      } else continue;
    }
    
    return (
      <div>
        <Header as='h1' dividing>{i18n.t("map")}</Header>
        
        <div>
            <Map
              google={window.google}
              zoom={2}
              // centerAroundCurrentLocation={true}
              style={mapStyles}
              initialCenter={{ lat: 35, lng: 155 }}

              onZoomChanged={this.on_zoom_changed}
            >
              
              {mapinfo}

              {/* <Circle
                radius={1200000 / (this.state.zoom_level + 1)}
                center={{ lat: 35, lng: 155 }}
                onMouseover={() => console.log('mouse enter')}
                onClick={() => console.log('click')}
                onMouseout={() => console.log('mouse out')}
                strokeColor='transparent'
                strokeOpacity={0}
                strokeWeight={5}
                fillColor='#FF0000'
                fillOpacity={0.3}
              /> */}
              {/* <InfoWindow
                marker={null}
                google={window.google}
                map={this.state.map}
                position={{ lat: this.state.info_box_lat, lng: this.state.info_box_lng }}
                visible={true}
              >
                  <p>305 cases</p>
              </InfoWindow> */}

            </Map>
        </div>
        
      </div>
    );
  }

  private on_zoom_changed(mapProps?: IMapProps, map?: google.maps.Map, event?) {
    const zoom_level = map.getZoom();
  
    this.setState({
      zoom_level: zoom_level,
      map: map,
    });
  }
  
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_bPUXCOGN-mCxgCfllV7JygB8E_huPEg',
  language: 'ko',
})(MapContainer);


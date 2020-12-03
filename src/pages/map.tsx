import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { Map, GoogleApiWrapper, IMapProps, Circle, InfoWindow, Marker } from 'google-maps-react';
import '../major_elements/index.js';

import * as cst from "../utils/konst";
import i18n from '../i18n';
import * as clt from "../utils/client";


interface MapContainerState {
  // zoom_level: number;
  // info_box_lat: number,
  // info_box_lng: number,

  country_list:any,
  
  // map: any,

  // showingInfoWindow: boolean,
  // activeCircle: {},
  // selectedPlace: {},
}

export class MapContainer extends React.Component<IMapProps, MapContainerState> {
  
  constructor(props) {
    super(props);

    this.state = {
      // zoom_level: 2,
      // info_box_lat: 35,
      // info_box_lng: 155,

      country_list: [],

      // map: null,

      // showingInfoWindow: false,
      // activeCircle: {},
      // selectedPlace: {},
    }

    // this.on_zoom_changed = this.on_zoom_changed.bind(this);
    // this.onCircleClicked = this.onCircleClicked.bind(this);
    // this.onMapClicked = this.onMapClicked(this);

    
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
    const wininfo=[];
    for (const country in ctryinfo) {
      if (ctryinfo[country]['center']!=null){
        // let ctryCircle = new google.maps.Circle({    
        //   strokeColor:"#FF0000",
        //   strokeOpacity:0.8,
        //   strokeWeight:0.8,
        //   fillColor:"#FF0000",
        //   fillOpacity:0.35,
        //   center:ctryinfo[country]['center'],
        //   radius:Math.log(ctryinfo[country]['num_cases'] + 1) * 15000
        // })
        // mapinfo.push(ctryCircle)
        
        mapinfo.push(
          <Circle 
            // onClick={this.onCircleClicked}
            strokeColor="#FF0000"
            trokeOpacity={0.8}
            strokeWeight={0.8}
            fillColor="#FF0000"
            fillOpacity={0.35}
            center={ctryinfo[country]['center']}
            radius={Math.log(ctryinfo[country]['num_cases'] + 1) * 15000}
            clickable={false}>
          </Circle>
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
              style={mapStyles}
              initialCenter={{ lat: 35, lng: 155 }}
  
              // onZoomChanged={this.on_zoom_changed}

              // onClick={this.onMapClicked}
            >
              
            {mapinfo}

            {/* <InfoWindow
              marker={this.state.activeCircle}
              visible={this.state.showingInfoWindow}>
                <div>
                  <h1>실험</h1>
                </div>
            </InfoWindow> */}

            </Map>
        </div>
        
      </div>
    );
  }

  // private on_zoom_changed(mapProps?: IMapProps, map?: google.maps.Map, event?) {
  //   const zoom_level = map.getZoom();
  
  //   this.setState({
  //     zoom_level: zoom_level,
  //     map: map,
  //   });
  // }
  
  // private onCircleClicked(props, marker, event) {
  //   this.setState({
  //     selectedPlace: props,
  //     activeCircle: marker,
  //     showingInfoWindow: true
  //   });
  // }

  // private onMapClicked(props){
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeCircle: null
  //     })
  //   }
  // };
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_bPUXCOGN-mCxgCfllV7JygB8E_huPEg',
  language: 'ko',
})(MapContainer);


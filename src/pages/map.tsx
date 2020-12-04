import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { Map, GoogleApiWrapper, IMapProps, Circle, InfoWindow } from 'google-maps-react';
import '../major_elements/index.js';
import "../utils/map.ts";

import * as cst from "../utils/konst";
import i18n from '../i18n';
import * as clt from "../utils/client";


interface MapContainerState {
  // zoom_level: number;
  info_box_lat: number,
  info_box_lng: number,

  country_list:any,
  
  map: any,
  // google: any,

  cases: number,
  country: string,
  showingInfoWindow: boolean,
  // activeCircle: {},
  // selectedPlace: {},
}

export class MapContainer extends React.Component<IMapProps, MapContainerState> {
  
  constructor(props) {
    super(props);

    this.state = {
      // zoom_level: 2,
      info_box_lat: 35,
      info_box_lng: 155,

      country_list: [],

      map: null,
      // google: null,

      cases: 0,
      country: "",
      showingInfoWindow: false,
      // activeCircle: {},
      // selectedPlace: {},
    }

    // this.on_zoom_changed = this.on_zoom_changed.bind(this);
    // this.onCircleClicked = this.onCircleClicked.bind(this);
    this.mouse_on_map = this.mouse_on_map.bind(this);
    this.on_Mouse_over = this.on_Mouse_over.bind(this);
    this.on_Mouse_out = this.on_Mouse_out.bind(this);


    
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
            // onClick={this.onCircleClicked}
            key={`Circle of ${country}`}
            country={`${country}`}
            cases={`${ctryinfo[country]['num_cases']}`}
            strokeColor="#FF0000"
            trokeOpacity={0.8}
            strokeWeight={0.8}
            fillColor="#FF0000"
            fillOpacity={0.35}
            onMouseover={this.on_Mouse_over}
            onMouseout={this.on_Mouse_out}
            center={ctryinfo[country]['center']}
            radius={Math.log(ctryinfo[country]['num_cases'] + 1) * 15000}>
            {/* // clickable={false}> */}
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
              onMouseover={this.mouse_on_map}
              // onZoomChanged={this.on_zoom_changed}

              // onClick={this.onMapClicked}
            >
            {/* <div id="map"></div> */}
              
            {mapinfo}
            

            <InfoWindow
                marker={null}
                google={window.google}
                map={this.state.map}
                // onOpen={this.state.showingInfoWindow}
                // position={this.state.selectedPlace}
                position={new google.maps.LatLng(this.state.info_box_lat, this.state.info_box_lng)}
                visible={this.state.showingInfoWindow}
            >
              <p>{this.state.country}</p>
              <p>{this.state.cases}</p>
            </InfoWindow>

            </Map>
        </div>
        
      </div>
    );
  }

  private mouse_on_map(){
    this.setState({
      showingInfoWindow: false,
    })
  }

  private on_Mouse_over(a:any, b:any, map?: google.maps.Map,) {
    console.log(a)
    // console.log(a)
    console.log(b)
    
    
    this.setState({
      showingInfoWindow: true,
      info_box_lat: a.center.lat,
      info_box_lng: a.center.lng,
      country: a.country,
      cases: a.cases,
      map: map,
    })

    console.log(this.state.info_box_lat)
    console.log(this.state.info_box_lng)
    
    // console.log(this.state.selectedPlace)
    // console.log(this.state.map)
    // console.log(this.state.google)
    console.log(this.state.showingInfoWindow)
  }

  private on_Mouse_out(a:any, b:any) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
      })
    }
    console.log(this.state.showingInfoWindow)
  };
  
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


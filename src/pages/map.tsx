import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { Map, GoogleApiWrapper, IMapProps, Circle } from 'google-maps-react';
// import GoogleMapReact from 'google-map-react';
import '../major_elements/index.js';

import i18n from '../i18n';
// import { GoogleMapProps } from '@react-google-maps/api';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
// export class SimpleMap extends React.Component<any> {
//   constructor(props){
//     super(props);
//   }

//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33
//     },
//     zoom: 1
//   };
 
//   render() {
//     return (
//       <div>
//         <Header as='h1' dividing>{i18n.t("map")}</Header>
//         <div style={{ height: '72vh', width: '90%' }}>
//           <GoogleMapReact
//             bootstrapURLKeys={{ 
//                 key: 'AIzaSyB_bPUXCOGN-mCxgCfllV7JygB8E_huPEg',
//                 language: 'ko',
//                 region: 'kr'}}
//             defaultCenter={this.props.center}
//             defaultZoom={this.props.zoom}
//             yesIWantToUseGoogleMapApiInternals
//           >
//             <AnyReactComponent
//               lat={59.955413}
//               lng={30.337844}
//               text="My Marker"
//             />
//           </GoogleMapReact>
//         </div>
//       </div>
//     );
//   }
// }
 
// export default SimpleMap;


export class MapContainer extends React.Component<IMapProps> {
  
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    }
  }
  
  render() {
    const mapStyles = {
      width: '72%',
      height: '90%',
      textAlign: 'center'
    };
    
    const coords = { lat: 35, lng: 155 };

    interface Country {
      center: google.maps.LatLngLiteral;
      case: number;
    }

    const citymap: Record<string, Country> = {
      chicago: {
        center: { lat: 41.878, lng: -87.629 },
        case: 2714856,
      },
      newyork: {
        center: { lat: 40.714, lng: -74.005 },
        case: 8405837,
      },
      losangeles: {
        center: { lat: 34.052, lng: -118.243 },
        case: 3857799,
      },
      vancouver: {
        center: { lat: 49.25, lng: -123.1 },
        case: 603502,
      },
    };

    const mapinfo = [];
    for (const city in citymap) {
      // Add the circle for this city to the map.
      // const cityCircle = new Circle({
      //   strokeColor: "#FF0000",
      //   strokeOpacity: 0.8,
      //   strokeWeight: 2,
      //   fillColor: "#FF0000",
      //   fillOpacity: 0.35,
      //   center: citymap[city].center,
      //   radius: Math.sqrt(citymap[city].case) * 100,
      // })
      mapinfo.push(<Circle
        strokeColor= "#FF0000"
        trokeOpacity= {0.8}
        strokeWeight= {2}
        fillColor= "#FF0000"
        fillOpacity= {0.35}
        center= {citymap[city].center}
        radius= {Math.sqrt(citymap[city].case) * 100}
      />)
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
            >
              {/* <Marker position={{ lat: 0, lng: 0}} /> */}
              
              {mapinfo}
              {/* <Circle
                strokeColor= "#FF0000"
                trokeOpacity= {0.8}
                strokeWeight= {2}
                fillColor= "#FF0000"
                fillOpacity= {0.35}
                center= {{ lat: 40.714, lng: -74.005 }}
                radius= {Math.sqrt(8405837) * 100}
              />

              <Circle
                strokeColor= "#FF0000"
                trokeOpacity= {0.8}
                strokeWeight= {2}
                fillColor= "#FF0000"
                fillOpacity= {0.35}
                center= {{ lat: 49.25, lng: -123.1 }}
                radius= {Math.sqrt(603502) * 100}
              /> */}
              {/* {mapinfo.map(i=> {i})} */}
              
{/* 
              <Circle 
                center={coords}
                strokeColor= "#FF0000"
                strokeOpacity= {0.8}
                strokeWeight= {2}
                fillColor="#FF0000"
                fillOpacity= {0.35}
                radius={5000000}
              /> */}

              {/* <InfoWindow>
                <div>
                  <h1>test</h1>
                </div>
              </InfoWindow> */}
              
            </Map>
        </div>
        
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_bPUXCOGN-mCxgCfllV7JygB8E_huPEg',
  language: 'ko',
})(MapContainer);


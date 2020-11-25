import * as React from 'react';
import { Header } from 'semantic-ui-react';
import { Map, GoogleApiWrapper, IMapProps } from 'google-maps-react';

import i18n from '../i18n';

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
            />
        </div>
        
      </div>
    );
  }
}

const LoadingContainer = (props) => (
  <div>Fancy loading container!</div>
)

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB_bPUXCOGN-mCxgCfllV7JygB8E_huPEg',
  language: 'ko',
  LoadingContainer: LoadingContainer
})(MapContainer);


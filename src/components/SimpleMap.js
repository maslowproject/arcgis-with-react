import * as React from 'react';
import { Map, loadModules } from '@esri/react-arcgis';

class SimpleMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      centerPoint: null,
      map: null,
      view: null
    }
  }

  componentWillMount() {
    loadModules([
      'esri/geometry/Point'
    ]).then(([ Point ]) => {
      var newPoint = new Point({ latitude: 29.7174, longitude: -95.4018 })

      this.setState({ centerPoint: newPoint })
    })
  }

  handleMapLoad = (map, view) => {
    this.setState({ map, view }, () => {
      loadModules(['esri/layers/FeatureLayer'])
      .then(([ FeatureLayer ]) => {
        var fLayer = new FeatureLayer({ 
          url: 'https://cohegis.houstontx.gov/cohgispub/rest/services/PD/Neighborhood_Services_wm/MapServer/0',
          popupTemplate: {
            title: '{CAMPNAME}',
            content: [{
              type: 'fields',
              fieldInfos: [
                { fieldName: 'CAMPNAME', label: 'Name' },
                { fieldName: 'DISTNAME', label: 'District' },
                { fieldName: 'USER_School_Site_Street_Address', label: 'Address' },
                { fieldName: 'USER_School_Site_City', label: 'City' },
                { fieldName: 'USER_School_Site_State', label: 'State' },
                { fieldName: 'USER_School_Site_Zip', label: 'Zip' },
                { fieldName: 'GRADERANGE', label: 'Grade Range' }

              ]
            }],
            outFields: ['USER_School_Principal', 'Email' ],
            actions: [{
              id: 'email-principal',
              title: 'Email Principal',
              className: 'esri-icon-contact'
            }]
          } })

        map.add(fLayer)

        view.when(() => {
          const popup = view.popup

          popup.watch('selectedFeature', (graphic) => {
            if (graphic) {
              var graphicTemplate = graphic.getEffectivePopupTemplate()

              graphicTemplate.actions.items[0].visible = graphic.attributes.Email ? true : false
            }
          })

          popup.viewModel.on('trigger-action', (event) => {
            if (event.action.id === 'email-principal') {
              const { Email, USER_School_Principal: Principal } = popup.viewModel.selectedFeature.attributes

              if (Email) {
                const url = `mailto:${Email}?subject=ATTN:%20${Principal.trim() || 'Principal'}`

                window.location.href = url
              }
            }
          })
        })
      })
    })
  }

  render() {
    return <Map 
      mapProperties={{ basemap: 'streets' }}
      viewProperties={{ center: this.state.centerPoint, zoom: 13 }}
      onLoad={this.handleMapLoad} />
  }
}

export default SimpleMap;
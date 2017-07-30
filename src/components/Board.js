import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'glamor';
import { getSuitSVG } from '../utils/svg';
import Stack from './Stack';
import TopModal from './TopModal';

const styles = {
  board: {
    position: 'relative',
    width: 775,
    height: 900,
    margin: '40px auto',
  },
};

@connect(({ app }) => ({
  stock: app.stock,
  waste: app.waste,
  tableaus: app.tableaus,
  foundations: app.foundations,
}))
export default class Board extends Component {
  render() {
    const { stock, waste, tableaus, foundations } = this.props;

    return (
      <div className={css(styles.board)}>
        <div id="dropzone_foundation_clubs" className="dropzone foundation" />
        <div id="dropzone_foundation_diamonds" className="dropzone foundation" />
        <div id="dropzone_foundation_hearts" className="dropzone foundation" />
        <div id="dropzone_foundation_spades" className="dropzone foundation" />
        <div id="dropzone_tableau_1" className="dropzone tableau" />
        <div id="dropzone_tableau_2" className="dropzone tableau" />
        <div id="dropzone_tableau_3" className="dropzone tableau" />
        <div id="dropzone_tableau_4" className="dropzone tableau" />
        <div id="dropzone_tableau_5" className="dropzone tableau" />
        <div id="dropzone_tableau_6" className="dropzone tableau" />
        <div id="dropzone_tableau_7" className="dropzone tableau" />

        <div id="placeholder_stock" className="placeholder ph_recycle">
          <i className="material-icons">refresh</i>
        </div>
        <div id="placeholder_waste" className="placeholder" />
        <div id="placeholder_foundation_clubs" className="placeholder ph_suit foundation">
          {getSuitSVG('clubs')}
        </div>
        <div id="placeholder_foundation_diamonds" className="placeholder ph_suit foundation">
          {getSuitSVG('diamonds')}
        </div>
        <div id="placeholder_foundation_hearts" className="placeholder ph_suit foundation">
          {getSuitSVG('hearts')}
        </div>
        <div id="placeholder_foundation_spades" className="placeholder ph_suit foundation">
          {getSuitSVG('spades')}
        </div>
        <div id="placeholder_tableau_1" className="placeholder tableau" />
        <div id="placeholder_tableau_2" className="placeholder tableau" />
        <div id="placeholder_tableau_3" className="placeholder tableau" />
        <div id="placeholder_tableau_4" className="placeholder tableau" />
        <div id="placeholder_tableau_5" className="placeholder tableau" />
        <div id="placeholder_tableau_6" className="placeholder tableau" />
        <div id="placeholder_tableau_7" className="placeholder tableau" />

        <Stack key="stock" className="stock" stack={stock} />
        <Stack key="waste" className="waste" stack={waste} />
        {Object.keys(foundations).map((foundation, i) =>
          // eslint-disable-next-line react/no-array-index-key
          <Stack key={`foundation-${i}`} className="foundation" stack={foundations[foundation]} />
        )}
        {tableaus.map((tableau, i) =>
          // eslint-disable-next-line react/no-array-index-key
          <Stack key={`tableau-${i}`} className="tableau" stack={tableau} />
        )}

        <TopModal />
      </div>
    );
  }
}

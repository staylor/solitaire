import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { STACK_OFFSET } from 'utils/constants';
import Tableau from './Tableau';
import Placeholder from './Placeholder';

const OFFSET_TOP = 165;
const TABLEAU_HEIGHT = 900;

@connect(({ deck }) => ({
  tableaus: deck.tableaus,
}))
export default class Tableaus extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    tableaus: PropTypes.array.isRequired,
  };

  render() {
    const { tableaus } = this.props;
    return tableaus.map((tableau, i) => {
      const id = `tableaus-${i}`;
      return [
        <Placeholder
          style={{
            top: OFFSET_TOP,
            left: i * STACK_OFFSET,
          }}
        />,
        <Tableau
          style={{
            height: TABLEAU_HEIGHT,
            top: OFFSET_TOP,
            left: i * STACK_OFFSET,
          }}
          id={id}
          stack={tableau}
        />,
      ];
    });
  }
}

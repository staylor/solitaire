import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'glamor';
import Tableau from './Tableau';
import { STACK_OFFSET } from '../utils/constants';
import placeholder from '../styles/placeholder';

const styles = {
  placeholder: {
    ...placeholder,
  },
  tableau: {
    height: 900,
    top: 165,
  },
};

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
    return (
      <section>
        {tableaus.map((tableau, i) => {
          const id = `tableaus-${i}`;
          return (
            <section key={id}>
              <div
                className={css(styles.placeholder, {
                  top: 165,
                  left: i * STACK_OFFSET,
                })}
              />
              <Tableau
                style={{ ...styles.tableau, left: i * STACK_OFFSET }}
                id={id}
                stack={tableau}
              />
            </section>
          );
        })}
      </section>
    );
  }
}

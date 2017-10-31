import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'react-dnd/lib/utils/shallowEqual';
import shallowEqualScalar from 'react-dnd/lib/utils/shallowEqualScalar';
import isPlainObject from 'lodash/isPlainObject';
import invariant from 'invariant';
import checkDecoratorArguments from 'react-dnd/lib/utils/checkDecoratorArguments';
import hoistStatics from 'hoist-non-react-statics';

function layerStyles(isDragging) {
  return {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: isDragging ? '100%' : 0,
    height: isDragging ? '100%' : 0,
    opacity: isDragging ? 1 : 0,
  };
}

export default function DragLayer(collect, options = {}) {
  checkDecoratorArguments('DragLayer', 'collect[, options]', ...arguments);
  invariant(
    typeof collect === 'function',
    'Expected "collect" provided as the first argument to DragLayer ' +
      'to be a function that collects props to inject into the component. ',
    'Instead, received %s. Read more: http://gaearon.github.io/react-dnd/docs-drag-layer.html',
    collect
  );
  invariant(
    isPlainObject(options),
    'Expected "options" provided as the second argument to DragLayer to be ' +
      'a plain object when specified. ' +
      'Instead, received %s. ' +
      'Read more: http://gaearon.github.io/react-dnd/docs-drag-layer.html',
    options
  );

  return function decorateLayer(DecoratedComponent) {
    const { arePropsEqual = shallowEqualScalar } = options;
    const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

    class DragLayerContainer extends Component {
      static DecoratedComponent = DecoratedComponent;

      static displayName = `DragLayer(${displayName})`;

      static contextTypes = {
        dragDropManager: PropTypes.object.isRequired,
      };

      getDecoratedComponentInstance() {
        return this.child;
      }

      shouldComponentUpdate(nextProps, nextState) {
        return !arePropsEqual(nextProps, this.props) || !shallowEqual(nextState, this.state);
      }

      constructor(props, context) {
        super(props);
        this.handleOffsetChange = this.handleOffsetChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);

        this.manager = context.dragDropManager;
        invariant(
          typeof this.manager === 'object',
          'Could not find the drag and drop manager in the context of %s. ' +
            'Make sure to wrap the top-level component of your app with DragDropContext. ' +
            'Read more: http://gaearon.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context',
          displayName,
          displayName
        );

        this.state = this.getCurrentState();
      }

      componentDidMount() {
        this.isCurrentlyMounted = true;

        const monitor = this.manager.getMonitor();
        this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleOffsetChange);
        this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleStateChange);

        this.handleStateChange();
      }

      componentWillUnmount() {
        this.isCurrentlyMounted = false;

        this.unsubscribeFromOffsetChange();
        this.unsubscribeFromStateChange();
      }

      handleOffsetChange() {
        if (!this.isCurrentlyMounted) {
          return;
        }

        const monitor = this.manager.getMonitor();
        const offset = monitor.getSourceClientOffset();
        const offsetDiv = this.offset;
        if (offset && offsetDiv) {
          offsetDiv.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
        }
      }

      handleStateChange() {
        if (!this.isCurrentlyMounted) {
          return;
        }

        const nextState = this.getCurrentState();
        if (!shallowEqual(nextState, this.state)) {
          this.setState(nextState);
        }
      }

      getCurrentState() {
        const monitor = this.manager.getMonitor();
        return {
          collected: collect(monitor),
          isDragging: monitor.isDragging(),
        };
      }

      render() {
        return (
          <div style={layerStyles(this.state.isDragging)}>
            <div
              ref={offset => {
                this.offset = offset;
              }}
            >
              {this.state.isDragging && (
                <DecoratedComponent
                  {...this.props}
                  {...this.state.collected}
                  ref={child => {
                    this.child = child;
                  }}
                />
              )}
            </div>
          </div>
        );
      }
    }

    return hoistStatics(DragLayerContainer, DecoratedComponent);
  };
}

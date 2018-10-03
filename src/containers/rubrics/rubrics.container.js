import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRubrics, clearState } from 'store/actions/rubrics.actions';

import { RubricsList } from './list';

const mapStateToProps = ({ geoState, rubricsState }) => ({
  geoState,
  rubricsState,
});

const mapDispatchToProps = dispatch => ({
  getRubrics: bindActionCreators(getRubrics, dispatch),
  clearState: bindActionCreators(clearState, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export class RubricsContainer extends React.Component {
  static propTypes = {
    getRubrics: PropTypes.func,
    clearState: PropTypes.func,
    geoState: PropTypes.object,
    rubricsState: PropTypes.object,
  };

  static defaultProps = {
    getRubrics: Function.prototype,
    clearState: Function.prototype,
    geoState: {},
    rubricsState: {},
  };

  constructor(props) {
    super(props);

    const { geoState = {} } = props;
    const { geo = [] } = geoState;
    const { id } = geo[0] || {};

    this.state = {
      isError: false,
      locationId: id,
    };
  }

  async componentDidMount() {
    const { geoState } = this.props;
    const { geo = [] } = geoState;
    const { id } = geo[0] || {};

    if (id) {
      this.handleGetRubrics(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { geoState } = nextProps;
    const { geo = [] } = geoState;
    const { id } = geo[0] || {};

    if (this.state.locationId !== id) {
      this.setState({
        locationId: id,
      });
      this.handleGetRubrics(id);
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  handleGetRubrics = async (id) => {
    const { getRubrics: getRubricsAction } = this.props;

    try {
      await getRubricsAction({
        fields: [
          'id', 'title', 'counts',
        ],
        geoId: id,
      });
    } catch (e) {
      this.setState({
        isError: true,
      });
    }
  };

  render() {
    const { rubricsState } = this.props;
    const { rubrics = [] } = rubricsState;

    return (
      <RubricsList data={rubrics} />
    );
  }
}

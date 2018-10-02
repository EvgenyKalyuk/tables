import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { rubricsService } from './rubrics.service';

import { RubricsList } from './list';

const mapStateToProps = ({ geoState }) => ({
  geoState,
});

@rubricsService
@connect(mapStateToProps)
export class RubricsContainer extends React.Component {
  static propTypes = {
    getRubrics: PropTypes.func,
    geoState: PropTypes.object,
  };

  static defaultProps = {
    getRubrics: Function.prototype,
    geoState: {},
  };

  constructor(props) {
    super(props);

    const { geoState = {} } = props;
    const { geo = [] } = geoState;
    const { id } = geo[0] || {};

    this.state = {
      metadata: {},
      rubrics: [],
      isError: false,
      locationId: id,
    };
  }

  async componentDidMount() {
    const { geoState } = this.props;
    const { geo = [] } = geoState;
    const { id } = geo[0] || {};

    if (id) {
      this.handleGetRubrics({
        id,
        period: 'today',
      });
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

  handleGetRubrics = async (id) => {
    const { getRubrics } = this.props;

    try {
      const data = await getRubrics({
        fields: [
          'id', 'title', 'counts',
        ],
        geoId: id,
      });

      this.setState({
        ...data,
      });
    } catch (e) {
      this.setState({
        isError: true,
      });
    }
  };

  render() {
    const { rubrics } = this.state;

    return (
      <RubricsList data={rubrics} />
    );
  }
}

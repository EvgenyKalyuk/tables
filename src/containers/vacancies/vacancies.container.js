import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getVacancies, clearState } from 'store/actions/vacancies.actions';
import { VacanciesList } from './list';

const mapStateToProps = ({ geoState, vacanciesState }) => ({
  geoState,
  vacanciesState,
});

const mapDispatchToProps = dispatch => ({
  getVacancies: bindActionCreators(getVacancies, dispatch),
  clearState: bindActionCreators(clearState, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export class VacanciesContainer extends React.Component {
  static propTypes = {
    getVacancies: PropTypes.func,
    clearState: PropTypes.func,
    geoState: PropTypes.object,
    vacanciesState: PropTypes.object,
  };

  static defaultProps = {
    getVacancies: Function.prototype,
    clearState: Function.prototype,
    geoState: {},
    vacanciesState: {},
  };

  constructor(props) {
    super(props);

    const { geoState = {} } = props;
    const { geo = [] } = geoState;
    const { id } = geo[0] || {};

    this.state = {
      list: {},
      isError: false,
      locationId: id,
    };
  }

  async componentDidMount() {
    const { geoState } = this.props;
    const { geo = [] } = geoState;
    const { id } = geo[0] || {};

    if (id) {
      this.handleGetVacancies({
        id,
        period: 'today',
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { geoState } = nextProps;
    const { geo = [] } = geoState;
    const { id } = geo[0] || {};

    if (id && this.state.locationId !== id) {
      this.setState({
        locationId: id,
      });
      this.handleGetVacancies({
        id,
        period: 'today',
      });
    }
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  createTop = () => {
    const { vacanciesState } = this.props;
    const { vacancies } = vacanciesState;

    const list = {};

    vacancies.forEach((vacancy) => {
      const { header } = vacancy;
      const words = header && header.split(/[ ,.()]+/);

      words.forEach((word) => {
        if (!word) {
          return null;
        }
        if (list[word]) {
          return list[word] += 1;
        }

        return list[word] = 1;
      });
    });

    this.setState({
      list,
    });
  };

  handleGetVacancies = async ({
    id,
    period,
    offset = 0,
    preData = [],
  }) => {
    const { getVacancies: getVacanciesAction } = this.props;

    try {
      const { payload } = await getVacanciesAction({
        fields: ['header'],
        geoId: id,
        period,
        isNewOnly: true,
        limit: 100,
        offset,
        preData,
      });
      const { vacancies = [], metadata = {} } = payload;
      const { resultset = {} } = metadata;
      const { count } = resultset;

      if (vacancies.length < count) {
        return this.handleGetVacancies({
          id,
          period,
          offset: offset + 100,
          preData: payload.vacancies,
        });
      }

      return this.createTop();
    } catch (e) {
      this.setState({
        isError: true,
      });
    }
  };

  render() {
    const { list } = this.state;

    return (
      <VacanciesList data={list} />
    );
  }
}
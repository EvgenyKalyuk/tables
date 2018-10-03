import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { vacanciesService } from './vacancies.service';
import { VacanciesList } from './list';

const mapStateToProps = ({ geoState }) => ({
  geoState,
});

@vacanciesService
@connect(mapStateToProps)
export class VacanciesContainer extends React.Component {
  static propTypes = {
    getVacancies: PropTypes.func,
    geoState: PropTypes.object,
  };

  static defaultProps = {
    getVacancies: Function.prototype,
    geoState: {},
  };

  constructor(props) {
    super(props);

    const { geoState = {} } = props;
    const { geo = [] } = geoState;
    const { id } = geo[0] || {};

    this.state = {
      vacancies: [],
      metadata: {},
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

    if (this.state.locationId !== id) {
      this.setState({
        locationId: id,
      });
      this.handleGetVacancies({
        id,
        period: 'today',
      });
    }
  }

  createTop = () => {
    const { vacancies } = this.state;

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

  handleGetVacancies = async ({ id, period, offset = 0 }) => {
    const { getVacancies } = this.props;

    try {
      const data = await getVacancies({
        fields: ['header'],
        geoId: id,
        period,
        isNewOnly: true,
        limit: 100,
        offset,
      });

      this.setState(state => ({
        ...state,
        vacancies: [
          ...state.vacancies,
          ...data.vacancies,
        ],
      }));

      const { metadata = {} } = data;
      const { resultset = {} } = metadata;
      const { count } = resultset;

      if (this.state.vacancies.length < count) {
        return this.handleGetVacancies({ id, offset: offset + 100, period });
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

    console.log(this.state);

    return (
      <VacanciesList data={list} />
    );
  }
}
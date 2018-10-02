import React from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_PAGES } from 'common/consts';

export const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to={CLIENT_PAGES.VACANCIES}>
            Вакансии
          </Link>
        </li>
        <li>
          <Link to={CLIENT_PAGES.RUBRICS}>
            Рубрики
          </Link>
        </li>
      </ul>
    </nav>
  </header>
);

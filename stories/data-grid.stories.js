import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DataGrid, { ColumnData } from '../src/components/data-grid';

storiesOf('DataGrid', module)
  .add('default view', () => <DataGrid>
    <ColumnData title="First Name" labelField="firstName" />
          <ColumnData title="Last Name" labelField="lastName" />
          <ColumnData title="Date Of Birth (DOB)" labelField="dob" />
          <ColumnData title="Gender" labelField="gender" />
  </DataGrid>);
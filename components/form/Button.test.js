import React from 'react';
import Button from './Button';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

test("button receives props", () =>{
    const component = render(<Button />);
    const button = component.getAllByTestId('button-main');

    expect(button.textContent).toBeInTheDocument();
})
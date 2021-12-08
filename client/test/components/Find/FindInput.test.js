import React from 'react';
import { render, screen, waitFor ,fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Find from '../../../src/components/Find/Find';
import { FindInput } from '../../../src/components/Find/FindInput';

describe('FindInput', () => {

    beforeEach(async () => {
        render(<FindInput/>);
        await waitFor(() => {
            const dropdown = screen.getByTestId('FindInput Dropdown');
            user.click(dropdown);
        })
    });

    test('Renders random button', async () => {
        const random = screen.getByTestId('random-button');
        user.click(random);
    });
});
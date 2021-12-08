import React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { MOCK_RESULTS } from "../../sharedMocks";
import Shorter from '../../../src/components/Shorter/Shorter';

describe('Results', () => {
    const toggleShorter = jest.fn();

    beforeEach(() => {
        fetch.resetMocks();
        render(<Shorter toggleShorter={toggleShorter}/>);
    });

    it('test check button', () => {
        const checkButton = screen.getByTestId("check-button");
        user.click(checkButton);
        expect(toggleShorter).toHaveBeenCalled();
    });

});